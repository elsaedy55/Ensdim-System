"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STALE_TIME } from "@/lib/query-config";
import { createClient } from "@/lib/supabase/client";
import type { MilestoneRow, InvoiceRow, ProfileRow } from "@/lib/supabase/types";
import {
  adminGetAllProjects, adminGetRecentProjects, adminGetProjectById, adminCreateProject, adminUpdateProject, adminDeleteProject,
  adminCreateMilestone, adminUpdateMilestone, adminDeleteMilestone, adminSetMilestoneStatus,
  adminGetAllClients, adminGetClientById, adminGetClientProjects, adminUpdateClientStatus, adminUpdateClient,
  adminBanClient, adminUnbanClient, adminDeleteClient, type BanDuration,
  adminGetTeamMembers,
  adminGetProjectMembers, adminAddProjectMember, adminRemoveProjectMember,
  adminGetInvoicesByProject, adminCreateInvoice, adminSendInvoice, adminMarkInvoicePaid,
  adminGetKPIs,
  type CreateProjectInput, type CreateMilestoneInput, type CreateInvoiceInput,
} from "@/lib/services/admin.service";
import { useWorkspaceId } from "@/store/auth.store";

// ─── Optimistic-update helpers ──────────────────────────────────────
// Shared by every mutation below that patches an already-cached list (or a
// single-item cache) instead of waiting for a server round trip + refetch
// before the UI reflects the change. `listKeyPrefix` uses partial key
// matching (e.g. ["milestones"] matches ["milestones", anyProjectId]) so
// callers don't need to know which parent id a cached list is keyed under.

type QueryClient = ReturnType<typeof useQueryClient>;

function patchListItem<T extends { id: string }>(
  qc: QueryClient,
  listKeyPrefix: unknown[],
  id: string,
  patch: Partial<T>,
) {
  const queries = qc.getQueriesData<T[]>({ queryKey: listKeyPrefix });
  queries.forEach(([key, data]) => {
    if (data) qc.setQueryData(key, data.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  });
  return queries;
}

function removeListItem<T extends { id: string }>(qc: QueryClient, listKeyPrefix: unknown[], id: string) {
  const queries = qc.getQueriesData<T[]>({ queryKey: listKeyPrefix });
  queries.forEach(([key, data]) => {
    if (data) qc.setQueryData(key, data.filter((item) => item.id !== id));
  });
  return queries;
}

function restoreQueries(qc: QueryClient, queries: Array<[readonly unknown[], unknown]>) {
  queries.forEach(([key, data]) => qc.setQueryData(key as unknown[], data));
}

// ─── KPIs ─────────────────────────────────────────────────────────

export function useAdminKPIs() {
  return useQuery({
    queryKey:  ["admin-kpis"],
    queryFn:   () => adminGetKPIs(createClient()),
    staleTime: STALE_TIME.LONG,
    refetchInterval: STALE_TIME.VERY_LONG,
  });
}

// ─── Projects ─────────────────────────────────────────────────────

export function useAdminProjects() {
  return useQuery({
    queryKey:  ["admin-projects"],
    queryFn:   adminGetAllProjects,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useAdminRecentProjects(limit = 8) {
  return useQuery({
    queryKey:  ["admin-projects-recent", limit],
    queryFn:   () => adminGetRecentProjects(createClient(), limit),
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useAdminProject(id: string | undefined) {
  const qc = useQueryClient();
  return useQuery({
    queryKey:  ["admin-project", id],
    queryFn:   () => adminGetProjectById(id!),
    enabled:   !!id,
    staleTime: STALE_TIME.MEDIUM,
    // Renders instantly from the list cache (if already fetched) while the
    // single-project query revalidates in the background.
    placeholderData: () =>
      qc.getQueryData<Awaited<ReturnType<typeof adminGetAllProjects>>>(["admin-projects"])
        ?.find((p) => p.id === id),
  });
}

export function useAdminCreateProject() {
  const qc = useQueryClient();
  const workspaceId = useWorkspaceId();
  return useMutation({
    mutationFn: (input: CreateProjectInput) => adminCreateProject(input, workspaceId!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}

export function useAdminUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof adminUpdateProject>[1] }) =>
      adminUpdateProject(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey: ["admin-projects"] });
      await qc.cancelQueries({ queryKey: ["admin-project", id] });
      const listQueries = patchListItem<Awaited<ReturnType<typeof adminGetAllProjects>>[number]>(
        qc, ["admin-projects"], id, updates,
      );
      const prevDetail = qc.getQueryData<Awaited<ReturnType<typeof adminGetProjectById>>>(["admin-project", id]);
      if (prevDetail) qc.setQueryData(["admin-project", id], { ...prevDetail, ...updates });
      return { listQueries, prevDetail };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
      if (ctx?.prevDetail) qc.setQueryData(["admin-project", id], ctx.prevDetail);
    },
    onSettled: (_, __, { id }) => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["admin-project", id] });
    },
  });
}

