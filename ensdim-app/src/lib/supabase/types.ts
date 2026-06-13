/**
 * Supabase Database type definitions.
 *
 * Once the project is deployed, regenerate with:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID \
 *     > src/lib/supabase/types.ts
 *
 * Until then, we use explicit row types for components and a flexible
 * Database interface for the Supabase client generic.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | "admin"
  | "project_manager"
  | "developer"
  | "designer"
  | "accountant"
  | "client";

// ─── Row shapes (used in components/hooks directly) ───────────────

export interface WorkspaceRow {
  id: string; name: string; logo_url: string | null; currency: string; created_at: string;
}
export type ClientStatus =
  | "lead" | "interested" | "proposal_sent"
  | "negotiation" | "active" | "completed" | "lost";

export interface ProfileRow {
  id: string; workspace_id: string; name: string; phone: string | null;
  avatar_url: string | null; role: UserRole; client_status: ClientStatus;
  banned_until: string | null; email: string | null; company: string | null;
  created_at: string; updated_at: string;
}
export interface ProjectRow {
  id: string; workspace_id: string; client_id: string; name: string;
  description: string | null; status: string; health: string; progress: number;
  start_date: string | null; target_delivery: string | null; created_at: string; updated_at: string;
  current_milestone_id: string | null;
}
export interface MilestoneRow {
  id: string; project_id: string; name: string; description: string | null;
  status: string; progress: number; due_date: string; start_date: string | null;
  completed_at: string | null; order: number; created_at: string; updated_at: string;
}
export interface FileRow {
  id: string; project_id: string | null; milestone_id: string | null; name: string;
  storage_path: string; size: number; mime_type: string; category: string;
  uploaded_by: string; created_at: string;
}
export interface RevisionRow {
  id: string; project_id: string; milestone_id: string | null; title: string;
  description: string; category: string; status: string; priority: string;
  submitted_by: string; assigned_to: string | null; team_response: string | null;
  created_at: string; updated_at: string;
}
export interface InvoiceRow {
  id: string; project_id: string; invoice_number: string; client_id: string;
  status: string; subtotal: number; discount: number; vat_rate: number;
  vat_amount: number; total: number; currency: string; issue_date: string;
  due_date: string; notes: string | null; payment_proof_url: string | null;
  paid_at: string | null; created_at: string; updated_at: string;
}
export interface InvoiceLineItemRow {
  id: string; invoice_id: string; description: string;
  quantity: number; unit_price: number; total: number;
}
export interface NotificationRow {
  id: string; user_id: string; type: string; title: string; body: string;
  is_read: boolean; link: string | null; created_at: string;
}
export interface NotificationPrefsRow {
  id: string; user_id: string;
  email_milestone_review: boolean; email_invoice_sent: boolean;
  email_file_uploaded: boolean; email_revision_updated: boolean; email_project_status: boolean;
  in_app_milestone_review: boolean; in_app_invoice_sent: boolean;
  in_app_file_uploaded: boolean; in_app_revision_updated: boolean;
}
export interface ActivityLogRow {
  id: string; project_id: string | null; user_id: string; message: string;
  entity_type: string | null; entity_id: string | null; created_at: string;
}
export interface InquiryRow {
  id: string;
  type: "consultation" | "contact";
  status: "new" | "contacted" | "closed";
  name: string;
  whatsapp: string;
  email: string | null;
  company: string | null;
  role: string | null;
  country: string | null;
  challenge: string | null;
  budget: string | null;
  details: string | null;
  message: string | null;
  source_page: string | null;
  interest_type: string | null;
  clicked_item: string | null;
  language: string | null;
  created_at: string;
  updated_at: string;
}
export interface ResearchArticleRow {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  category_en: string;
  category_ar: string;
  description_en: string;
  description_ar: string;
  content_en: string;
  content_ar: string;
  read_time: number;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
export interface BlogPostRow {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  category_en: string;
  category_ar: string;
  description_en: string;
  description_ar: string;
  content_en: string;
  content_ar: string;
  read_time: number;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Database type for Supabase client generic ─────────────────────

type TableDef<R extends object, I extends object = Partial<R>> = {
  Row: R;
  Insert: I;
  Update: Partial<R>;
  Relationships: never[];
};

export interface Database {
  public: {
    Tables: {
      workspaces:               TableDef<WorkspaceRow>;
      profiles:                 TableDef<ProfileRow, Omit<ProfileRow, "created_at" | "updated_at">>;
      projects:                 TableDef<ProjectRow>;
      project_members:          TableDef<{ project_id: string; profile_id: string }>;
      milestones:               TableDef<MilestoneRow>;
      files:                    TableDef<FileRow>;
      revisions:                TableDef<RevisionRow>;
      revision_attachments:     TableDef<{ id: string; revision_id: string; file_id: string }, { revision_id: string; file_id: string }>;
      invoices:                 TableDef<InvoiceRow>;
      invoice_line_items:       TableDef<InvoiceLineItemRow>;
      notifications:            TableDef<NotificationRow>;
      notification_preferences: TableDef<NotificationPrefsRow>;
      activity_logs:            TableDef<ActivityLogRow>;
      research_articles:        TableDef<ResearchArticleRow, Omit<ResearchArticleRow, "id" | "created_at" | "updated_at">>;
      blog_posts:               TableDef<BlogPostRow, Omit<BlogPostRow, "id" | "created_at" | "updated_at">>;
      inquiries:                TableDef<InquiryRow, Omit<InquiryRow, "id" | "created_at" | "updated_at">>;
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
