"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard, Folder, UserCheck, CheckSquare,
  Users, CreditCard, Bell, ShieldCheck, Settings,
  LogOut, ChevronLeft, ChevronDown,
} from "@/components/ui/icons";
import type { LucideIcon } from "@/components/ui/icons";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeDir, type Locale } from "@/i18n/common";
import { signOut } from "@/lib/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type TooltipSide = "left" | "right";
type NavEntry    = { href: string; key: string; icon: LucideIcon };
type NavGroup    = { labelKey: string; items: NavEntry[] };

// ─── Nav configuration ────────────────────────────────────────────────────────

const GROUPS: NavGroup[] = [
  {
    labelKey: "main",
    items: [
      { href: ROUTES.ADMIN.OVERVIEW,  key: "overview",  icon: LayoutDashboard },
      { href: ROUTES.ADMIN.PROJECTS,  key: "projects",  icon: Folder },
      { href: ROUTES.ADMIN.CLIENTS,   key: "clients",   icon: UserCheck },
      { href: ROUTES.ADMIN.TASKS,     key: "tasks",     icon: CheckSquare },
    ],
  },
  {
    labelKey: "teamFinance",
    items: [
      { href: ROUTES.ADMIN.TEAM,      key: "team",      icon: Users },
      { href: ROUTES.ADMIN.FINANCIAL, key: "financial", icon: CreditCard },
    ],
  },
  {
    labelKey: "system",
    items: [
      { href: ROUTES.ADMIN.NOTIFICATIONS, key: "notifications", icon: Bell },
      { href: ROUTES.ADMIN.ROLES,         key: "roles",         icon: ShieldCheck },
      { href: ROUTES.ADMIN.SETTINGS,      key: "settings",      icon: Settings },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function WorkspaceMark({ initial = "E" }: { initial?: string }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--accent) text-[13px] font-bold text-white select-none ring-1 ring-(--accent)/20">
      {initial}
    </div>
  );
}

function SectionLabel({ label, first, isRTL }: { label: string; first?: boolean; isRTL?: boolean }) {
  return (
    <p
      className={cn(
        "px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.07em] text-(--text-muted) select-none",
        isRTL && "text-right",
        first ? "pt-1" : "pt-5",
      )}
    >
      {label}
    </p>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  badge = 0,
  side,
  isRTL,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: number;
  side: TooltipSide;
  isRTL?: boolean;
}) {
  const item = (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex items-center rounded-xl text-sm font-medium",
        "select-none outline-none",
        "transition-all duration-150",
        "focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--sidebar-bg)",
        !isCollapsed ? "h-11 gap-3 px-3" : "size-11 justify-center",
        !isCollapsed && isRTL && "flex-row-reverse text-right",
        isActive
          ? "bg-(--sidebar-item-active) text-(--sidebar-text-active)"
          : "text-(--sidebar-text) hover:bg-(--sidebar-item-hover) hover:text-(--text-primary)",
      )}
    >
      <Icon
        className={cn(
          "size-4.5 shrink-0 transition-colors duration-150",
          isActive
            ? "text-(--accent)"
            : "text-(--text-muted) group-hover:text-(--text-primary)",
        )}
        strokeWidth={1.75}
      />
      {!isCollapsed && <span className={cn("flex-1 truncate", isRTL && "text-right")}>{label}</span>}
      {!isCollapsed && badge > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-(--accent) px-1.5 text-[10px] font-bold text-white leading-none tabular-nums">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
      {isCollapsed && badge > 0 && (
        <span className="absolute top-2 inset-e-2 size-2 rounded-full bg-(--accent) ring-2 ring-(--sidebar-bg)" />
      )}
    </Link>
  );

  return isCollapsed ? (
    <SimpleTooltip content={label} side={side} delayDuration={80}>
      {item}
    </SimpleTooltip>
  ) : (
    item
  );
}

// ─── AdminSidebar ─────────────────────────────────────────────────────────────

interface AdminSidebarProps {
  user?: { name: string; email: string; avatar?: string; role?: string };
  workspace?: { name: string; logo?: string };
  notificationCount?: number;
  onLogout?: () => void;
  forceExpanded?: boolean;
}

