"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import {
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  createClientInquiry,
  type InquiryStatus,
} from "@/lib/services/inquiries.service";
import { useUser, useProfile } from "@/store/auth.store";

const KEY = "inquiries";

export function useInquiries() {
  return useQuery({
    queryKey:  [KEY],
    queryFn:   getAllInquiries,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useUpdateInquiryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InquiryStatus }) =>
      updateInquiryStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prev = qc.getQueryData<Awaited<ReturnType<typeof getAllInquiries>>>([KEY]);
      qc.setQueryData(
        [KEY],
        prev?.map((i) => i.id === id ? { ...i, status } : i),
      );
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData([KEY], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInquiry(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prev = qc.getQueryData<Awaited<ReturnType<typeof getAllInquiries>>>([KEY]);
      qc.setQueryData([KEY], prev?.filter((i) => i.id !== id));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData([KEY], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useCreateClientInquiry() {
  const profile = useProfile();
  const email   = useUser()?.email ?? null;
  return useMutation({
    mutationFn: (message: string) => createClientInquiry(message, profile!, email),
  });
}
