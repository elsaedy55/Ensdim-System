"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import {
  getMyInvoices,
  getInvoiceById,
  getFinancialSummary,
  markInvoiceAsSeen,
  uploadPaymentProofAndUpdateInvoice,
} from "@/lib/services/invoices.service";

export function useMyInvoices() {
  return useQuery({
    queryKey:  ["invoices"],
    queryFn:   getMyInvoices,
    staleTime: STALE_TIME.LONG,
  });
}

export function useInvoice(id: string | undefined) {
  return useQuery({
    queryKey:  ["invoice", id],
    queryFn:   () => getInvoiceById(id!),
    enabled:   !!id,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useFinancialSummary() {
  return useQuery({
    queryKey:  ["financial-summary"],
    queryFn:   getFinancialSummary,
    staleTime: STALE_TIME.LONG,
  });
}

export function useMarkInvoiceSeen() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markInvoiceAsSeen(id),
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
      uploadPaymentProofAndUpdateInvoice(invoiceId, file),
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["invoice", result.id] });
      qc.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
