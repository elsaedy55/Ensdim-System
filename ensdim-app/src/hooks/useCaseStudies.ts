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
    onSuccess: (_, { id }) => {
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteCaseStudy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCaseStudy(id),
    onSuccess: () => {
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
