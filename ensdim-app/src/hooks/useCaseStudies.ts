"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  toggleCaseStudyPublished,
  deleteCaseStudy,
  uploadCaseStudyImage,
  uploadCaseStudyGalleryImage,
  type UpsertCaseStudyInput,
} from "@/lib/services/case-studies.service";

const KEY = "case-studies";

type CaseStudy = Awaited<ReturnType<typeof getAllCaseStudies>>[number];

export function useCaseStudies() {
  return useQuery({
    queryKey:  [KEY],
    queryFn:   getAllCaseStudies,
    staleTime: 60 * 1000,
  });
}

export function useCaseStudy(id: string | undefined) {
  return useQuery({
    queryKey:  [KEY, id],
    queryFn:   () => getCaseStudyById(id!),
    enabled:   !!id,
    staleTime: 60 * 1000,
  });
}

export function useCreateCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpsertCaseStudyInput) => createCaseStudy(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUpdateCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<UpsertCaseStudyInput> }) =>
      updateCaseStudy(id, input),
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<CaseStudy[]>([KEY]);
      qc.setQueryData([KEY], prevList?.map((c) => c.id === id ? { ...c, ...input } : c));
      const prevSingle = qc.getQueryData<CaseStudy>([KEY, id]);
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

export function useToggleCaseStudyPublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      toggleCaseStudyPublished(id, isPublished),
    onMutate: async ({ id, isPublished }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<CaseStudy[]>([KEY]);
      qc.setQueryData([KEY], prevList?.map((c) => c.id === id ? { ...c, is_published: isPublished } : c));
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

export function useDeleteCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCaseStudy(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<CaseStudy[]>([KEY]);
      qc.setQueryData([KEY], prevList?.filter((c) => c.id !== id));
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

export function useUploadCaseStudyImage() {
  return useMutation({
    mutationFn: ({ caseStudyId, file }: { caseStudyId: string; file: File }) =>
      uploadCaseStudyImage(caseStudyId, file),
  });
}

export function useUploadCaseStudyGalleryImage() {
  return useMutation({
    mutationFn: ({ caseStudyId, file }: { caseStudyId: string; file: File }) =>
      uploadCaseStudyGalleryImage(caseStudyId, file),
  });
}
