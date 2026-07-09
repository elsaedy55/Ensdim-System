"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function EmailConfirmedPage() {
  const t = useTranslations("auth.emailConfirmed");

  return (
    <div className="w-full max-w-sm">
      <div className="surface p-8 shadow-(--shadow-md) text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-(--success-subtle)">
          <CheckCircle className="h-6 w-6 text-(--success)" />
        </div>
        <h1 className="text-lg font-bold text-(--text-primary)">{t("title")}</h1>
        <p className="mt-2 text-sm text-(--text-muted)">{t("body")}</p>
        <Button className="mt-6 w-full" size="lg" asChild>
          <Link href={ROUTES.LOGIN}>{t("loginButton")}</Link>
        </Button>
      </div>
    </div>
  );
}
