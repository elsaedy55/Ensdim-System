"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRevisionsByProject,
  getRevisionById,
  createRevision,
  updateRevisionStatus,
} from "@/lib/services/revisions.service";
import type { RevisionRow } from "@/lib/supabase/types";

type RevisionInsert = Partial<RevisionRow>;

export function useRevisions(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["revisions", projectId],
    queryFn:   () => getRevisionsByProject(projectId!),
    enabled:   !!projectId,
    staleTime: 60 * 1000,
  });
}

export function useRevision(id: string | undefined) {
  return useQuery({
    queryKey:  ["revision", id],
    queryFn:   () => getRevisionById(id!),
    enabled:   !!id,
    staleTime: 60 * 1000,
  });
}

export function useCreateRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<RevisionInsert, "submitted_by">) => createRevision(data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["revisions", vars.project_id] });
    },
  });
}

export function useUpdateRevisionStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id, status, teamResponse,
    }: {
      id: string;
      status: Parameters<typeof updateRevisionStatus>[1];
      teamResponse?: string;
    }) => updateRevisionStatus(id, status, teamResponse),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["revisions", result.project_id] });
      qc.invalidateQueries({ queryKey: ["revision", result.id] });
    },
  });
}
