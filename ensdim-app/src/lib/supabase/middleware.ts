import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session — IMPORTANT: do NOT remove.
  //
  // getClaims() (not getUser()) so that this automatically starts verifying
  // the JWT locally — no network round trip — the moment the Supabase
  // project is migrated to asymmetric signing keys (Dashboard → Settings →
  // API → JWT Keys → "Migrate to asymmetric keys"), with no further code
  // change needed. Until that migration happens, this project's keys are
  // still HS256 (symmetric), so the client library itself falls back to an
  // getUser()-equivalent network call every time — today this is neither
  // faster nor slower than the getUser() call it replaces.
  //
  // `data` (not just `.claims`) can be null here — e.g. no session at all —
  // so this can't destructure straight to `{ data: { claims } }` the way
  // getUser() destructures `{ data: { user } }`.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  return { claims, response: supabaseResponse, supabase };
}
