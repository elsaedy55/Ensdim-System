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

  const { user, response, supabase } = await updateSession(request);

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // 1. Not authenticated
  if (!user) {
    if (isPublic) return response;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 1b. Banned users — block access to everything except /login
  const { data: profile } = await supabase
    .from("profiles")
    .select("banned_until")
    .eq("id", user.id)
    .single();

  const isBanned = !!profile?.banned_until && new Date(profile.banned_until) > new Date();

  if (isBanned) {
    if (pathname === "/login") return response;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("banned", "true");
    loginUrl.searchParams.set("until", profile!.banned_until as string);
    return NextResponse.redirect(loginUrl);
  }

  const role = (user.user_metadata?.role as string | undefined) ?? "client";

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
