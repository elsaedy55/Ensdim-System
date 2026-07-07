"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import {
  getRevisionsByProject,
  getRevisionById,
  createRevision,
  updateRevisionStatus,
} from "@/lib/services/revisions.service";
import type { RevisionRow } from "@/lib/supabase/types";
import { useUser } from "@/store/auth.store";

type RevisionInsert = Partial<RevisionRow>;

export function useRevisions(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["revisions", projectId],
    queryFn:   () => getRevisionsByProject(projectId!),
    enabled:   !!projectId,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useRevision(id: string | undefined) {
  return useQuery({
    queryKey:  ["revision", id],
    queryFn:   () => getRevisionById(id!),
    enabled:   !!id,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useCreateRevision() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: (data: Omit<RevisionInsert, "submitted_by">) => createRevision(data, userId!),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["revisions", vars.project_id] });
    },
  });
}

export function useUpdateRevisionStatus() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: ({
      id, status, teamResponse,
    }: {
      id: string;
      status: Parameters<typeof updateRevisionStatus>[1];
      teamResponse?: string;
    }) => updateRevisionStatus(id, status, userId!, teamResponse),
    onMutate: async ({ id, status, teamResponse }) => {
      await qc.cancelQueries({ queryKey: ["revisions"] });
      const patch = { status, ...(teamResponse !== undefined ? { team_response: teamResponse } : {}) };
      const listQueries = qc.getQueriesData<RevisionRow[]>({ queryKey: ["revisions"] });
      listQueries.forEach(([key, data]) => {
        if (data) qc.setQueryData(key, data.map((r) => r.id === id ? { ...r, ...patch } : r));
      });
      const prevSingle = qc.getQueryData<RevisionRow>(["revision", id]);
      if (prevSingle) qc.setQueryData(["revision", id], { ...prevSingle, ...patch });
      return { listQueries, prevSingle };
    },
    onError: (_, { id }, ctx) => {
      ctx?.listQueries.forEach(([key, data]) => qc.setQueryData(key, data));
      if (ctx?.prevSingle) qc.setQueryData(["revision", id], ctx.prevSingle);
    },
    onSettled: (result) => {
      if (!result) return;
      qc.invalidateQueries({ queryKey: ["revisions", result.project_id] });
      qc.invalidateQueries({ queryKey: ["revision", result.id] });
    },
  });
}
