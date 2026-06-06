"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllResearchArticles,
  getResearchArticleById,
  createResearchArticle,
  updateResearchArticle,
  toggleResearchPublished,
  deleteResearchArticle,
  uploadResearchImage,
  type UpsertResearchInput,
} from "@/lib/services/research.service";

const KEY = "research-articles";

export function useResearchArticles() {
  return useQuery({
    queryKey:  [KEY],
    queryFn:   getAllResearchArticles,
    staleTime: 60 * 1000,
  });
}

export function useResearchArticle(id: string | undefined) {
  return useQuery({
    queryKey:  [KEY, id],
    queryFn:   () => getResearchArticleById(id!),
    enabled:   !!id,
    staleTime: 60 * 1000,
  });
}

export function useCreateResearchArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpsertResearchInput) => createResearchArticle(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUpdateResearchArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<UpsertResearchInput> }) =>
      updateResearchArticle(id, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useToggleResearchPublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      toggleResearchPublished(id, isPublished),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteResearchArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResearchArticle(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUploadResearchImage() {
  return useMutation({
    mutationFn: ({ articleId, file }: { articleId: string; file: File }) =>
      uploadResearchImage(articleId, file),
  });
}
