/**
 * Admin-only service methods.
 * All methods require an authenticated admin/team user.
 * RLS policies enforce workspace scoping automatically.
 */

import { createClient } from "@/lib/supabase/client";
import type {
  ProjectRow, MilestoneRow, FileRow, RevisionRow,
  InvoiceRow, InvoiceLineItemRow, ProfileRow, NotificationRow, ClientStatus,
} from "@/lib/supabase/types";

// ─── Types ────────────────────────────────────────────────────────

export interface ProjectWithClient extends ProjectRow {
  client: Pick<ProfileRow, "id" | "name" | "avatar_url"> | null;
}

export interface CreateProjectInput {
  name: string;
  client_id: string;
  description?: string;
  status?: string;
  health?: string;
  start_date?: string;
  target_delivery?: string;
}

export interface CreateMilestoneInput {
  project_id: string;
  name: string;
  description?: string;
  due_date: string;
  start_date?: string;
  order?: number;
}

export interface CreateInvoiceInput {
  project_id: string;
  client_id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  currency?: string;
  notes?: string;
  line_items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
  }>;
  vat_rate?: number;
}

// ═══════════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════════

export async function adminGetAllProjects(): Promise<ProjectWithClient[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, client:profiles!client_id(id, name, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ProjectWithClient[];
}

export async function adminCreateProject(input: CreateProjectInput): Promise<ProjectRow> {
  const supabase = createClient();

  // Get current user's workspace_id
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();

  if (!profile?.workspace_id) throw new Error("Workspace not found");

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...input,
      workspace_id: profile.workspace_id,
      status: input.status ?? "planning",
      health: input.health ?? "on_track",
      progress: 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminUpdateProject(
  id: string,
  updates: Partial<ProjectRow>
): Promise<ProjectRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteProject(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ═══════════════════════════════════════════════════════════════════
// MILESTONES
// ═══════════════════════════════════════════════════════════════════

export async function adminCreateMilestone(input: CreateMilestoneInput): Promise<MilestoneRow> {
  const supabase = createClient();

  // Auto-assign order (last + 1)
  const { count } = await supabase
    .from("milestones")
    .select("*", { count: "exact", head: true })
    .eq("project_id", input.project_id);

  const { data, error } = await supabase
    .from("milestones")
    .insert({
      ...input,
      status: "pending",
      progress: 0,
      order: input.order ?? (count ?? 0),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminUpdateMilestone(
  id: string,
  updates: Partial<MilestoneRow>
): Promise<MilestoneRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("milestones")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteMilestone(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("milestones").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function adminSetMilestoneStatus(
  id: string,
  status: string
): Promise<MilestoneRow> {
  const supabase = createClient();
  const updates: Partial<MilestoneRow> = { status, updated_at: new Date().toISOString() };
  if (status === "approved" || status === "completed") {
    updates.completed_at = new Date().toISOString();
  }
  const { data, error } = await supabase
    .from("milestones")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ═══════════════════════════════════════════════════════════════════
// CLIENTS
// ═══════════════════════════════════════════════════════════════════

export async function adminGetAllClients(): Promise<ProfileRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminUpdateClientStatus(
  clientId: string,
  status: ClientStatus,
): Promise<ProfileRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ client_status: status, updated_at: new Date().toISOString() })
    .eq("id", clientId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetClientById(id: string): Promise<ProfileRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetClientProjects(clientId: string): Promise<ProjectRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ═══════════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════════

export async function adminGetTeamMembers(): Promise<ProfileRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("role", "client")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ═══════════════════════════════════════════════════════════════════
// PROJECT MEMBERS
// ═══════════════════════════════════════════════════════════════════

export async function adminGetProjectMembers(projectId: string): Promise<ProfileRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project_members")
    .select("profiles(*)")
    .eq("project_id", projectId);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r: any) => r.profiles) as ProfileRow[];
}

export async function adminAddProjectMember(projectId: string, profileId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("project_members")
    .insert({ project_id: projectId, profile_id: profileId })
    .select();
  if (error && error.code !== "23505") throw new Error(error.message); // ignore duplicate
}

export async function adminRemoveProjectMember(projectId: string, profileId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("project_id", projectId)
    .eq("profile_id", profileId);
  if (error) throw new Error(error.message);
}

// ═══════════════════════════════════════════════════════════════════
// INVOICES (ADMIN)
// ═══════════════════════════════════════════════════════════════════

export async function adminGetInvoicesByProject(projectId: string): Promise<InvoiceRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminCreateInvoice(input: CreateInvoiceInput): Promise<InvoiceRow> {
  const supabase = createClient();

  const lineItems  = input.line_items;
  const subtotal   = lineItems.reduce((s: number, i: { quantity: number; unit_price: number }) => s + i.quantity * i.unit_price, 0);
  const vatRate    = input.vat_rate ?? 0;
  const vatAmount  = subtotal * (vatRate / 100);
  const total      = subtotal + vatAmount;

  // Create invoice
  const { data: invoice, error: invErr } = await supabase
    .from("invoices")
    .insert({
      project_id:     input.project_id,
      invoice_number: input.invoice_number,
      client_id:      input.client_id,
      status:         "draft",
      subtotal,
      discount:       0,
      vat_rate:       vatRate,
      vat_amount:     vatAmount,
      total,
      currency:       input.currency ?? "USD",
      issue_date:     input.issue_date,
      due_date:       input.due_date,
      notes:          input.notes,
    })
    .select()
    .single();

  if (invErr) throw new Error(invErr.message);

  // Create line items
  const { error: itemsErr } = await supabase.from("invoice_line_items").insert(
    lineItems.map((item) => ({
      invoice_id:  invoice.id,
      description: item.description,
      quantity:    item.quantity,
      unit_price:  item.unit_price,
      total:       item.quantity * item.unit_price,
    }))
  );

  if (itemsErr) throw new Error(itemsErr.message);
  return invoice;
}

export async function adminSendInvoice(id: string): Promise<InvoiceRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("invoices")
    .update({ status: "sent", updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminMarkInvoicePaid(id: string): Promise<InvoiceRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("invoices")
    .update({
      status:     "paid",
      paid_at:    new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN OVERVIEW KPIs
// ═══════════════════════════════════════════════════════════════════

export interface AdminKPIs {
  activeProjects:  number;
  activeClients:   number;
  monthlyRevenue:  number;
  delayedProjects: number;
  openRevisions:   number;
}

export async function adminGetKPIs(): Promise<AdminKPIs> {
  const supabase = createClient();

  const [projectsRes, clientsRes, revenueRes, revisionsRes] = await Promise.all([
    supabase.from("projects").select("id, status, health", { count: "exact" }),
    supabase.from("profiles").select("id", { count: "exact" }).eq("role", "client"),
    supabase
      .from("invoices")
      .select("total")
      .eq("status", "paid")
      .gte("paid_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase.from("revisions").select("id", { count: "exact" }).in("status", ["open", "in_review"]),
  ]);

  const projects = projectsRes.data ?? [];
  const activeProjects  = projects.filter((p: { status: string; health: string }) => p.status !== "completed" && p.status !== "on_hold").length;
  const delayedProjects = projects.filter((p: { status: string; health: string }) => p.health === "delayed").length;
  const monthlyRevenue  = (revenueRes.data ?? []).reduce((s: number, i: { total?: number }) => s + (i.total ?? 0), 0);

  return {
    activeProjects,
    activeClients:  clientsRes.count ?? 0,
    monthlyRevenue,
    delayedProjects,
    openRevisions:  revisionsRes.count ?? 0,
  };
}

// ═══════════════════════════════════════════════════════════════════
// NOTIFICATIONS (create by admin for clients)
// ═══════════════════════════════════════════════════════════════════

export async function adminSendNotification(params: {
  userId: string;
  type: string;
  title: string;
  body: string;
  link?: string;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("notifications").insert({
    user_id:    params.userId,
    type:       params.type,
    title:      params.title,
    body:       params.body,
    link:       params.link,
  });
  if (error) throw new Error(error.message);
}
