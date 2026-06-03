"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  itemName?: string;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  confirmLabel?: string;
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  onConfirm,
  loading,
  confirmLabel,
}: ConfirmDeleteDialogProps) {
  const t = useTranslations("dialogs.confirmDelete");

  const resolvedTitle = title ?? t("defaultTitle");
  const resolvedDescription = description ?? (
    itemName ? t("withName", { name: itemName }) : t("withoutName")
  );
  const resolvedConfirmLabel = confirmLabel ?? t("confirm");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--danger-subtle)">
              <AlertTriangle className="h-5 w-5 text-(--danger)" />
            </div>
            <DialogTitle>{resolvedTitle}</DialogTitle>
          </div>
          <DialogDescription>{resolvedDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            {t("cancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm} loading={loading} autoFocus={false}>
            {resolvedConfirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
