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
import { Plus, BookOpen, MoreHorizontal, Trash2, Eye, Pencil, Globe, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useResearchArticles,
  useDeleteResearchArticle,
  useToggleResearchPublished,
} from "@/hooks/useResearch";
import type { ResearchArticle } from "@/lib/services/research.service";

// ─── ArticleRow ────────────────────────────────────────────────────

function ArticleRow({
  article,
  onDelete,
  t,
  tc,
}: {
  article: ResearchArticle;
  onDelete: (id: string, title: string) => void;
  t: ReturnType<typeof useTranslations<"admin.research">>;
  tc: ReturnType<typeof useTranslations<"common.actions">>;
}) {
  const toggle = useToggleResearchPublished();

  const handleToggle = () => {
    toggle.mutate(
      { id: article.id, isPublished: !article.is_published },
      {
        onSuccess: () =>
          toast.success(
            article.is_published
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
      {article.image_url ? (
        <img
          src={article.image_url}
          alt={article.title_en}
          className="w-14 h-14 rounded-lg object-cover shrink-0 hidden sm:block"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-(--bg-muted) flex items-center justify-center shrink-0 hidden sm:block">
          <BookOpen className="h-5 w-5 text-(--text-muted)" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-sm font-semibold text-(--text-primary) truncate">
            {article.title_en}
          </span>
          <span
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0",
              article.is_published
                ? "bg-green-100 text-green-700"
                : "bg-(--bg-muted) text-(--text-muted)"
            )}
          >
            {article.is_published ? t("list.published") : t("list.draft")}
          </span>
        </div>
        <p className="text-xs text-(--text-muted) truncate">{article.title_ar}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-(--text-muted)">
          <span className="px-2 py-0.5 bg-(--bg-muted) rounded-full">{article.category_en}</span>
          <span>{article.read_time} {t("list.minRead")}</span>
          {article.published_at && (
            <span>
              {t("list.publishedOn")}{" "}
              {formatDate(article.published_at, { month: "short", day: "numeric", year: "numeric" })}
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
          {article.is_published ? (
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
                href={ROUTES.ADMIN.RESEARCH_EDIT(article.id)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" /> {tc("edit")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`http://localhost:5173/research/${article.slug}`}
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
              onClick={() => onDelete(article.id, article.title_en)}
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

export default function AdminResearchPage() {
  const t  = useTranslations("admin.research");
  const tc = useTranslations("common.actions");
  const { data: articles, isLoading, error } = useResearchArticles();
  const deleteArticle = useDeleteResearchArticle();

  const [search, setSearch]     = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; title: string } | null>(null);

  const list     = articles ?? [];
  const filtered = search
    ? list.filter(
        (a) =>
          a.title_en.toLowerCase().includes(search.toLowerCase()) ||
          a.title_ar.includes(search) ||
          a.slug.toLowerCase().includes(search.toLowerCase())
      )
    : list;

  const publishedCount = list.filter((a) => a.is_published).length;

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteArticle.mutate(deleteTarget.id, {
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
            <Link href={ROUTES.ADMIN.RESEARCH_NEW}>
              <Plus className="h-4 w-4" /> {t("list.newArticle")}
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
              Could not load research articles
            </p>
            <p className="text-xs text-red-500 mt-1">
              {(error as Error).message}
            </p>
            <p className="text-xs text-red-400 mt-2">
              Make sure you have run the SQL migration in Supabase (supabase-research-migration.sql)
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
          <BookOpen className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">
            {search ? t("list.noResults") : t("list.emptyState.title")}
          </p>
          {!search && (
            <>
              <p className="text-xs text-(--text-muted) mt-1">{t("list.emptyState.description")}</p>
              <Button size="sm" className="mt-4" asChild>
                <Link href={ROUTES.ADMIN.RESEARCH_NEW}>
                  <Plus className="h-4 w-4" /> {t("list.emptyState.action")}
                </Link>
              </Button>
            </>
          )}
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((article) => (
            <ArticleRow
              key={article.id}
              article={article}
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
        loading={deleteArticle.isPending}
      />
    </div>
  );
}
