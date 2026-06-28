import { createClient } from "@/lib/supabase/client";
import type { InquiryRow } from "@/lib/supabase/types";
import { notifyNewInquiry } from "@/lib/services/notify.service";

export type Inquiry = InquiryRow;
export type InquiryStatus = InquiryRow["status"];

// ─── Fetch all (admin) ────────────────────────────────────────────

export async function getAllInquiries(): Promise<Inquiry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
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

// ─── Create (client dashboard "contact us" / new project request) ─

export async function createClientInquiry(
  message: string,
  profile: { name: string; phone: string | null; email: string | null; company: string | null; workspace_id: string },
  fallbackEmail: string | null,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("inquiries").insert({
    type:          "contact",
    name:          profile.name ?? "",
    whatsapp:      profile.phone ?? "",
    email:         profile.email ?? fallbackEmail ?? null,
    company:       profile.company ?? null,
    message,
    source_page:   "client_dashboard",
    interest_type: "new_project",
  });
  if (error) throw new Error(error.message);

  if (profile.workspace_id) {
    await notifyNewInquiry(supabase, profile.workspace_id, profile.name ?? "عميل");
  }
}
