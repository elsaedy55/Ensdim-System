"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { KPICard } from "@/components/admin/KPICard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { SkeletonKPICard } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { AlertTriangle, Plus, ArrowRight, DollarSign } from "lucide-react";
import { useAdminProjects } from "@/hooks/useAdmin";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { InvoiceRow } from "@/lib/supabase/types";

// ─── Hook: all invoices in workspace ─────────────────────────────

function useAllInvoices() {
  return useQuery({
    queryKey: ["admin-all-invoices"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("invoices")
        .select("*, project:projects(name), client:profiles!client_id(name)")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Array<InvoiceRow & { project: { name: string } | null; client: { name: string } | null }>;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ─── Page ─────────────────────────────────────────────────────────

export default function AdminFinancialPage() {
  const t = useTranslations("admin.financial");
  const { data: invoices, isLoading } = useAllInvoices();

  const all    = invoices ?? [];
  const paid    = all.filter((i) => i.status === "paid");
  const pending = all.filter((i) => i.status === "sent" || i.status === "viewed");
  const overdue = all.filter((i) => i.status === "overdue");

  const totalRevenue  = all.reduce((s, i) => s + i.total, 0);
  const totalCollected = paid.reduce((s, i) => s + i.total, 0);
  const totalOutstanding = pending.reduce((s, i) => s + i.total, 0) + overdue.reduce((s, i) => s + i.total, 0);
  const totalOverdue    = overdue.reduce((s, i) => s + i.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        actions={
          <Button asChild>
            <Link href={ROUTES.ADMIN.INVOICE_NEW}>
              <Plus className="h-4 w-4" /> {t("quickLinks.createInvoice")}
            </Link>
          </Button>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonKPICard key={i} />)
        ) : (
          <>
            <KPICard label={t("cards.totalRevenue")} value={formatCurrency(totalRevenue)} icon="DollarSign" variant="default" />
            <KPICard label={t("cards.collected")} value={formatCurrency(totalCollected)} icon="TrendingUp" variant="success" />
            <KPICard label={t("cards.outstanding")} value={formatCurrency(totalOutstanding)} icon="Clock" variant="default" />
            <KPICard label={t("cards.overdue")} value={formatCurrency(totalOverdue)} icon="AlertTriangle" variant={totalOverdue > 0 ? "warning" : "default"} />
          </>
        )}
      </div>

      {/* Overdue alert */}
      {overdue.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-(--warning-muted) bg-(--warning-subtle) px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-(--warning) shrink-0" />
          <p className="text-sm text-(--warning-foreground) flex-1">
            {t("overdueAlert", { count: overdue.length, amount: formatCurrency(totalOverdue) })}
          </p>
          <Button size="sm" variant="secondary" asChild>
            <Link href={ROUTES.ADMIN.INVOICES + "?filter=overdue"}>{t("quickLinks.viewAll")}</Link>
          </Button>
        </div>
      )}

      {/* Recent invoices */}
      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
          <h2 className="text-sm font-semibold text-(--text-primary)">{t("recentInvoices")}</h2>
          <Link href={ROUTES.ADMIN.INVOICES} className="text-xs text-(--accent) hover:text-(--accent-hover) inline-flex items-center gap-1">
            {t("quickLinks.viewAll")} <ArrowRight className="h-3 w-3 rtl:scale-x-[-1]" />
          </Link>
        </div>
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-10 bg-(--bg-muted) rounded animate-pulse" />)}
          </div>
        ) : all.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <DollarSign className="h-8 w-8 text-(--text-muted) mb-2" />
            <p className="text-sm text-(--text-muted)">{t("invoiceList.emptyState.title")}</p>
            <Button size="sm" className="mt-3" asChild>
              <Link href={ROUTES.ADMIN.INVOICE_NEW}><Plus className="h-4 w-4" /> {t("quickLinks.createInvoice")}</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--border)">
                  {[t("invoiceList.headers.number"), t("invoiceList.headers.client"), t("invoiceList.headers.project"), t("invoiceList.headers.amount"), t("invoiceList.headers.due"), t("invoiceList.headers.status")].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-(--text-muted) uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border)">
                {all.slice(0, 10).map((inv) => (
                  <tr key={inv.id} className="hover:bg-(--bg-muted) transition-colors">
                    <td className="px-5 py-3">
                      <Link href={ROUTES.ADMIN.INVOICE(inv.id)} className="font-medium text-(--accent) hover:underline">
                        {inv.invoice_number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-(--text-secondary)">{(inv as any).client?.name ?? "—"}</td>
                    <td className="px-5 py-3 text-(--text-secondary) truncate max-w-32">{(inv as any).project?.name ?? "—"}</td>
                    <td className="px-5 py-3 font-medium text-(--text-primary)">{formatCurrency(inv.total, inv.currency)}</td>
                    <td className="px-5 py-3 text-(--text-muted) text-xs">
                      {formatDate(inv.due_date, { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
