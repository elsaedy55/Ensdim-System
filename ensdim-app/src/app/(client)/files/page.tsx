"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyProject } from "@/hooks/useProject";
import { FilesPanel } from "@/components/client/FilesPanel";
import { QueryErrorState } from "@/components/common/QueryErrorState";

export default function FilesPage() {
  const t = useTranslations("files");
  const { data: project, isLoading, error } = useMyProject();

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

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
        <QueryErrorState title="Could not load your project" error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
      <FilesPanel projectId={project?.id} />
    </div>
  );
}
