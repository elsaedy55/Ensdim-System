"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate } from "@/lib/utils";
import {
  FileText, Image, Video, Archive, Eye, Download,
  FolderOpen, ShieldAlert, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useMyProject } from "@/hooks/useProject";
import { useFiles } from "@/hooks/useFiles";
import { getSignedDownloadUrl } from "@/lib/services/files.service";
import type { FileRow } from "@/lib/supabase/types";

// ─── Helpers ──────────────────────────────────────────────────────

type FileCategory = "all" | "design" | "development" | "documentation" | "credentials" | "final_delivery" | "general";

function getFileIcon(mimeType: string): React.ReactNode {
  if (mimeType.startsWith("image/"))  return <Image    className="h-5 w-5 text-(--accent)" />;
  if (mimeType.startsWith("video/"))  return <Video    className="h-5 w-5 text-(--warning)" />;
  if (mimeType === "application/pdf") return <FileText className="h-5 w-5 text-(--danger)" />;
  if (mimeType.includes("zip") || mimeType.includes("rar")) return <Archive className="h-5 w-5 text-(--text-muted)" />;
  if (mimeType.includes("figma") || mimeType.includes("sketch")) return <FileText className="h-5 w-5 text-(--accent)" />;
  return <FileText className="h-5 w-5 text-(--text-muted)" />;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024)          return `${bytes} B`;
  if (bytes < 1024 * 1024)   return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function canPreview(mimeType: string): boolean {
  return mimeType.startsWith("image/") || mimeType === "application/pdf" || mimeType.startsWith("video/");
}

// ─── FileRow component ────────────────────────────────────────────

function FileRowItem({ file, blurred }: { file: FileRow; blurred: boolean }) {
  const t = useTranslations("files");
  const [revealed,       setRevealed]       = React.useState(false);
  const [loadingAction,  setLoadingAction]  = React.useState<"preview" | "download" | null>(null);

  const handleAction = async (action: "preview" | "download") => {
    setLoadingAction(action);
    try {
      const url = await getSignedDownloadUrl(file.storage_path);
      if (action === "preview") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
      }
    } catch {
      toast.error("Failed to access file. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="group flex items-center gap-4 px-4 py-3 hover:bg-(--bg-muted) transition-colors rounded-lg border border-(--border) mb-2">
      <div className="shrink-0">{getFileIcon(file.mime_type)}</div>

      <div className={cn("flex-1 min-w-0", blurred && !revealed && "blur-sm select-none")}>
        <p className="text-sm font-medium text-(--text-primary) truncate">{file.name}</p>
        <p className="text-xs text-(--text-muted)">
          {formatBytes(file.size)} · {(file as any).uploader?.name ?? "Team"} · {formatDate(file.created_at, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {blurred && !revealed ? (
          <Button size="sm" variant="secondary" onClick={() => setRevealed(true)}>
            <ShieldAlert className="h-3.5 w-3.5 me-1" /> {t("credentials.show")}
          </Button>
        ) : (
          <>
            {canPreview(file.mime_type) && (
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Preview"
                loading={loadingAction === "preview"}
                onClick={() => handleAction("preview")}
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Download"
              loading={loadingAction === "download"}
              onClick={() => handleAction("download")}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── FileList ─────────────────────────────────────────────────────

function FileList({ files, isCredentials = false }: { files: FileRow[]; isCredentials?: boolean }) {
  const t = useTranslations("files");

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-(--text-muted)">
        <FolderOpen className="h-10 w-10 mb-3" />
        <p className="text-sm font-medium text-(--text-primary)">{t("emptyState.title")}</p>
        <p className="text-xs mt-1">{t("emptyState.description")}</p>
      </div>
    );
  }

  return (
    <div>
      {isCredentials && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--warning-subtle) border border-(--warning-muted) px-4 py-3">
          <ShieldAlert className="h-4 w-4 text-(--warning) mt-0.5 shrink-0" />
          <p className="text-sm text-(--warning-foreground)">{t("credentials.warning")}</p>
        </div>
      )}
      {files.map((f) => <FileRowItem key={f.id} file={f} blurred={isCredentials} />)}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

const TABS: { value: FileCategory; labelKey: string }[] = [
  { value: "all",             labelKey: "tabs.all" },
  { value: "design",          labelKey: "tabs.design" },
  { value: "development",     labelKey: "tabs.development" },
  { value: "documentation",   labelKey: "tabs.documentation" },
  { value: "credentials",     labelKey: "tabs.credentials" },
  { value: "final_delivery",  labelKey: "tabs.final" },
];

export default function FilesPage() {
  const t = useTranslations("files");

  const { data: project }               = useMyProject();
  const { data: files, isLoading }      = useFiles(project?.id);

  const allFiles = files ?? [];

  const byCategory = (cat: FileCategory) =>
    cat === "all" ? allFiles : allFiles.filter((f) => f.category === cat);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      </div>
    );
  }

  const tabLabels = TABS.reduce((acc, tab) => {
    acc[tab.value] = t(tab.labelKey as Parameters<typeof t>[0]);
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />

      <Tabs defaultValue="all">
        <div className="overflow-x-auto">
          <TabsList variant="underline" className="w-max min-w-full">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                variant="underline"
                count={byCategory(tab.value).length}
              >
                {tabLabels[tab.value]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <FileList
              files={byCategory(tab.value)}
              isCredentials={tab.value === "credentials"}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
