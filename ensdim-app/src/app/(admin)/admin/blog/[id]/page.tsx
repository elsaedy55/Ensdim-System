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
  useBlogPost,
  useUpdateBlogPost,
  useUploadBlogImage,
} from "@/hooks/useBlog";
import { BlogPostForm } from "../_components/BlogPostForm";
import type { UpsertBlogPostInput } from "@/lib/services/blog.service";

export default function EditBlogPostPage() {
  const { id }    = useParams<{ id: string }>();
  const t         = useTranslations("admin.blog");
  const router    = useRouter();
  const { data: post, isLoading } = useBlogPost(id);
  const update    = useUpdateBlogPost();
  const uploadImg = useUploadBlogImage();

  const handleSubmit = (data: UpsertBlogPostInput, newImageFile?: File) => {
    const doUpdate = (imageUrl?: string) => {
      update.mutate(
        {
          id,
          input: imageUrl !== undefined ? { ...data, image_url: imageUrl } : data,
        },
        {
          onSuccess: () => {
            toast.success(t("form.success.updated"));
            router.push(ROUTES.ADMIN.BLOG);
          },
          onError: (e) => toast.error(e.message),
        }
      );
    };

    if (newImageFile) {
      uploadImg.mutate(
        { postId: id, file: newImageFile },
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

  if (!post) {
    return (
      <div className="surface flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium text-(--text-primary)">Post not found</p>
        <Button size="sm" className="mt-4" asChild>
          <Link href={ROUTES.ADMIN.BLOG}>{t("form.actions.back")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit.title")}
        subtitle={post.title_en}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.ADMIN.BLOG}>
              <ArrowLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("form.actions.back")}
            </Link>
          </Button>
        }
      />
      <BlogPostForm
        defaultValues={post}
        onSubmit={handleSubmit}
        isLoading={update.isPending || uploadImg.isPending}
      />
    </div>
  );
}
