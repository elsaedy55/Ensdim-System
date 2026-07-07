"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
  colorByValue?: boolean;
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  showLabel = true,
  className,
  colorByValue = true,
}: CircularProgressProps) {
  const v = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (v / 100) * circumference;

  const color = colorByValue
    ? v >= 90
      ? "text-[var(--success)]"
      : v >= 60
        ? "text-[var(--accent)]"
        : v >= 30
          ? "text-[var(--warning)]"
          : "text-[var(--danger)]"
    : "text-[var(--accent)]";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-muted)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-700 ease-out", color)}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-[10px] font-bold text-(--text-primary)">
          {Math.round(v)}%
        </span>
      )}
    </div>
  );
}
