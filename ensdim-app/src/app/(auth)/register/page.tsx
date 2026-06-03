"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";
import { signUp } from "@/lib/auth.service";

function PasswordStrength({ password, labels }: { password: string; labels: string[] }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const colors = ["", "bg-(--danger)", "bg-(--warning)", "bg-(--accent)", "bg-(--success)"];
  if (!password) return null;

  return (
    <div className="mt-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= score ? colors[score] : "bg-(--bg-muted)"}`} />
        ))}
      </div>
      <p className="mt-1 text-xs text-(--text-muted)">{labels[score - 1] ?? ""}</p>
    </div>
  );
}

export default function RegisterPage() {
  const t  = useTranslations("auth.register");
  const tv = useTranslations("common.validation");
  const ta = useTranslations("common.actions");

  const schema = z.object({
    workspaceName:   z.string().min(2, "Agency name must be at least 2 characters"),
    name:            z.string().min(2, tv("nameMin")),
    email:           z.string().email(tv("emailInvalid")),
    password:        z.string().min(8, tv("passwordMin")),
    confirmPassword: z.string(),
  }).refine((d) => d.password === d.confirmPassword, {
    message: tv("passwordMatch"),
    path: ["confirmPassword"],
  });
  type RegisterForm = z.infer<typeof schema>;

  const strengthLabels = [t("strength.weak"), t("strength.fair"), t("strength.good"), t("strength.strong")];

  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError]   = React.useState<string | null>(null);
  const [success, setSuccess]           = React.useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);
    try {
      // Admin signup — the DB trigger creates the workspace automatically
      await signUp({
        email:         data.email,
        password:      data.password,
        name:          data.name,
        role:          "admin",
        workspaceName: data.workspaceName,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm">
        <div className="surface p-8 shadow-(--shadow-md) text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-(--success-subtle)">
            <Mail className="h-6 w-6 text-(--success)" />
          </div>
          <h2 className="text-lg font-bold text-(--text-primary)">{t("success.title")}</h2>
          <p className="mt-2 text-sm text-(--text-muted)">{t("success.body")}</p>
          <Button variant="secondary" className="mt-6 w-full" asChild>
            <Link href={ROUTES.LOGIN}>{t("success.backToSignIn")}</Link>
          </Button>
        </div>
      </div>
    );
  }

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
          {/* Agency name — creates the workspace */}
          <FormField label="Agency Name" required htmlFor="workspaceName" error={errors.workspaceName?.message}>
            <Input
              id="workspaceName"
              autoComplete="organization"
              placeholder="Ensdim Agency"
              error={!!errors.workspaceName}
              leftElement={<Building2 className="h-4 w-4" />}
              {...register("workspaceName")}
            />
          </FormField>

          <FormField label={t("nameLabel")} required htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              error={!!errors.name}
              leftElement={<User className="h-4 w-4" />}
              {...register("name")}
            />
          </FormField>

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
              autoComplete="new-password"
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
            <PasswordStrength password={password} labels={strengthLabels} />
          </FormField>

          <FormField label={t("confirmPasswordLabel")} required htmlFor="confirm" error={errors.confirmPassword?.message}>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder={t("confirmPasswordPlaceholder")}
              error={!!errors.confirmPassword}
              leftElement={<Lock className="h-4 w-4" />}
              {...register("confirmPassword")}
            />
          </FormField>

          <Button type="submit" className="w-full mt-2" loading={isSubmitting} size="lg">
            {t("submitButton")}
          </Button>

          <p className="text-center text-xs text-(--text-muted)">
            {t("termsText")}{" "}
            <span className="text-(--accent)">{t("terms")}</span>{" "}
            {t("and")}{" "}
            <span className="text-(--accent)">{t("privacy")}</span>.
          </p>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-(--text-muted)">
        {t("alreadyHaveAccount")}{" "}
        <Link href={ROUTES.LOGIN} className="font-medium text-(--accent) hover:text-(--accent-hover) transition-colors">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
