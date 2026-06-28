"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SkeletonCard } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { AlertTriangle, ArrowRight, Receipt } from "lucide-react";
import { useMyInvoices, useFinancialSummary } from "@/hooks/useInvoices";
import { isInvoiceOverdue, effectiveInvoiceStatus } from "@/lib/invoice-status";
import type { InvoiceRow } from "@/lib/supabase/types";

type Invoice = InvoiceRow;

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const t = useTranslations("payments");
  const isPaid    = invoice.status === "paid";
  const isOverdue = isInvoiceOverdue(invoice);
  const isPending = (invoice.status === "sent" || invoice.status === "viewed") && !isOverdue;

  return (
    <Link href={ROUTES.CLIENT.PAYMENT(invoice.id)} className={cn("surface flex items-start justify-between gap-4 p-5 transition-shadow hover:shadow-(--shadow-md) group", isOverdue && "border-(--danger-muted)")}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <p className="text-sm font-semibold text-(--text-primary)">{invoice.invoice_number}</p>
          <StatusBadge status={effectiveInvoiceStatus(invoice)} />
        </div>
        <p className="text-xs text-(--text-muted)">
          {isPaid
            ? t("invoiceCard.paidOn", { date: formatDate(invoice.paid_at!, { month: "short", day: "numeric", year: "numeric" }) })
            : t("invoiceCard.dueOn",  { date: formatDate(invoice.due_date,  { month: "short", day: "numeric", year: "numeric" }) })
          }
        </p>
      </div>
      <div className="shrink-0 text-end">
        <p className={cn("text-lg font-bold", isPaid ? "text-(--success)" : isOverdue ? "text-(--danger)" : "text-(--text-primary)")}>
          {formatCurrency(invoice.total, invoice.currency)}
        </p>
        {isPending && (
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-(--accent) group-hover:underline">
            {t("invoiceCard.viewDetails")} <ArrowRight className="h-3 w-3 rtl:scale-x-[-1]" />
          </span>
        )}
      </div>
    </Link>
  );
}

export default function PaymentsPage() {
  const t = useTranslations("payments");
  const { data: invoices, isLoading: invoicesLoading } = useMyInvoices();
  const { data: financial, isLoading: financialLoading } = useFinancialSummary();

  const list    = invoices ?? [];
  const isLoading = invoicesLoading || financialLoading;

  const paidPct   = financial && financial.total > 0 ? Math.round((financial.paid / financial.total) * 100) : 0;
  const nextDue   = list.find((i) => i.status === "sent" || i.status === "viewed");

  const counts = {
    all:     list.length,
    pending: list.filter((i) => (i.status === "sent" || i.status === "viewed") && !isInvoiceOverdue(i)).length,
    paid:    list.filter((i) => i.status === "paid").length,
    overdue: list.filter((i) => isInvoiceOverdue(i)).length,
  };

  const byFilter = (f: string) => {
    if (f === "pending") return list.filter((i) => (i.status === "sent" || i.status === "viewed") && !isInvoiceOverdue(i));
    if (f === "paid")    return list.filter((i) => i.status === "paid");
    if (f === "overdue") return list.filter((i) => isInvoiceOverdue(i));
    return list;
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />

      {/* Financial Summary */}
      <div className="surface p-5">
        {isLoading ? (
          <div className="h-20 flex items-center justify-center"><div className="h-4 w-48 bg-(--bg-muted) rounded animate-pulse" /></div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: t("summary.totalValue"), value: financial?.total ?? 0,     color: "text-(--text-primary)" },
                { label: t("summary.paid"),        value: financial?.paid ?? 0,      color: "text-(--success)" },
                { label: t("summary.remaining"),   value: financial?.remaining ?? 0, color: "text-(--text-primary)" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p className="text-xs text-(--text-muted) mb-0.5">{label}</p>
                  <p className={cn("text-xl font-bold", color)}>{formatCurrency(value)}</p>
                </div>
              ))}
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-(--bg-muted)">
              <div className="h-full rounded-full bg-(--success) transition-all duration-700" style={{ width: `${paidPct}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-(--text-muted)">{t("summary.paidPercent", { pct: paidPct })}</p>
          </>
        )}
      </div>

      {/* Next Due Alert */}
      {nextDue && (
        <div className={cn("flex items-center gap-3 rounded-xl border px-4 py-3", isInvoiceOverdue(nextDue) ? "border-(--danger-muted) bg-(--danger-subtle)" : "border-(--warning-muted) bg-(--warning-subtle)")}>
          <AlertTriangle className={cn("h-4 w-4 shrink-0", isInvoiceOverdue(nextDue) ? "text-(--danger)" : "text-(--warning)")} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-(--text-primary)">{nextDue.invoice_number} — {formatCurrency(nextDue.total, nextDue.currency)}</p>
            <p className="text-xs text-(--text-muted)">{t("nextDue.label", { days: 3 })}</p>
          </div>
          <Button size="sm" variant="secondary" asChild>
            <Link href={ROUTES.CLIENT.PAYMENT(nextDue.id)}>{t("nextDue.viewInvoice")}</Link>
          </Button>
        </div>
      )}

      {/* Invoice List */}
      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList variant="underline" className="w-full">
            <TabsTrigger value="all"     variant="underline" count={counts.all}>{t("filters.all")}</TabsTrigger>
            <TabsTrigger value="pending" variant="underline" count={counts.pending}>{t("filters.pending")}</TabsTrigger>
            <TabsTrigger value="paid"    variant="underline" count={counts.paid}>{t("filters.paid")}</TabsTrigger>
            {counts.overdue > 0 && <TabsTrigger value="overdue" variant="underline" count={counts.overdue}>{t("filters.overdue")}</TabsTrigger>}
          </TabsList>
          {(["all", "pending", "paid", "overdue"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3">
              {byFilter(tab).length === 0 ? (
                <div className="surface flex flex-col items-center justify-center py-16 text-center">
                  <Receipt className="h-10 w-10 text-(--text-muted) mb-3" />
                  <p className="text-sm font-medium text-(--text-primary)">{t("emptyState.title")}</p>
                  <p className="text-xs mt-1 text-(--text-muted)">{t("emptyState.description")}</p>
                </div>
              ) : (
                byFilter(tab).map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
