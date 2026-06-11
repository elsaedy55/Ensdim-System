"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { formatDate, cn } from "@/lib/utils";
import {
  MessageSquare, MoreHorizontal, Trash2, AlertTriangle,
  Phone, Clock, CheckCircle2, RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useInquiries,
  useUpdateInquiryStatus,
  useDeleteInquiry,
} from "@/hooks/useInquiries";
import type { Inquiry, InquiryStatus } from "@/lib/services/inquiries.service";

// ─── Helpers ───────────────────────────────────────────────────────

function waLink(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

const TYPE_STYLE: Record<Inquiry["type"], string> = {
  consultation: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",
  contact:      "bg-(--bg-muted) text-(--text-secondary) border-(--border)",
};

const STATUS_STYLE: Record<InquiryStatus, { className: string; dot: string }> = {
  new:       { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",             dot: "bg-(--accent)" },
  contacted: { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)", dot: "bg-(--warning)" },
  closed:    { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)", dot: "bg-(--success)" },
};

type FilterChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-(--accent) text-white border-(--accent)"
          : "bg-(--bg-surface) text-(--text-secondary) border-(--border) hover:bg-(--bg-muted) hover:text-(--text-primary)",
      )}
    >
      {children}
    </button>
  );
}

// ─── InquiryRow ────────────────────────────────────────────────────

function InquiryRow({
  inquiry,
  onDelete,
  t,
}: {
  inquiry: Inquiry;
  onDelete: (id: string, name: string) => void;
  t: ReturnType<typeof useTranslations<"admin.inquiries">>;
}) {
  const updateStatus = useUpdateInquiryStatus();

  const handleStatus = (status: InquiryStatus) => {
    updateStatus.mutate(
      { id: inquiry.id, status },
      {
        onSuccess: () => toast.success(t("success.statusUpdated")),
        onError: (e) => toast.error(e.message),
      }
    );
  };

  const statusStyle = STATUS_STYLE[inquiry.status];
  const meta = [inquiry.interest_type, inquiry.clicked_item, inquiry.source_page].filter(Boolean);

  return (
    <div className="surface flex items-center gap-4 p-4 hover:shadow-sm transition-shadow group">
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-(--bg-muted) flex items-center justify-center shrink-0 sm:flex">
        <MessageSquare className="h-5 w-5 text-(--text-muted)" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-sm font-semibold text-(--text-primary) truncate">
            {inquiry.name}
          </span>
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold border shrink-0", TYPE_STYLE[inquiry.type])}>
            {t(`type.${inquiry.type}`)}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0",
              statusStyle.className,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusStyle.dot)} />
            {t(`status.${inquiry.status}`)}
          </span>
        </div>
        <a
          href={waLink(inquiry.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-(--text-muted) hover:text-(--accent) transition-colors"
          dir="ltr"
        >
          <Phone className="h-3 w-3" /> {inquiry.whatsapp}
        </a>
        {(meta.length > 0 || inquiry.message || inquiry.details) && (
          <p className="text-xs text-(--text-muted) truncate mt-1">
            {meta.length > 0 ? meta.join(" · ") : (inquiry.message ?? inquiry.details)}
          </p>
        )}
        <p className="text-[11px] text-(--text-muted) mt-1">
          {t("fields.submittedOn")} {formatDate(inquiry.created_at, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex items-center gap-1.5 text-xs">
          <a href={waLink(inquiry.whatsapp)} target="_blank" rel="noopener noreferrer">
            <Phone className="h-3.5 w-3.5" /> {t("actions.openWhatsapp")}
          </a>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {inquiry.status !== "contacted" && (
              <DropdownMenuItem onClick={() => handleStatus("contacted")} className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {t("actions.markContacted")}
              </DropdownMenuItem>
            )}
            {inquiry.status !== "closed" && (
              <DropdownMenuItem onClick={() => handleStatus("closed")} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {t("actions.markClosed")}
              </DropdownMenuItem>
            )}
            {inquiry.status !== "new" && (
              <DropdownMenuItem onClick={() => handleStatus("new")} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" /> {t("actions.markNew")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => onDelete(inquiry.id, inquiry.name)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> {t("actions.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────

type TypeFilter   = "all" | Inquiry["type"];
type StatusFilter = "all" | InquiryStatus;

export default function AdminInquiriesPage() {
  const t = useTranslations("admin.inquiries");
  const { data: inquiries, isLoading, error } = useInquiries();
  const deleteInquiry = useDeleteInquiry();

  const [search, setSearch]             = React.useState("");
  const [typeFilter, setTypeFilter]     = React.useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; name: string } | null>(null);

  const list = inquiries ?? [];

  const newCount       = list.filter((i) => i.status === "new").length;
  const contactedCount = list.filter((i) => i.status === "contacted").length;
  const closedCount    = list.filter((i) => i.status === "closed").length;

  const filtered = list.filter((i) => {
    if (typeFilter !== "all" && i.type !== typeFilter) return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        i.whatsapp.toLowerCase().includes(q) ||
        (i.email ?? "").toLowerCase().includes(q) ||
        (i.company ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteInquiry.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(t("success.deleted"));
        setDeleteTarget(null);
      },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle", { total: list.length, new: newCount, contacted: contactedCount, closed: closedCount })}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("searchPlaceholder")}
          className="max-w-xs"
        />

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={typeFilter === "all"}          onClick={() => setTypeFilter("all")}>{t("filters.all")}</FilterChip>
          <FilterChip active={typeFilter === "consultation"} onClick={() => setTypeFilter("consultation")}>{t("filters.consultation")}</FilterChip>
          <FilterChip active={typeFilter === "contact"}      onClick={() => setTypeFilter("contact")}>{t("filters.contact")}</FilterChip>
          <span className="mx-1 h-4 w-px bg-(--border) hidden sm:block" />
          <FilterChip active={statusFilter === "new"}        onClick={() => setStatusFilter(statusFilter === "new" ? "all" : "new")}>{t("filters.new")}</FilterChip>
          <FilterChip active={statusFilter === "contacted"}  onClick={() => setStatusFilter(statusFilter === "contacted" ? "all" : "contacted")}>{t("filters.contacted")}</FilterChip>
          <FilterChip active={statusFilter === "closed"}     onClick={() => setStatusFilter(statusFilter === "closed" ? "all" : "closed")}>{t("filters.closed")}</FilterChip>
        </div>
      </div>

      {/* Error state — most likely SQL migration not run yet */}
      {error && (
        <div className="surface flex items-start gap-3 p-5 border border-red-200 bg-red-50 rounded-xl">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">
              Could not load inquiries
            </p>
            <p className="text-xs text-red-500 mt-1">
              {(error as Error).message}
            </p>
            <p className="text-xs text-red-400 mt-2">
              Make sure you have run the SQL migration in Supabase (007_inquiries.sql)
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="surface h-24 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="surface flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">
            {search || typeFilter !== "all" || statusFilter !== "all" ? t("noResults") : t("emptyState.title")}
          </p>
          {!search && typeFilter === "all" && statusFilter === "all" && (
            <p className="text-xs text-(--text-muted) mt-1">{t("emptyState.description")}</p>
          )}
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((inquiry) => (
            <InquiryRow
              key={inquiry.id}
              inquiry={inquiry}
              t={t}
              onDelete={(id, name) => setDeleteTarget({ id, name })}
            />
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        itemName={deleteTarget?.name}
        onConfirm={handleDelete}
        loading={deleteInquiry.isPending}
      />
    </div>
  );
}
