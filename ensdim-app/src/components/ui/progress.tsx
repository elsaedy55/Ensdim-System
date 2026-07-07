"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { localeDir, type Locale } from "@/i18n/common";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  colorByValue?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, size = "sm", showLabel = false, colorByValue = false, ...props }, ref) => {
  const locale = useLocale();
  const isRtl  = localeDir[locale as Locale] === "rtl";
  const v = value ?? 0;
  const color = colorByValue
    ? v >= 90
      ? "bg-[var(--success)]"
      : v >= 60
        ? "bg-[var(--accent)]"
        : v >= 30
          ? "bg-[var(--warning)]"
          : "bg-[var(--danger)]"
    : "bg-[var(--accent)]";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-(--text-muted)">Progress</span>
          <span className="text-xs font-medium text-(--text-secondary)">{Math.round(value ?? 0)}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-(--bg-muted)",
          {
            "h-1":   size === "xs",
            "h-1.5": size === "sm",
            "h-2":   size === "md",
          },
          className
        )}
        {...props}
        value={value}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all duration-700 ease-out rounded-full", color)}
          style={{ transform: `translateX(${isRtl ? "" : "-"}${100 - (value ?? 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
