"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { localeNames, localeDir, type Locale, LOCALE_COOKIE } from "@/i18n/common";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  variant?: "button" | "icon";
  className?: string;
}

export function LanguageSwitcher({ variant = "button", className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const [switching, setSwitching] = React.useState(false);

  const targetLocale: Locale = locale === "ar" ? "en" : "ar";
  const targetLabel = localeNames[targetLocale];

  const handleSwitch = () => {
    if (switching) return;
    setSwitching(true);

    // 1. Persist locale in cookie (1 year)
    document.cookie = `${LOCALE_COOKIE}=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // 2. Update <html> immediately so layout flips before reload
    document.documentElement.lang = targetLocale;
    document.documentElement.dir  = localeDir[targetLocale];

    // 3. Full reload — guarantees server re-runs getRequestConfig
    //    with new cookie → NextIntlClientProvider gets new messages
    window.location.reload();
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleSwitch}
        disabled={switching}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium",
          "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-muted)",
          "transition-colors duration-150 disabled:opacity-50",
          className
        )}
        aria-label={`Switch to ${targetLabel}`}
      >
        {switching
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : <Globe className="h-4 w-4 shrink-0" />
        }
        <span>{targetLabel}</span>
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSwitch}
      disabled={switching}
      className={cn("gap-1.5 text-(--text-muted) hover:text-(--text-primary)", className)}
    >
      {switching
        ? <Loader2 className="h-4 w-4 animate-spin" />
        : <Globe className="h-4 w-4" />
      }
      <span>{targetLabel}</span>
    </Button>
  );
}
