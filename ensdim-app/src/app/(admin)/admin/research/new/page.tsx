"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateResearchArticle,
  useUploadResearchImage,
} from "@/hooks/useResearch";
import { ResearchArticleForm } from "../_components/ResearchArticleForm";
import type { UpsertResearchInput } from "@/lib/services/research.service";

export default function NewResearchArticlePage() {
  const t      = useTranslations("admin.research");
  const router = useRouter();
  const create  = useCreateResearchArticle();
  const upload  = useUploadResearchImage();

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (data: UpsertResearchInput, imageFile?: File) => {
    setIsSaving(true);
    try {
      // 1. Create the article
      const article = await create.mutateAsync(data);

      // 2. Upload image if provided
      if (imageFile) {
        try {
          const url = await upload.mutateAsync({ articleId: article.id, file: imageFile });
          // 3. Not strictly needed — the list will refetch, but update image_url for consistency
          // (research service doesn't expose a direct update here, form handles it via edit page)
          void url;
        } catch (imgErr) {
          toast.error(t("form.error.imageUpload"));
        }
      }

      toast.success(t("form.success.created"));
      router.push(ROUTES.ADMIN.RESEARCH);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("new.title")}
        subtitle={t("new.subtitle")}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.ADMIN.RESEARCH}>
              <ArrowLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("form.actions.back")}
            </Link>
          </Button>
        }
      />
      <ResearchArticleForm onSubmit={handleSubmit} isLoading={isSaving} />
    </div>
  );
}
