"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t  = useTranslations("common.errors");
  const ta = useTranslations("common.actions");

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--bg-base) text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--danger-subtle)">
        <svg className="h-8 w-8 text-(--danger)" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-(--text-primary)">{t("unexpectedTitle")}</h1>
        <p className="mt-2 text-sm text-(--text-muted) max-w-sm">
          {t("unexpectedBody")}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="primary" onClick={reset}>
          {ta("retry")}
        </Button>
        <Button variant="secondary" onClick={() => (window.location.href = "/dashboard")}>
          {t("backHome")}
        </Button>
      </div>
    </div>
  );
}
