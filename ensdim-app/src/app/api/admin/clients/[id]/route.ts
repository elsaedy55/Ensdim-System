import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

// Ban durations accepted by Supabase Auth (auth.admin.updateUserById ban_duration)
const BAN_DURATIONS: Record<string, string> = {
  "1d":  "24h",
  "7d":  "168h",
  "30d": "720h",
  "permanent": "876000h", // ~100 years
};

async function getCallerProfile() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role === "client") return null;
  return profile;
}

function getAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY not configured in .env.local");

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

// ─── DELETE — permanently remove a client account ──────────────────

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const caller = await getCallerProfile();
    if (!caller) {
      return NextResponse.json({ error: "Only team members can delete clients" }, { status: 403 });
    }

    const { id } = await params;
    const adminClient = getAdminClient();

    const { error } = await adminClient.auth.admin.deleteUser(id);

    if (error) {
      // Postgres FK violation surfaces here when the client still has projects (on delete restrict)
      if (error.message.toLowerCase().includes("foreign key") || error.message.includes("23503")) {
        return NextResponse.json(
          { error: "Cannot delete this client because they still have projects. Delete or reassign their projects first." },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── PATCH — ban / unban a client account ───────────────────────────

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const caller = await getCallerProfile();
    if (!caller) {
      return NextResponse.json({ error: "Only team members can manage clients" }, { status: 403 });
    }

    const { id } = await params;
    const { action, duration } = await request.json();

    if (action !== "ban" && action !== "unban") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const adminClient = getAdminClient();

    let banDuration = "none";
    let bannedUntil: string | null = null;

    if (action === "ban") {
      const goTrueDuration = BAN_DURATIONS[duration];
      if (!goTrueDuration) {
        return NextResponse.json({ error: "Invalid ban duration" }, { status: 400 });
      }
      banDuration = goTrueDuration;
      bannedUntil = new Date(Date.now() + parseInt(goTrueDuration, 10) * 60 * 60 * 1000).toISOString();
    }

    const { error: authError } = await adminClient.auth.admin.updateUserById(id, {
      ban_duration: banDuration,
    });
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const { error: profileError } = await adminClient
      .from("profiles")
      .update({ banned_until: bannedUntil, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, banned_until: bannedUntil });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
