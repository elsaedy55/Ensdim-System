"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime, cn } from "@/lib/utils";
import { Bell, Flag, Receipt, FileText, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllRead,
} from "@/hooks/useNotifications";
import type { NotificationRow } from "@/lib/supabase/types";

type Notification = NotificationRow;
type NotifType    = Notification["type"];

const TYPE_ICON: Record<NotifType, React.ReactNode> = {
  milestone_review:   <Flag className="h-4 w-4 text-(--accent)" />,
  invoice_sent:       <Receipt className="h-4 w-4 text-(--warning)" />,
  file_uploaded:      <FileText className="h-4 w-4 text-(--text-muted)" />,
  revision_submitted: <MessageSquare className="h-4 w-4 text-(--text-muted)" />,
  revision_resolved:  <CheckCircle2 className="h-4 w-4 text-(--success)" />,
  approval_complete:  <CheckCircle2 className="h-4 w-4 text-(--success)" />,
  payment_received:   <Receipt className="h-4 w-4 text-(--success)" />,
  system:             <AlertCircle className="h-4 w-4 text-(--text-muted)" />,
};

const TYPE_BG: Record<NotifType, string> = {
  milestone_review:   "bg-(--accent-subtle)",
  invoice_sent:       "bg-(--warning-subtle)",
  file_uploaded:      "bg-(--bg-muted)",
  revision_submitted: "bg-(--bg-muted)",
  revision_resolved:  "bg-(--success-subtle)",
  approval_complete:  "bg-(--success-subtle)",
  payment_received:   "bg-(--success-subtle)",
  system:             "bg-(--bg-muted)",
};

function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
}) {
  const inner = (
    <div className={cn(
      "group flex gap-4 rounded-xl border p-4 transition-all",
      notification.is_read
        ? "border-transparent hover:border-(--border) hover:bg-(--bg-muted)/50"
        : "border-(--accent-muted) bg-(--accent-subtle)/20 hover:bg-(--accent-subtle)/30",
    )}>
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", TYPE_BG[notification.type])}>
        {TYPE_ICON[notification.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className={cn("text-sm leading-snug", notification.is_read ? "font-normal text-(--text-secondary)" : "font-medium text-(--text-primary)")}>
            {notification.title}
          </p>
          {!notification.is_read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-(--accent)" />}
        </div>
        <p className="mt-0.5 text-xs text-(--text-muted) line-clamp-2">{notification.body}</p>
        <div className="mt-2 flex items-center gap-3">
          <time className="text-xs text-(--text-muted)">{formatRelativeTime(notification.created_at)}</time>
          {!notification.is_read && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMarkRead(notification.id); }}
              className="text-xs text-(--accent) hover:text-(--accent-hover) transition-colors"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (notification.link) return <Link href={notification.link}>{inner}</Link>;
  return inner;
}

export default function NotificationsPage() {
  const t  = useTranslations("notifications");
  const ta = useTranslations("common.actions");

  const { data: items, isLoading } = useNotifications();
  const markRead   = useMarkNotificationRead();
  const markAllRead = useMarkAllRead();

  const notifications = items ?? [];
  const unread = notifications.filter((n) => !n.is_read);
  const read   = notifications.filter((n) => n.is_read);

  const handleMarkAllRead = () => {
    markAllRead.mutate(undefined, {
      onSuccess: () => toast.success(ta("markAllRead")),
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        actions={
          unread.length > 0 ? (
            <Button variant="secondary" size="sm" onClick={handleMarkAllRead} loading={markAllRead.isPending}>
              {t("actions.markAllRead")}
            </Button>
          ) : undefined
        }
      />

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl border border-(--border) animate-pulse">
              <div className="h-9 w-9 rounded-full bg-(--bg-muted)" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-(--bg-muted) rounded w-3/4" />
                <div className="h-3 bg-(--bg-muted) rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--bg-muted)">
            <Bell className="h-7 w-7 text-(--text-muted)" />
          </div>
          <p className="text-base font-semibold text-(--text-primary)">{t("emptyState.title")}</p>
          <p className="mt-1.5 text-sm text-(--text-muted)">{t("emptyState.description")}</p>
        </div>
      ) : (
        <>
          {unread.length > 0 && (
            <section className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-(--text-muted) px-1">{t("sections.unread")}</p>
              {unread.map((n) => (
                <NotificationItem key={n.id} notification={n} onMarkRead={(id) => markRead.mutate(id)} />
              ))}
            </section>
          )}
          {read.length > 0 && (
            <section className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-(--text-muted) px-1">{t("sections.earlier")}</p>
              {read.map((n) => (
                <NotificationItem key={n.id} notification={n} onMarkRead={(id) => markRead.mutate(id)} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
