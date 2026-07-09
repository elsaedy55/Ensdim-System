import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/supabase/types";

// ─── Sign In ──────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

// ─── Sign Up ──────────────────────────────────────────────────────

export async function signUp(params: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      // NEXT_PUBLIC_APP_URL takes priority so confirmation emails always
      // point at the deployed domain, even when signup is triggered from
      // a local dev server.
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/auth/callback`,
      data: {
        name: params.name,
        phone: params.phone,
        role: params.role ?? "client",
      },
    },
  });
  if (error) throw new Error(error.message);

  // Supabase's fraud-prevention behavior: signing up with an email that's
  // already registered returns a *fake* success (no error) instead of
  // failing, to avoid leaking which emails exist. The tell is that the
  // returned user has no identities attached.
  if (data.user && data.user.identities?.length === 0) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }

  return data;
}

// ─── Sign Out ─────────────────────────────────────────────────────

// supabase-js's signOut() always attempts a network call to revoke the
// refresh token server-side — even with `scope: "local"` — and only clears
// the local session/cookies *after* that call settles (see GoTrueClient's
// _signOut). If that project's auth endpoint is slow (e.g. a cold-started
// free-tier Supabase project, see client.ts's lockWithTimeout comment), the
// button waits on it too, and if the redirect below fires before the local
// cookies are actually cleared, the middleware still sees a valid session
// and bounces the user straight back into the dashboard — looking like sign
// out "never finishes".
//
// So the local cookie clear here is done directly and synchronously,
// independent of the network call, which is fired off in the background
// purely as a best-effort server-side revoke.
export function clearLocalSession() {
  const supabase = createClient();
  void supabase.auth.signOut({ scope: "local" }).catch((err: unknown) => {
    console.warn("Background session revoke failed (already signed out locally):", err);
  });

  if (typeof document === "undefined") return;
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name && /^sb-.*-auth-token/.test(name)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
}

// ─── Forgot Password ──────────────────────────────────────────────

export async function forgotPassword(email: string, redirectOrigin: string) {
  const supabase = createClient();
  // NEXT_PUBLIC_APP_URL takes priority so the reset link always points at
  // the deployed domain, even when triggered from a local dev server.
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? redirectOrigin;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });
  if (error) throw new Error(error.message);
}

// ─── Reset Password (via magic link session) ──────────────────────

export async function resetPassword(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error.message);
}

// ─── Change Password (from Settings — needs re-auth) ─────────────

export async function changePassword(currentPassword: string, newPassword: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) throw new Error("Not authenticated");

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (signInError) throw new Error("Current password is incorrect.");

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw new Error(error.message);
}

// ─── Verify OTP (email confirmation) ─────────────────────────────

export async function verifyOtp(email: string, token: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) throw new Error(error.message);
}

// ─── Resend Verification Email ────────────────────────────────────

export async function resendVerification(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/auth/callback`,
    },
  });
  if (error) throw new Error(error.message);
}

// ─── Get current Supabase user ────────────────────────────────────

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
