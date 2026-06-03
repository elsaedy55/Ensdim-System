import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

// ⚠️ DEV ONLY — Remove or protect before production deployment
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY not configured" }, { status: 500 });
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  try {
    // ── Get admin's workspace ──────────────────────────────────────
    const { data: adminProfile } = await adminClient
      .from("profiles").select("workspace_id, name").eq("id", user.id).single();
    if (!adminProfile?.workspace_id) {
      return NextResponse.json({ error: "Admin has no workspace. Complete onboarding first." }, { status: 400 });
    }
    const workspaceId = adminProfile.workspace_id;

    // ── Get or create test client ──────────────────────────────────
    const TEST_CLIENT_EMAIL = "client@test.ensdim.com";
    let clientId: string;

    const existingUsers = await adminClient.auth.admin.listUsers();
    const existingClient = existingUsers.data?.users.find((u) => u.email === TEST_CLIENT_EMAIL);

    if (existingClient) {
      clientId = existingClient.id;
      // Ensure profile exists and is linked to this workspace
      await adminClient.from("profiles").upsert({
        id: clientId, workspace_id: workspaceId,
        name: "Mohamed Hassan", role: "client", client_status: "active",
      }, { onConflict: "id" });
    } else {
      const { data: newUser } = await adminClient.auth.admin.createUser({
        email: TEST_CLIENT_EMAIL, password: "Test@123456", email_confirm: true,
        user_metadata: { name: "Mohamed Hassan", role: "client", workspace_id: workspaceId, onboarding_complete: true },
      });
      clientId = newUser.user!.id;
    }

    // ── Clean up old demo data ─────────────────────────────────────
    const { data: existingProjects } = await adminClient
      .from("projects").select("id").eq("workspace_id", workspaceId).eq("name", "E-Commerce Platform");
    if (existingProjects && existingProjects.length > 0) {
      for (const p of existingProjects) {
        await adminClient.from("projects").delete().eq("id", p.id);
      }
    }

    // ── Create demo project ────────────────────────────────────────
    const { data: project } = await adminClient.from("projects").insert({
      workspace_id:    workspaceId,
      client_id:       clientId,
      name:            "E-Commerce Platform",
      description:     "A full-featured e-commerce platform including product catalog, shopping cart, checkout, order management, and admin dashboard. Built with React and Node.js.",
      status:          "development",
      health:          "on_track",
      progress:        68,
      start_date:      "2026-01-15",
      target_delivery: "2026-03-30",
    }).select().single();

    const projectId = project!.id;

    // ── Add admin to project team ──────────────────────────────────
    await adminClient.from("project_members").upsert(
      { project_id: projectId, profile_id: user.id },
      { onConflict: "project_id,profile_id" }
    );

    // ── Create milestones ─────────────────────────────────────────
    const MILESTONES = [
      { name: "Phase 1: Discovery & Planning", description: "Requirements gathering, user research, and project scope definition.", status: "approved",    progress: 100, due_date: "2026-01-15", start_date: "2026-01-01", completed_at: "2026-01-13T10:00:00Z", order: 0 },
      { name: "Phase 2: UI/UX Design",          description: "Complete design system, wireframes, prototypes, and user flows.",             status: "review",      progress: 100, due_date: "2026-02-05", start_date: "2026-01-16", completed_at: null,                  order: 1 },
      { name: "Phase 3: Frontend Development",  description: "Building all React components, pages, and integrating APIs.",                status: "in_progress", progress: 68,  due_date: "2026-03-10", start_date: "2026-02-06", completed_at: null,                  order: 2 },
      { name: "Phase 4: Testing & QA",          description: "End-to-end testing, bug fixes, and performance optimization.",               status: "pending",     progress: 0,   due_date: "2026-03-20", start_date: null,           completed_at: null,                  order: 3 },
      { name: "Phase 5: Final Delivery",        description: "Deployment, documentation handoff, and project closure.",                   status: "pending",     progress: 0,   due_date: "2026-03-30", start_date: null,           completed_at: null,                  order: 4 },
    ];

    const milestoneIds: string[] = [];
    for (const m of MILESTONES) {
      const { data: milestone } = await adminClient.from("milestones").insert({
        project_id: projectId, ...m,
      }).select().single();
      milestoneIds.push(milestone!.id);
    }

    // ── Upload demo files (DB records only — no actual storage files) ──
    const FILES = [
      { name: "UI_Design_v2.fig",           storage_path: "demo/design/figma.fig",   size: 89128960,  mime_type: "application/octet-stream", category: "design",        milestone_id: milestoneIds[1] },
      { name: "Component_Library.fig",      storage_path: "demo/design/comp.fig",    size: 44040192,  mime_type: "application/octet-stream", category: "design",        milestone_id: milestoneIds[1] },
      { name: "Wireframes_Mobile.pdf",      storage_path: "demo/design/wire.pdf",    size: 8388608,   mime_type: "application/pdf",          category: "design",        milestone_id: milestoneIds[1] },
      { name: "API_Documentation.pdf",      storage_path: "demo/docs/api.pdf",       size: 3355443,   mime_type: "application/pdf",          category: "documentation", milestone_id: null },
      { name: "Technical_Specs.pdf",        storage_path: "demo/docs/specs.pdf",     size: 1887437,   mime_type: "application/pdf",          category: "documentation", milestone_id: null },
      { name: "Source_Code_v1.zip",         storage_path: "demo/dev/code.zip",       size: 327155712, mime_type: "application/zip",          category: "development",   milestone_id: milestoneIds[2] },
      { name: "Dashboard_Screenshot.png",   storage_path: "demo/dev/screen.png",     size: 2202009,   mime_type: "image/png",                category: "development",   milestone_id: milestoneIds[2] },
    ];

    for (const f of FILES) {
      await adminClient.from("files").insert({
        project_id: projectId, uploaded_by: user.id, ...f,
      });
    }

    // ── Create revisions ───────────────────────────────────────────
    const REVISIONS = [
      {
        title: "Login button not responding on iOS Safari",
        description: "The login button on the main authentication page is not clickable on iOS Safari (tested on iPhone 14 Pro, Safari 17). Steps: Open app → Enter credentials → Tap Login → Nothing happens.",
        category: "bug", status: "in_progress", priority: "high",
        submitted_by: clientId, assigned_to: user.id, milestone_id: milestoneIds[1],
        team_response: "We've identified the issue — it's a z-index conflict with the iOS Safari touch handler. ETA: 24 hours.",
      },
      {
        title: "Change hero section colors to match brand guidelines",
        description: "The hero section uses #6366f1 (default) but brand guidelines specify #4F46E5. Please update: hero gradient, CTA button, hover states.",
        category: "revision", status: "done", priority: "medium",
        submitted_by: clientId, assigned_to: user.id, milestone_id: milestoneIds[0],
        team_response: "Done! Colors updated across all breakpoints.",
      },
      {
        title: "Add dark mode support to the dashboard",
        description: "Many users have requested dark mode support. It would improve the experience for evening use.",
        category: "feature", status: "open", priority: "low",
        submitted_by: clientId, assigned_to: null, milestone_id: null,
        team_response: null,
      },
    ];

    for (const r of REVISIONS) {
      await adminClient.from("revisions").insert({
        project_id: projectId, ...r,
      });
    }

    // ── Create invoices ────────────────────────────────────────────
    const INVOICES = [
      {
        invoice_number: "INV-005",
        status: "paid", subtotal: 3000, discount: 0, vat_rate: 0, vat_amount: 0, total: 3000,
        issue_date: "2026-01-15", due_date: "2026-01-30", paid_at: "2026-01-28T12:00:00Z",
        currency: "USD", notes: "Phase 1 payment — Discovery & Planning",
        line_items: [{ description: "Phase 1: Discovery & Planning", quantity: 1, unit_price: 3000, total: 3000 }],
      },
      {
        invoice_number: "INV-006",
        status: "paid", subtotal: 2600, discount: 0, vat_rate: 0, vat_amount: 0, total: 2600,
        issue_date: "2026-02-05", due_date: "2026-02-20", paid_at: "2026-02-18T10:00:00Z",
        currency: "USD", notes: "Phase 2 payment — UI/UX Design",
        line_items: [{ description: "Phase 2: UI/UX Design", quantity: 1, unit_price: 2600, total: 2600 }],
      },
      {
        invoice_number: "INV-007",
        status: "sent", subtotal: 2400, discount: 0, vat_rate: 0, vat_amount: 0, total: 2400,
        issue_date: "2026-02-10", due_date: "2026-03-01", paid_at: null,
        currency: "USD", notes: "Phase 3 payment — Frontend Development",
        line_items: [
          { description: "Phase 3: Frontend Development", quantity: 1, unit_price: 2000, total: 2000 },
          { description: "UI Testing & QA",               quantity: 1, unit_price: 400,  total: 400 },
        ],
      },
    ];

    for (const inv of INVOICES) {
      const { data: invoice } = await adminClient.from("invoices").insert({
        project_id:     projectId,
        client_id:      clientId,
        invoice_number: inv.invoice_number,
        status:         inv.status,
        subtotal:       inv.subtotal,
        discount:       inv.discount,
        vat_rate:       inv.vat_rate,
        vat_amount:     inv.vat_amount,
        total:          inv.total,
        issue_date:     inv.issue_date,
        due_date:       inv.due_date,
        paid_at:        inv.paid_at,
        currency:       inv.currency,
        notes:          inv.notes,
      }).select().single();

      for (const item of inv.line_items) {
        await adminClient.from("invoice_line_items").insert({
          invoice_id: invoice!.id, ...item,
        });
      }
    }

    // ── Create notifications for client ────────────────────────────
    const NOTIFICATIONS = [
      { type: "milestone_review", title: "Phase 2: UI/UX Design is ready for review", body: "The team has completed the design phase. Please review the deliverables and approve.", link: `/milestones/${milestoneIds[1]}`, is_read: false },
      { type: "invoice_sent",     title: "New Invoice — INV-007",                      body: "Invoice #INV-007 for $2,400 has been sent. Due date: March 1, 2026.",               link: `/payments`,                     is_read: false },
      { type: "file_uploaded",    title: "3 new files uploaded to Phase 2",            body: "Ahmed uploaded 3 design files: Figma, Component Library, Wireframes.",              link: `/files`,                        is_read: true },
      { type: "approval_complete",title: "Phase 1 approved — thank you!",              body: "Phase 1: Discovery & Planning has been approved. The team is moving to Phase 2.",   link: `/milestones/${milestoneIds[0]}`, is_read: true },
    ];

    for (const n of NOTIFICATIONS) {
      await adminClient.from("notifications").insert({ user_id: clientId, ...n });
    }

    // ── Create tasks ───────────────────────────────────────────────
    const TASKS = [
      { title: "Fix iOS Safari login button bug",   type: "bug",     status: "in_progress", priority: "high",   assignee_id: user.id, due_date: "2026-02-12" },
      { title: "Design checkout flow (mobile)",     type: "design",  status: "review",      priority: "high",   assignee_id: user.id, due_date: "2026-02-10" },
      { title: "Implement product search API",       type: "feature", status: "todo",        priority: "medium", assignee_id: user.id, due_date: "2026-02-20" },
      { title: "Setup CI/CD pipeline",              type: "other",   status: "done",        priority: "medium", assignee_id: user.id, due_date: "2026-02-05" },
      { title: "Performance audit — homepage LCP",  type: "review",  status: "todo",        priority: "low",    assignee_id: null,    due_date: "2026-02-25" },
      { title: "Write API documentation",           type: "other",   status: "blocked",     priority: "medium", assignee_id: user.id, due_date: "2026-02-18" },
    ];

    for (let i = 0; i < TASKS.length; i++) {
      const task = TASKS[i];
      await adminClient.from("tasks").insert({
        workspace_id: workspaceId,
        project_id:   projectId,
        created_by:   user.id,
        order:        i,
        description:  null,
        milestone_id: null,
        ...task,
      });
    }

    // ── Activity logs ─────────────────────────────────────────────
    const ACTIVITIES = [
      { message: "approved Phase 1 milestone",                    entity_type: "milestone", entity_id: milestoneIds[0] },
      { message: "uploaded 3 design files to Phase 2",            entity_type: "milestone", entity_id: milestoneIds[1] },
      { message: "Invoice #INV-007 sent to client",               entity_type: "invoice",   entity_id: null },
      { message: "submitted a new revision request",              entity_type: "revision",  entity_id: null },
      { message: "marked Phase 2 as Ready for Client Review",     entity_type: "milestone", entity_id: milestoneIds[1] },
      { message: "created task: Fix iOS Safari login button bug",  entity_type: "task",      entity_id: null },
    ];

    for (const log of ACTIVITIES) {
      await adminClient.from("activity_logs").insert({
        project_id: projectId, user_id: user.id, ...log,
      });
    }

    return NextResponse.json({
      success: true,
      summary: {
        workspace:     workspaceId,
        project:       "E-Commerce Platform",
        projectId,
        milestones:    MILESTONES.length,
        files:         FILES.length,
        revisions:     REVISIONS.length,
        invoices:      INVOICES.length,
        tasks:         TASKS.length,
        notifications: NOTIFICATIONS.length,
        testClient: {
          email:    TEST_CLIENT_EMAIL,
          password: "Test@123456",
        },
      },
    });
  } catch (err: unknown) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Seed failed" },
      { status: 500 },
    );
  }
}
