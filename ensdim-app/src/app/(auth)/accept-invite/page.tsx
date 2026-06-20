"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/client";

type PageState = "loading" | "ready" | "success" | "error" | "declined";

export default function AcceptInvitePage() {
  const tv     = useTranslations("common.validation");
  const ta     = useTranslations("common.actions");
  const router = useRouter();

  const [pageState, setPageState]   = React.useState<PageState>("loading");
  const [errorMsg, setErrorMsg]     = React.useState<string | null>(null);
  const [showPwd, setShowPwd]       = React.useState(false);
  const [declining, setDeclining]   = React.useState(false);

  // ── Verify invitation on mount ────────────────────────────────────
  React.useEffect(() => {
    const supabase = createClient();

    const init = async () => {
      const search = new URLSearchParams(window.location.search);
      const hash   = new URLSearchParams(window.location.hash.replace("#", ""));

      const code         = search.get("code");
      const accessToken  = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const errorParam   = search.get("error") || hash.get("error");
      const errorDesc    = search.get("error_description") || hash.get("error_description");

      // 0. Supabase returned an error
      if (errorParam) {
        setErrorMsg(errorDesc ?? errorParam);
        setPageState("error");
        return;
      }

      // 1. PKCE flow — ?code=xxx in query string
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) { setErrorMsg(error.message); setPageState("error"); return; }
        if (data.session) {
          window.history.replaceState({}, "", "/accept-invite");
          setPageState("ready");
          return;
        }
      }

      // 2. Implicit flow — #access_token=xxx in hash
      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token:  accessToken,
          refresh_token: refreshToken,
        });
        if (error) { setErrorMsg(error.message); setPageState("error"); return; }
        if (data.session) {
          window.history.replaceState({}, "", "/accept-invite");
          setPageState("ready");
          return;
        }
      }

      // 3. Session already exists (page was refreshed)
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) { setPageState("ready"); return; }

      // 4. Nothing worked — bad link
      setErrorMsg("The invitation link is invalid or has already been used.");
      setPageState("error");
    };

    init();
  }, []);

  // ── Password form schema ──────────────────────────────────────────
  const schema = z.object({
    password:        z.string().min(8, tv("passwordMin")),
    confirmPassword: z.string(),
  }).refine((d) => d.password === d.confirmPassword, {
    message: tv("passwordMatch"),
    path: ["confirmPassword"],
  });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onSubmit = async (data: Form) => {
    setSubmitError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: data.password });
    if (error) { setSubmitError(error.message); return; }
    setPageState("success");
    const { data: { user } } = await supabase.auth.getUser();
    const role = user?.user_metadata?.role ?? "client";
    setTimeout(() => {
      router.push(role === "client" ? ROUTES.CLIENT.DASHBOARD : ROUTES.ADMIN.OVERVIEW);
      router.refresh();
    }, 1500);
  };

  const onDecline = async () => {
    setDeclining(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const res = await fetch("/api/invite/decline", {
        method:  "POST",
        headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      await supabase.auth.signOut();
      setPageState("declined");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to decline invitation");
    } finally {
      setDeclining(false);
    }
  };

  // ── Loading ───────────────────────────────────────────────────────
  if (pageState === "loading") {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-10 shadow-(--shadow-md) text-center">
          <Loader2 className="h-10 w-10 text-(--accent) animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-bold text-(--text-primary)">Verifying invitation…</h2>
          <p className="mt-2 text-sm text-(--text-muted)">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────
  if (pageState === "error") {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-8 shadow-(--shadow-md) text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--danger-subtle)">
            <AlertCircle className="h-7 w-7 text-(--danger)" />
          </div>
          <h2 className="text-lg font-bold text-(--text-primary)">Invitation failed</h2>
          <p className="mt-2 text-sm text-(--text-muted) whitespace-pre-line">{errorMsg}</p>
        </div>
      </div>
    );
  }

  // ── Declined ──────────────────────────────────────────────────────
  if (pageState === "declined") {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-8 shadow-(--shadow-md) text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--bg-muted)">
            <CheckCircle className="h-7 w-7 text-(--text-muted)" />
          </div>
          <h2 className="text-lg font-bold text-(--text-primary)">Invitation declined</h2>
          <p className="mt-2 text-sm text-(--text-muted)">You can close this page now.</p>
        </div>
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────────
  if (pageState === "success") {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-8 shadow-(--shadow-md) text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--success-subtle)">
            <CheckCircle className="h-7 w-7 text-(--success)" />
          </div>
          <h2 className="text-lg font-bold text-(--text-primary)">Password set!</h2>
          <p className="mt-2 text-sm text-(--text-muted)">Redirecting to your dashboard…</p>
        </div>
      </div>
    );
  }

  // ── Set password form ─────────────────────────────────────────────
  return (
    <div className="w-full max-w-sm">
      <div className="surface p-8 shadow-(--shadow-md)">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-(--accent-subtle)">
            <Lock className="h-6 w-6 text-(--accent)" />
          </div>
          <h1 className="text-xl font-bold text-(--text-primary)">Set Your Password</h1>
          <p className="mt-1 text-sm text-(--text-muted)">Choose a secure password for your account.</p>
        </div>

        {submitError && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--danger-subtle) border border-(--danger-muted) px-3.5 py-3">
            <AlertCircle className="h-4 w-4 text-(--danger) mt-0.5 shrink-0" />
            <p className="text-sm text-(--danger-foreground)">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField label="Password" required htmlFor="password" error={errors.password?.message}>
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              error={!!errors.password}
              leftElement={<Lock className="h-4 w-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="text-(--text-muted) hover:text-(--text-secondary) transition-colors"
                  aria-label={showPwd ? ta("hidePassword") : ta("showPassword")}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              {...register("password")}
            />
          </FormField>

          <FormField label="Confirm Password" required htmlFor="confirm" error={errors.confirmPassword?.message}>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              error={!!errors.confirmPassword}
              leftElement={<Lock className="h-4 w-4" />}
              {...register("confirmPassword")}
            />
          </FormField>

          <Button type="submit" className="w-full mt-2" loading={isSubmitting} size="lg">
            Set Password &amp; Sign In
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            loading={declining}
            onClick={onDecline}
          >
            Decline invitation
          </Button>
        </form>
      </div>
    </div>
  );
}
