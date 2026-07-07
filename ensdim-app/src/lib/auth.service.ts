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

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
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
