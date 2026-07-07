"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STALE_TIME } from "@/lib/query-config";
import { createClient } from "@/lib/supabase/client";
import type { MilestoneRow } from "@/lib/supabase/types";
import {
  getMilestonesByProject,
  getMilestoneById,
  approveMilestone,
  updateMilestoneStatus,
  getMilestoneActivity,
} from "@/lib/services/milestones.service";

export function useMilestones(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["milestones", projectId],
    queryFn:   () => getMilestonesByProject(createClient(), projectId!),
    enabled:   !!projectId,
    staleTime: STALE_TIME.LONG,
  });
}

export function useMilestone(id: string | undefined) {
  return useQuery({
    queryKey:  ["milestone", id],
    queryFn:   () => getMilestoneById(createClient(), id!),
    enabled:   !!id,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useMilestoneActivity(milestoneId: string | undefined) {
  return useQuery({
    queryKey: ["milestone-activity", milestoneId],
    queryFn:  () => getMilestoneActivity(createClient(), milestoneId!),
    enabled:  !!milestoneId,
  });
}

// Optimistically patches every cached milestone list/single-item cache that
// contains `id`, returning a snapshot for rollback on error.
function patchMilestoneCaches(qc: ReturnType<typeof useQueryClient>, id: string, patch: Partial<MilestoneRow>) {
  const listQueries = qc.getQueriesData<MilestoneRow[]>({ queryKey: ["milestones"] });
  listQueries.forEach(([key, data]) => {
    if (data) qc.setQueryData(key, data.map((m) => m.id === id ? { ...m, ...patch } : m));
  });
  const prevSingle = qc.getQueryData<MilestoneRow>(["milestone", id]);
  if (prevSingle) qc.setQueryData(["milestone", id], { ...prevSingle, ...patch });
  return { listQueries, prevSingle };
}

function restoreMilestoneCaches(
  qc: ReturnType<typeof useQueryClient>,
  id: string,
  ctx: { listQueries: Array<[readonly unknown[], MilestoneRow[] | undefined]>; prevSingle: MilestoneRow | undefined } | undefined,
) {
  if (!ctx) return;
  ctx.listQueries.forEach(([key, data]) => qc.setQueryData(key as unknown[], data));
  if (ctx.prevSingle) qc.setQueryData(["milestone", id], ctx.prevSingle);
}

export function useApproveMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveMilestone(createClient(), id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["milestones"] });
      return patchMilestoneCaches(qc, id, { status: "approved", completed_at: new Date().toISOString() });
    },
    onError: (_, id, ctx) => restoreMilestoneCaches(qc, id, ctx),
    onSettled: (_, __, id) => {
      qc.invalidateQueries({ queryKey: ["milestones"] });
      qc.invalidateQueries({ queryKey: ["milestone", id] });
      // Approving shifts the DB-computed project.progress (see migration 023).
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useUpdateMilestoneStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Parameters<typeof updateMilestoneStatus>[2] }) =>
      updateMilestoneStatus(createClient(), id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["milestones"] });
      return patchMilestoneCaches(qc, id, { status });
    },
    onError: (_, { id }, ctx) => restoreMilestoneCaches(qc, id, ctx),
    onSettled: (_, __, { id }) => {
      qc.invalidateQueries({ queryKey: ["milestones"] });
      qc.invalidateQueries({ queryKey: ["milestone", id] });
      // Status shifts the DB-computed project.progress (see migration 023).
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}
