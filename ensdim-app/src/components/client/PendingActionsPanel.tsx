"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Flag, CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionType = "milestone_review" | "invoice_due";

interface PendingAction {
  id: string;
  type: ActionType;
  title: string;
  body: string;
  href: string;
  urgent?: boolean;
}

const ACTION_ICONS: Record<ActionType, React.ElementType> = {
  milestone_review: Flag,
  invoice_due:      CreditCard,
};

const ACTION_COLORS: Record<ActionType, { bg: string; icon: string }> = {
  milestone_review: { bg: "bg-(--accent-subtle)",  icon: "text-(--accent)" },
  invoice_due:      { bg: "bg-(--warning-subtle)", icon: "text-(--warning)" },
};

function PendingActionCard({ action }: { action: PendingAction }) {
  const t    = useTranslations("dashboard.pendingActions");
  const Icon = ACTION_ICONS[action.type];
  const col  = ACTION_COLORS[action.type];

  return (
    <div className={cn(
      "surface p-4 flex flex-col gap-3 hover:shadow-(--shadow-sm) transition-shadow",
      action.urgent && "border-(--danger-muted)"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", col.bg)}>
          {action.urgent
            ? <AlertTriangle className="h-4 w-4 text-(--danger)" />
            : <Icon className={cn("h-4 w-4", col.icon)} />
          }
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-(--text-primary)">{action.title}</p>
          <p className="text-xs text-(--text-muted) mt-0.5 line-clamp-2">{action.body}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-between text-(--accent) hover:text-(--accent-hover) hover:bg-(--accent-subtle)"
        asChild
      >
        <Link href={action.href}>
          {action.type === "milestone_review" ? t("reviewNow") : t("viewInvoice")}
        </Link>
      </Button>
    </div>
  );
}

interface PendingActionsPanelProps {
  actions: PendingAction[];
}

export function PendingActionsPanel({ actions }: PendingActionsPanelProps) {
  const t = useTranslations("dashboard.pendingActions");

  if (actions.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold text-(--text-primary) mb-3 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-(--accent)" />
        {t("title", { count: actions.length })}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <PendingActionCard key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
