import * as React from "react";
import { cn, formatDate } from "@/lib/utils";
import { FileText, Video, Image, File, Download, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/types";

function getFileIcon(mimeType: string): React.ReactNode {
  if (mimeType.startsWith("image/")) return <Image className="h-5 w-5 text-[var(--accent)]" />;
  if (mimeType.startsWith("video/")) return <Video className="h-5 w-5 text-[var(--warning)]" />;
  if (mimeType.includes("pdf") || mimeType.includes("document") || mimeType.includes("text"))
    return <FileText className="h-5 w-5 text-[var(--text-muted)]" />;
  return <File className="h-5 w-5 text-[var(--text-muted)]" />;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileCardProps {
  file: FileItem;
  onDelete?: (id: string) => void;
  className?: string;
}

export function FileCard({ file, onDelete, className }: FileCardProps) {
  return (
    <div className={cn(
      "group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 hover:bg-[var(--bg-muted)] transition-colors",
      className
    )}>
      <div className="shrink-0">{getFileIcon(file.mimeType)}</div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{file.name}</p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          {formatBytes(file.size)} · {formatDate(file.createdAt, { month: "short", day: "numeric" })} · {file.uploadedByName}
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <Button size="icon-sm" variant="ghost" asChild>
          <a href={file.url} target="_blank" rel="noopener noreferrer" aria-label="Open file">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        <Button size="icon-sm" variant="ghost" asChild>
          <a href={file.url} download={file.name} aria-label="Download file">
            <Download className="h-3.5 w-3.5" />
          </a>
        </Button>
        {onDelete && (
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => onDelete(file.id)}
            className="text-[var(--text-muted)] hover:text-[var(--danger)]"
            aria-label="Delete file"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── FileGrid ────────────────────────────────────────────────────────────────

interface FileGridProps {
  files: FileItem[];
  onDelete?: (id: string) => void;
  onPreview?: (file: FileItem) => void;
  className?: string;
}

export function FileGrid({ files, onDelete, onPreview, className }: FileGridProps) {
  if (!files.length) return null;

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", className)}>
      {files.map((file) => (
        <div
          key={file.id}
          className="group relative flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 hover:border-[var(--accent)] hover:shadow-sm transition-all cursor-pointer"
          onClick={() => onPreview?.(file)}
          role={onPreview ? "button" : undefined}
          tabIndex={onPreview ? 0 : undefined}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--bg-muted)]">
            {getFileIcon(file.mimeType)}
          </div>
          <p className="text-xs font-medium text-[var(--text-primary)] text-center line-clamp-2 leading-tight">
            {file.name}
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">{formatBytes(file.size)}</p>

          {onDelete && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
              className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-[var(--danger)]"
              aria-label="Delete file"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
