"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STALE_TIME } from "@/lib/query-config";
import { createClient } from "@/lib/supabase/client";
import {
  adminGetAllProjects, adminGetRecentProjects, adminGetProjectById, adminCreateProject, adminUpdateProject, adminDeleteProject,
  adminCreateMilestone, adminUpdateMilestone, adminDeleteMilestone, adminSetMilestoneStatus,
  adminGetAllClients, adminGetClientById, adminGetClientProjects, adminUpdateClientStatus, adminUpdateClient,
  adminBanClient, adminUnbanClient, adminDeleteClient,
  adminGetTeamMembers,
  adminGetProjectMembers, adminAddProjectMember, adminRemoveProjectMember,
  adminGetInvoicesByProject, adminCreateInvoice, adminSendInvoice, adminMarkInvoicePaid,
  adminGetKPIs,
  type CreateProjectInput, type CreateMilestoneInput, type CreateInvoiceInput,
} from "@/lib/services/admin.service";
import { useWorkspaceId } from "@/store/auth.store";

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
    onSuccess: (_, { id }) => {
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
function invalidateProjectCaches(qc: ReturnType<typeof useQueryClient>, projectId: string) {
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
    onSuccess: (result) => {
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
    onSuccess: (_, { projectId }) => {
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
    onSuccess: (result) => {
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
    onSuccess: (_, { clientId }) => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-client", clientId] });
    },
  });
}

export function useAdminBanClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, duration }: { clientId: string; duration: Parameters<typeof adminBanClient>[1] }) =>
      adminBanClient(clientId, duration),
    onSuccess: (_, { clientId }) => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      qc.invalidateQueries({ queryKey: ["admin-client", clientId] });
    },
  });
}

export function useAdminUnbanClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clientId: string) => adminUnbanClient(clientId),
    onSuccess: (_, clientId) => {
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
    onSuccess: (_, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-project-members", projectId] });
    },
  });
}

export function useAdminRemoveProjectMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, profileId }: { projectId: string; profileId: string }) =>
      adminRemoveProjectMember(projectId, profileId),
    onSuccess: (_, { projectId }) => {
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
    onSuccess: (_, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-invoices", projectId] });
    },
  });
}

export function useAdminMarkInvoicePaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, projectId }: { id: string; projectId: string }) =>
      adminMarkInvoicePaid(id),
    onSuccess: (result, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["admin-invoices", projectId] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}