export function useAdminDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminDeleteProject(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["admin-projects"] });
      const prev = qc.getQueryData<Awaited<ReturnType<typeof adminGetAllProjects>>>(["admin-projects"]);
      qc.setQueryData(["admin-projects"], prev?.filter((p) => p.id !== id));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-projects"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}

// ─── Milestones ───────────────────────────────────────────────────

// Milestone changes shift the DB-computed project.progress (see migration
// 023) — every milestone mutation must also invalidate the project caches,
// not just the milestone list, or the % shown stays stale until reload.
function invalidateProjectCaches(qc: QueryClient, projectId: string) {
  qc.invalidateQueries({ queryKey: ["admin-project", projectId] });
  qc.invalidateQueries({ queryKey: ["admin-projects"] });
  qc.invalidateQueries({ queryKey: ["admin-projects-recent"] });
  qc.invalidateQueries({ queryKey: ["project"] });
}

export function useAdminCreateMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMilestoneInput) => adminCreateMilestone(input),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["milestones", result.project_id] });
      invalidateProjectCaches(qc, result.project_id);
    },
  });
}

export function useAdminUpdateMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof adminUpdateMilestone>[1] }) =>
      adminUpdateMilestone(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey: ["milestones"] });
      const listQueries = patchListItem<MilestoneRow>(qc, ["milestones"], id, updates);
      const prevSingle = qc.getQueryData<MilestoneRow>(["milestone", id]);
      if (prevSingle) qc.setQueryData(["milestone", id], { ...prevSingle, ...updates });
      return { listQueries, prevSingle };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
      if (ctx?.prevSingle) qc.setQueryData(["milestone", id], ctx.prevSingle);
    },
    onSettled: (result) => {
      if (!result) return;
      qc.invalidateQueries({ queryKey: ["milestones", result.project_id] });
      qc.invalidateQueries({ queryKey: ["milestone", result.id] });
      invalidateProjectCaches(qc, result.project_id);
    },
  });
}

export function useAdminDeleteMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, projectId }: { id: string; projectId: string }) =>
      adminDeleteMilestone(id),
    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey: ["milestones"] });
      const listQueries = removeListItem<MilestoneRow>(qc, ["milestones"], id);
      return { listQueries };
    },
    onError: (_, __, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["milestones", projectId] });
      invalidateProjectCaches(qc, projectId);
    },
  });
}

export function useAdminSetMilestoneStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminSetMilestoneStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["milestones"] });
      const listQueries = patchListItem<MilestoneRow>(qc, ["milestones"], id, { status } as Partial<MilestoneRow>);
      const prevSingle = qc.getQueryData<MilestoneRow>(["milestone", id]);
      if (prevSingle) qc.setQueryData(["milestone", id], { ...prevSingle, status });
      return { listQueries, prevSingle };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
      if (ctx?.prevSingle) qc.setQueryData(["milestone", id], ctx.prevSingle);
    },
    onSettled: (result) => {
      if (!result) return;
      qc.invalidateQueries({ queryKey: ["milestones", result.project_id] });
      qc.invalidateQueries({ queryKey: ["milestone", result.id] });
      invalidateProjectCaches(qc, result.project_id);
    },
  });
}

// ─── Clients ──────────────────────────────────────────────────────

export function useAdminClients() {
  return useQuery({
    queryKey:  ["admin-clients"],
    queryFn:   adminGetAllClients,
    staleTime: STALE_TIME.LONG,
  });
}

export function useAdminClient(id: string | undefined) {
  return useQuery({
    queryKey:  ["admin-client", id],
    queryFn:   () => adminGetClientById(id!),
    enabled:   !!id,
    staleTime: STALE_TIME.LONG,
  });
}

