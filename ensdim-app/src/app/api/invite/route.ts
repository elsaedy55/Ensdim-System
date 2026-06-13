import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, role = "client", workspaceName, company } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Verify the calling user is authenticated and is a team member
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: callerProfile } = await supabase
      .from("profiles")
      .select("workspace_id, role")
      .eq("id", user.id)
      .single();

    if (!callerProfile || callerProfile.role === "client") {
      return NextResponse.json({ error: "Only team members can invite users" }, { status: 403 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY not configured in .env.local" },
        { status: 500 },
      );
    }

    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    // The redirectTo URL lands the invited user on the "set password" page
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${request.headers.get("host")}`);

    // (auth) is a Next.js route group — the actual URL path is /accept-invite
    const redirectTo = `${appUrl}/accept-invite`;

    const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: {
        name,
        role,
        workspace_id:   callerProfile.workspace_id,
        workspace_name: workspaceName ?? null,
        company:        company ?? null,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, userId: data.user?.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
