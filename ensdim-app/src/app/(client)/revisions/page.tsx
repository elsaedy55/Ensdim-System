"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { Plus } from "lucide-react";
import { useMyProject } from "@/hooks/useProject";
import { RevisionsPanel } from "@/components/client/RevisionsPanel";
import { QueryErrorState } from "@/components/common/QueryErrorState";

export default function RevisionsPage() {
  const t = useTranslations("revisions");
  const { data: project, isLoading, error } = useMyProject();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
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
      <PageHeader
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        actions={
          <Button asChild>
            <Link href={ROUTES.CLIENT.REVISION_NEW} className="rtl:flex-row-reverse">
              <Plus className="h-4 w-4" />
              {t("new.title")}
            </Link>
          </Button>
        }
      />
      <RevisionsPanel projectId={project?.id} showNewButton={false} />
    </div>
  );
}
