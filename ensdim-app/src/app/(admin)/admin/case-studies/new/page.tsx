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
  useCreateCaseStudy,
  useUpdateCaseStudy,
  useUploadCaseStudyImage,
  useUploadCaseStudyGalleryImage,
} from "@/hooks/useCaseStudies";
import { CaseStudyForm } from "../_components/CaseStudyForm";
import type { UpsertCaseStudyInput } from "@/lib/services/case-studies.service";

export default function NewCaseStudyPage() {
  const t      = useTranslations("admin.caseStudies");
  const router = useRouter();
  const create  = useCreateCaseStudy();
  const update  = useUpdateCaseStudy();
  const upload  = useUploadCaseStudyImage();
  const uploadGallery = useUploadCaseStudyGalleryImage();

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (data: UpsertCaseStudyInput, imageFile?: File, galleryFiles?: File[]) => {
    setIsSaving(true);
    try {
      const study = await create.mutateAsync(data);

      const updates: Partial<UpsertCaseStudyInput> = {};

      if (imageFile) {
        try {
          updates.image_url = await upload.mutateAsync({ caseStudyId: study.id, file: imageFile });
        } catch {
          toast.error(t("form.error.imageUpload"));
        }
      }

      if (galleryFiles && galleryFiles.length > 0) {
        try {
          const urls = await Promise.all(
            galleryFiles.map((file) => uploadGallery.mutateAsync({ caseStudyId: study.id, file }))
          );
          updates.gallery_images = [...data.gallery_images, ...urls];
        } catch {
          toast.error(t("form.error.imageUpload"));
        }
      }

      if (Object.keys(updates).length > 0) {
        await update.mutateAsync({ id: study.id, input: updates });
      }

      toast.success(t("form.success.created"));
      router.push(ROUTES.ADMIN.CASE_STUDIES);
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
            <Link href={ROUTES.ADMIN.CASE_STUDIES}>
              <ArrowLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("form.actions.back")}
            </Link>
          </Button>
        }
      />
      <CaseStudyForm onSubmit={handleSubmit} isLoading={isSaving} />
    </div>
  );
}
