"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  LayoutDashboard, Folder,
  CreditCard, Bell, LayoutGrid, UserCheck, CheckSquare,
} from "lucide-react";

// ─── Client Bottom Nav ────────────────────────────────────────────────────────

const CLIENT_NAV = [
  { href: ROUTES.CLIENT.DASHBOARD,     key: "dashboard",     icon: LayoutDashboard },
  { href: ROUTES.CLIENT.PROJECT,       key: "project",       icon: Folder },
  { href: ROUTES.CLIENT.PAYMENTS,      key: "payments",      icon: CreditCard },
  { href: ROUTES.CLIENT.NOTIFICATIONS, key: "notifications", icon: Bell },
] as const;

export function ClientBottomNav({ notificationCount = 0 }: { notificationCount?: number }) {
  const pathname = usePathname();
  const t = useTranslations("common.nav");

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex md:hidden h-16 border-t border-(--border) bg-(--bg-surface)/95 backdrop-blur-sm">
      {CLIENT_NAV.map(({ href, key, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        const isNotif  = key === "notifications";

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
              isActive ? "text-(--accent)" : "text-(--text-muted) hover:text-(--text-secondary)"
            )}
          >
            <div className="relative">
              <Icon className="h-5 w-5" />
              {isNotif && notificationCount > 0 && (
                <span className="absolute -top-1 -inset-e-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--accent) text-[8px] font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </div>
            <span className="truncate max-w-full px-0.5">{t(key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// ─── Admin Bottom Nav ─────────────────────────────────────────────────────────

const ADMIN_NAV = [
  { href: ROUTES.ADMIN.OVERVIEW,       key: "overview",       icon: LayoutGrid },
  { href: ROUTES.ADMIN.PROJECTS,       key: "projects",       icon: Folder },
  { href: ROUTES.ADMIN.CLIENTS,        key: "clients",        icon: UserCheck },
  { href: ROUTES.ADMIN.TASKS,          key: "tasks",          icon: CheckSquare },
  { href: ROUTES.ADMIN.NOTIFICATIONS,  key: "notifications",  icon: Bell },
] as const;

export function AdminBottomNav({ notificationCount = 0 }: { notificationCount?: number }) {
  const pathname = usePathname();
  const t = useTranslations("common.nav");

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex md:hidden h-16 border-t border-(--border) bg-(--bg-surface)/95 backdrop-blur-sm">
      {ADMIN_NAV.map(({ href, key, icon: Icon }) => {
        const isActive =
          href === ROUTES.ADMIN.OVERVIEW
            ? pathname === href
            : pathname === href || pathname.startsWith(href + "/");
        const isNotif = key === "notifications";

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
              isActive ? "text-(--accent)" : "text-(--text-muted) hover:text-(--text-secondary)"
            )}
          >
            <div className="relative">
              <Icon className="h-5 w-5" />
              {isNotif && notificationCount > 0 && (
                <span className="absolute -top-1 -inset-e-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--accent) text-[8px] font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </div>
            <span className="truncate max-w-full px-0.5">{t(key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
