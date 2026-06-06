"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";
import { signIn } from "@/lib/auth.service";

export default function LoginPage() {
  const t  = useTranslations("auth.login");
  const tv = useTranslations("common.validation");
  const ta = useTranslations("common.actions");

  const schema = z.object({
    email:    z.string().email(tv("emailInvalid")),
    password: z.string().min(8, tv("passwordMin")),
  });
  type LoginForm = z.infer<typeof schema>;

  const router       = useRouter();
  const searchParams = useSearchParams();
  const isExpired    = searchParams.get("expired") === "true";
  const isVerified   = searchParams.get("verified") === "true";

  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError]   = React.useState<string | null>(null);

  const {
    register, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const result = await signIn(data.email, data.password);
      const role = result.user?.user_metadata?.role ?? "client";
      if (role === "client") {
        router.push(ROUTES.CLIENT.DASHBOARD);
      } else {
        router.push(ROUTES.ADMIN.OVERVIEW);
      }
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t("errors.invalidCredentials");
      setServerError(msg);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="surface p-8 shadow-(--shadow-md)">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-(--text-primary)">{t("title")}</h1>
          <p className="mt-1 text-sm text-(--text-muted)">{t("subtitle")}</p>
        </div>

        {/* Email verified banner */}
        {isVerified && !serverError && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--success-subtle) border border-(--success-muted) px-3.5 py-3">
            <CheckCircle className="h-4 w-4 text-(--success) mt-0.5 shrink-0" />
            <p className="text-sm text-(--text-secondary)">{t("emailVerifiedBanner")}</p>
          </div>
        )}

        {/* Session expired banner */}
        {isExpired && !serverError && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--warning-subtle) border border-(--warning-muted) px-3.5 py-3">
            <Clock className="h-4 w-4 text-(--warning) mt-0.5 shrink-0" />
            <p className="text-sm text-(--text-secondary)">{t("sessionExpiredBanner")}</p>
          </div>
        )}

        {/* Server error */}
        {serverError && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--danger-subtle) border border-(--danger-muted) px-3.5 py-3">
            <AlertCircle className="h-4 w-4 text-(--danger) mt-0.5 shrink-0" />
            <p className="text-sm text-(--danger-foreground)">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField label={t("emailLabel")} required htmlFor="email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              error={!!errors.email}
              leftElement={<Mail className="h-4 w-4" />}
              {...register("email")}
            />
          </FormField>

          <FormField label={t("passwordLabel")} required htmlFor="password" error={errors.password?.message}>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t("passwordPlaceholder")}
              error={!!errors.password}
              leftElement={<Lock className="h-4 w-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-(--text-muted) hover:text-(--text-secondary) transition-colors"
                  aria-label={showPassword ? ta("hidePassword") : ta("showPassword")}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              {...register("password")}
            />
          </FormField>

          <div className="flex justify-end">
            <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs text-(--accent) hover:text-(--accent-hover) transition-colors">
              {t("forgotPassword")}
            </Link>
          </div>

          <Button type="submit" className="w-full mt-2" loading={isSubmitting} size="lg">
            {t("submitButton")}
          </Button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-(--text-muted)">
        {t("noAccount")}{" "}
        <Link href={ROUTES.REGISTER} className="font-medium text-(--accent) hover:text-(--accent-hover) transition-colors">
          {t("createAccount")}
        </Link>
      </p>
    </div>
  );
}
