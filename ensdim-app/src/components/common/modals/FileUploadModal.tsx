"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUploadZone, type UploadFile } from "@/components/ui/file-upload-zone";

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (files: File[]) => Promise<void>;
  maxSize?: number;
  accept?: string[];
  maxFiles?: number;
  title?: string;
}

export function FileUploadModal({
  open,
  onOpenChange,
  onUpload,
  maxSize,
  accept,
  maxFiles,
  title,
}: FileUploadModalProps) {
  const t = useTranslations("dialogs.fileUpload");
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [uploading, setUploading] = React.useState(false);

  const resolvedTitle = title ?? t("defaultTitle");

  const handleClose = () => {
    if (uploading) return;
    setFiles([]);
    onOpenChange(false);
  };

  const addFiles = (newFiles: File[]) => {
    const entries: UploadFile[] = newFiles.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      file: f,
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...entries]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = async () => {
    setUploading(true);
    const pendingFiles = files.filter((f) => f.status === "pending");
    setFiles((prev) => prev.map((f) =>
      f.status === "pending" ? { ...f, status: "uploading" as const, progress: 0 } : f
    ));
    try {
      await onUpload(pendingFiles.map((f) => f.file));
      setFiles((prev) => prev.map((f) =>
        f.status === "uploading" ? { ...f, status: "done" as const, progress: 100 } : f
      ));
      setTimeout(handleClose, 800);
    } catch {
      setFiles((prev) => prev.map((f) =>
        f.status === "uploading" ? { ...f, status: "error" as const } : f
      ));
    } finally {
      setUploading(false);
    }
  };

  const pendingCount = files.filter((f) => f.status === "pending").length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
        </DialogHeader>

        <FileUploadZone
          files={files}
          onFilesAdded={addFiles}
          onFileRemove={removeFile}
          maxSize={maxSize}
          accept={accept}
          maxFiles={maxFiles}
          disabled={uploading}
        />

        <DialogFooter>
          <Button variant="secondary" onClick={handleClose} disabled={uploading}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleUpload}
            disabled={pendingCount === 0}
            loading={uploading}
          >
            {pendingCount > 0 ? t("uploadWithCount", { count: pendingCount }) : t("upload")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
