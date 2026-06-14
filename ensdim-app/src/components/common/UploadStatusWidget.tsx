"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subscribe, subscribeEvents, cancelUpload, type UploadItemState } from "@/lib/upload/manager";

export function UploadStatusWidget() {
  const t = useTranslations("common.uploads");
  const [items, setItems] = React.useState<UploadItemState[]>([]);

  React.useEffect(() => subscribe(setItems), []);

  React.useEffect(() => subscribeEvents((event) => {
    if (event.type === "success") {
      toast.success(t("success", { name: event.fileName }));
    } else {
      toast.error(t("error", { name: event.fileName }));
    }
  }), [t]);

  const current = items[0];
  if (!current) return null;

  const percent = current.fileSize > 0
    ? Math.round((current.loaded / current.fileSize) * 100)
    : 0;

  return (
    <div className="fixed bottom-4 end-4 z-(--z-toast) w-80 max-w-[calc(100vw-2rem)]">
      <div className="surface flex items-center gap-3 p-3 shadow-(--shadow-modal)">
        <Loader2 className="h-5 w-5 text-(--accent) shrink-0 animate-spin" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-(--text-primary) truncate">
            {current.fileName}
          </p>
          <p className="text-xs text-(--text-muted) mb-1.5">
            {percent}%
            {items.length > 1 && ` · ${t("queued", { count: items.length - 1 })}`}
          </p>
          <Progress value={percent} size="xs" />
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => cancelUpload(current.id)}
          title={t("cancel")}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
