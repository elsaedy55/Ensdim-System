"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import { createClient } from "@/lib/supabase/client";
import {
  getMyInvoices,
  getInvoiceById,
  getFinancialSummary,
  markInvoiceAsSeen,
  uploadPaymentProofAndUpdateInvoice,
} from "@/lib/services/invoices.service";
import { useUser } from "@/store/auth.store";

export function useMyInvoices() {
  const userId = useUser()?.id;
  return useQuery({
    queryKey:  ["invoices", userId],
    queryFn:   () => getMyInvoices(createClient(), userId!),
    enabled:   !!userId,
    staleTime: STALE_TIME.LONG,
  });
}

export function useInvoice(id: string | undefined) {
  return useQuery({
    queryKey:  ["invoice", id],
    queryFn:   () => getInvoiceById(createClient(), id!),
    enabled:   !!id,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useFinancialSummary() {
  const userId = useUser()?.id;
  return useQuery({
    queryKey:  ["financial-summary", userId],
    queryFn:   () => getFinancialSummary(createClient(), userId!),
    enabled:   !!userId,
    staleTime: STALE_TIME.LONG,
  });
}

export function useMarkInvoiceSeen() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markInvoiceAsSeen(createClient(), id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["invoice", id] });
      qc.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useUploadPaymentProof() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ invoiceId, file }: { invoiceId: string; file: File }) =>
      uploadPaymentProofAndUpdateInvoice(createClient(), invoiceId, file),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["invoice", result.id] });
      qc.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
