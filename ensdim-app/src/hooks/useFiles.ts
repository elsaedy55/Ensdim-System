"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import {
  getFilesByProject,
  uploadProjectFile,
  createCredentialEntry,
  getSignedDownloadUrl,
  deleteFile,
} from "@/lib/services/files.service";
import type { FileRow } from "@/lib/supabase/types";
import { useUser } from "@/store/auth.store";

export function useFiles(projectId: string | undefined, category?: string) {
  return useQuery({
    queryKey:  ["files", projectId, category],
    queryFn:   () => getFilesByProject(projectId!, category),
    enabled:   !!projectId,
    staleTime: STALE_TIME.LONG,
  });
}

export function useSignedUrl(storagePath: string | undefined) {
  return useQuery({
    queryKey:  ["signed-url", storagePath],
    queryFn:   () => getSignedDownloadUrl(storagePath!),
    enabled:   !!storagePath,
    staleTime: 50 * 60 * 1000, // just under 1h (URL expires in 1h)
  });
}

export function useUploadFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadProjectFile,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["files", vars.projectId] });
    },
  });
}

export function useDeleteFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ fileId, storagePath, projectId }: { fileId: string; storagePath: string | null; projectId: string }) =>
      deleteFile(fileId, storagePath),
    onMutate: async ({ fileId, projectId }) => {
      await qc.cancelQueries({ queryKey: ["files", projectId] });
      const listQueries = qc.getQueriesData<FileRow[]>({ queryKey: ["files", projectId] });
      listQueries.forEach(([key, data]) => {
        if (data) qc.setQueryData(key, data.filter((f) => f.id !== fileId));
      });
      return { listQueries };
    },
    onError: (_, __, ctx) => {
      ctx?.listQueries.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["files", projectId] });
    },
  });
}

export function useCreateCredential() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: (params: { projectId: string; name: string; credentialData: Parameters<typeof createCredentialEntry>[0]["credentialData"] }) =>
      createCredentialEntry({ ...params, userId: userId! }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["files", vars.projectId] });
    },
  });
}
