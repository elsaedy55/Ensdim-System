"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { StatusBadge, PriorityBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatRelativeTime } from "@/lib/utils";
import { Plus, MessageSquare } from "lucide-react";
import { useRevisions } from "@/hooks/useRevisions";

// ─── Category colors ──────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  bug:      "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",
  revision: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",
  feature:  "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",
  question: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",
};

// ─── RevisionCard ─────────────────────────────────────────────────

function RevisionCard({ r }: { r: ReturnType<typeof useRevisions>["data"] extends (infer T)[] | undefined ? T : never }) {
  const t = useTranslations("revisions");

  return (
    <Link
      href={ROUTES.CLIENT.REVISION(r.id)}
      className="block surface p-4 hover:shadow-(--shadow-md) transition-all group"
    >
      <div className="flex items-start gap-3 rtl:flex-row-reverse">
        <span className={`mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${CATEGORY_COLORS[r.category] ?? CATEGORY_COLORS.question}`}>
          {t(`categories.${r.category}` as Parameters<typeof t>[0])}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5 rtl:flex-row-reverse">
            <p className="text-sm font-semibold text-(--text-primary) group-hover:text-(--accent) transition-colors line-clamp-1 rtl:text-right">
              #{r.id.slice(-6).toUpperCase()} {r.title}
            </p>
            <StatusBadge status={r.status} showDot={false} size="sm" />
          </div>

          <div className="flex items-center gap-3 text-xs text-(--text-muted) flex-wrap rtl:flex-row-reverse">
            <PriorityBadge priority={r.priority as "high" | "medium" | "low"} />
            {(r as any).milestones?.name && (
              <span>{t("card.linkedTo", { milestone: (r as any).milestones.name })}</span>
            )}
            {(r as any).assigned_profile?.name && (
              <span>→ {(r as any).assigned_profile.name}</span>
            )}
            <span className="ms-auto">{formatRelativeTime(r.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Panel ────────────────────────────────────────────────────────

export function RevisionsPanel({ projectId, showNewButton = true }: { projectId: string | undefined; showNewButton?: boolean }) {
  const t = useTranslations("revisions");
  const { data: revisions, isLoading } = useRevisions(projectId);

  const list = revisions ?? [];

  const counts = {
    all:    list.length,
    open:   list.filter((r) => r.status === "open" || r.status === "in_review").length,
    active: list.filter((r) => r.status === "in_progress").length,
    done:   list.filter((r) => r.status === "done" || r.status === "rejected").length,
  };

  const EmptyRevisions = () => (
    <div className="surface flex flex-col items-center justify-center py-16 text-center">
      <MessageSquare className="h-10 w-10 text-(--text-muted) mb-3" />
      <p className="text-sm font-medium text-(--text-primary)">{t("emptyState.title")}</p>
      <p className="text-xs text-(--text-muted) mt-1">{t("emptyState.description")}</p>
      <Button size="sm" className="mt-4" asChild>
        <Link href={ROUTES.CLIENT.REVISION_NEW}>
          <Plus className="h-4 w-4" /> {t("new.title")}
        </Link>
      </Button>
    </div>
  );

  if (isLoading) {
    return <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>;
  }

  return (
    <div className="space-y-4">
      {showNewButton && (
        <div className="flex justify-end">
          <Button asChild>
            <Link href={ROUTES.CLIENT.REVISION_NEW} className="rtl:flex-row-reverse">
              <Plus className="h-4 w-4" />
              {t("new.title")}
            </Link>
          </Button>
        </div>
      )}

      <Tabs defaultValue="all">
        <TabsList variant="underline" className="w-full rtl:flex-row-reverse">
          <TabsTrigger value="all"    variant="underline" count={counts.all}>{t("tabs.all")}</TabsTrigger>
          <TabsTrigger value="open"   variant="underline" count={counts.open}>{t("tabs.open")}</TabsTrigger>
          <TabsTrigger value="active" variant="underline" count={counts.active}>{t("tabs.active")}</TabsTrigger>
          <TabsTrigger value="done"   variant="underline" count={counts.done}>{t("tabs.done")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {list.length === 0 ? <EmptyRevisions /> : list.map((r) => <RevisionCard key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="open" className="space-y-3">
          {list.filter((r) => r.status === "open" || r.status === "in_review").map((r) => <RevisionCard key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="active" className="space-y-3">
          {list.filter((r) => r.status === "in_progress").map((r) => <RevisionCard key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="done" className="space-y-3">
          {list.filter((r) => r.status === "done" || r.status === "rejected").map((r) => <RevisionCard key={r.id} r={r} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