export function useAdminClientProjects(clientId: string | undefined) {
  return useQuery({
    queryKey:  ["admin-client-projects", clientId],
    queryFn:   () => adminGetClientProjects(clientId!),
    enabled:   !!clientId,
  });
}

export function useAdminUpdateClientStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, status }: { clientId: string; status: Parameters<typeof adminUpdateClientStatus>[1] }) =>
      adminUpdateClientStatus(clientId, status),
    onMutate: async ({ clientId, status }) => {
      await qc.cancelQueries({ queryKey: ["admin-clients"] });
      const prev = qc.getQueryData<Awaited<ReturnType<typeof adminGetAllClients>>>(["admin-clients"]);
      qc.setQueryData(
        ["admin-clients"],
        prev?.map((c) => c.id === clientId ? { ...c, client_status: status } : c),
      );
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-clients"], ctx.prev);
    },
    onSettled: (_, __, { clientId }) => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-client", clientId] });
    },
  });
}

export function useAdminUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, updates }: { clientId: string; updates: Parameters<typeof adminUpdateClient>[1] }) =>
      adminUpdateClient(clientId, updates),
    onMutate: async ({ clientId, updates }) => {
      await qc.cancelQueries({ queryKey: ["admin-clients"] });
      await qc.cancelQueries({ queryKey: ["admin-client", clientId] });
      const listQueries = patchListItem<ProfileRow>(qc, ["admin-clients"], clientId, updates);
      const prevSingle = qc.getQueryData<ProfileRow>(["admin-client", clientId]);
      if (prevSingle) qc.setQueryData(["admin-client", clientId], { ...prevSingle, ...updates });
      return { listQueries, prevSingle };
    },
    onError: (_, { clientId }, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
      if (ctx?.prevSingle) qc.setQueryData(["admin-client", clientId], ctx.prevSingle);
    },
    onSettled: (_, __, { clientId }) => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-client", clientId] });
    },
  });
}

// Mirrors the ban-duration → banned_until math in
// app/api/admin/clients/[id]/route.ts (the actual source of truth) — kept
// here only so the ban can show up as "banned" instantly instead of
// waiting on the round trip. The real value from the server always wins on
// settle.
const OPTIMISTIC_BAN_HOURS: Record<BanDuration, number> = {
  "1d": 24, "7d": 168, "30d": 720, "permanent": 876000,
};

export function useAdminBanClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, duration }: { clientId: string; duration: BanDuration }) =>
      adminBanClient(clientId, duration),
    onMutate: async ({ clientId, duration }) => {
      await qc.cancelQueries({ queryKey: ["admin-clients"] });
      await qc.cancelQueries({ queryKey: ["admin-client", clientId] });
      const bannedUntil = new Date(Date.now() + OPTIMISTIC_BAN_HOURS[duration] * 60 * 60 * 1000).toISOString();
      const listQueries = patchListItem<ProfileRow>(qc, ["admin-clients"], clientId, { banned_until: bannedUntil });
      const prevSingle = qc.getQueryData<ProfileRow>(["admin-client", clientId]);
      if (prevSingle) qc.setQueryData(["admin-client", clientId], { ...prevSingle, banned_until: bannedUntil });
      return { listQueries, prevSingle };
    },
    onError: (_, { clientId }, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
      if (ctx?.prevSingle) qc.setQueryData(["admin-client", clientId], ctx.prevSingle);
    },
    onSettled: (_, __, { clientId }) => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-client", clientId] });
    },
  });
}

export function useAdminUnbanClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clientId: string) => adminUnbanClient(clientId),
    onMutate: async (clientId) => {
      await qc.cancelQueries({ queryKey: ["admin-clients"] });
      await qc.cancelQueries({ queryKey: ["admin-client", clientId] });
      const listQueries = patchListItem<ProfileRow>(qc, ["admin-clients"], clientId, { banned_until: null });
      const prevSingle = qc.getQueryData<ProfileRow>(["admin-client", clientId]);
      if (prevSingle) qc.setQueryData(["admin-client", clientId], { ...prevSingle, banned_until: null });
      return { listQueries, prevSingle };
    },
    onError: (_, clientId, ctx) => {
      if (ctx?.listQueries) restoreQueries(qc, ctx.listQueries);
      if (ctx?.prevSingle) qc.setQueryData(["admin-client", clientId], ctx.prevSingle);
    },
    onSettled: (_, __, clientId) => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-client", clientId] });
    },
  });
}

