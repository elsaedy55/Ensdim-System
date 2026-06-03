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
  role?: UserRole;
  workspaceId?: string;
  workspaceName?: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: {
        name:                params.name,
        role:                params.role ?? "client",
        workspace_id:        params.workspaceId ?? null,
        workspace_name:      params.workspaceName ?? null,
        onboarding_complete: false,  // will be set to true after onboarding wizard
      },
    },
  });
  if (error) throw new Error(error.message);
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
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${redirectOrigin}/reset-password`,
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
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw new Error(error.message);
}

// ─── Get current Supabase user ────────────────────────────────────

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
