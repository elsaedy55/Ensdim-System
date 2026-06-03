"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import type { MilestoneStatus } from "@/types";

interface MiniMilestone {
  id: string;
  name: string;
  status: MilestoneStatus;
  progress: number;
  dueDate: string;
}

function MiniMilestoneRow({ milestone: m }: { milestone: MiniMilestone }) {
  const t       = useTranslations("dashboard.milestones");
  const isReview = m.status === "review";
  const isDone   = m.status === "approved" || m.status === "completed";

  return (
    <div className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 -mx-1 transition-colors",
      isReview ? "bg-(--warning-subtle) border border-(--warning-muted)" : "hover:bg-(--bg-muted)"
    )}>
      <div className="shrink-0">
        {isDone
          ? <CheckCircle2 className="h-4 w-4 text-(--success)" />
          : <Clock className={cn("h-4 w-4", isReview ? "text-(--warning)" : "text-(--text-muted)")} />
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-(--text-primary) truncate">{m.name}</p>
        {!isDone && m.progress > 0 && (
          <div className="mt-1"><Progress value={m.progress} size="xs" /></div>
        )}
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <StatusBadge status={m.status} showDot={false} />
        {isReview && (
          <Button size="sm" variant="primary" asChild>
            <Link href={ROUTES.CLIENT.MILESTONE(m.id)}>
              {t("review")}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export function MilestonesMiniList({ milestones }: { milestones: MiniMilestone[] }) {
  const t = useTranslations("dashboard.milestones");

  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-(--text-primary)">{t("title")}</h2>
        <Link
          href={ROUTES.CLIENT.MILESTONES}
          className="text-xs text-(--accent) hover:text-(--accent-hover) transition-colors"
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="space-y-1">
        {milestones.map((m) => <MiniMilestoneRow key={m.id} milestone={m} />)}
      </div>
    </div>
  );
}
