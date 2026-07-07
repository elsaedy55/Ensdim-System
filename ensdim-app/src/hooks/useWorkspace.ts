"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import { getWorkspace, updateWorkspace, type WorkspaceSettings } from "@/lib/services/workspace.service";
import { useWorkspaceId } from "@/store/auth.store";

export function useWorkspace() {
  const workspaceId = useWorkspaceId();
  return useQuery({
    queryKey:  ["workspace", workspaceId],
    queryFn:   () => getWorkspace(workspaceId!),
    enabled:   !!workspaceId,
    staleTime: STALE_TIME.VERY_LONG,
  });
}

export function useUpdateWorkspace() {
  const qc = useQueryClient();
  const workspaceId = useWorkspaceId();
  return useMutation({
    mutationFn: (updates: Partial<WorkspaceSettings>) => updateWorkspace(workspaceId!, updates),
    onMutate: async (updates) => {
      await qc.cancelQueries({ queryKey: ["workspace", workspaceId] });
      const prev = qc.getQueryData<WorkspaceSettings>(["workspace", workspaceId]);
      if (prev) qc.setQueryData(["workspace", workspaceId], { ...prev, ...updates });
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(["workspace", workspaceId], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["workspace", workspaceId] });
    },
  });
}
