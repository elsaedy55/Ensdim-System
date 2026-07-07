import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
  "/accept-invite",
];

const CLIENT_ROLES = new Set(["client"]);
const ADMIN_ROLES  = new Set([
  "admin", "project_manager", "developer",
  "designer", "accountant", "sales", "content_editor",
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const { claims, response } = await updateSession(request);

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // 1. Not authenticated
  if (!claims) {
    if (isPublic) return response;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Banned users are already rejected by Supabase Auth itself (ban_duration
  // set via auth.admin.updateUserById — see /api/admin/clients/[id]),
  // so `claims` above is already null for them once their session revalidates.
  // No separate DB query is needed here on every navigation.

  const role = (claims.user_metadata?.role as string | undefined) ?? "client";

  // 2. Authenticated user hitting a public route → redirect to their area
  if (isPublic) {
    if (pathname === "/accept-invite") return response;
    if (CLIENT_ROLES.has(role)) return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 3. Client trying to access /admin
  if (CLIENT_ROLES.has(role) && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  // 4. Team member trying to access client routes → /admin
  if (ADMIN_ROLES.has(role) && !pathname.startsWith("/admin")) {
    if (pathname === "/settings" || pathname.startsWith("/settings/")) return response;
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
