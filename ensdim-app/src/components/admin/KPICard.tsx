"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as Icons from "@/components/ui/icons";
import { TrendingUp, TrendingDown, Minus } from "@/components/ui/icons";
import UiIcon, { type IconComp } from "@/components/ui/icon";

interface KPICardProps {
  label: string;
  value: string | number;
  icon: string; // icon name key from icons barrel
  change?: {
    value: number;
    period?: string;
    direction: "up" | "down" | "neutral";
  };
  variant?: "default" | "warning" | "danger" | "success";
  isLoading?: boolean;
  className?: string;
}

export function KPICard({ label, value, icon: Icon, change, variant = "default", isLoading, className }: KPICardProps) {
  if (isLoading) {
    return (
      <div className={cn("surface p-5 animate-pulse", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-28 bg-(--bg-muted) rounded" />
          <div className="h-8 w-8 bg-(--bg-muted) rounded-md" />
        </div>
        <div className="h-8 w-20 bg-[var(--bg-muted)] rounded mb-2" />
        <div className="h-3 w-36 bg-[var(--bg-muted)] rounded" />
      </div>
    );
  }

  const borderColor = {
    default: "border-(--border)",
    warning: "border-s-4 border-s-(--warning) border-t border-e border-b border-(--border)",
    danger:  "border-s-4 border-s-(--danger) border-t border-e border-b border-(--border)",
    success: "border-s-4 border-s-(--success) border-t border-e border-b border-(--border)",
  }[variant];

  const iconBg = {
    default: "bg-[var(--bg-muted)] text-[var(--text-muted)]",
    warning: "bg-[var(--warning-subtle)] text-[var(--warning)]",
    danger:  "bg-[var(--danger-subtle)] text-[var(--danger)]",
    success: "bg-[var(--success-subtle)] text-[var(--success)]",
  }[variant];

  const TrendIcon = change?.direction === "up" ? TrendingUp : change?.direction === "down" ? TrendingDown : Minus;
  const IconComp = ((Icons as Record<string, IconComp>)[Icon]) ?? Icons.FileText;
  const trendColor = change?.direction === "up" ? "text-[var(--success)]" : change?.direction === "down" ? "text-[var(--danger)]" : "text-[var(--text-muted)]";

  return (
    <div className={cn("surface p-5 rounded-lg", borderColor, className)}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-[var(--text-muted)]">{label}</p>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", iconBg)}>
          <UiIcon as={IconComp} size="md" />
        </div>
      </div>

      <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">{value}</p>

      {change && (
        <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
          <UiIcon as={TrendIcon} size="xs" className="shrink-0" />
          <span>
            {change.direction !== "neutral" && (change.direction === "up" ? "+" : "-")}{Math.abs(change.value)}
            {change.period && <span className="text-(--text-muted) ms-1">{change.period}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
