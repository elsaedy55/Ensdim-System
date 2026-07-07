"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MilestoneTimeline } from "@/components/client/MilestoneTimeline";
import { SkeletonMilestone } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatDate, cn } from "@/lib/utils";
import { Flag, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import type { MilestoneStatus } from "@/types";

type MilestoneRow = {
  id: string; name: string; status: string; progress: number;
  due_date: string; completed_at: string | null; order: number;
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  pending:     <Clock className="h-4 w-4 text-(--text-muted)" />,
  in_progress: <div className="h-4 w-4 rounded-full border-2 border-(--accent) border-t-transparent animate-spin" />,
  review:      <AlertTriangle className="h-4 w-4 text-(--warning)" />,
  approved:    <CheckCircle2 className="h-4 w-4 text-(--success)" />,
  completed:   <CheckCircle2 className="h-4 w-4 text-(--success)" />,
  delayed:     <AlertTriangle className="h-4 w-4 text-(--danger)" />,
};

function MilestoneCard({ m }: { m: MilestoneRow }) {
  const t       = useTranslations("milestones");
  const isReview = m.status === "review";
  const isDone   = m.status === "approved" || m.status === "completed";

  return (
    <div className={cn("surface p-5 transition-all hover:shadow-(--shadow-md)", isReview && "border-(--warning-muted)")}>
      <div className="flex items-start gap-4">
        <div className="mt-0.5 shrink-0">{STATUS_ICON[m.status]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="text-sm font-semibold text-(--text-primary)">
              <Link href={ROUTES.CLIENT.MILESTONE(m.id)} className="hover:text-(--accent) transition-colors">{m.name}</Link>
            </h3>
            <StatusBadge status={m.status} />
          </div>
          {!isDone && m.progress > 0 && <Progress value={m.progress} size="xs" colorByValue className="mb-3" />}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-(--text-muted)">
              <span>{t("card.due", { date: formatDate(m.due_date, { month: "short", day: "numeric" }) })}</span>
              {isDone && m.completed_at && (
                <span className="text-(--success)">{t("card.completedOn", { date: formatDate(m.completed_at, { month: "short", day: "numeric" }) })}</span>
              )}
            </div>
            {isReview ? (
              <Button size="sm" asChild>
                <Link href={ROUTES.CLIENT.MILESTONE(m.id)}>{t("card.review")} <ArrowRight className="h-3 w-3 rtl:scale-x-[-1]" /></Link>
              </Button>
            ) : (
              <Link href={ROUTES.CLIENT.MILESTONE(m.id)} className="text-xs text-(--accent) hover:text-(--accent-hover) inline-flex items-center gap-1">
                {t("card.viewDetails")} <ArrowRight className="h-3 w-3 rtl:scale-x-[-1]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MilestonesPanel({ projectId }: { projectId: string | undefined }) {
  const t = useTranslations("milestones");
  const { data: milestones, isLoading } = useMilestones(projectId);

  const list = milestones ?? [];
  const counts = {
    all:     list.length,
    review:  list.filter((m) => m.status === "review").length,
    active:  list.filter((m) => m.status === "in_progress").length,
    done:    list.filter((m) => m.status === "approved" || m.status === "completed").length,
    pending: list.filter((m) => m.status === "pending").length,
  };
  const overall = list.length ? Math.round(list.reduce((s, m) => s + m.progress, 0) / list.length) : 0;

  const handleTimelineSelect = (id: string) =>
    document.getElementById(`milestone-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });

  if (isLoading) {
    return <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <SkeletonMilestone key={i} />)}</div>;
  }

  return (
    <div className="space-y-4">
      <MilestoneTimeline
        milestones={list.map((m) => ({ id: m.id, name: m.name, status: m.status as MilestoneStatus, dueDate: m.due_date, order: m.order }))}
        onSelect={handleTimelineSelect}
      />

      <div className="surface p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-(--text-primary)">{t("page.overallProgress")}</span>
          <span className="text-lg font-bold text-(--text-primary)">{overall}%</span>
        </div>
        <Progress value={overall} size="md" colorByValue />
        <div className="flex items-center gap-6 mt-3 text-xs text-(--text-muted) flex-wrap">
          <span>{t("stats.completed",  { count: counts.done })}</span>
          <span>{t("stats.inProgress", { count: counts.active })}</span>
          <span>{t("stats.upcoming",   { count: counts.pending })}</span>
          {counts.review > 0 && <span className="text-(--warning) font-medium">{t("stats.awaitingReview", { count: counts.review })}</span>}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList variant="underline" className="w-full">
          <TabsTrigger value="all"    variant="underline" count={counts.all}>{t("tabs.all")}</TabsTrigger>
          <TabsTrigger value="review" variant="underline" count={counts.review}>{t("tabs.review")}</TabsTrigger>
          <TabsTrigger value="active" variant="underline" count={counts.active}>{t("tabs.active")}</TabsTrigger>
          <TabsTrigger value="done"   variant="underline" count={counts.done}>{t("tabs.completed")}</TabsTrigger>
        </TabsList>

        {(["all", "review", "active", "done"] as const).map((tab) => {
          const filtered =
            tab === "review" ? list.filter((m) => m.status === "review") :
            tab === "active" ? list.filter((m) => m.status === "in_progress") :
            tab === "done"   ? list.filter((m) => m.status === "approved" || m.status === "completed") :
            list;
          return (
            <TabsContent key={tab} value={tab} className="space-y-3">
              {filtered.length === 0 ? (
                <div className="surface flex flex-col items-center justify-center py-16 text-center">
                  <Flag className="h-10 w-10 text-(--text-muted) mb-3" />
                  <p className="text-sm text-(--text-muted)">{t("emptyState.title")}</p>
                </div>
              ) : (
                filtered.map((m) => <div key={m.id} id={`milestone-${m.id}`}><MilestoneCard m={m} /></div>)
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
