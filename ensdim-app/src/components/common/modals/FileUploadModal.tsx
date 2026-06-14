"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadZone, type UploadFile } from "@/components/ui/file-upload-zone";
import type { CredentialData } from "@/lib/supabase/types";

interface CategoryOption {
  value: string;
  label: string;
}

interface CredentialFormData extends CredentialData {
  name: string;
}

export interface UploadProgress {
  total: number;
  done: number;
  failed: number;
  percent: number;
}

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload?: (file: File, category: string, onFileProgress?: (loaded: number, total: number) => void) => Promise<void>;
  onEnqueue?: (files: File[], category: string) => void;
  onCreateCredential?: (data: CredentialFormData, category: string) => Promise<void>;
  onProgress?: (progress: UploadProgress | null) => void;
  cancelRef?: React.RefObject<(() => void) | null>;
  maxSize?: number;
  accept?: string[];
  maxFiles?: number;
  title?: string;
  categories?: CategoryOption[];
  credentialCategory?: string;
}

const EMPTY_CREDENTIAL: CredentialFormData = { name: "", url: "", email: "", username: "", password: "", notes: "" };

export function FileUploadModal({
  open,
  onOpenChange,
  onUpload,
  onEnqueue,
  onCreateCredential,
  onProgress,
  cancelRef,
  maxSize,
  accept,
  maxFiles,
  title,
  categories,
  credentialCategory = "credentials",
}: FileUploadModalProps) {
  const t = useTranslations("dialogs.fileUpload");
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [category, setCategory] = React.useState(categories?.[0]?.value ?? "general");
  const [credential, setCredential] = React.useState<CredentialFormData>(EMPTY_CREDENTIAL);

  const resolvedTitle = title ?? t("defaultTitle");
  const isCredentialMode = !!onCreateCredential && category === credentialCategory;

  const handleClose = () => {
    if (uploading) return;
    setFiles([]);
    setCredential(EMPTY_CREDENTIAL);
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (open) setCategory(categories?.[0]?.value ?? "general");
  }, [open, categories]);

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

  const handleUpload = () => {
    const pendingFiles = files.filter((f) => f.status === "pending").map((f) => f.file);
    if (pendingFiles.length === 0) return;
    const cat = category;
    const total = pendingFiles.length;

    // Close immediately and continue uploading in the background so the
    // user can keep queuing more uploads without waiting.
    setFiles([]);
    onOpenChange(false);

    if (onEnqueue) {
      onEnqueue(pendingFiles, cat);
      return;
    }
    if (!onUpload) return;

    onProgress?.({ total, done: 0, failed: 0, percent: 0 });

    let cancelled = false;
    if (cancelRef) cancelRef.current = () => { cancelled = true; };

    const totalBytes = pendingFiles.reduce((sum, f) => sum + f.size, 0);
    let uploadedBytes = 0;

    void (async () => {
      let done = 0;
      let failed = 0;
      for (const file of pendingFiles) {
        if (cancelled) break;
        try {
          await onUpload(file, cat, (loaded) => {
            const percent = totalBytes > 0 ? Math.round(((uploadedBytes + loaded) / totalBytes) * 100) : 0;
            onProgress?.({ total, done, failed, percent });
          });
          done++;
        } catch {
          failed++;
        }
        uploadedBytes += file.size;
        const percent = totalBytes > 0 ? Math.round((uploadedBytes / totalBytes) * 100) : Math.round(((done + failed) / total) * 100);
        onProgress?.({ total, done, failed, percent });
      }
      if (!cancelled && failed > 0) {
        toast.error(t("uploadCompleteWithErrors", { done, failed }));
      }
      if (cancelRef) cancelRef.current = null;
      onProgress?.(null);
    })();
  };

  const handleSaveCredential = async () => {
    if (!onCreateCredential) return;
    setUploading(true);
    try {
      await onCreateCredential(credential, category);
      handleClose();
    } finally {
      setUploading(false);
    }
  };

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const canSaveCredential = credential.name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {categories && categories.length > 0 && (
            <FormField label={t("category")} htmlFor="upload-category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="upload-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}

          {isCredentialMode ? (
            <div className="space-y-3">
              <FormField label={t("credentialForm.name")} required htmlFor="cred-name">
                <Input
                  id="cred-name"
                  placeholder={t("credentialForm.namePlaceholder")}
                  value={credential.name}
                  onChange={(e) => setCredential((p) => ({ ...p, name: e.target.value }))}
                />
              </FormField>
              <FormField label={t("credentialForm.url")} htmlFor="cred-url">
                <Input
                  id="cred-url"
                  type="url"
                  placeholder="https://..."
                  value={credential.url}
                  onChange={(e) => setCredential((p) => ({ ...p, url: e.target.value }))}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label={t("credentialForm.email")} htmlFor="cred-email">
                  <Input
                    id="cred-email"
                    type="email"
                    placeholder="name@example.com"
                    value={credential.email}
                    onChange={(e) => setCredential((p) => ({ ...p, email: e.target.value }))}
                  />
                </FormField>
                <FormField label={t("credentialForm.username")} htmlFor="cred-username">
                  <Input
                    id="cred-username"
                    value={credential.username}
                    onChange={(e) => setCredential((p) => ({ ...p, username: e.target.value }))}
                  />
                </FormField>
              </div>
              <FormField label={t("credentialForm.password")} htmlFor="cred-password">
                <Input
                  id="cred-password"
                  type="text"
                  value={credential.password}
                  onChange={(e) => setCredential((p) => ({ ...p, password: e.target.value }))}
                />
              </FormField>
              <FormField label={t("credentialForm.notes")} htmlFor="cred-notes">
                <Textarea
                  id="cred-notes"
                  rows={2}
                  value={credential.notes}
                  onChange={(e) => setCredential((p) => ({ ...p, notes: e.target.value }))}
                />
              </FormField>
            </div>
          ) : (
            <FileUploadZone
              files={files}
              onFilesAdded={addFiles}
              onFileRemove={removeFile}
              maxSize={maxSize}
              accept={accept}
              maxFiles={maxFiles}
              disabled={uploading}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={handleClose} disabled={uploading}>
            {t("cancel")}
          </Button>
          {isCredentialMode ? (
            <Button onClick={handleSaveCredential} disabled={!canSaveCredential} loading={uploading}>
              {t("save")}
            </Button>
          ) : (
            <Button onClick={handleUpload} disabled={pendingCount === 0}>
              {pendingCount > 0 ? t("uploadWithCount", { count: pendingCount }) : t("upload")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
