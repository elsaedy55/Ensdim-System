"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  confirmLabel?: string;
}

export function ApproveDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  loading,
  confirmLabel,
}: ApproveDialogProps) {
  const t = useTranslations("dialogs.approve");

  const resolvedTitle       = title       ?? t("defaultTitle");
  const resolvedDescription = description ?? t("defaultDescription");
  const resolvedConfirmLabel = confirmLabel ?? t("confirm");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--success-subtle)">
              <CheckCircle2 className="h-5 w-5 text-(--success)" />
            </div>
            <DialogTitle>{resolvedTitle}</DialogTitle>
          </div>
          <DialogDescription>{resolvedDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            {t("cancel")}
          </Button>
          <Button onClick={onConfirm} loading={loading}>
            {resolvedConfirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
