"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";
import { resetPassword } from "@/lib/auth.service";

export default function ResetPasswordPage() {
  const t  = useTranslations("auth.resetPassword");
  const tv = useTranslations("common.validation");
  const ta = useTranslations("common.actions");

  const schema = z.object({
    password:        z.string().min(8, tv("passwordMin")),
    confirmPassword: z.string(),
  }).refine((d) => d.password === d.confirmPassword, {
    message: tv("passwordMatch"),
    path: ["confirmPassword"],
  });
  type Form = z.infer<typeof schema>;

  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess]           = React.useState(false);
  const [serverError, setServerError]   = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  if (success) {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-8 shadow-(--shadow-md) text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-(--success-subtle)">
            <CheckCircle className="h-6 w-6 text-(--success)" />
          </div>
          <h2 className="text-lg font-bold text-(--text-primary)">{t("success.title")}</h2>
          <p className="mt-2 text-sm text-(--text-muted)">{t("success.body")}</p>
          <Button className="mt-6 w-full" asChild>
            <Link href={ROUTES.LOGIN}>{t("success.signIn")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: Form) => {
    setServerError(null);
    try {
      await resetPassword(data.password);
      setSuccess(true);
    } catch (err: unknown) {
      setServerError(t("errors.invalidToken"));
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="surface p-8 shadow-(--shadow-md)">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-(--text-primary)">{t("title")}</h1>
          <p className="mt-1 text-sm text-(--text-muted)">{t("subtitle")}</p>
        </div>

        {serverError && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--danger-subtle) border border-(--danger-muted) px-3.5 py-3">
            <AlertCircle className="h-4 w-4 text-(--danger) mt-0.5 shrink-0" />
            <p className="text-sm text-(--danger-foreground)">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField label={t("passwordLabel")} required htmlFor="password" error={errors.password?.message}>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t("passwordPlaceholder")}
              error={!!errors.password}
              leftElement={<Lock className="h-4 w-4" />}
              rightElement={
                <button type="button" onClick={() => setShowPassword((p) => !p)} className="text-(--text-muted) hover:text-(--text-secondary) transition-colors" aria-label={showPassword ? ta("hidePassword") : ta("showPassword")}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              {...register("password")}
            />
          </FormField>

          <FormField label={t("confirmPasswordLabel")} required htmlFor="confirm" error={errors.confirmPassword?.message}>
            <Input id="confirm" type="password" autoComplete="new-password" placeholder={t("confirmPasswordPlaceholder")} error={!!errors.confirmPassword} leftElement={<Lock className="h-4 w-4" />} {...register("confirmPassword")} />
          </FormField>

          <Button type="submit" className="w-full mt-2" loading={isSubmitting} size="lg">
            {t("submitButton")}
          </Button>
        </form>
      </div>
    </div>
  );
}
