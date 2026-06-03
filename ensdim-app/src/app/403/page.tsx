import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/constants/routes";

export default async function AccessDenied() {
  const t = await getTranslations("common.errors");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--bg-base) text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--danger-subtle)">
        <svg className="h-8 w-8 text-(--danger)" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-(--accent) uppercase tracking-wider mb-1">403</p>
        <h1 className="text-2xl font-bold text-(--text-primary)">{t("403Title")}</h1>
        <p className="mt-2 text-sm text-(--text-muted) max-w-sm">
          {t("403Body")}
        </p>
      </div>
      <Link
        href={ROUTES.CLIENT.DASHBOARD}
        className="inline-flex h-9 items-center justify-center rounded-md bg-(--accent) px-4 text-sm font-medium text-white hover:bg-(--accent-hover) transition-colors"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
