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
  useCreateBlogPost,
  useUpdateBlogPost,
  useUploadBlogImage,
} from "@/hooks/useBlog";
import { BlogPostForm } from "../_components/BlogPostForm";
import type { UpsertBlogPostInput } from "@/lib/services/blog.service";

export default function NewBlogPostPage() {
  const t      = useTranslations("admin.blog");
  const router = useRouter();
  const create  = useCreateBlogPost();
  const update  = useUpdateBlogPost();
  const upload  = useUploadBlogImage();

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (data: UpsertBlogPostInput, imageFile?: File) => {
    setIsSaving(true);
    try {
      const post = await create.mutateAsync(data);

      if (imageFile) {
        try {
          const url = await upload.mutateAsync({ postId: post.id, file: imageFile });
          await update.mutateAsync({ id: post.id, input: { image_url: url } });
        } catch {
          toast.error(t("form.error.imageUpload"));
        }
      }

      toast.success(t("form.success.created"));
      router.push(ROUTES.ADMIN.BLOG);
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
            <Link href={ROUTES.ADMIN.BLOG}>
              <ArrowLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("form.actions.back")}
            </Link>
          </Button>
        }
      />
      <BlogPostForm onSubmit={handleSubmit} isLoading={isSaving} />
    </div>
  );
}
