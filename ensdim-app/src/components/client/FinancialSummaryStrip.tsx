"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface FinancialSummaryStripProps {
  total: number;
  paid: number;
  remaining: number;
  nextDueDate?: string;
  nextDueAmount?: number;
  currency?: string;
}

export function FinancialSummaryStrip({
  total, paid, remaining, nextDueDate, nextDueAmount, currency = "USD",
}: FinancialSummaryStripProps) {
  const t = useTranslations("dashboard.financial");

  const paidPercent = total > 0 ? Math.round((paid / total) * 100) : 0;
  const isOverdue   = nextDueDate ? new Date(nextDueDate) < new Date() : false;

  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-(--text-primary)">{t("title")}</h2>
        <Link
          href={ROUTES.CLIENT.PAYMENTS}
          className="text-xs text-(--accent) hover:text-(--accent-hover) transition-colors"
        >
          {t("viewAll")}
        </Link>
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-(--text-muted) mb-0.5">{t("totalValue")}</p>
          <p className="text-lg font-bold text-(--text-primary)">{formatCurrency(total, currency)}</p>
        </div>
        <div>
          <p className="text-xs text-(--text-muted) mb-0.5">{t("paid")}</p>
          <p className="text-lg font-bold text-(--success)">{formatCurrency(paid, currency)}</p>
        </div>
        <div>
          <p className="text-xs text-(--text-muted) mb-0.5">{t("remaining")}</p>
          <p className={cn("text-lg font-bold", remaining > 0 ? "text-(--text-primary)" : "text-(--success)")}>
            {formatCurrency(remaining, currency)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-(--bg-muted)">
        <div
          className="h-full rounded-full bg-(--success) transition-all duration-700"
          style={{ width: `${paidPercent}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-(--text-muted)">{t("paidPercent", { pct: paidPercent })}</p>

      {/* Next due alert */}
      {nextDueDate && nextDueAmount && (
        <div className={cn(
          "mt-3 flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm border",
          isOverdue
            ? "bg-(--danger-subtle) border-(--danger-muted) text-(--danger-foreground)"
            : "bg-(--warning-subtle) border-(--warning-muted) text-(--warning-foreground)"
        )}>
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1">
            {isOverdue
              ? t("overdue", { amount: formatCurrency(nextDueAmount, currency), date: formatDate(nextDueDate, { month: "short", day: "numeric" }) })
              : t("nextDue", { amount: formatCurrency(nextDueAmount, currency), date: formatDate(nextDueDate, { month: "short", day: "numeric" }) })
            }
          </span>
          <Link
            href={ROUTES.CLIENT.PAYMENTS}
            className="ms-auto text-xs underline"
          >
            {t("pay")}
          </Link>
        </div>
      )}
    </div>
  );
}