export function useAdminDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clientId: string) => adminDeleteClient(clientId),
    onMutate: async (clientId) => {
      await qc.cancelQueries({ queryKey: ["admin-clients"] });
      const prev = qc.getQueryData<Awaited<ReturnType<typeof adminGetAllClients>>>(["admin-clients"]);
      qc.setQueryData(["admin-clients"], prev?.filter((c) => c.id !== clientId));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-clients"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}

// ─── Team ─────────────────────────────────────────────────────────

export function useAdminTeam() {
  return useQuery({
    queryKey:  ["admin-team"],
    queryFn:   adminGetTeamMembers,
    staleTime: STALE_TIME.VERY_LONG,
  });
}

// ─── Project Members ─────────────────────────────────────────────

export function useAdminProjectMembers(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["admin-project-members", projectId],
    queryFn:   () => adminGetProjectMembers(projectId!),
    enabled:   !!projectId,
  });
}

export function useAdminAddProjectMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, profileId }: { projectId: string; profileId: string }) =>
      adminAddProjectMember(projectId, profileId),
    onMutate: async ({ projectId, profileId }) => {
      await qc.cancelQueries({ queryKey: ["admin-project-members", projectId] });
      const prev = qc.getQueryData<ProfileRow[]>(["admin-project-members", projectId]);
      // Only optimistic if the profile is already known from another cache
      // (e.g. the team list) — otherwise there's nothing to render yet, so
      // this falls back to waiting for the real row like before.
      const profile = qc.getQueryData<Array<ProfileRow & { pending: boolean }>>(["admin-team"])
        ?.find((p) => p.id === profileId);
      if (profile && prev && !prev.some((p) => p.id === profileId)) {
        qc.setQueryData(["admin-project-members", projectId], [...prev, profile]);
      }
      return { prev };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-project-members", projectId], ctx.prev);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-project-members", projectId] });
    },
  });
}

export function useAdminRemoveProjectMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, profileId }: { projectId: string; profileId: string }) =>
      adminRemoveProjectMember(projectId, profileId),
    onMutate: async ({ projectId, profileId }) => {
      await qc.cancelQueries({ queryKey: ["admin-project-members", projectId] });
      const prev = qc.getQueryData<ProfileRow[]>(["admin-project-members", projectId]);
      qc.setQueryData(["admin-project-members", projectId], prev?.filter((p) => p.id !== profileId));
      return { prev };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-project-members", projectId], ctx.prev);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-project-members", projectId] });
    },
  });
}

// ─── Invoices ─────────────────────────────────────────────────────

export function useAdminProjectInvoices(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["admin-invoices", projectId],
    queryFn:   () => adminGetInvoicesByProject(projectId!),
    enabled:   !!projectId,
  });
}

export function useAdminCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateInvoiceInput) => adminCreateInvoice(input),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["admin-invoices", result.project_id] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}

export function useAdminSendInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, projectId }: { id: string; projectId: string }) =>
      adminSendInvoice(id),
    onMutate: async ({ id, projectId }) => {
      await qc.cancelQueries({ queryKey: ["admin-invoices", projectId] });
      const prev = qc.getQueryData<InvoiceRow[]>(["admin-invoices", projectId]);
      qc.setQueryData(
        ["admin-invoices", projectId],
        prev?.map((inv) => inv.id === id ? { ...inv, status: "sent" } : inv),
      );
      return { prev };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-invoices", projectId], ctx.prev);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-invoices", projectId] });
    },
  });
}

export function useAdminMarkInvoicePaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, projectId }: { id: string; projectId: string }) =>
      adminMarkInvoicePaid(id),
    onMutate: async ({ id, projectId }) => {
      await qc.cancelQueries({ queryKey: ["admin-invoices", projectId] });
      const prev = qc.getQueryData<InvoiceRow[]>(["admin-invoices", projectId]);
      qc.setQueryData(
        ["admin-invoices", projectId],
        prev?.map((inv) => inv.id === id ? { ...inv, status: "paid", paid_at: new Date().toISOString() } : inv),
      );
      return { prev };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.prev) qc.setQueryData(["admin-invoices", projectId], ctx.prev);
    },
    onSettled: (result, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-invoices", projectId] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}
