"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { formatDate, cn } from "@/lib/utils";
import {
  UserPlus, MoreHorizontal, Trash2, AlertTriangle,
  Phone, RotateCcw, Star, CheckCircle2, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useJobApplications,
  useUpdateJobApplicationStatus,
  useDeleteJobApplication,
} from "@/hooks/useJobApplications";
import { JobApplicationDetailsDialog } from "@/components/admin/JobApplicationDetailsDialog";
import type { JobApplication, JobApplicationStatus } from "@/lib/services/job-applications.service";

// ─── Helpers ───────────────────────────────────────────────────────

function waLink(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

const STATUS_STYLE: Record<JobApplicationStatus, { className: string; dot: string }> = {
  new:         { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",               dot: "bg-(--accent)" },
  reviewing:   { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)", dot: "bg-(--warning)" },
  shortlisted: { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)", dot: "bg-(--success)" },
  rejected:    { className: "bg-red-50 text-red-600 border-red-200",                                       dot: "bg-red-500" },
  hired:       { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)", dot: "bg-(--success)" },
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

// ─── ApplicationRow ────────────────────────────────────────────────

function ApplicationRow({
  application,
  onDelete,
  onOpen,
  t,
}: {
  application: JobApplication;
  onDelete: (application: JobApplication) => void;
  onOpen: (application: JobApplication) => void;
  t: ReturnType<typeof useTranslations<"admin.jobApplications">>;
}) {
  const updateStatus = useUpdateJobApplicationStatus();

  const handleStatus = (status: JobApplicationStatus) => {
    updateStatus.mutate(
      { id: application.id, status },
      {
        onSuccess: () => toast.success(t("success.statusUpdated")),
        onError: (e) => toast.error(e.message),
      }
    );
  };

  const statusStyle = STATUS_STYLE[application.status];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(application)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(application); }}
      className="surface flex items-center gap-4 p-4 hover:shadow-sm transition-shadow group cursor-pointer"
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-(--bg-muted) flex items-center justify-center shrink-0 sm:flex">
        <UserPlus className="h-5 w-5 text-(--text-muted)" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-sm font-semibold text-(--text-primary) truncate">
            {application.full_name}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border shrink-0 bg-(--bg-muted) text-(--text-secondary) border-(--border)">
            {application.position}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0",
              statusStyle.className,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusStyle.dot)} />
            {t(`status.${application.status}`)}
          </span>
        </div>
        <a
          href={waLink(application.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-(--text-muted) hover:text-(--accent) transition-colors"
          dir="ltr"
        >
          <Phone className="h-3 w-3" /> {application.whatsapp}
        </a>
        <p className="text-xs text-(--text-muted) truncate mt-1">
          {application.email} · {application.experience_level} · {application.years_of_experience}
        </p>
        <p className="text-[11px] text-(--text-muted) mt-1">
          {t("fields.submittedOn")} {formatDate(application.created_at, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex items-center gap-1.5 text-xs">
          <a href={waLink(application.whatsapp)} target="_blank" rel="noopener noreferrer">
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
            {application.status !== "reviewing" && (
              <DropdownMenuItem onClick={() => handleStatus("reviewing")} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" /> {t("actions.markReviewing")}
              </DropdownMenuItem>
            )}
            {application.status !== "shortlisted" && (
              <DropdownMenuItem onClick={() => handleStatus("shortlisted")} className="flex items-center gap-2">
                <Star className="h-4 w-4" /> {t("actions.markShortlisted")}
              </DropdownMenuItem>
            )}
            {application.status !== "hired" && (
              <DropdownMenuItem onClick={() => handleStatus("hired")} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {t("actions.markHired")}
              </DropdownMenuItem>
            )}
            {application.status !== "rejected" && (
              <DropdownMenuItem onClick={() => handleStatus("rejected")} className="flex items-center gap-2">
                <XCircle className="h-4 w-4" /> {t("actions.markRejected")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => onDelete(application)}
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

type StatusFilter = "all" | JobApplicationStatus;

export default function AdminCareersPage() {
  const t = useTranslations("admin.jobApplications");
  const { data: applications, isLoading, error } = useJobApplications();
  const deleteApplication = useDeleteJobApplication();

  const [search, setSearch]             = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [deleteTarget, setDeleteTarget] = React.useState<JobApplication | null>(null);
  const [detailsTarget, setDetailsTarget] = React.useState<JobApplication | null>(null);

  const list = applications ?? [];

  const newCount         = list.filter((a) => a.status === "new").length;
  const reviewingCount   = list.filter((a) => a.status === "reviewing").length;
  const shortlistedCount = list.filter((a) => a.status === "shortlisted").length;

  const filtered = list.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.full_name.toLowerCase().includes(q) ||
        a.whatsapp.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteApplication.mutate(deleteTarget, {
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
        subtitle={t("subtitle", { total: list.length, new: newCount, reviewing: reviewingCount, shortlisted: shortlistedCount })}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("searchPlaceholder")}
          className="max-w-xs"
        />

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={statusFilter === "all"}         onClick={() => setStatusFilter("all")}>{t("filters.all")}</FilterChip>
          <FilterChip active={statusFilter === "new"}         onClick={() => setStatusFilter(statusFilter === "new" ? "all" : "new")}>{t("filters.new")}</FilterChip>
          <FilterChip active={statusFilter === "reviewing"}   onClick={() => setStatusFilter(statusFilter === "reviewing" ? "all" : "reviewing")}>{t("filters.reviewing")}</FilterChip>
          <FilterChip active={statusFilter === "shortlisted"} onClick={() => setStatusFilter(statusFilter === "shortlisted" ? "all" : "shortlisted")}>{t("filters.shortlisted")}</FilterChip>
          <FilterChip active={statusFilter === "hired"}       onClick={() => setStatusFilter(statusFilter === "hired" ? "all" : "hired")}>{t("filters.hired")}</FilterChip>
          <FilterChip active={statusFilter === "rejected"}    onClick={() => setStatusFilter(statusFilter === "rejected" ? "all" : "rejected")}>{t("filters.rejected")}</FilterChip>
        </div>
      </div>

      {/* Error state — most likely SQL migration not run yet */}
      {error && (
        <div className="surface flex items-start gap-3 p-5 border border-red-200 bg-red-50 rounded-xl">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">
              Could not load job applications
            </p>
            <p className="text-xs text-red-500 mt-1">
              {(error as Error).message}
            </p>
            <p className="text-xs text-red-400 mt-2">
              Make sure you have run the SQL migration in Supabase (021_job_applications.sql)
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
          <UserPlus className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">
            {search || statusFilter !== "all" ? t("noResults") : t("emptyState.title")}
          </p>
          {!search && statusFilter === "all" && (
            <p className="text-xs text-(--text-muted) mt-1">{t("emptyState.description")}</p>
          )}
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((application) => (
            <ApplicationRow
              key={application.id}
              application={application}
              t={t}
              onDelete={(app) => setDeleteTarget(app)}
              onOpen={(app) => setDetailsTarget(app)}
            />
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        itemName={deleteTarget?.full_name}
        onConfirm={handleDelete}
        loading={deleteApplication.isPending}
      />

      <JobApplicationDetailsDialog
        application={detailsTarget}
        onOpenChange={(open) => !open && setDetailsTarget(null)}
      />
    </div>
  );
}
