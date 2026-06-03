"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";
import { forgotPassword } from "@/lib/auth.service";

export default function ForgotPasswordPage() {
  const t  = useTranslations("auth.forgotPassword");
  const tv = useTranslations("common.validation");

  const schema = z.object({ email: z.string().email(tv("emailInvalid")) });
  type Form = z.infer<typeof schema>;

  const [sent, setSent] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    await forgotPassword(data.email, window.location.origin);
    setSent(true);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="surface p-8 shadow-(--shadow-md)">
        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-(--success-subtle)">
              <Mail className="h-6 w-6 text-(--success)" />
            </div>
            <h2 className="text-lg font-bold text-(--text-primary)">{t("success.title")}</h2>
            <p className="mt-2 text-sm text-(--text-muted)">{t("success.body")}</p>
            <Button variant="secondary" className="mt-6 w-full" asChild>
              <Link href={ROUTES.LOGIN}>
                <ArrowLeft className="h-4 w-4 me-1 rtl:scale-x-[-1]" /> {t("success.backToSignIn")}
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h1 className="text-xl font-bold text-(--text-primary)">{t("title")}</h1>
              <p className="mt-1 text-sm text-(--text-muted)">{t("subtitle")}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormField label={t("emailLabel")} required htmlFor="email" error={errors.email?.message}>
                <Input id="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")} error={!!errors.email} leftElement={<Mail className="h-4 w-4" />} {...register("email")} />
              </FormField>
              <Button type="submit" className="w-full" loading={isSubmitting} size="lg">
                {t("submitButton")}
              </Button>
            </form>
          </>
        )}
      </div>
      <p className="mt-6 text-center text-sm text-(--text-muted)">
        <Link href={ROUTES.LOGIN} className="inline-flex items-center gap-1 font-medium text-(--accent) hover:text-(--accent-hover)">
          <ArrowLeft className="h-3.5 w-3.5 rtl:scale-x-[-1]" /> {t("backToSignIn")}
        </Link>
      </p>
    </div>
  );
}
