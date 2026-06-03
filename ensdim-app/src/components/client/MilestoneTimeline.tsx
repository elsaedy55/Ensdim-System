"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn, formatDate } from "@/lib/utils";
import { CheckCircle2, Circle, Loader } from "lucide-react";
import type { MilestoneStatus } from "@/types";

interface TimelineItem {
  id: string;
  name: string;
  status: MilestoneStatus;
  dueDate: string;
  order: number;
}

interface MilestoneTimelineProps {
  milestones: TimelineItem[];
  onSelect?: (id: string) => void;
}

// ─── Status rendering ─────────────────────────────────────────────────────────

function NodeIcon({ status, size = "md" }: { status: MilestoneStatus; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  switch (status) {
    case "approved":
    case "completed":
      return <CheckCircle2 className={cn(sz, "text-(--success)")} />;
    case "in_progress":
      return <Loader className={cn(sz, "text-(--accent) animate-spin")} />;
    case "review":
      return (
        <span className={cn(
          size === "sm" ? "h-3.5 w-3.5 text-[10px]" : "h-5 w-5 text-xs",
          "flex items-center justify-center rounded-full bg-(--warning) text-white font-bold shrink-0",
        )}>!</span>
      );
    default:
      return <Circle className={cn(sz, "text-(--text-muted)")} />;
  }
}

const NODE_RING: Record<MilestoneStatus, string> = {
  approved:    "bg-(--success-subtle) ring-1 ring-(--success-muted)",
  completed:   "bg-(--success-subtle) ring-1 ring-(--success-muted)",
  in_progress: "bg-(--accent-subtle) ring-1 ring-(--accent-muted)",
  review:      "bg-(--warning-subtle) ring-1 ring-(--warning-muted)",
  pending:     "bg-(--bg-muted) ring-1 ring-(--border)",
  delayed:     "bg-(--danger-subtle) ring-1 ring-(--danger-muted)",
};

const CONNECTOR_COLOR: Record<MilestoneStatus, string> = {
  approved:    "bg-(--success)",
  completed:   "bg-(--success)",
  in_progress: "bg-(--accent)/60",
  review:      "bg-(--warning)/60",
  pending:     "bg-(--border)",
  delayed:     "bg-(--danger)/60",
};

// ─── Desktop horizontal timeline ─────────────────────────────────────────────

function HorizontalTimeline({ milestones, onSelect }: MilestoneTimelineProps) {
  const t = useTranslations("milestones.timeline");

  return (
    <div className="hidden sm:block">
      <div className="relative flex items-start">
        {milestones.map((m, idx) => {
          const isLast = idx === milestones.length - 1;
          const isDone = m.status === "approved" || m.status === "completed";

          return (
            <React.Fragment key={m.id}>
              {/* Node + label */}
              <button
                type="button"
                onClick={() => onSelect?.(m.id)}
                className="group flex flex-col items-center gap-2 min-w-0 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) rounded-lg px-1"
                style={{ width: `${100 / milestones.length}%` }}
              >
                {/* Circle */}
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all group-hover:scale-110",
                  NODE_RING[m.status],
                )}>
                  <NodeIcon status={m.status} />
                </div>
                {/* Phase label */}
                <p className="text-[10px] font-medium text-center text-(--text-muted) leading-tight truncate w-full">
                  {m.name.split(":")[0]?.trim()}
                </p>
                {/* Date */}
                <p className="text-[10px] text-(--text-muted) text-center">
                  {formatDate(m.dueDate, { month: "short", day: "numeric" })}
                </p>
              </button>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 self-start mt-4 mx-1">
                  <div className={cn(
                    "h-0.5 w-full rounded-full transition-colors",
                    isDone ? CONNECTOR_COLOR[m.status] : "bg-(--border)",
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile vertical stepper ──────────────────────────────────────────────────

function VerticalStepper({ milestones, onSelect }: MilestoneTimelineProps) {
  return (
    <div className="sm:hidden relative ps-5">
      <div className="absolute inset-s-2 top-4 bottom-4 w-px bg-(--border)" aria-hidden />
      {milestones.map((m) => {
        const isDone = m.status === "approved" || m.status === "completed";
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect?.(m.id)}
            className="relative flex items-start gap-3 pb-5 w-full text-start group focus-visible:outline-none"
          >
            {/* Node */}
            <div className={cn(
              "absolute -inset-s-5 flex h-4 w-4 items-center justify-center rounded-full mt-0.5 transition-all group-hover:scale-110",
              NODE_RING[m.status],
            )}>
              <NodeIcon status={m.status} size="sm" />
            </div>
            <div className="min-w-0">
              <p className={cn(
                "text-sm font-medium truncate",
                isDone ? "text-(--text-muted)" : "text-(--text-primary)",
              )}>
                {m.name}
              </p>
              <p className="text-xs text-(--text-muted) mt-0.5">
                {formatDate(m.dueDate, { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function MilestoneTimeline({ milestones, onSelect }: MilestoneTimelineProps) {
  const t = useTranslations("milestones.timeline");

  if (!milestones.length) return null;

  return (
    <div className="surface p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted) mb-4">
        {t("title")}
      </p>
      <HorizontalTimeline milestones={milestones} onSelect={onSelect} />
      <VerticalStepper milestones={milestones} onSelect={onSelect} />
    </div>
  );
}
