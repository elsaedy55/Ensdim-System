"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STALE_TIME } from "@/lib/query-config";
import { createClient } from "@/lib/supabase/client";
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

export function useApproveMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveMilestone(createClient(), id),
    onSuccess: (_, id) => {
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
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["milestones"] });
      qc.invalidateQueries({ queryKey: ["milestone", id] });
      // Status shifts the DB-computed project.progress (see migration 023).
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}
