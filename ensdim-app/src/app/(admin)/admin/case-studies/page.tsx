"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { ROUTES } from "@/constants/routes";
import { formatDate, cn } from "@/lib/utils";
import { Plus, Briefcase, MoreHorizontal, Trash2, Eye, Pencil, Globe, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCaseStudies,
  useDeleteCaseStudy,
  useToggleCaseStudyPublished,
} from "@/hooks/useCaseStudies";
import type { CaseStudy } from "@/lib/services/case-studies.service";
import { useUrlState } from "@/hooks/useUrlState";

// ─── CaseStudyRow ──────────────────────────────────────────────────

function CaseStudyRow({
  study,
  onDelete,
  t,
  tc,
}: {
  study: CaseStudy;
  onDelete: (id: string, title: string) => void;
  t: ReturnType<typeof useTranslations<"admin.caseStudies">>;
  tc: ReturnType<typeof useTranslations<"common.actions">>;
}) {
  const toggle = useToggleCaseStudyPublished();

  const handleToggle = () => {
    toggle.mutate(
      { id: study.id, isPublished: !study.is_published },
      {
        onSuccess: () =>
          toast.success(
            study.is_published
              ? t("form.success.unpublished")
              : t("form.success.published")
          ),
        onError: (e) => toast.error(e.message),
      }
    );
  };

  return (
    <div className="surface flex items-center gap-4 p-4 hover:shadow-sm transition-shadow group">
      {/* Thumbnail */}
      {study.image_url ? (
        <img
          src={study.image_url}
          alt={study.title_en}
          className="w-14 h-14 rounded-lg object-cover shrink-0 hidden sm:block"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-(--bg-muted) flex items-center justify-center shrink-0 sm:block">
          <Briefcase className="h-5 w-5 text-(--text-muted)" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-sm font-semibold text-(--text-primary) truncate">
            {study.title_en}
          </span>
          <span
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0",
              study.is_published
                ? "bg-green-100 text-green-700"
                : "bg-(--bg-muted) text-(--text-muted)"
            )}
          >
            {study.is_published ? t("list.published") : t("list.draft")}
          </span>
        </div>
        <p className="text-xs text-(--text-muted) truncate">{study.title_ar}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-(--text-muted)">
          <span className="px-2 py-0.5 bg-(--bg-muted) rounded-full">{study.sector_en}</span>
          {study.published_at && (
            <span>
              {t("list.publishedOn")}{" "}
              {formatDate(study.published_at, { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          disabled={toggle.isPending}
          className="hidden sm:flex items-center gap-1.5 text-xs"
        >
          {study.is_published ? (
            <><EyeOff className="h-3.5 w-3.5" /> {t("list.unpublish")}</>
          ) : (
            <><Globe className="h-3.5 w-3.5" /> {t("list.publish")}</>
          )}
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
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link
                href={ROUTES.ADMIN.CASE_STUDIES_EDIT(study.id)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" /> {tc("edit")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://www.ensdim.com/case-studies/${study.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" /> {t("list.previewOnSite")}
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => onDelete(study.id, study.title_en)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function AdminCaseStudiesPage() {
  const t  = useTranslations("admin.caseStudies");
  const tc = useTranslations("common.actions");
  const { data: studies, isLoading, error } = useCaseStudies();
  const deleteStudy = useDeleteCaseStudy();

  const [search, setSearch] = useUrlState("q");
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; title: string } | null>(null);

  const list     = studies ?? [];
  const filtered = search
    ? list.filter(
        (s) =>
          s.title_en.toLowerCase().includes(search.toLowerCase()) ||
          s.title_ar.includes(search) ||
          s.slug.toLowerCase().includes(search.toLowerCase())
      )
    : list;

  const publishedCount = list.filter((s) => s.is_published).length;

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteStudy.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(t("form.success.deleted"));
        setDeleteTarget(null);
      },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("list.title")}
        subtitle={t("list.subtitle", { total: list.length, published: publishedCount })}
        actions={
          <Button asChild>
            <Link href={ROUTES.ADMIN.CASE_STUDIES_NEW}>
              <Plus className="h-4 w-4" /> {t("list.newCaseStudy")}
            </Link>
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("list.searchPlaceholder")}
          className="max-w-xs"
        />
      </div>

      {/* Error state — most likely SQL migration not run yet */}
      {error && (
        <div className="surface flex items-start gap-3 p-5 border border-red-200 bg-red-50 rounded-xl">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">
              Could not load case studies
            </p>
            <p className="text-xs text-red-500 mt-1">
              {(error as Error).message}
            </p>
            <p className="text-xs text-red-400 mt-2">
              Make sure you have run the SQL migration in Supabase (019_case_studies.sql)
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="surface h-20 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="surface flex flex-col items-center justify-center py-16 text-center">
          <Briefcase className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">
            {search ? t("list.noResults") : t("list.emptyState.title")}
          </p>
          {!search && (
            <>
              <p className="text-xs text-(--text-muted) mt-1">{t("list.emptyState.description")}</p>
              <Button size="sm" className="mt-4" asChild>
                <Link href={ROUTES.ADMIN.CASE_STUDIES_NEW}>
                  <Plus className="h-4 w-4" /> {t("list.emptyState.action")}
                </Link>
              </Button>
            </>
          )}
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((study) => (
            <CaseStudyRow
              key={study.id}
              study={study}
              t={t}
              tc={tc}
              onDelete={(id, title) => setDeleteTarget({ id, title })}
            />
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        itemName={deleteTarget?.title}
        onConfirm={handleDelete}
        loading={deleteStudy.isPending}
      />
    </div>
  );
}
