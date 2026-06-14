"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { MilestonesPanel } from "@/components/client/MilestonesPanel";
import { SkeletonMilestone } from "@/components/ui/skeleton";
import { useMyProject } from "@/hooks/useProject";

export default function MilestonesPage() {
  const t = useTranslations("milestones");
  const { data: project, isLoading } = useMyProject();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <SkeletonMilestone key={i} />)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
      <MilestonesPanel projectId={project?.id} />
    </div>
  );
}
