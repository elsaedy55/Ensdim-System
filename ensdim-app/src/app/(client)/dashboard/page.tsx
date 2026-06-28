"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { ProjectStatusHeroCard } from "@/components/client/ProjectStatusHeroCard";
import { PendingActionsPanel } from "@/components/client/PendingActionsPanel";
import { MilestonesMiniList } from "@/components/client/MilestonesMiniList";
import { ActivityFeed } from "@/components/client/ActivityFeed";
import { FinancialSummaryStrip } from "@/components/client/FinancialSummaryStrip";
import { StartProjectCTA } from "@/components/client/StartProjectCTA";
import { SkeletonCard } from "@/components/ui/skeleton";
import { useProfile } from "@/store/auth.store";
import { useMyProject } from "@/hooks/useProject";
import { useMilestones } from "@/hooks/useMilestones";
import { useMyInvoices, useFinancialSummary } from "@/hooks/useInvoices";
import { useNotifications } from "@/hooks/useNotifications";
import { isInvoiceOverdue } from "@/lib/invoice-status";
import { ROUTES } from "@/constants/routes";
import type { MilestoneStatus } from "@/types";

export default function ClientDashboardPage() {
  const t       = useTranslations("dashboard");
  const profile = useProfile();

  const { data: project,    isLoading: projectLoading    } = useMyProject();
  const { data: milestones, isLoading: milestonesLoading } = useMilestones(project?.id);
  const { data: invoices,   isLoading: invoicesLoading   } = useMyInvoices();
  const { data: financial,  isLoading: financialLoading  } = useFinancialSummary();
  const { data: notifications, isLoading: notificationsLoading } = useNotifications();

  // Each section renders as soon as its own data is ready instead of
  // blocking on every query — milestones/invoices/financial/notifications
  // load independently, so a slow connection delays only the slowest card.
  const pendingActionsLoading = milestonesLoading || invoicesLoading;

  // Build pending actions from milestones + invoices
  const pendingActions = [
    ...(milestones ?? [])
      .filter((m) => m.status === "review")
      .map((m) => ({
        id:     m.id,
        type:   "milestone_review" as const,
        title:  "Review Milestone",
        body:   m.name + " is ready for your approval",
        href:   ROUTES.CLIENT.MILESTONE(m.id),
        urgent: false,
      })),
    ...(invoices ?? [])
      .filter((inv) => inv.status === "sent" || inv.status === "viewed")
      .map((inv) => ({
        id:     inv.id,
        type:   "invoice_due" as const,
        title:  inv.invoice_number,
        body:   `$${inv.total} due ${inv.due_date}`,
        href:   ROUTES.CLIENT.PAYMENT(inv.id),
        urgent: isInvoiceOverdue(inv),
      })),
  ];

  // Map milestones to mini list shape
  const miniMilestones = (milestones ?? []).map((m) => ({
    id:       m.id,
    name:     m.name,
    status:   m.status as MilestoneStatus,
    progress: m.progress,
    dueDate:  m.due_date,
  }));

  // Map notifications to activity feed shape
  const activities = (notifications ?? []).slice(0, 6).map((n) => ({
    id:          n.id,
    message:     n.body,
    userName:    "Team",
    createdAt:   n.created_at,
  }));

  // Map project to hero card shape
  const heroProject = project ? {
    id:            project.id,
    name:          project.name,
    status:        project.status as "development",
    health:        project.health as "on_track",
    progress:      project.progress,
    currentStage:  project.status,
    startDate:     project.start_date ?? "",
    targetDelivery: project.target_delivery ?? "",
    phasesCurrent: (milestones ?? []).filter((m) => m.status === "approved" || m.status === "completed").length,
    phasesTotal:   (milestones ?? []).length,
  } : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={profile ? t("welcome", { name: profile.name.split(" ")[0] }) : undefined}
      />

      <ProjectStatusHeroCard project={heroProject} isLoading={projectLoading || milestonesLoading} />

      {!projectLoading && !heroProject && <StartProjectCTA />}

      {pendingActionsLoading ? (
        <SkeletonCard />
      ) : pendingActions.length > 0 ? (
        <PendingActionsPanel actions={pendingActions} />
      ) : null}

      {financialLoading ? (
        <SkeletonCard />
      ) : financial ? (
        <FinancialSummaryStrip
          total={financial.total}
          paid={financial.paid}
          remaining={financial.remaining}
          nextDueDate={(invoices ?? []).find((i) => i.status === "sent")?.due_date}
          nextDueAmount={(invoices ?? []).find((i) => i.status === "sent")?.total}
        />
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {milestonesLoading ? <SkeletonCard /> : <MilestonesMiniList milestones={miniMilestones} />}
        </div>
        <div className="lg:col-span-2">
          {notificationsLoading ? <SkeletonCard /> : <ActivityFeed activities={activities} />}
        </div>
      </div>
    </div>
  );
}
