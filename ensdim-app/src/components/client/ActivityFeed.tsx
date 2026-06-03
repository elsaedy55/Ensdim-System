"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface ActivityItem {
  id: string;
  message: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
  showViewAll?: boolean;
}

export function ActivityFeed({ activities, maxItems = 8, showViewAll = true }: ActivityFeedProps) {
  const t     = useTranslations("dashboard.activity");
  const items = activities.slice(0, maxItems);

  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-(--text-primary)">{t("title")}</h2>
        {showViewAll && activities.length > 0 && (
          <Link
            href={ROUTES.CLIENT.NOTIFICATIONS}
            className="text-xs text-(--accent) hover:text-(--accent-hover) transition-colors"
          >
            {t("viewAll")}
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-(--text-muted) text-center py-6">{t("empty")}</p>
      ) : (
        <div className="relative">
          <div className="absolute inset-s-3.5 top-2 bottom-2 w-px bg-(--border)" aria-hidden />
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 relative">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-xs font-semibold ring-2 ring-(--bg-surface) z-10">
                  {item.userAvatar
                    ? <img src={item.userAvatar} alt={item.userName} className="h-full w-full rounded-full object-cover" />
                    : getInitials(item.userName)
                  }
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-(--text-secondary) leading-snug">
                    <span className="font-medium text-(--text-primary)">{item.userName}</span>
                    {" "}{item.message}
                  </p>
                  <time className="text-xs text-(--text-muted) mt-0.5 block">
                    {formatRelativeTime(item.createdAt)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
