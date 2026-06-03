import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/constants/routes";

export default async function NotFound() {
  const t = await getTranslations("common.errors");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--bg-base) text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--accent-subtle)">
        <svg className="h-8 w-8 text-(--accent)" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-(--text-primary)">{t("404Title")}</h1>
        <p className="mt-2 text-sm text-(--text-muted) max-w-sm">
          {t("404Body")}
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
