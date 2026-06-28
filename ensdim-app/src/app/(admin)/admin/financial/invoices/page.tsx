"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SkeletonCard } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Receipt, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { STALE_TIME } from "@/lib/query-config";
import { useUrlState } from "@/hooks/useUrlState";
import { isInvoiceOverdue, effectiveInvoiceStatus } from "@/lib/invoice-status";
import type { InvoiceRow } from "@/lib/supabase/types";

type InvoiceWithRels = InvoiceRow & {
  project: { name: string } | null;
  client:  { name: string } | null;
};

function useAdminInvoices() {
  return useQuery({
    queryKey: ["admin-invoices-all"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("invoices")
        .select("*, project:projects(name), client:profiles!client_id(name)")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as InvoiceWithRels[];
    },
    staleTime: STALE_TIME.MEDIUM,
  });
}

export default function AdminInvoicesListPage() {
  const t = useTranslations("admin.financial");
  const { data: invoices, isLoading } = useAdminInvoices();
  const [search, setSearch] = useUrlState("q");
  const [tab, setTab]       = useUrlState("tab", "all");

  const all = invoices ?? [];
  const filtered = (status?: string) => {
    const base = status === "paid"    ? all.filter((i) => i.status === "paid") :
                 status === "sent"    ? all.filter((i) => (i.status === "sent" || i.status === "viewed") && !isInvoiceOverdue(i)) :
                 status === "draft"   ? all.filter((i) => i.status === "draft") :
                 status === "overdue" ? all.filter((i) => isInvoiceOverdue(i)) : all;
    return search ? base.filter((i) => i.invoice_number.includes(search) || (i.client?.name ?? "").toLowerCase().includes(search.toLowerCase())) : base;
  };

  const InvoiceRow = ({ inv }: { inv: InvoiceWithRels }) => (
    <Link
      href={ROUTES.ADMIN.INVOICE(inv.id)}
      className="surface flex items-center gap-4 p-4 hover:shadow-(--shadow-sm) transition-shadow group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <p className="text-sm font-semibold text-(--text-primary) group-hover:text-(--accent) transition-colors">
            {inv.invoice_number}
          </p>
          <StatusBadge status={effectiveInvoiceStatus(inv)} />
        </div>
        <p className="text-xs text-(--text-muted)">
          {inv.client?.name ?? "—"} · {inv.project?.name ?? "—"} · Due: {formatDate(inv.due_date, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
      <p className="text-lg font-bold text-(--text-primary) shrink-0">{formatCurrency(inv.total, inv.currency)}</p>
      <ArrowRight className="h-4 w-4 text-(--text-muted) opacity-0 group-hover:opacity-100 transition-opacity rtl:scale-x-[-1]" />
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("invoiceList.title")}
        actions={
          <Button asChild>
            <Link href={ROUTES.ADMIN.INVOICE_NEW}>
              <Plus className="h-4 w-4" /> {t("invoiceList.newInvoice")}
            </Link>
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder={t("invoiceList.searchPlaceholder")} className="max-w-xs" />
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList variant="underline" className="w-full">
            <TabsTrigger value="all"     variant="underline" count={filtered().length}>{t("invoiceList.filters.all")}</TabsTrigger>
            <TabsTrigger value="sent"    variant="underline" count={filtered("sent").length}>{t("invoiceList.filters.sent")}</TabsTrigger>
            <TabsTrigger value="paid"    variant="underline" count={filtered("paid").length}>{t("invoiceList.filters.paid")}</TabsTrigger>
            <TabsTrigger value="overdue" variant="underline" count={filtered("overdue").length}>{t("invoiceList.filters.overdue")}</TabsTrigger>
            <TabsTrigger value="draft"   variant="underline" count={filtered("draft").length}>{t("invoiceList.filters.draft")}</TabsTrigger>
          </TabsList>

          {(["all","sent","paid","overdue","draft"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3">
              {filtered(tab === "all" ? undefined : tab).length === 0 ? (
                <div className="surface flex flex-col items-center justify-center py-16 text-center">
                  <Receipt className="h-8 w-8 text-(--text-muted) mb-2" />
                  <p className="text-sm text-(--text-muted)">{t("invoiceList.emptyState.title")}</p>
                </div>
              ) : (
                filtered(tab === "all" ? undefined : tab).map((inv) => <InvoiceRow key={inv.id} inv={inv} />)
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
