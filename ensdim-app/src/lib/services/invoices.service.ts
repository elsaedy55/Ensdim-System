import type { InvoiceRow, InvoiceLineItemRow, SupabaseClient } from "@/lib/supabase/types";

type Invoice         = InvoiceRow;
type InvoiceLineItem = InvoiceLineItemRow;

export interface InvoiceWithItems extends Invoice {
  line_items: InvoiceLineItem[];
  project: { name: string } | null;
}

export async function getMyInvoices(supabase: SupabaseClient, userId: string): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("invoices")
    .select("*, projects(name)")
    .eq("client_id", userId)
    .order("issue_date", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as Invoice[]) ?? [];
}

export async function getInvoiceById(supabase: SupabaseClient, id: string): Promise<InvoiceWithItems> {
  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      project:projects(name),
      line_items:invoice_line_items(*)
    `)
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as InvoiceWithItems;
}

export async function getFinancialSummary(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("total, status")
    .eq("client_id", userId);

  if (error) throw new Error(error.message);

  const invoices = data ?? [];
  const total     = invoices.reduce((s: number, i: { total: number; status: string }) => s + i.total, 0);
  const paid      = invoices.filter((i: { total: number; status: string }) => i.status === "paid").reduce((s: number, i: { total: number; status: string }) => s + i.total, 0);
  const remaining = total - paid;

  return { total, paid, remaining };
}

export async function markInvoiceAsSeen(supabase: SupabaseClient, id: string) {
  const { error } = await supabase
    .from("invoices")
    .update({ status: "viewed", updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "sent"); // only upgrade from "sent" to "viewed"
  if (error) throw new Error(error.message);
}

export async function uploadPaymentProofAndUpdateInvoice(
  supabase: SupabaseClient,
  invoiceId: string,
  file: File
): Promise<Invoice> {
  const { uploadPaymentProof } = await import("./files.service");
  const proofUrl = await uploadPaymentProof(invoiceId, file);

  const { data, error } = await supabase
    .from("invoices")
    .update({
      payment_proof_url: proofUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", invoiceId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
