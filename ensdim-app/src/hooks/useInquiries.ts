"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  createClientInquiry,
  type InquiryStatus,
} from "@/lib/services/inquiries.service";

const KEY = "inquiries";

export function useInquiries() {
  return useQuery({
    queryKey:  [KEY],
    queryFn:   getAllInquiries,
    staleTime: 60 * 1000,
  });
}

export function useUpdateInquiryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InquiryStatus }) =>
      updateInquiryStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInquiry(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useCreateClientInquiry() {
  return useMutation({
    mutationFn: (message: string) => createClientInquiry(message),
  });
}
