"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import { DueDateLabel } from "@/components/ui/due-date-label";
import { TeamMemberAvatarStack } from "@/components/ui/team-member-chip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Target, Layers, Users } from "lucide-react";
import { useMyProject, useProjectMembers } from "@/hooks/useProject";
import { useMilestones } from "@/hooks/useMilestones";
import { MilestonesPanel } from "@/components/client/MilestonesPanel";
import { RevisionsPanel } from "@/components/client/RevisionsPanel";
import { FilesPanel } from "@/components/client/FilesPanel";
import type { MilestoneRow, ProfileRow } from "@/lib/supabase/types";

// ─── Helpers ──────────────────────────────────────────────────────

// The "status" column is set once when the project is created and rarely
// updated afterwards, so it tends to drift (e.g. stuck on "planning").
// Derive the badge shown to the client from live progress instead.
function getDisplayStatus(project: { status: string; progress: number }): string {
  if (project.status === "on_hold") return "on_hold";
  if (project.progress >= 100) return "completed";
  if (project.progress > 0) return "in_progress";
  return "planning";
}

// ─── Overview Tab ─────────────────────────────────────────────────

function OverviewTab({
  project,
  milestones,
  t,
}: {
  project: NonNullable<ReturnType<typeof useMyProject>["data"]>;
  milestones: MilestoneRow[];
  t: ReturnType<typeof useTranslations>;
}) {
  const approvedCount = milestones.filter(
    (m) => m.status === "approved" || m.status === "completed",
  ).length;
  const tStatus = useTranslations("common.status");
  const currentStageLabel = milestones.find((m) => m.id === project.current_milestone_id)?.name ?? tStatus(project.status as string);

  return (
    <div className="space-y-5">
      {project.description && (
        <div className="surface p-5">
          <h3 className="text-sm font-semibold text-(--text-primary) mb-2">{t("project.overview.aboutTitle")}</h3>
          <p className="text-sm text-(--text-secondary) leading-relaxed">{project.description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="surface p-4">
          <div className="flex items-center gap-2 text-(--text-muted) mb-2">
            <CalendarDays className="h-3.5 w-3.5" />
            <span className="text-xs">{t("details.startDate")}</span>
          </div>
          <p className="text-sm font-semibold text-(--text-primary)">
            {project.start_date
              ? formatDate(project.start_date, { month: "short", day: "numeric", year: "numeric" })
              : "—"}
          </p>
        </div>
        <div className="surface p-4">
          <div className="flex items-center gap-2 text-(--text-muted) mb-2">
            <Target className="h-3.5 w-3.5" />
            <span className="text-xs">{t("details.targetDelivery")}</span>
          </div>
          {project.target_delivery
            ? <DueDateLabel date={project.target_delivery} className="text-sm font-semibold" />
            : <p className="text-sm text-(--text-primary)">—</p>}
        </div>
        <div className="surface p-4">
          <div className="flex items-center gap-2 text-(--text-muted) mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span className="text-xs">{t("details.currentStage")}</span>
          </div>
          <p className="text-sm font-semibold text-(--text-primary) capitalize">
            {currentStageLabel}
          </p>
        </div>
        <div className="surface p-4">
          <div className="flex items-center gap-2 text-(--text-muted) mb-2">
            <span className="text-xs">{t("details.health")}</span>
          </div>
          <StatusBadge status={project.health === "on_track" ? "approved" : "delayed"} />
        </div>
      </div>

      <div className="surface p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-(--text-primary)">{t("details.progress")}</h3>
          <span className="text-lg font-bold text-(--text-primary)">{project.progress}%</span>
        </div>
        <Progress value={project.progress} size="md" colorByValue />
        {milestones.length > 0 && (
          <p className="text-xs text-(--text-muted) mt-2">
            {t("hero.phaseOf", { n: approvedCount, total: milestones.length })}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Progress Tab ──────────────────────────────────────────────────

function ProgressTab({
  milestones,
  t,
}: {
  milestones: MilestoneRow[];
  t: ReturnType<typeof useTranslations>;
}) {
  const overall = milestones.length
    ? Math.round(milestones.reduce((acc, m) => acc + m.progress, 0) / milestones.length)
    : 0;

  const active = milestones.filter((m) => m.status === "in_progress");

  return (
    <div className="space-y-4">
      <div className="surface p-5">
        <div className="flex items-center gap-8 justify-center py-2 flex-wrap gap-y-4">
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={overall} size={72} strokeWidth={6} />
            <p className="text-xs text-(--text-muted)">{t("project.overview.overallLabel")}</p>
          </div>
          {active.map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-2">
              <CircularProgress value={m.progress} size={56} strokeWidth={5} />
              <p className="text-xs text-(--text-muted) max-w-16 text-center line-clamp-2">
                {m.name.split(":")[1]?.trim() ?? m.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {milestones.length > 0 && (
        <div className="surface p-5 space-y-4">
          <h3 className="text-sm font-semibold text-(--text-primary) mb-1">{t("milestones.title")}</h3>
          {milestones.map((m) => (
            <div key={m.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-(--text-primary) truncate max-w-[60%]">{m.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-(--text-muted)">{m.progress}%</span>
                  <StatusBadge status={m.status} showDot={false} size="sm" />
                </div>
              </div>
              <Progress value={m.progress} size="xs" colorByValue />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Team Tab ─────────────────────────────────────────────────────

function TeamTab({
  members,
  t,
}: {
  members: ProfileRow[];
  t: ReturnType<typeof useTranslations>;
}) {
  if (members.length === 0) {
    return (
      <div className="surface flex flex-col items-center justify-center py-12 text-center">
        <Users className="h-8 w-8 text-(--text-muted) mb-2" />
        <p className="text-sm text-(--text-muted)">Team members will appear here once assigned.</p>
      </div>
    );
  }

  const teamForStack = members.map((m) => ({ name: m.name, avatar: m.avatar_url ?? undefined }));

  return (
    <div className="surface p-5 space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("project.overview.teamTitle")}</h3>
        <TeamMemberAvatarStack members={teamForStack} max={4} />
      </div>
      {members.map((member) => (
        <div key={member.id} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-(--bg-muted) transition-colors">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-sm font-semibold">
            {member.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-(--text-primary)">{member.name}</p>
            <p className="text-xs text-(--text-muted) capitalize">{member.role?.replace("_", " ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function ProjectOverviewPage() {
  const tProject   = useTranslations("dashboard.project");
  const tDashboard = useTranslations("dashboard");
  const tNav       = useTranslations("common.nav");

  const { data: project,    isLoading: projectLoading }    = useMyProject();
  const { data: milestones, isLoading: milestonesLoading } = useMilestones(project?.id);
  const { data: members }                                  = useProjectMembers(project?.id);

  const isLoading = projectLoading || milestonesLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="surface flex flex-col items-center justify-center py-24 text-center mx-auto max-w-md">
        <Target className="h-10 w-10 text-(--text-muted) mb-3" />
        <p className="text-base font-semibold text-(--text-primary)">{tProject("noProject")}</p>
        <p className="mt-1.5 text-sm text-(--text-muted)">{tProject("noProjectDesc")}</p>
      </div>
    );
  }

  const milestoneList = milestones ?? [];
  const memberList    = members ?? [];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <PageHeader title={project.name} subtitle={tProject("pageTitle")} className="mb-0" />
        <StatusBadge status={getDisplayStatus(project)} size="md" />
      </div>

      <Tabs defaultValue="overview">
        <div className="overflow-x-auto">
          <TabsList variant="underline" className="w-max min-w-full">
            <TabsTrigger value="overview"   variant="underline">{tProject("tabs.overview")}</TabsTrigger>
            <TabsTrigger value="progress"   variant="underline">{tProject("tabs.progress")}</TabsTrigger>
            <TabsTrigger value="team"       variant="underline" count={memberList.length}>{tProject("tabs.team")}</TabsTrigger>
            <TabsTrigger value="milestones" variant="underline">{tNav("milestones")}</TabsTrigger>
            <TabsTrigger value="revisions"  variant="underline">{tNav("revisions")}</TabsTrigger>
            <TabsTrigger value="files"      variant="underline">{tNav("files")}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <OverviewTab project={project} milestones={milestoneList} t={tDashboard} />
        </TabsContent>
        <TabsContent value="progress">
          <ProgressTab milestones={milestoneList} t={tDashboard} />
        </TabsContent>
        <TabsContent value="team">
          <TeamTab members={memberList} t={tDashboard} />
        </TabsContent>
        <TabsContent value="milestones">
          <MilestonesPanel projectId={project.id} />
        </TabsContent>
        <TabsContent value="revisions">
          <RevisionsPanel projectId={project.id} />
        </TabsContent>
        <TabsContent value="files">
          <FilesPanel projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
