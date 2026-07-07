import type { ProjectRow, MilestoneRow, FileRow, RevisionRow, InvoiceRow, SupabaseClient } from "@/lib/supabase/types";

// Notification text is stored as plain text (no i18n columns), so we write
// it in the app's default locale (Arabic).
const PROJECT_STATUS_LABELS_AR: Record<string, string> = {
  planning:    "تخطيط",
  ui_ux:       "تصميم UI/UX",
  development: "تطوير",
  review:      "جاهز للمراجعة",
  testing:     "اختبار",
  delivery:    "تسليم",
  maintenance: "صيانة",
  completed:   "مكتمل",
  on_hold:     "موقوف",
};

async function insertNotification(supabase: SupabaseClient, params: {
  userId: string;
  type: string;
  title: string;
  body: string;
  link?: string;
}): Promise<void> {
  try {
    await supabase.from("notifications").insert({
      user_id: params.userId,
      type:    params.type,
      title:   params.title,
      body:    params.body,
      link:    params.link ?? null,
    });
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
}

async function inAppPrefEnabled(supabase: SupabaseClient, userId: string, column: string): Promise<boolean> {
  const { data } = await supabase
    .from("notification_preferences")
    .select(column)
    .eq("user_id", userId)
    .maybeSingle();
  const value = (data as Record<string, unknown> | null)?.[column];
  return value !== false;
}

export async function getProjectClientInfo(
  supabase: SupabaseClient,
  projectId: string
): Promise<{ client_id: string; name: string } | null> {
  const { data } = await supabase
    .from("projects")
    .select("client_id, name")
    .eq("id", projectId)
    .maybeSingle();
  return data ?? null;
}

export async function notifyProjectStatusChanged(supabase: SupabaseClient, project: ProjectRow): Promise<void> {
  if (!project.client_id) return;
  const label = PROJECT_STATUS_LABELS_AR[project.status] ?? project.status;
  await insertNotification(supabase, {
    userId: project.client_id,
    type:   "system",
    title:  "تحديث حالة المشروع",
    body:   `تم تحديث حالة مشروع "${project.name}" إلى: ${label}`,
    link:   "/project",
  });
}

export async function notifyMilestoneReview(supabase: SupabaseClient, milestone: MilestoneRow): Promise<void> {
  const project = await getProjectClientInfo(supabase, milestone.project_id);
  if (!project) return;
  if (!(await inAppPrefEnabled(supabase, project.client_id, "in_app_milestone_review"))) return;

  await insertNotification(supabase, {
    userId: project.client_id,
    type:   "milestone_review",
    title:  "مرحلة جاهزة للمراجعة",
    body:   `مرحلة "${milestone.name}" في مشروع "${project.name}" جاهزة لمراجعتك والموافقة عليها`,
    link:   `/milestones/${milestone.id}`,
  });
}

export async function notifyFileUploaded(supabase: SupabaseClient, file: FileRow, uploaderId: string): Promise<void> {
  if (!file.project_id) return;
  const project = await getProjectClientInfo(supabase, file.project_id);
  if (!project || project.client_id === uploaderId) return;
  if (!(await inAppPrefEnabled(supabase, project.client_id, "in_app_file_uploaded"))) return;

  await insertNotification(supabase, {
    userId: project.client_id,
    type:   "file_uploaded",
    title:  "ملف جديد",
    body:   `تم رفع ملف "${file.name}" إلى مشروع "${project.name}"`,
    link:   "/files",
  });
}

export async function notifyRevisionResolved(supabase: SupabaseClient, revision: RevisionRow, actorId: string): Promise<void> {
  if (!revision.submitted_by || revision.submitted_by === actorId) return;
  if (!(await inAppPrefEnabled(supabase, revision.submitted_by, "in_app_revision_updated"))) return;

  const statusLabel = revision.status === "done" ? "تم الحل" : "مرفوض";
  await insertNotification(supabase, {
    userId: revision.submitted_by,
    type:   "revision_resolved",
    title:  "تم الرد على طلب المراجعة",
    body:   `تم تحديث حالة "${revision.title}" إلى: ${statusLabel}`,
    link:   `/revisions/${revision.id}`,
  });
}

export async function notifyNewInquiry(supabase: SupabaseClient, workspaceId: string, fromName: string): Promise<void> {
  const { data: staff } = await supabase
    .from("profiles")
    .select("id")
    .eq("workspace_id", workspaceId)
    .neq("role", "client");

  for (const member of staff ?? []) {
    await insertNotification(supabase, {
      userId: member.id,
      type:   "system",
      title:  "طلب تواصل جديد",
      body:   `${fromName} يرغب في بدء مشروع جديد`,
      link:   "/admin/inquiries",
    });
  }
}

export async function notifyInvoiceSent(supabase: SupabaseClient, invoice: InvoiceRow): Promise<void> {
  if (!(await inAppPrefEnabled(supabase, invoice.client_id, "in_app_invoice_sent"))) return;

  await insertNotification(supabase, {
    userId: invoice.client_id,
    type:   "invoice_sent",
    title:  "فاتورة جديدة",
    body:   `تم إرسال فاتورة رقم ${invoice.invoice_number} بقيمة ${invoice.total} ${invoice.currency}`,
    link:   `/payments/${invoice.id}`,
  });
}
