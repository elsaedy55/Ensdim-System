"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date", min, max, disabled, className, id }: DatePickerProps) {
  return (
    <div className={cn("relative", className)}>
      <CalendarDays className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
      <input
        id={id}
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-[var(--border)] bg-[var(--bg-surface)]",
          "pl-9 pr-3 py-2 text-sm text-[var(--text-primary)]",
          "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors duration-150",
          "[color-scheme:dark]"
        )}
      />
    </div>
  );
}
