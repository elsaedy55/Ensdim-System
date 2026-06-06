"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  useResearchArticle,
  useUpdateResearchArticle,
  useUploadResearchImage,
} from "@/hooks/useResearch";
import { ResearchArticleForm } from "../_components/ResearchArticleForm";
import type { UpsertResearchInput } from "@/lib/services/research.service";

export default function EditResearchArticlePage() {
  const { id }    = useParams<{ id: string }>();
  const t         = useTranslations("admin.research");
  const router    = useRouter();
  const { data: article, isLoading } = useResearchArticle(id);
  const update    = useUpdateResearchArticle();
  const uploadImg = useUploadResearchImage();

  const handleSubmit = (data: UpsertResearchInput, newImageFile?: File) => {
    const doUpdate = (imageUrl?: string) => {
      update.mutate(
        {
          id,
          input: imageUrl !== undefined ? { ...data, image_url: imageUrl } : data,
        },
        {
          onSuccess: () => {
            toast.success(t("form.success.updated"));
            router.push(ROUTES.ADMIN.RESEARCH);
          },
          onError: (e) => toast.error(e.message),
        }
      );
    };

    if (newImageFile) {
      uploadImg.mutate(
        { articleId: id, file: newImageFile },
        {
          onSuccess: (url) => doUpdate(url),
          onError:   (e)   => toast.error(`${t("form.error.imageUpload")}: ${e.message}`),
        }
      );
    } else {
      doUpdate();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-(--bg-muted) rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="surface flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium text-(--text-primary)">Article not found</p>
        <Button size="sm" className="mt-4" asChild>
          <Link href={ROUTES.ADMIN.RESEARCH}>{t("form.actions.back")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit.title")}
        subtitle={article.title_en}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.ADMIN.RESEARCH}>
              <ArrowLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("form.actions.back")}
            </Link>
          </Button>
        }
      />
      <ResearchArticleForm
        defaultValues={article}
        onSubmit={handleSubmit}
        isLoading={update.isPending || uploadImg.isPending}
      />
    </div>
  );
}
