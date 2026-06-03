import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ⚠️ DEV ONLY — Creates a complete demo admin account with seeded data
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY not configured" }, { status: 500 });
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const ADMIN_EMAIL    = "admin@demo.ensdim.com";
  const ADMIN_PASSWORD = "Admin@123456";
  const CLIENT_EMAIL   = "client@demo.ensdim.com";
  const CLIENT_PASSWORD = "Client@123456";

  try {
    // ── Delete existing demo users if any ─────────────────────────
    const { data: { users } } = await db.auth.admin.listUsers();
    for (const email of [ADMIN_EMAIL, CLIENT_EMAIL]) {
      const existing = users.find((u) => u.email === email);
      if (existing) await db.auth.admin.deleteUser(existing.id);
    }

    // ── Create admin user (trigger auto-creates workspace + profile) ─
    const { data: adminData, error: adminErr } = await db.auth.admin.createUser({
      email:         ADMIN_EMAIL,
      password:      ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name:                "Ahmed Admin",
        role:                "admin",
        workspace_name:      "Demo Agency",
        onboarding_complete: true,
      },
    });
    if (adminErr) throw new Error("Create admin failed: " + adminErr.message);

    const adminId = adminData.user.id;

    // ── Wait for trigger to create workspace + profile ─────────────
    await new Promise((r) => setTimeout(r, 800));

    const { data: adminProfile } = await db
      .from("profiles").select("workspace_id").eq("id", adminId).single();
    if (!adminProfile?.workspace_id) throw new Error("Admin profile/workspace not created by trigger");

    const workspaceId = adminProfile.workspace_id;

    // ── Create client user linked to same workspace ────────────────
    const { data: clientData, error: clientErr } = await db.auth.admin.createUser({
      email:         CLIENT_EMAIL,
      password:      CLIENT_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name:                "Mohamed Hassan",
        role:                "client",
        workspace_id:        workspaceId,
        onboarding_complete: true,
      },
    });
    if (clientErr) throw new Error("Create client failed: " + clientErr.message);

    const clientId = clientData.user.id;
    await new Promise((r) => setTimeout(r, 400));

    // ── Seed default roles ─────────────────────────────────────────
    await db.rpc("seed_default_roles", { p_workspace_id: workspaceId }).maybeSingle();

    // ── Create demo project ────────────────────────────────────────
    const { data: project } = await db.from("projects").insert({
      workspace_id:    workspaceId,
      client_id:       clientId,
      name:            "E-Commerce Platform",
      description:     "A full-featured e-commerce platform including product catalog, shopping cart, checkout, order management, and admin dashboard.",
      status:          "development",
      health:          "on_track",
      progress:        68,
      start_date:      "2026-01-15",
      target_delivery: "2026-03-30",
    }).select().single();

    const projectId = project!.id;
    await db.from("project_members").insert({ project_id: projectId, profile_id: adminId });

    // ── Milestones ─────────────────────────────────────────────────
    const milestoneRows = await Promise.all([
      db.from("milestones").insert({ project_id: projectId, name: "Phase 1: Discovery & Planning",  description: "Requirements gathering and scope definition.", status: "approved",    progress: 100, due_date: "2026-01-15", start_date: "2026-01-01", completed_at: "2026-01-13T10:00:00Z", order: 0 }).select().single(),
      db.from("milestones").insert({ project_id: projectId, name: "Phase 2: UI/UX Design",          description: "Complete design system, wireframes, and prototypes.",               status: "review",      progress: 100, due_date: "2026-02-05", start_date: "2026-01-16", completed_at: null,                  order: 1 }).select().single(),
      db.from("milestones").insert({ project_id: projectId, name: "Phase 3: Frontend Development",  description: "Building all React components and API integrations.",                status: "in_progress", progress: 68,  due_date: "2026-03-10", start_date: "2026-02-06", completed_at: null,                  order: 2 }).select().single(),
      db.from("milestones").insert({ project_id: projectId, name: "Phase 4: Testing & QA",          description: "End-to-end testing and bug fixes.",                                 status: "pending",     progress: 0,   due_date: "2026-03-20", start_date: null,           completed_at: null,                  order: 3 }).select().single(),
      db.from("milestones").insert({ project_id: projectId, name: "Phase 5: Final Delivery",        description: "Deployment and project closure.",                                   status: "pending",     progress: 0,   due_date: "2026-03-30", start_date: null,           completed_at: null,                  order: 4 }).select().single(),
    ]);
    const mids = milestoneRows.map((r) => r.data!.id);

    // ── Files ──────────────────────────────────────────────────────
    await db.from("files").insert([
      { project_id: projectId, milestone_id: mids[1], name: "Figma_Design_v2.fig",       storage_path: "demo/design/figma.fig",   size: 89128960,  mime_type: "application/octet-stream", category: "design",        uploaded_by: adminId },
      { project_id: projectId, milestone_id: mids[1], name: "Component_Library.fig",     storage_path: "demo/design/comp.fig",    size: 44040192,  mime_type: "application/octet-stream", category: "design",        uploaded_by: adminId },
      { project_id: projectId, milestone_id: mids[1], name: "Wireframes_Mobile.pdf",     storage_path: "demo/design/wire.pdf",    size: 8388608,   mime_type: "application/pdf",          category: "design",        uploaded_by: adminId },
      { project_id: projectId, milestone_id: null,    name: "API_Documentation.pdf",     storage_path: "demo/docs/api.pdf",       size: 3355443,   mime_type: "application/pdf",          category: "documentation", uploaded_by: adminId },
      { project_id: projectId, milestone_id: mids[2], name: "Source_Code_v1.zip",        storage_path: "demo/dev/code.zip",       size: 327155712, mime_type: "application/zip",          category: "development",   uploaded_by: adminId },
      { project_id: projectId, milestone_id: mids[2], name: "Dashboard_Screenshot.png",  storage_path: "demo/dev/screen.png",     size: 2202009,   mime_type: "image/png",                category: "development",   uploaded_by: adminId },
      { project_id: projectId, milestone_id: null,    name: "Admin_Login_Creds.pdf",      storage_path: "demo/creds/admin.pdf",    size: 524288,    mime_type: "application/pdf",          category: "credentials",   uploaded_by: adminId },
    ]);

    // ── Revisions ──────────────────────────────────────────────────
    await db.from("revisions").insert([
      { project_id: projectId, milestone_id: mids[1], title: "Login button not responding on iOS Safari",     description: "The login button is not clickable on iPhone 14 Pro, Safari 17. Steps: Open → Enter credentials → Tap Login → Nothing happens.",  category: "bug",      status: "in_progress", priority: "high",   submitted_by: clientId, assigned_to: adminId, team_response: "Identified — z-index conflict with iOS Safari touch handler. ETA 24 hours." },
      { project_id: projectId, milestone_id: mids[0], title: "Change hero section colors to match brand",     description: "Hero uses #6366f1 but brand spec is #4F46E5. Update: gradient, CTA button, hover states.",                                       category: "revision", status: "done",        priority: "medium", submitted_by: clientId, assigned_to: adminId, team_response: "Done! Colors updated across all breakpoints." },
      { project_id: projectId, milestone_id: null,    title: "Add dark mode support to the dashboard",        description: "Users requested dark mode. Would improve evening use experience.",                                                                category: "feature",  status: "open",        priority: "low",    submitted_by: clientId, assigned_to: null,    team_response: null },
    ]);

    // ── Invoices ───────────────────────────────────────────────────
    for (const inv of [
      { number: "INV-005", status: "paid",  total: 3000, subtotal: 3000, issue: "2026-01-15", due: "2026-01-30", paid: "2026-01-28T12:00:00Z", note: "Phase 1 payment",         lines: [{ desc: "Phase 1: Discovery & Planning",    qty: 1, price: 3000, total: 3000 }] },
      { number: "INV-006", status: "paid",  total: 2600, subtotal: 2600, issue: "2026-02-05", due: "2026-02-20", paid: "2026-02-18T10:00:00Z", note: "Phase 2 payment",         lines: [{ desc: "Phase 2: UI/UX Design",              qty: 1, price: 2600, total: 2600 }] },
      { number: "INV-007", status: "sent",  total: 2400, subtotal: 2400, issue: "2026-02-10", due: "2026-03-01", paid: null,                   note: "Phase 3 payment",         lines: [{ desc: "Phase 3: Frontend Development",     qty: 1, price: 2000, total: 2000 }, { desc: "UI Testing & QA", qty: 1, price: 400, total: 400 }] },
    ]) {
      const { data: invoiceRow } = await db.from("invoices").insert({
        project_id: projectId, client_id: clientId, invoice_number: inv.number,
        status: inv.status, subtotal: inv.subtotal, discount: 0, vat_rate: 0, vat_amount: 0,
        total: inv.total, currency: "USD", issue_date: inv.issue, due_date: inv.due,
        paid_at: inv.paid, notes: inv.note,
      }).select().single();
      for (const l of inv.lines) {
        await db.from("invoice_line_items").insert({ invoice_id: invoiceRow!.id, description: l.desc, quantity: l.qty, unit_price: l.price, total: l.total });
      }
    }

    // ── Kanban Tasks ───────────────────────────────────────────────
    await db.from("tasks").insert([
      { workspace_id: workspaceId, project_id: projectId, created_by: adminId, title: "Fix iOS Safari login bug",           type: "bug",     status: "in_progress", priority: "high",   assignee_id: adminId, due_date: "2026-02-12", order: 0 },
      { workspace_id: workspaceId, project_id: projectId, created_by: adminId, title: "Design checkout flow (mobile)",      type: "design",  status: "review",      priority: "high",   assignee_id: adminId, due_date: "2026-02-10", order: 1 },
      { workspace_id: workspaceId, project_id: projectId, created_by: adminId, title: "Implement product search API",       type: "feature", status: "todo",        priority: "medium", assignee_id: adminId, due_date: "2026-02-20", order: 2 },
      { workspace_id: workspaceId, project_id: projectId, created_by: adminId, title: "Setup CI/CD pipeline",              type: "other",   status: "done",        priority: "medium", assignee_id: adminId, due_date: "2026-02-05", order: 3 },
      { workspace_id: workspaceId, project_id: projectId, created_by: adminId, title: "Performance audit — homepage",      type: "review",  status: "todo",        priority: "low",    assignee_id: null,    due_date: "2026-02-25", order: 4 },
      { workspace_id: workspaceId, project_id: projectId, created_by: adminId, title: "Write API documentation",           type: "other",   status: "blocked",     priority: "medium", assignee_id: adminId, due_date: "2026-02-18", order: 5 },
    ]);

    // ── Notifications for client ───────────────────────────────────
    await db.from("notifications").insert([
      { user_id: clientId, type: "milestone_review", title: "Phase 2 is ready for your review",   body: "The team completed the design phase. Please review and approve.", link: `/milestones/${mids[1]}`, is_read: false },
      { user_id: clientId, type: "invoice_sent",     title: "New Invoice — INV-007 ($2,400)",      body: "Due: March 1, 2026. Please review and arrange payment.",            link: `/payments`,               is_read: false },
      { user_id: clientId, type: "file_uploaded",    title: "3 new design files uploaded",         body: "Figma, Component Library, and Wireframes added to Phase 2.",        link: `/files`,                  is_read: true  },
      { user_id: clientId, type: "approval_complete",title: "Phase 1 approved — thank you!",       body: "Phase 1: Discovery has been approved. Moving to Phase 2.",          link: `/milestones/${mids[0]}`,  is_read: true  },
    ]);

    // ── Activity logs ──────────────────────────────────────────────
    await db.from("activity_logs").insert([
      { project_id: projectId, user_id: adminId, message: "approved Phase 1 milestone" },
      { project_id: projectId, user_id: adminId, message: "uploaded 3 design files to Phase 2" },
      { project_id: projectId, user_id: adminId, message: "sent Invoice #INV-007 to client" },
      { project_id: projectId, user_id: clientId, message: "submitted a revision request" },
      { project_id: projectId, user_id: adminId, message: "marked Phase 2 as Ready for Review" },
    ]);

    return NextResponse.json({
      success: true,
      admin: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
      client: { email: CLIENT_EMAIL, password: CLIENT_PASSWORD },
      data: {
        workspace:  "Demo Agency",
        project:    "E-Commerce Platform",
        milestones: 5,
        files:      7,
        revisions:  3,
        invoices:   3,
        tasks:      6,
      },
      note: "✅ Log in as admin or client to see the full demo",
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Seed failed" },
      { status: 500 },
    );
  }
}
