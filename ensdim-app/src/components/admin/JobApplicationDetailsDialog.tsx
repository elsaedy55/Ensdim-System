"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Phone, Download, CheckCircle2, XCircle, Star, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter,
} from "@/components/ui/dialog";
import { formatDate, cn } from "@/lib/utils";
import { useUpdateJobApplicationStatus } from "@/hooks/useJobApplications";
import { getJobApplicationFileUrl } from "@/lib/services/job-applications.service";
import type { JobApplication, JobApplicationStatus } from "@/lib/services/job-applications.service";

function waLink(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

const STATUS_STYLE: Record<JobApplicationStatus, { className: string; dot: string }> = {
  new:         { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",               dot: "bg-(--accent)" },
  reviewing:   { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)", dot: "bg-(--warning)" },
  shortlisted: { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)", dot: "bg-(--success)" },
  rejected:    { className: "bg-red-50 text-red-600 border-red-200",                                       dot: "bg-red-500" },
  hired:       { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)", dot: "bg-(--success)" },
};

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-(--text-muted)">{label}</p>
      <p className="mt-0.5 text-sm text-(--text-primary) whitespace-pre-wrap break-words">{value}</p>
    </div>
  );
}

function FileDownloadButton({ path, label }: { path: string; label: string }) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const url = await getJobApplicationFileUrl(path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not open file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleClick} disabled={loading} className="flex items-center gap-1.5">
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      {label}
    </Button>
  );
}

interface JobApplicationDetailsDialogProps {
  application: JobApplication | null;
  onOpenChange: (open: boolean) => void;
}

export function JobApplicationDetailsDialog({ application, onOpenChange }: JobApplicationDetailsDialogProps) {
  const t = useTranslations("admin.jobApplications");
  const updateStatus = useUpdateJobApplicationStatus();

  const handleStatus = (status: JobApplicationStatus) => {
    if (!application) return;
    updateStatus.mutate(
      { id: application.id, status },
      {
        onSuccess: () => toast.success(t("success.statusUpdated")),
        onError: (e) => toast.error(e.message),
      }
    );
  };

  const statusStyle = application ? STATUS_STYLE[application.status] : null;

  return (
    <Dialog open={!!application} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        {application && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle>{application.full_name}</DialogTitle>
                {statusStyle && (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0",
                    statusStyle.className,
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusStyle.dot)} />
                    {t(`status.${application.status}`)}
                  </span>
                )}
              </div>
              <DialogDescription>
                {application.position} · {t("fields.submittedOn")} {formatDate(application.created_at, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
              </DialogDescription>
            </DialogHeader>

            <DialogBody className="space-y-5 max-h-[65vh] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                <FileDownloadButton path={application.cv_path} label={t("actions.downloadCV")} />
                {application.portfolio_file_path && (
                  <FileDownloadButton path={application.portfolio_file_path} label={t("actions.downloadPortfolio")} />
                )}
                {application.portfolio_url && (
                  <Button variant="ghost" size="sm" asChild className="flex items-center gap-1.5">
                    <a href={application.portfolio_url} target="_blank" rel="noopener noreferrer">
                      {t("fields.portfolioUrl")}
                    </a>
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-(--border)">
                <Field label={t("fields.email")} value={application.email} />
                <Field label={t("fields.whatsapp")} value={application.whatsapp} />
                <Field label={t("fields.country")} value={application.country} />
                <Field label={t("fields.city")} value={application.city} />
                <Field label={t("fields.careerCategory")} value={application.career_category} />
                <Field label={t("fields.experienceLevel")} value={application.experience_level} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-(--border)">
                <Field label={t("fields.currentJobTitle")} value={application.current_job_title} />
                <Field label={t("fields.previousJobTitle")} value={application.previous_job_title} />
                <Field label={t("fields.yearsOfExperience")} value={application.years_of_experience} />
                <Field label={t("fields.availability")} value={application.availability} />
                <Field label={t("fields.workTypePreference")} value={application.work_type_preference} />
              </div>

              <div className="pt-2 border-t border-(--border) space-y-4">
                <Field label={t("fields.toolsSkills")} value={application.tools_skills} />
                <Field label={t("fields.previousCompanies")} value={application.previous_companies} />
                <Field label={t("fields.keyProjects")} value={application.key_projects} />
                <Field label={t("fields.whyEnsdim")} value={application.why_ensdim} />
                <Field label={t("fields.strongestExperience")} value={application.strongest_experience} />
                <Field label={t("fields.preferredProjectType")} value={application.preferred_project_type} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-(--border)">
                <Field label={t("fields.sourcePage")} value={application.source_page} />
                <Field label={t("fields.careerRole")} value={application.career_role} />
                <Field label={t("fields.interestType")} value={application.interest_type} />
              </div>
            </DialogBody>

            <DialogFooter className="flex-wrap justify-between sm:justify-between">
              <Button variant="ghost" size="sm" asChild className="flex items-center gap-1.5 text-xs">
                <a href={waLink(application.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-3.5 w-3.5" /> {t("actions.openWhatsapp")}
                </a>
              </Button>

              <div className="flex items-center gap-2 flex-wrap">
                {application.status !== "reviewing" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("reviewing")} className="flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" /> {t("actions.markReviewing")}
                  </Button>
                )}
                {application.status !== "shortlisted" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("shortlisted")} className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" /> {t("actions.markShortlisted")}
                  </Button>
                )}
                {application.status !== "hired" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("hired")} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {t("actions.markHired")}
                  </Button>
                )}
                {application.status !== "rejected" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("rejected")} className="flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5" /> {t("actions.markRejected")}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
