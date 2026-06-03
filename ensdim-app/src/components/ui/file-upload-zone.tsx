"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CloudUpload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "done" | "error";
  progress?: number;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileUploadZoneProps {
  files: UploadFile[];
  onFilesAdded: (files: File[]) => void;
  onFileRemove: (id: string) => void;
  maxSize?: number;
  accept?: string[];
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
}

export function FileUploadZone({
  files,
  onFilesAdded,
  onFileRemove,
  maxSize = 10 * 1024 * 1024,
  accept,
  maxFiles = 10,
  disabled,
  className,
}: FileUploadZoneProps) {
  const t = useTranslations("dialogs.fileUploadZone");
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validate = (fileList: FileList | File[]): File[] => {
    const arr = Array.from(fileList);
    const errors: string[] = [];

    if (files.length + arr.length > maxFiles) {
      errors.push(t("errors.tooManyFiles", { max: maxFiles }));
      return [];
    }

    const valid = arr.filter((f) => {
      if (f.size > maxSize) {
        errors.push(t("errors.fileTooLarge", { name: f.name, size: formatBytes(maxSize) }));
        return false;
      }
      if (accept && !accept.some((a) => f.type.match(a.replace("*", ".*")))) {
        errors.push(t("errors.invalidType", { name: f.name }));
        return false;
      }
      return true;
    });

    if (errors.length) setError(errors[0]);
    else setError(null);

    return valid;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const valid = validate(e.dataTransfer.files);
    if (valid.length) onFilesAdded(valid);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const valid = validate(e.target.files);
    if (valid.length) onFilesAdded(valid);
    e.target.value = "";
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-150",
          isDragging
            ? "border-(--accent) bg-(--accent-subtle)"
            : error
              ? "border-(--danger) bg-(--danger-subtle)"
              : "border-(--border) hover:border-(--accent) hover:bg-(--bg-muted)",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <CloudUpload className={cn("h-8 w-8", isDragging ? "text-(--accent)" : "text-(--text-muted)")} />
        <div>
          <p className="text-sm font-medium text-(--text-primary)">
            {isDragging ? t("release") : t("dropFilesHere")}
          </p>
          <p className="text-xs text-(--text-muted) mt-0.5">
            {accept ? accept.join(", ") : t("anyFileType")} · {t("maxSize", { size: formatBytes(maxSize) })}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept?.join(",")}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-(--danger)">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-lg border border-(--border) bg-(--bg-surface) px-3 py-2.5"
            >
              <FileText className="h-4 w-4 text-(--text-muted) shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-(--text-primary) truncate">{f.file.name}</p>
                {f.status === "uploading" && (
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-(--bg-muted)">
                    <div
                      className="h-full bg-(--accent) transition-all duration-300"
                      style={{ width: `${f.progress ?? 0}%` }}
                    />
                  </div>
                )}
                {f.status !== "uploading" && (
                  <p className="text-xs text-(--text-muted)">{formatBytes(f.file.size)}</p>
                )}
              </div>
              {f.status === "uploading" && <Loader2 className="h-4 w-4 text-(--accent) animate-spin shrink-0" />}
              {f.status === "done"      && <CheckCircle2 className="h-4 w-4 text-(--success) shrink-0" />}
              {f.status === "error"     && <AlertCircle className="h-4 w-4 text-(--danger) shrink-0" />}
              {f.status !== "uploading" && (
                <button
                  type="button"
                  onClick={() => onFileRemove(f.id)}
                  className="text-(--text-muted) hover:text-(--danger) transition-colors"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
