"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md";
  /** Delay before `onChange` fires after typing stops. Most callers sync this to the URL, so debouncing keeps fast typing from firing a navigation per keystroke. */
  debounceMs?: number;
}

const DEFAULT_DEBOUNCE_MS = 300;

export function SearchInput({ value, onChange, placeholder, className, size = "md", debounceMs = DEFAULT_DEBOUNCE_MS }: SearchInputProps) {
  const t = useTranslations("tables.aria");
  const resolvedPlaceholder = placeholder ?? "Search...";

  const [draft, setDraft] = React.useState(value);

  // Stay in sync when the value changes from outside (e.g. a "clear filters" action)
  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  React.useEffect(() => {
    if (draft === value) return;
    const id = setTimeout(() => onChange(draft), debounceMs);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the draft itself changes
  }, [draft]);

  const clear = () => {
    setDraft("");
    onChange("");
  };

  return (
    <div className={cn("relative", className)}>
      <Search className={cn(
        "absolute inset-s-2.5 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none shrink-0",
        size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
      )} />
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={resolvedPlaceholder}
        className={cn(
          "w-full rounded-md border border-(--border) bg-(--bg-surface)",
          "text-(--text-primary) placeholder:text-(--text-muted)",
          "focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 outline-none",
          "transition-colors duration-150",
          size === "sm" ? "ps-8 pe-7 py-1.5 text-xs" : "ps-9 pe-8 py-2 text-sm",
        )}
      />
      {draft && (
        <button
          type="button"
          onClick={clear}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) transition-colors",
            size === "sm" ? "inset-e-2" : "inset-e-2.5"
          )}
          aria-label={t("removeFilter")}
        >
          <X className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>
      )}
    </div>
  );
}
