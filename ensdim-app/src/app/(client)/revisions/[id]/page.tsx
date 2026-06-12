"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatDate, formatRelativeTime, cn } from "@/lib/utils";
import {
  ChevronLeft, Paperclip, FileText, User,
  Calendar, Link as LinkIcon, MessageCircle, MessageSquare,
} from "lucide-react";
import { useRevision } from "@/hooks/useRevisions";

// ─── Category badge ───────────────────────────────────────────────

const CATEGORY_STYLE: Record<string, string> = {
  bug:      "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",
  revision: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",
  feature:  "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",
  question: "bg-(--bg-muted) text-(--text-secondary) border-(--border)",
};

// ─── Page ─────────────────────────────────────────────────────────

export default function RevisionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t  = useTranslations("revisions");
  const tc = useTranslations("revisions.detail");

  const { data: revision, isLoading } = useRevision(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!revision) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <MessageSquare className="h-10 w-10 text-(--text-muted) mb-3" />
        <p className="text-sm text-(--text-muted)">Revision not found.</p>
        <Link href={ROUTES.CLIENT.REVISIONS} className="mt-4 text-sm text-(--accent) hover:underline">
          {tc("backToRevisions")}
        </Link>
      </div>
    );
  }

  const statusHistory = [
    { status: "open", note: tc("submittedOnDate", { date: formatDate(revision.created_at, { month: "short", day: "numeric" }) }), date: revision.created_at },
    ...(revision.updated_at !== revision.created_at
      ? [{ status: revision.status, note: `Status → ${revision.status.replace("_", " ")}`, date: revision.updated_at }]
      : []
    ),
  ];

  // Files from revision_attachments nested select
  const attachments = (revision as any).revision_attachments
    ?.map((ra: any) => ra.files)
    .filter(Boolean) ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <Link href={ROUTES.CLIENT.REVISIONS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" />
        {tc("backToRevisions")}
      </Link>

      {/* Header */}
      <div className="surface p-6">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", CATEGORY_STYLE[revision.category] ?? CATEGORY_STYLE.question)}>
            {t(`categories.${revision.category}`)}
          </span>
          <span className="text-xs text-(--text-muted) font-mono">#{revision.id.slice(-6).toUpperCase()}</span>
        </div>

        <h1 className="text-xl font-bold text-(--text-primary) tracking-tight mb-4">
          {revision.title}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-(--text-muted) mb-1">Status</p>
            <StatusBadge status={revision.status} />
          </div>
          <div>
            <p className="text-(--text-muted) mb-1">Priority</p>
            <PriorityBadge priority={revision.priority as any} />
          </div>
          <div>
            <p className="text-(--text-muted) mb-1">{tc("submittedBy")}</p>
            <p className="text-sm font-medium text-(--text-primary)">
              {(revision as any).submitted_profile?.name ?? "You"}
            </p>
          </div>
          <div>
            <p className="text-(--text-muted) mb-1">{tc("submittedOn")}</p>
            <p className="text-sm text-(--text-primary)">{formatDate(revision.created_at, { month: "short", day: "numeric" })}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="surface p-6">
        <p className="text-sm font-semibold text-(--text-primary) mb-3">Description</p>
        <p className="text-sm text-(--text-secondary) whitespace-pre-line leading-relaxed">{revision.description}</p>
      </div>

      {/* Metadata */}
      <div className="surface p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {(revision as any).milestones?.name && (
          <div className="flex items-center gap-2.5">
            <LinkIcon className="h-4 w-4 text-(--text-muted) shrink-0" />
            <div>
              <p className="text-xs text-(--text-muted)">{tc("linkedTo")}</p>
              <Link
                href={revision.milestone_id ? ROUTES.CLIENT.MILESTONE(revision.milestone_id) : "#"}
                className="text-sm font-medium text-(--accent) hover:underline"
              >
                {(revision as any).milestones.name}
              </Link>
            </div>
          </div>
        )}
        {(revision as any).assigned_profile?.name && (
          <div className="flex items-center gap-2.5">
            <User className="h-4 w-4 text-(--text-muted) shrink-0" />
            <div>
              <p className="text-xs text-(--text-muted)">{tc("assignedTo")}</p>
              <p className="text-sm font-medium text-(--text-primary)">{(revision as any).assigned_profile.name}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <Calendar className="h-4 w-4 text-(--text-muted) shrink-0" />
          <div>
            <p className="text-xs text-(--text-muted)">Last updated</p>
            <p className="text-sm text-(--text-primary)">{formatRelativeTime(revision.updated_at)}</p>
          </div>
        </div>
      </div>

      {/* Attachments */}
      <div className="surface p-6">
        <p className="text-sm font-semibold text-(--text-primary) mb-3">
          {tc("attachments")}
          {attachments.length > 0 && <span className="ms-2 text-xs font-normal text-(--text-muted)">({attachments.length})</span>}
        </p>
        {attachments.length === 0 ? (
          <p className="text-sm text-(--text-muted)">{tc("noAttachments")}</p>
        ) : (
          <div className="space-y-2">
            {attachments.map((file: any) => (
              <a key={file.id} href={file.url ?? "#"} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-(--border) px-4 py-3 hover:bg-(--bg-muted) transition-colors group">
                <FileText className="h-4 w-4 shrink-0 text-(--accent)" />
                <span className="flex-1 text-sm font-medium text-(--text-primary) truncate">{file.name}</span>
                <Paperclip className="h-3.5 w-3.5 text-(--text-muted) group-hover:text-(--accent) transition-colors" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Team Response */}
      <div className="surface p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-4 w-4 text-(--accent)" />
          <p className="text-sm font-semibold text-(--text-primary)">{tc("teamResponse")}</p>
        </div>
        {revision.team_response ? (
          <div className="rounded-xl bg-(--accent-subtle)/30 border border-(--accent-muted) px-4 py-3">
            <p className="text-sm text-(--text-secondary) leading-relaxed">{revision.team_response}</p>
            {(revision as any).assigned_profile?.name && (
              <p className="mt-2 text-xs text-(--text-muted)">— {(revision as any).assigned_profile.name}</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-(--text-muted)">{tc("noResponse")}</p>
        )}
      </div>

      {/* Status History */}
      <div className="surface p-6">
        <p className="text-sm font-semibold text-(--text-primary) mb-4">{tc("statusHistory")}</p>
        <div className="relative ps-6 space-y-4">
          <div className="absolute inset-s-2 top-1 bottom-1 w-px bg-(--border)" aria-hidden />
          {statusHistory.map((entry, i) => (
            <div key={i} className="relative">
              <div className="absolute -inset-s-6 top-1 h-4 w-4 rounded-full border-2 border-(--bg-surface) bg-(--bg-muted) ring-1 ring-(--border)" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <StatusBadge status={entry.status} showDot={false} size="sm" />
                  <p className="mt-1 text-sm text-(--text-secondary)">{entry.note}</p>
                </div>
                <time className="shrink-0 text-xs text-(--text-muted)">{formatRelativeTime(entry.date)}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
