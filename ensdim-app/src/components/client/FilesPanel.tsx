"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate } from "@/lib/utils";
import {
  FileText, Image, Video, Archive, Eye, EyeOff, Download,
  FolderOpen, ShieldAlert, KeyRound, Copy,
} from "lucide-react";
import { toast } from "sonner";
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
    if (!file.storage_path) return;
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
    <div className="group flex items-center gap-4 px-4 py-3 hover:bg-(--bg-muted) transition-colors rounded-lg border border-(--border) mb-2 rtl:flex-row-reverse">
      <div className="shrink-0">{getFileIcon(file.mime_type ?? "")}</div>

      <div className={cn("flex-1 min-w-0", blurred && !revealed && "blur-sm select-none")}>
        <p className="text-sm font-medium text-(--text-primary) truncate rtl:text-right">{file.name}</p>
        <p className="text-xs text-(--text-muted) rtl:text-right">
          {formatBytes(file.size ?? 0)} · {(file as any).uploader?.name ?? "Team"} · {formatDate(file.created_at, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="shrink-0 flex items-center gap-2 rtl:flex-row-reverse">
        {blurred && !revealed ? (
          <Button size="sm" variant="secondary" onClick={() => setRevealed(true)}>
            <ShieldAlert className="h-3.5 w-3.5 me-1" /> {t("credentials.show")}
          </Button>
        ) : (
          <>
            {canPreview(file.mime_type ?? "") && (
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

// ─── CredentialRowItem ──────────────────────────────────────────────

function CredentialField({ label, value, isLink, isSecret }: { label: string; value: string; isLink?: boolean; isSecret?: boolean }) {
  const t = useTranslations("files");
  const [show, setShow] = React.useState(!isSecret);

  const copy = () => {
    navigator.clipboard.writeText(value);
    toast.success(t("credentials.copied"));
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-(--bg-muted) px-3 py-1.5 rtl:flex-row-reverse">
      <div className="min-w-0 rtl:text-right">
        <p className="text-[10px] uppercase tracking-wide text-(--text-muted)">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-(--accent) hover:underline truncate block">
            {value}
          </a>
        ) : (
          <p className="text-xs text-(--text-primary) truncate">{isSecret && !show ? "••••••••" : value}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {isSecret && (
          <Button size="icon-sm" variant="ghost" aria-label="Toggle visibility" onClick={() => setShow((s) => !s)}>
            {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </Button>
        )}
        <Button size="icon-sm" variant="ghost" aria-label="Copy" onClick={copy}>
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

function CredentialRowItem({ file }: { file: FileRow }) {
  const t = useTranslations("files");
  const [revealed, setRevealed] = React.useState(false);
  const data = file.credential_data!;

  return (
    <div className="px-4 py-3 hover:bg-(--bg-muted) transition-colors rounded-lg border border-(--border) mb-2">
      <div className="flex items-center gap-4 rtl:flex-row-reverse">
        <div className="shrink-0"><KeyRound className="h-5 w-5 text-(--accent)" /></div>

        <div className={cn("flex-1 min-w-0", !revealed && "blur-sm select-none")}>
          <p className="text-sm font-medium text-(--text-primary) truncate rtl:text-right">{file.name}</p>
          <p className="text-xs text-(--text-muted) rtl:text-right">
            {(file as any).uploader?.name ?? "Team"} · {formatDate(file.created_at, { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="shrink-0">
          {!revealed && (
            <Button size="sm" variant="secondary" onClick={() => setRevealed(true)}>
              <ShieldAlert className="h-3.5 w-3.5 me-1" /> {t("credentials.show")}
            </Button>
          )}
        </div>
      </div>

      {revealed && (
        <div className="mt-3 space-y-2 ps-9 rtl:pe-9 rtl:ps-0">
          {data.url && <CredentialField label={t("credentials.fields.url")} value={data.url} isLink />}
          {data.email && <CredentialField label={t("credentials.fields.email")} value={data.email} />}
          {data.username && <CredentialField label={t("credentials.fields.username")} value={data.username} />}
          {data.password && <CredentialField label={t("credentials.fields.password")} value={data.password} isSecret />}
          {data.notes && <p className="text-xs text-(--text-muted) rtl:text-right">{data.notes}</p>}
        </div>
      )}
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
        <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-(--warning-subtle) border border-(--warning-muted) px-4 py-3 rtl:flex-row-reverse">
          <ShieldAlert className="h-4 w-4 text-(--warning) mt-0.5 shrink-0" />
          <p className="text-sm text-(--warning-foreground) rtl:text-right">{t("credentials.warning")}</p>
        </div>
      )}
      {files.map((f) =>
        f.credential_data
          ? <CredentialRowItem key={f.id} file={f} />
          : <FileRowItem key={f.id} file={f} blurred={isCredentials} />
      )}
    </div>
  );
}

// ─── Panel ────────────────────────────────────────────────────────

const TABS: { value: FileCategory; labelKey: string }[] = [
  { value: "all",             labelKey: "tabs.all" },
  { value: "design",          labelKey: "tabs.design" },
  { value: "development",     labelKey: "tabs.development" },
  { value: "documentation",   labelKey: "tabs.documentation" },
  { value: "credentials",     labelKey: "tabs.credentials" },
  { value: "final_delivery",  labelKey: "tabs.final" },
];

export function FilesPanel({ projectId }: { projectId: string | undefined }) {
  const t = useTranslations("files");
  const { data: files, isLoading } = useFiles(projectId);

  const allFiles = files ?? [];

  const byCategory = (cat: FileCategory) =>
    cat === "all" ? allFiles : allFiles.filter((f) => f.category === cat);

  if (isLoading) {
    return <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>;
  }

  const tabLabels = TABS.reduce((acc, tab) => {
    acc[tab.value] = t(tab.labelKey as Parameters<typeof t>[0]);
    return acc;
  }, {} as Record<string, string>);

  return (
    <Tabs defaultValue="all">
      <div className="overflow-x-auto">
        <TabsList variant="underline" className="w-max min-w-full rtl:flex-row-reverse">
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
  );
}
