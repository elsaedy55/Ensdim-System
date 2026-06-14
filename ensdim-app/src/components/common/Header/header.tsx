"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import * as Icons from "@/components/ui/icons";
import UiIcon, { type IconComp } from "@/components/ui/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { signOut } from "@/lib/auth.service";
import { useAuthStore } from "@/store/auth.store";
import {
  useNotifications, useUnreadCount, useMarkNotificationRead,
  useMarkAllRead, useRealtimeNotifications,
} from "@/hooks/useNotifications";
import type { NotificationRow } from "@/lib/supabase/types";

type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost" | "link" | "outline";

type ActionDescriptor = {
  href: string;
  label: string;
  icon?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm";
};

interface HeaderProps {
  title?: string;
  actions?: React.ReactNode;
  actionsData?: ActionDescriptor[];
  user?: { name: string; email: string; avatar?: string };
  unreadCount?: number;
  onLogout?: () => void;
  settingsRoute?: string;
  className?: string;
}

export function Header({
  title,
  actions,
  actionsData,
  user,
  unreadCount = 0,
  onLogout,
  settingsRoute,
  className,
}: HeaderProps) {
  const tn = useTranslations("common.notifications");
  const ta = useTranslations("common.actions");
  const router = useRouter();

  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = React.useCallback(async () => {
    try {
      await signOut();
    } finally {
      clearAuth();
      window.location.href = ROUTES.LOGIN;
    }
  }, [clearAuth]);

  // Keep the bell badge + dropdown in sync with new notifications in real time.
  useRealtimeNotifications();
  const { data: liveUnreadCount } = useUnreadCount(unreadCount);
  const { data: notifications = [] } = useNotifications();
  const markRead    = useMarkNotificationRead();
  const markAllRead = useMarkAllRead();

  const unread = liveUnreadCount ?? unreadCount;

  const handleNotificationClick = (n: NotificationRow) => {
    if (!n.is_read) markRead.mutate(n.id);
    if (n.link) router.push(n.link);
  };

  return (
    <header
      className={cn(
        "flex h-14 items-center gap-4 border-b border-(--border) bg-(--bg-surface) px-6 shrink-0",
        className
      )}
    >
      {/* Title */}
      {title && (
        <h1 className="text-base font-semibold text-(--text-primary) truncate me-auto">
          {title}
        </h1>
      )}
      {!title && <div className="flex-1" />}

      {/* Mobile sidebar trigger (passed as actions) */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}

      {/* Structured action buttons */}
      {actionsData && (
        <div className="hidden sm:flex items-center gap-2">
          {actionsData.map((a) => {
            const IconComp = a.icon
              ? (Icons as Record<string, IconComp>)[a.icon] ?? Icons.Plus
              : null;

            return (
              <Link
                key={a.href}
                href={a.href}
                className={cn(
                  buttonVariants({ variant: a.variant ?? "secondary", size: a.size ?? "sm" }),
                  "flex items-center gap-2"
                )}
              >
                {IconComp && <UiIcon as={IconComp} size="md" className="text-(--text-muted)" />}
                <span>{a.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Language Switcher + Theme Toggle */}
      <LanguageSwitcher variant="icon" />
      <ThemeToggle variant="icon" />

      {/* Notification Bell */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`${tn("title")}, ${unread} unread`}
          >
            <UiIcon as={Icons.Bell} size="md" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -inset-e-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--accent) px-0.5 text-[10px] font-bold text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-(--border)">
            <span className="text-sm font-semibold text-(--text-primary)">{tn("title")}</span>
            {unread > 0 && (
              <button
                onClick={() => markAllRead.mutate(undefined)}
                className="text-xs text-(--accent) hover:text-(--accent-hover) transition-colors"
              >
                {ta("markAllRead")}
              </button>
            )}
          </div>

          {/* Items */}
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <UiIcon as={Icons.Bell} size="2xl" className="text-(--text-muted) mb-2" />
                <p className="text-sm font-medium text-(--text-primary)">{tn("allCaughtUp")}</p>
                <p className="text-xs text-(--text-muted)">{tn("noNotifications")}</p>
              </div>
            ) : (
              notifications.slice(0, 8).map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={cn(
                    "w-full text-start px-4 py-3 flex gap-3 hover:bg-(--bg-muted) transition-colors border-b border-(--border) last:border-0",
                    !n.is_read && "bg-(--accent-subtle)/30"
                  )}
                >
                  {!n.is_read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-(--accent)" />
                  )}
                  <div className={cn("flex-1 min-w-0", n.is_read && "ps-5")}>
                    <p className="text-sm font-medium text-(--text-primary) leading-snug">{n.title}</p>
                    <p className="text-xs text-(--text-muted) mt-0.5 line-clamp-2">{n.body}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-(--border) px-4 py-2.5">
              <Link
                href={settingsRoute?.includes("admin") ? ROUTES.ADMIN.NOTIFICATIONS : ROUTES.CLIENT.NOTIFICATIONS}
                className="text-xs text-(--accent) hover:text-(--accent-hover) font-medium"
              >
                {tn("viewAll")} →
              </Link>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Divider */}
      <div className="h-5 w-px bg-(--border)" />

      {/* User menu */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full p-0 h-8 w-8">
              <UserAvatar name={user.name} src={user.avatar} size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-(--text-primary)">{user.name}</p>
              <p className="text-xs text-(--text-muted) truncate">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={settingsRoute ?? ROUTES.CLIENT.SETTINGS} className="flex items-center gap-2">
                <UiIcon as={Icons.Settings} size="md" />
                {ta("profileSettings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive onClick={onLogout ?? handleLogout} className="flex items-center gap-2">
              <UiIcon as={Icons.LogOut} size="md" />
              {ta("signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-(--text-muted)">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
