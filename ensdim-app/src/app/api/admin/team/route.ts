import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
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
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: members, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("workspace_id", callerProfile.workspace_id)
      .neq("role", "client")
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey || !members?.length) {
      return NextResponse.json({ members: (members ?? []).map((m) => ({ ...m, pending: false })) });
    }

    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const pendingIds = new Set<string>();
    let page = 1;
    for (;;) {
      const { data: page$, error: listError } = await adminClient.auth.admin.listUsers({ page, perPage: 200 });
      if (listError || !page$?.users.length) break;
      for (const u of page$.users) {
        if (!u.email_confirmed_at) pendingIds.add(u.id);
      }
      if (page$.users.length < 200) break;
      page += 1;
    }

    const withStatus = members.map((m) => ({ ...m, pending: pendingIds.has(m.id) }));
    return NextResponse.json({ members: withStatus });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
