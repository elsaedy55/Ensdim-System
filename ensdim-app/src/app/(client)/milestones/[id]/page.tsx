"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import {
  CheckCircle2, XCircle, Download, ExternalLink, Clock,
  AlertTriangle, FileText, Video, ChevronLeft, Flag,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMilestone, useApproveMilestone, useMilestoneActivity } from "@/hooks/useMilestones";
import { useSignedUrl } from "@/hooks/useFiles";

// ─── File row with signed URL ─────────────────────────────────────

function DeliverableRow({ file }: { file: { id: string; name: string; storage_path: string; mime_type: string } }) {
  const t = useTranslations("milestones.detail");
  const isVideo = file.mime_type.startsWith("video/");
  const { data: url } = useSignedUrl(file.storage_path);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-(--border) px-4 py-3 hover:bg-(--bg-muted) transition-colors group">
      {isVideo
        ? <Video className="h-4 w-4 text-(--warning) shrink-0" />
        : <FileText className="h-4 w-4 text-(--accent) shrink-0" />
      }
      <span className="flex-1 text-sm font-medium text-(--text-primary) truncate">{file.name}</span>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isVideo ? (
          <Button size="sm" variant="ghost" asChild>
            <a href={url ?? "#"} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 me-1" />{t("watch")}
            </a>
          </Button>
        ) : (
          <>
            <Button size="icon-sm" variant="ghost" asChild>
              <a href={url ?? "#"} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button size="icon-sm" variant="ghost" asChild>
              <a href={url ?? "#"} download={file.name}>
                <Download className="h-3.5 w-3.5" />
              </a>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function MilestoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t      = useTranslations("milestones.detail");

  const { data: milestone, isLoading } = useMilestone(id);
  const { data: activity }             = useMilestoneActivity(id);
  const approveMilestone               = useApproveMilestone();

  const [localApproved, setLocalApproved] = React.useState(false);

  const currentStatus = localApproved ? "approved" : (milestone?.status ?? "pending");
  const isReview      = currentStatus === "review";

  const handleApprove = () => {
    approveMilestone.mutate(id, {
      onSuccess: () => {
        setLocalApproved(true);
        toast.success(t("approvedMessage"));
      },
      onError: (e) => toast.error(e.message),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!milestone) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Flag className="h-10 w-10 text-(--text-muted) mb-3" />
        <p className="text-sm text-(--text-muted)">Milestone not found.</p>
        <Link href={ROUTES.CLIENT.MILESTONES} className="mt-4 text-sm text-(--accent) hover:underline">
          {t("backToMilestones")}
        </Link>
      </div>
    );
  }

  // files come from the nested select in getMilestoneById
  const deliverables = (milestone as any).files ?? [];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back */}
      <Link href={ROUTES.CLIENT.MILESTONES} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" />
        {t("backToMilestones")}
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight">{milestone.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-(--text-muted) flex-wrap">
            {milestone.start_date && (
              <span>{t("started", { date: formatDate(milestone.start_date, { month: "short", day: "numeric" }) })}</span>
            )}
            <span>·</span>
            <span>{t("due", { date: formatDate(milestone.due_date, { month: "short", day: "numeric" }) })}</span>
          </div>
        </div>
        <StatusBadge status={currentStatus} size="md" />
      </div>

      {/* Progress */}
      <div className="surface p-5">
        <Progress value={milestone.progress} size="md" showLabel colorByValue />
      </div>

      {/* Description */}
      {milestone.description && (
        <div className="surface p-5">
          <h2 className="text-sm font-semibold text-(--text-primary) mb-3">{t("aboutTitle")}</h2>
          <p className="text-sm text-(--text-secondary) leading-relaxed">{milestone.description}</p>
        </div>
      )}

      {/* Deliverables */}
      <div className="surface p-5">
        <h2 className="text-sm font-semibold text-(--text-primary) mb-4">
          {t("deliverablesTitle")}
          <span className="text-(--text-muted) font-normal ms-1">({deliverables.length})</span>
        </h2>
        {deliverables.length === 0 ? (
          <p className="text-sm text-(--text-muted) text-center py-6">{t("noActivity")}</p>
        ) : (
          <div className="space-y-2">
            {deliverables.map((file: any) => (
              <DeliverableRow key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>

      {/* Review Actions */}
      {isReview && (
        <div className="surface p-5 border-(--warning-muted) bg-(--warning-subtle)/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-(--warning)" />
            <span className="text-sm font-semibold text-(--text-primary)">{t("reviewRequired")}</span>
          </div>
          <p className="text-sm text-(--text-secondary) mb-4">{t("reviewDescription")}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" leftIcon={<CheckCircle2 className="h-4 w-4" />} loading={approveMilestone.isPending}>
                  {t("approveMilestone")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("confirmApproveTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("confirmApproveDescription", { name: milestone.name })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("confirmCancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleApprove}>
                    {t("confirmApproveButton")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant="secondary" size="lg" asChild>
              <Link href={`${ROUTES.CLIENT.REVISION_NEW}?milestone=${id}`}>
                <XCircle className="h-4 w-4 me-2" />
                {t("requestChanges")}
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Approved */}
      {currentStatus === "approved" && (
        <div className="surface p-5 border-(--success-muted) bg-(--success-subtle)/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-(--success)" />
            <span className="text-sm font-semibold text-(--success-foreground)">{t("approvedMessage")}</span>
          </div>
          <p className="text-sm text-(--text-secondary) mt-1">{t("approvedDescription")}</p>
        </div>
      )}

      {/* Activity Log */}
      <div className="surface p-5">
        <h2 className="text-sm font-semibold text-(--text-primary) mb-4">{t("activityTitle")}</h2>
        {(activity ?? []).length === 0 ? (
          <p className="text-sm text-(--text-muted) text-center py-4">{t("noActivity")}</p>
        ) : (
          <div className="relative ps-6 space-y-4">
            <div className="absolute inset-s-2 top-1 bottom-1 w-px bg-(--border)" aria-hidden />
            {(activity ?? []).map((item: any) => (
              <div key={item.id} className="relative">
                <div className="absolute -inset-s-6 top-1 h-4 w-4 rounded-full border-2 border-(--bg-surface) bg-(--bg-muted) ring-1 ring-(--border)" />
                <p className="text-sm text-(--text-secondary)">
                  <span className="font-medium text-(--text-primary)">{item.profiles?.name ?? "Team"}</span>
                  {" "}{item.message}
                </p>
                <time className="text-xs text-(--text-muted) mt-0.5 block">
                  {formatRelativeTime(item.created_at)}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
