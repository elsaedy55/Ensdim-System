"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFilesByProject,
  uploadProjectFile,
  getSignedDownloadUrl,
  deleteFile,
} from "@/lib/services/files.service";

export function useFiles(projectId: string | undefined, category?: string) {
  return useQuery({
    queryKey:  ["files", projectId, category],
    queryFn:   () => getFilesByProject(projectId!, category),
    enabled:   !!projectId,
    staleTime: 2 * 60 * 1000,
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
    mutationFn: ({ fileId, storagePath, projectId }: { fileId: string; storagePath: string; projectId: string }) =>
      deleteFile(fileId, storagePath),
    onSuccess: (_, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["files", projectId] });
    },
  });
}
