"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { MilestoneStatus, RevisionStatus, InvoiceStatus, TaskStatus, ProjectStatus, ClientStatus, RevisionPriority } from "@/types";

// Maps raw status value → i18n key in common.status
const STATUS_I18N: Record<string, string> = {
  pending:       "pending",
  in_progress:   "inProgress",
  review:        "review",
  in_review:     "inReview",
  approved:      "approved",
  completed:     "completed",
  delayed:       "delayed",
  rejected:      "rejected",
  done:          "done",
  blocked:       "blocked",
  todo:          "todo",
  draft:         "draft",
  sent:          "sent",
  viewed:        "viewed",
  paid:          "paid",
  overdue:       "overdue",
  cancelled:     "cancelled",
  open:          "open",
  on_hold:       "onHold",
  planning:      "planning",
  ui_ux:         "uiUx",
  development:   "development",
  testing:       "testing",
  delivery:      "delivery",
  maintenance:   "maintenance",
  on_track:      "onTrack",
  at_risk:       "atRisk",
  lead:          "lead",
  interested:    "interested",
  proposal_sent: "proposalSent",
  negotiation:   "negotiation",
  active:        "activeClient",
  lost:          "lost",
};

// Visual style — stays the same regardless of language
const STATUS_STYLE: Record<string, { className: string; dot: string }> = {
  pending:       { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",                         dot: "bg-(--text-muted)" },
  in_progress:   { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",                      dot: "bg-(--accent)" },
  review:        { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  in_review:     { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  approved:      { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  completed:     { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  delayed:       { className: "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",            dot: "bg-(--danger)" },
  rejected:      { className: "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",            dot: "bg-(--danger)" },
  done:          { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  blocked:       { className: "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",            dot: "bg-(--danger)" },
  todo:          { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",                         dot: "bg-(--text-muted)" },
  draft:         { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",                         dot: "bg-(--text-muted)" },
  sent:          { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",                      dot: "bg-(--accent)" },
  viewed:        { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  paid:          { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  overdue:       { className: "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",            dot: "bg-(--danger)" },
  cancelled:     { className: "bg-(--bg-muted) text-(--text-muted) border-(--border)",                             dot: "bg-(--text-muted)" },
  open:          { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",                      dot: "bg-(--accent)" },
  on_hold:       { className: "bg-(--bg-muted) text-(--text-muted) border-(--border)",                             dot: "bg-(--text-muted)" },
  planning:      { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",                         dot: "bg-(--text-muted)" },
  ui_ux:         { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",                      dot: "bg-(--accent)" },
  development:   { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",                      dot: "bg-(--accent)" },
  testing:       { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  delivery:      { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  maintenance:   { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",                         dot: "bg-(--text-muted)" },
  on_track:      { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  at_risk:       { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  lead:          { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",                         dot: "bg-(--text-muted)" },
  interested:    { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",                      dot: "bg-(--accent)" },
  proposal_sent: { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  negotiation:   { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",         dot: "bg-(--warning)" },
  active:        { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)",         dot: "bg-(--success)" },
  lost:          { className: "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",            dot: "bg-(--danger)" },
};

const DEFAULT_STYLE = { className: "bg-(--bg-muted) text-(--text-secondary) border-(--border)", dot: "bg-(--text-muted)" };

type AnyStatus = MilestoneStatus | RevisionStatus | InvoiceStatus | TaskStatus | ProjectStatus | ClientStatus;

interface StatusBadgeProps {
  status: AnyStatus | string;
  showDot?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, showDot = true, size = "sm", className }: StatusBadgeProps) {
  const t      = useTranslations("common.status");
  const style  = STATUS_STYLE[status] ?? DEFAULT_STYLE;
  const i18nKey = STATUS_I18N[status];
  const label  = i18nKey ? t(i18nKey) : status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-2.5 py-1 text-xs",
        style.className,
        className
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", style.dot)} />}
      {label}
    </span>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────

const PRIORITY_STYLE: Record<RevisionPriority, string> = {
  high:   "text-(--danger-foreground) bg-(--danger-subtle) border-(--danger-muted)",
  medium: "text-(--warning-foreground) bg-(--warning-subtle) border-(--warning-muted)",
  low:    "text-(--text-secondary) bg-(--bg-muted) border-(--border)",
};

interface PriorityBadgeProps {
  priority: RevisionPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const t = useTranslations("common.priority");
  const labels: Record<RevisionPriority, string> = {
    high:   t("high"),
    medium: t("medium"),
    low:    t("low"),
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
      PRIORITY_STYLE[priority],
      className
    )}>
      {labels[priority]}
    </span>
  );
}
