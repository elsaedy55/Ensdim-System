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

type ResearchArticle = Awaited<ReturnType<typeof getAllResearchArticles>>[number];

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
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<ResearchArticle[]>([KEY]);
      qc.setQueryData([KEY], prevList?.map((a) => a.id === id ? { ...a, ...input } : a));
      const prevSingle = qc.getQueryData<ResearchArticle>([KEY, id]);
      if (prevSingle) qc.setQueryData([KEY, id], { ...prevSingle, ...input });
      return { prevList, prevSingle };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.prevList) qc.setQueryData([KEY], ctx.prevList);
      if (ctx?.prevSingle) qc.setQueryData([KEY, id], ctx.prevSingle);
    },
    onSettled: (_, __, { id }) => {
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
    onMutate: async ({ id, isPublished }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<ResearchArticle[]>([KEY]);
      qc.setQueryData([KEY], prevList?.map((a) => a.id === id ? { ...a, is_published: isPublished } : a));
      return { prevList };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevList) qc.setQueryData([KEY], ctx.prevList);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteResearchArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResearchArticle(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<ResearchArticle[]>([KEY]);
      qc.setQueryData([KEY], prevList?.filter((a) => a.id !== id));
      return { prevList };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevList) qc.setQueryData([KEY], ctx.prevList);
    },
    onSettled: () => {
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
