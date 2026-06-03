"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { FileItem } from "@/types";

interface FilePreviewModalProps {
  file: FileItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilePreviewModal({ file, open, onOpenChange }: FilePreviewModalProps) {
  const t = useTranslations("dialogs.filePreview");
  if (!file) return null;

  const isImage = file.mimeType.startsWith("image/");
  const isVideo = file.mimeType.startsWith("video/");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold truncate pe-4">{file.name}</DialogTitle>
          <p className="text-xs text-(--text-muted) mt-0.5">
            {t("uploadedBy", { name: file.uploadedByName })} · {formatDate(file.createdAt, { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </DialogHeader>

        {/* Preview area */}
        <div className="rounded-lg overflow-hidden border border-(--border) bg-(--bg-muted) min-h-50 flex items-center justify-center">
          {isImage ? (
            <img src={file.url} alt={file.name} className="max-h-100 w-full object-contain" />
          ) : isVideo ? (
            <video src={file.url} controls className="max-h-100 w-full rounded-lg" />
          ) : (
            <div className="flex flex-col items-center gap-3 py-12">
              <FileText className="h-12 w-12 text-(--text-muted)" />
              <p className="text-sm text-(--text-muted)">{t("noPreview")}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end">
          <Button variant="secondary" asChild>
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" /> {t("open")}
            </a>
          </Button>
          <Button asChild>
            <a href={file.url} download={file.name} className="flex items-center gap-2">
              <Download className="h-4 w-4" /> {t("download")}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
