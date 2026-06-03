"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const NAV_KEYS = new Set([
  "dashboard", "project", "milestones", "revisions", "files",
  "payments", "notifications", "settings", "admin", "overview",
  "projects", "clients", "tasks", "team", "financial", "roles",
]);

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const tnav = useTranslations("common.nav");
  const tu   = useTranslations("common.user");

  const buildCrumbs = (path: string): BreadcrumbItem[] => {
    const isAdmin = path.startsWith("/admin");
    const segments = path.split("/").filter(Boolean);

    const crumbs: BreadcrumbItem[] = [
      {
        label: isAdmin ? tu("admin") : tu("home"),
        href:  isAdmin ? ROUTES.ADMIN.OVERVIEW : ROUTES.CLIENT.DASHBOARD,
      },
    ];

    let built = "";
    segments.forEach((seg, idx) => {
      built += `/${seg}`;
      const isLast = idx === segments.length - 1;
      const label = NAV_KEYS.has(seg) ? tnav(seg as Parameters<typeof tnav>[0]) : seg;
      crumbs.push({ label, href: isLast ? undefined : built });
    });

    return isAdmin ? crumbs.slice(1) : crumbs;
  };

  const crumbs = items ?? buildCrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-(--text-muted) rtl:scale-x-[-1]" />
            )}
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="text-(--text-muted) hover:text-(--text-primary) transition-colors truncate max-w-35"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={cn("truncate max-w-35", isLast ? "text-(--text-primary) font-medium" : "text-(--text-muted)")}>
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
