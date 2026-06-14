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
  useCaseStudy,
  useUpdateCaseStudy,
  useUploadCaseStudyImage,
  useUploadCaseStudyGalleryImage,
} from "@/hooks/useCaseStudies";
import { CaseStudyForm } from "../_components/CaseStudyForm";
import type { UpsertCaseStudyInput } from "@/lib/services/case-studies.service";

export default function EditCaseStudyPage() {
  const { id }    = useParams<{ id: string }>();
  const t         = useTranslations("admin.caseStudies");
  const router    = useRouter();
  const { data: study, isLoading } = useCaseStudy(id);
  const update    = useUpdateCaseStudy();
  const uploadImg = useUploadCaseStudyImage();
  const uploadGalleryImg = useUploadCaseStudyGalleryImage();

  const handleSubmit = async (data: UpsertCaseStudyInput, newImageFile?: File, galleryFiles?: File[]) => {
    const input: UpsertCaseStudyInput = { ...data };

    if (newImageFile) {
      try {
        input.image_url = await uploadImg.mutateAsync({ caseStudyId: id, file: newImageFile });
      } catch (e) {
        toast.error(`${t("form.error.imageUpload")}: ${(e as Error).message}`);
        return;
      }
    }

    if (galleryFiles && galleryFiles.length > 0) {
      try {
        const urls = await Promise.all(
          galleryFiles.map((file) => uploadGalleryImg.mutateAsync({ caseStudyId: id, file }))
        );
        input.gallery_images = [...data.gallery_images, ...urls];
      } catch (e) {
        toast.error(`${t("form.error.imageUpload")}: ${(e as Error).message}`);
        return;
      }
    }

    update.mutate(
      { id, input },
      {
        onSuccess: () => {
          toast.success(t("form.success.updated"));
          router.push(ROUTES.ADMIN.CASE_STUDIES);
        },
        onError: (e) => toast.error(e.message),
      }
    );
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

  if (!study) {
    return (
      <div className="surface flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium text-(--text-primary)">Case study not found</p>
        <Button size="sm" className="mt-4" asChild>
          <Link href={ROUTES.ADMIN.CASE_STUDIES}>{t("form.actions.back")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit.title")}
        subtitle={study.title_en}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.ADMIN.CASE_STUDIES}>
              <ArrowLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("form.actions.back")}
            </Link>
          </Button>
        }
      />
      <CaseStudyForm
        defaultValues={study}
        onSubmit={handleSubmit}
        isLoading={update.isPending || uploadImg.isPending || uploadGalleryImg.isPending}
      />
    </div>
  );
}
