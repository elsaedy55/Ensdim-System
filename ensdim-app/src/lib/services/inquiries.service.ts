import { createClient } from "@/lib/supabase/client";
import type { InquiryRow } from "@/lib/supabase/types";

export type Inquiry = InquiryRow;
export type InquiryStatus = InquiryRow["status"];

// ─── Fetch all (admin) ────────────────────────────────────────────

export async function getAllInquiries(): Promise<Inquiry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Update status ────────────────────────────────────────────────

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Delete ───────────────────────────────────────────────────────

export async function deleteInquiry(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
