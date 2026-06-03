import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

// ⚠️ DEV ONLY — Remove or protect in production
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY not set in .env.local" },
      { status: 500 },
    );
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  // Get workspace_id from the first workspace in the DB
  const { data: workspaces } = await adminClient
    .from("workspaces")
    .select("id, name")
    .limit(1)
    .single();

  if (!workspaces) {
    return NextResponse.json(
      { error: "No workspace found. Register as admin first via /register." },
      { status: 400 },
    );
  }

  const TEST_EMAIL    = "client@test.ensdim.com";
  const TEST_PASSWORD = "Test@123456";

  // Delete existing test user if any (clean re-seed)
  const { data: existing } = await adminClient.auth.admin.listUsers();
  const existingUser = existing?.users.find((u) => u.email === TEST_EMAIL);
  if (existingUser) {
    await adminClient.auth.admin.deleteUser(existingUser.id);
  }

  // Create test client user (email already confirmed, no invitation needed)
  const { data, error } = await adminClient.auth.admin.createUser({
    email:          TEST_EMAIL,
    password:       TEST_PASSWORD,
    email_confirm:  true,     // skip email verification
    user_metadata: {
      name:         "Test Client",
      role:         "client",
      workspace_id: workspaces.id,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    workspace: workspaces.name,
    credentials: {
      email:    TEST_EMAIL,
      password: TEST_PASSWORD,
    },
    userId: data.user?.id,
    note: "Profile auto-created by DB trigger. Ready to login.",
  });
}
