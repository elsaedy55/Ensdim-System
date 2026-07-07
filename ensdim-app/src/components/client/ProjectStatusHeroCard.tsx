"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { CalendarDays, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ProjectStatus, ProjectHealth } from "@/types";

interface ProjectCardData {
  id: string;
  name: string;
  status: ProjectStatus;
  health: ProjectHealth;
  progress: number;
  currentStage: string;
  startDate: string;
  targetDelivery: string;
  phasesCurrent: number;
  phasesTotal: number;
}

interface ProjectStatusHeroCardProps {
  project: ProjectCardData | null;
  isLoading?: boolean;
}

export function ProjectStatusHeroCard({ project, isLoading }: ProjectStatusHeroCardProps) {
  const t = useTranslations("dashboard.hero");

  if (isLoading) {
    return (
      <div className="surface p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2 flex-1">
            <div className="h-6 w-64 bg-(--bg-muted) rounded" />
            <div className="h-4 w-40 bg-(--bg-muted) rounded" />
          </div>
          <div className="h-6 w-24 bg-(--bg-muted) rounded-full" />
        </div>
        <div className="h-2 w-full bg-(--bg-muted) rounded-full mb-3" />
        <div className="flex justify-between">
          <div className="h-3 w-32 bg-(--bg-muted) rounded" />
          <div className="h-3 w-32 bg-(--bg-muted) rounded" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="surface p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--bg-muted)">
          <Target className="h-6 w-6 text-(--text-muted)" />
        </div>
        <h3 className="text-base font-semibold text-(--text-primary)">{t("noProject")}</h3>
        <p className="mt-1.5 text-sm text-(--text-muted) max-w-xs mx-auto">{t("noProjectDesc")}</p>
      </div>
    );
  }

  const isDelayed = project.health === "delayed";
  const isOnTrack = project.health === "on_track";

  return (
    <div className={cn("surface p-6 transition-shadow hover:shadow-(--shadow-md)", isDelayed && "border-(--danger-muted)")}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-(--text-primary) truncate">{project.name}</h2>
          <p className="text-sm text-(--text-muted) mt-0.5">
            {t("phaseOf", { n: project.phasesCurrent, total: project.phasesTotal })} — {project.currentStage}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isDelayed && <AlertTriangle className="h-4 w-4 text-(--danger)" />}
          {isOnTrack && <CheckCircle2 className="h-4 w-4 text-(--success)" />}
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-(--text-secondary)">{t("overallProgress")}</span>
          <span className="text-sm font-bold text-(--text-primary)">{project.progress}%</span>
        </div>
        <Progress value={project.progress} size="md" colorByValue />
      </div>

      {/* Timeline */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-(--border)">
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-3.5 w-3.5 text-(--text-muted) shrink-0" />
          <span className="text-(--text-muted)">{t("started", { date: formatDate(project.startDate, { month: "short", day: "numeric", year: "numeric" }) })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target className="h-3.5 w-3.5 text-(--text-muted) shrink-0" />
          <span className={cn("font-medium", isDelayed ? "text-(--danger)" : "text-(--text-secondary)")}>
            {t("estimatedDelivery", { date: formatDate(project.targetDelivery, { month: "short", day: "numeric", year: "numeric" }) })}
          </span>
          {isDelayed && <span className="text-xs text-(--danger) font-medium">{t("delayed")}</span>}
        </div>
      </div>
    </div>
  );
}