export function AdminSidebar({
  user,
  workspace,
  notificationCount = 0,
  onLogout,
  forceExpanded,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const t    = useTranslations("common.nav");
  const ta   = useTranslations("common.actions");
  const tg   = useTranslations("common.sidebarGroups");
  const tUser = useTranslations("common.user");
  const locale   = useLocale() as Locale;
  const isRTL    = localeDir[locale] === "rtl";
  const side: TooltipSide = isRTL ? "left" : "right";

  const [collapsed, setCollapsed] = React.useState(false);
  const isCollapsed = forceExpanded ? false : collapsed;

  const router    = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = React.useCallback(async () => {
    try {
      await signOut();
    } finally {
      clearAuth();
      router.push(ROUTES.LOGIN);
      router.refresh();
    }
  }, [clearAuth, router]);

  // Exact match for overview to avoid false-active on sub-routes
  const isActive = (href: string) =>
    href === ROUTES.ADMIN.OVERVIEW
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  const workspaceName    = workspace?.name ?? "Ensdim";
  const workspaceInitial = workspaceName[0]?.toUpperCase() ?? "E";

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col",
        "border-e border-(--sidebar-border) bg-(--sidebar-bg)",
        "transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0",
        !forceExpanded && "hidden md:flex",
        isCollapsed ? "w-18" : "w-70",
      )}
    >
      {/* ─────────────────── Workspace Header ─────────────────────────── */}

      {isCollapsed && !forceExpanded ? (
        // Collapsed: logo = clickable expand trigger
        <SimpleTooltip content={workspaceName} side={side} delayDuration={100}>
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            className="flex h-14 w-full shrink-0 items-center justify-center border-b border-(--sidebar-border) transition-colors hover:bg-(--sidebar-item-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-inset"
          >
            <WorkspaceMark initial={workspaceInitial} />
          </button>
        </SimpleTooltip>
      ) : (
        // Expanded
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-(--sidebar-border) px-4">
          <WorkspaceMark initial={workspaceInitial} />
          <div className="flex-1 min-w-0">
            <p className="truncate text-[13.5px] font-semibold leading-snug text-(--text-primary)">
              {workspaceName}
            </p>
            <p className="mt-0.5 truncate text-[11px] leading-none text-(--text-muted)">
              {tUser("adminPanel")}
            </p>
          </div>
          {!forceExpanded && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-(--text-muted) transition-colors hover:bg-(--bg-muted) hover:text-(--text-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
            >
              <ChevronLeft
                className="size-4 rtl:scale-x-[-1]"
                strokeWidth={2.25}
              />
            </button>
          )}
        </div>
      )}

      {/* ─────────────────── Navigation ───────────────────────────────── */}

      <ScrollArea className="flex-1">
        <nav className="space-y-px p-2" aria-label="Admin navigation">
          {GROUPS.map((group, gi) => (
            <div key={gi}>
              {/* Group separator in collapsed mode */}
              {isCollapsed && gi > 0 && (
                <div className="mx-2 my-2 h-px bg-(--sidebar-border)" />
              )}

              {/* Section label (visible only when expanded) */}
              {!isCollapsed && (
                <SectionLabel
                  label={tg(group.labelKey as Parameters<typeof tg>[0])}
                  first={gi === 0}
                  isRTL={isRTL}
                />
              )}

              {group.items.map(({ href, key, icon }) => (
                <NavItem
                  key={href}
                  href={href}
                  icon={icon}
                  label={t(key as Parameters<typeof t>[0])}
                  isActive={isActive(href)}
                  isCollapsed={isCollapsed}
                  badge={key === "notifications" ? notificationCount : 0}
                  side={side}
                    isRTL={isRTL}
                />
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* ─────────────────── User Footer ──────────────────────────────── */}

      {user && (
        <div className="shrink-0 border-t border-(--sidebar-border) p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "group flex w-full items-center rounded-xl",
                  "transition-colors duration-150",
                  "hover:bg-(--sidebar-item-hover)",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--sidebar-bg)",
                  isCollapsed ? "size-11 justify-center" : "h-11 gap-3 px-3",
                )}
              >
                <UserAvatar name={user.name} src={user.avatar} size="sm" />
                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0 text-start">
                      <p className="truncate text-[13px] font-medium leading-snug text-(--text-primary)">
                        {user.name}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] capitalize leading-none text-(--text-muted)">
                        {user.role?.replace("_", " ")}
                      </p>
                    </div>
                    <ChevronDown
                      className="size-3.5 shrink-0 text-(--text-muted) opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align={isRTL ? "end" : "start"}
              sideOffset={8}
              className="w-56"
            >
              <div className="px-2 py-2.5">
                <p className="text-sm font-medium text-(--text-primary)">{user.name}</p>
                <p className="mt-0.5 text-xs text-(--text-muted) truncate">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={ROUTES.ADMIN.SETTINGS} className="flex items-center gap-2.5">
                  <Settings className="size-4" strokeWidth={1.75} />
                  {ta("profileSettings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                destructive
                onClick={onLogout ?? handleLogout}
                className="flex items-center gap-2.5"
              >
                <LogOut className="size-4" strokeWidth={1.75} />
                {ta("signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </aside>
  );
}
