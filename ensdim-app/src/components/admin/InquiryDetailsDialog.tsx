"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Phone, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter,
} from "@/components/ui/dialog";
import { formatDate, cn } from "@/lib/utils";
import { useUpdateInquiryStatus } from "@/hooks/useInquiries";
import type { Inquiry, InquiryStatus } from "@/lib/services/inquiries.service";

function waLink(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

const STATUS_STYLE: Record<InquiryStatus, { className: string; dot: string }> = {
  new:       { className: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",             dot: "bg-(--accent)" },
  contacted: { className: "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)", dot: "bg-(--warning)" },
  closed:    { className: "bg-(--success-subtle) text-(--success-foreground) border-(--success-muted)", dot: "bg-(--success)" },
};

interface InquiryDetailsDialogProps {
  inquiry: Inquiry | null;
  onOpenChange: (open: boolean) => void;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-(--text-muted)">{label}</p>
      <p className="mt-0.5 text-sm text-(--text-primary) whitespace-pre-wrap break-words">{value}</p>
    </div>
  );
}

export function InquiryDetailsDialog({ inquiry, onOpenChange }: InquiryDetailsDialogProps) {
  const t = useTranslations("admin.inquiries");
  const updateStatus = useUpdateInquiryStatus();

  const handleStatus = (status: InquiryStatus) => {
    if (!inquiry) return;
    updateStatus.mutate(
      { id: inquiry.id, status },
      {
        onSuccess: () => toast.success(t("success.statusUpdated")),
        onError: (e) => toast.error(e.message),
      }
    );
  };

  const statusStyle = inquiry ? STATUS_STYLE[inquiry.status] : null;

  return (
    <Dialog open={!!inquiry} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        {inquiry && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle>{inquiry.name}</DialogTitle>
                {statusStyle && (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0",
                    statusStyle.className,
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusStyle.dot)} />
                    {t(`status.${inquiry.status}`)}
                  </span>
                )}
              </div>
              <DialogDescription>
                {t("fields.submittedOn")} {formatDate(inquiry.created_at, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
              </DialogDescription>
            </DialogHeader>

            <DialogBody className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("fields.whatsapp")} value={inquiry.whatsapp} />
                <Field label={t("fields.email")} value={inquiry.email} />
                <Field label={t("fields.company")} value={inquiry.company} />
                <Field label={t("fields.role")} value={inquiry.role} />
                <Field label={t("fields.country")} value={inquiry.country} />
                <Field label={t("fields.budget")} value={inquiry.budget} />
              </div>

              <Field label={t("fields.message")} value={inquiry.message} />
              <Field label={t("fields.details")} value={inquiry.details} />
              <Field label={t("fields.challenge")} value={inquiry.challenge} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-(--border)">
                <Field label={t("fields.sourcePage")} value={inquiry.source_page} />
                <Field label={t("fields.interestType")} value={inquiry.interest_type} />
                <Field label={t("fields.clickedItem")} value={inquiry.clicked_item} />
              </div>
            </DialogBody>

            <DialogFooter className="flex-wrap justify-between sm:justify-between">
              <Button variant="ghost" size="sm" asChild className="flex items-center gap-1.5 text-xs">
                <a href={waLink(inquiry.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-3.5 w-3.5" /> {t("actions.openWhatsapp")}
                </a>
              </Button>

              <div className="flex items-center gap-2 flex-wrap">
                {inquiry.status !== "contacted" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("contacted")} className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {t("actions.markContacted")}
                  </Button>
                )}
                {inquiry.status !== "closed" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("closed")} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {t("actions.markClosed")}
                  </Button>
                )}
                {inquiry.status !== "new" && (
                  <Button variant="secondary" size="sm" onClick={() => handleStatus("new")} className="flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" /> {t("actions.markNew")}
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
