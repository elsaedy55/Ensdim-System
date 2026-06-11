"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  adminGetAllProjects, adminCreateProject, adminUpdateProject, adminDeleteProject,
  adminCreateMilestone, adminUpdateMilestone, adminDeleteMilestone, adminSetMilestoneStatus,
  adminGetAllClients, adminGetClientById, adminGetClientProjects, adminUpdateClientStatus,
  adminBanClient, adminUnbanClient, adminDeleteClient,
  adminGetTeamMembers,
  adminGetProjectMembers, adminAddProjectMember, adminRemoveProjectMember,
  adminGetInvoicesByProject, adminCreateInvoice, adminSendInvoice, adminMarkInvoicePaid,
  adminGetKPIs,
  type CreateProjectInput, type CreateMilestoneInput, type CreateInvoiceInput,
} from "@/lib/services/admin.service";

// ─── KPIs ─────────────────────────────────────────────────────────

export function useAdminKPIs() {
  return useQuery({
    queryKey:  ["admin-kpis"],
    queryFn:   adminGetKPIs,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}

// ─── Projects ─────────────────────────────────────────────────────

export function useAdminProjects() {
  return useQuery({
    queryKey:  ["admin-projects"],
    queryFn:   adminGetAllProjects,
    staleTime: 60 * 1000,
  });
}

export function useAdminCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProjectInput) => adminCreateProject(input),
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["admin-kpis"] });
    },
  });
}

// ─── Milestones ───────────────────────────────────────────────────

export function useAdminCreateMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMilestoneInput) => adminCreateMilestone(input),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["milestones", result.project_id] });
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
    },
  });
}

// ─── Clients ──────────────────────────────────────────────────────

export function useAdminClients() {
  return useQuery({
    queryKey:  ["admin-clients"],
    queryFn:   adminGetAllClients,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminClient(id: string | undefined) {
  return useQuery({
    queryKey:  ["admin-client", id],
    queryFn:   () => adminGetClientById(id!),
    enabled:   !!id,
    staleTime: 2 * 60 * 1000,
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
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
    onSuccess: () => {
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
    staleTime: 5 * 60 * 1000,
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
