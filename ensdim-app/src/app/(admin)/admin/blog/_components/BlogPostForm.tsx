"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { generateSlug } from "@/lib/services/blog.service";
import type { UpsertBlogPostInput, BlogPost } from "@/lib/services/blog.service";
import { ImagePlus, X } from "lucide-react";

interface Props {
  defaultValues?: BlogPost;
  onSubmit: (data: UpsertBlogPostInput, imageFile?: File) => void;
  isLoading: boolean;
}

export function BlogPostForm({ defaultValues, onSubmit, isLoading }: Props) {
  const t = useTranslations("admin.blog.form");

  const [form, setForm] = React.useState<UpsertBlogPostInput>({
    title_en:       defaultValues?.title_en       ?? "",
    title_ar:       defaultValues?.title_ar       ?? "",
    slug:           defaultValues?.slug           ?? "",
    category_en:    defaultValues?.category_en    ?? "General",
    category_ar:    defaultValues?.category_ar    ?? "عام",
    description_en: defaultValues?.description_en ?? "",
    description_ar: defaultValues?.description_ar ?? "",
    content_en:     defaultValues?.content_en     ?? "",
    content_ar:     defaultValues?.content_ar     ?? "",
    read_time:      defaultValues?.read_time      ?? 5,
    image_url:      defaultValues?.image_url      ?? null,
    is_published:   defaultValues?.is_published   ?? false,
  });

  const [imageFile,    setImageFile]    = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    defaultValues?.image_url ?? null
  );
  const [slugEdited, setSlugEdited] = React.useState(!!defaultValues?.slug);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleTitleEnChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title_en: value,
      slug: slugEdited ? f.slug : generateSlug(value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((f) => ({ ...f, image_url: null }));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, image_url: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, imageFile ?? undefined);
  };

  // ── Shared input/textarea renderers ───────────────────────────────

  const inp = (
    label: string,
    value: string | number,
    onChange: (v: string) => void,
    opts?: { type?: string; placeholder?: string; dir?: "ltr" | "rtl"; mono?: boolean }
  ) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        type={opts?.type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={opts?.placeholder}
        dir={opts?.dir}
        required
        className={`w-full rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--accent) transition ${opts?.mono ? "font-mono" : ""}`}
      />
    </div>
  );

  const ta = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    opts?: { rows?: number; placeholder?: string; dir?: "ltr" | "rtl" }
  ) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
        {label} <span className="text-red-400">*</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={opts?.rows ?? 3}
        placeholder={opts?.placeholder}
        dir={opts?.dir}
        required
        className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--accent) transition resize-y"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Basic Info ──────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.basic")}</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* EN Title — also generates slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
              {t("fields.titleEn")} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title_en}
              onChange={(e) => handleTitleEnChange(e.target.value)}
              placeholder="5 ways to grow your agency..."
              required
              className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--accent) transition"
            />
          </div>
          {inp(t("fields.titleAr"), form.title_ar, (v) => setForm((f) => ({ ...f, title_ar: v })), {
            dir: "rtl",
            placeholder: "٥ طرق لتنمية وكالتك...",
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
              {t("fields.slug")} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true);
                setForm((f) => ({ ...f, slug: e.target.value }));
              }}
              placeholder="5-ways-to-grow-your-agency"
              required
              className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) font-mono outline-none focus:ring-2 focus:ring-(--accent) transition"
            />
            <p className="text-[11px] text-(--text-muted)">
              {t("fields.slugHint")}<span className="font-mono">{form.slug || "…"}</span>
            </p>
          </div>
          {/* Read time */}
          {inp(t("fields.readTime"), form.read_time, (v) => setForm((f) => ({ ...f, read_time: parseInt(v) || 5 })), { type: "number", placeholder: "5" })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {inp(t("fields.categoryEn"), form.category_en, (v) => setForm((f) => ({ ...f, category_en: v })), { placeholder: "Marketing / Growth / Operations" })}
          {inp(t("fields.categoryAr"), form.category_ar, (v) => setForm((f) => ({ ...f, category_ar: v })), { dir: "rtl", placeholder: "التسويق / النمو / التشغيل" })}
        </div>
      </div>

      {/* ── Descriptions ────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.descriptions")}</h3>
        {ta(t("fields.descEn"), form.description_en, (v) => setForm((f) => ({ ...f, description_en: v })), {
          rows: 2, placeholder: "Brief summary shown on the blog listing page..."
        })}
        {ta(t("fields.descAr"), form.description_ar, (v) => setForm((f) => ({ ...f, description_ar: v })), {
          rows: 2, dir: "rtl", placeholder: "ملخص قصير يظهر في صفحة المدونة..."
        })}
      </div>

      {/* ── Full Content ─────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.content")}</h3>
          <p className="text-xs text-(--text-muted) mt-1">{t("sections.contentHint")}</p>
        </div>
        {ta(t("fields.contentEn"), form.content_en, (v) => setForm((f) => ({ ...f, content_en: v })), {
          rows: 14, placeholder: "## Introduction\n\nYour post content here...\n\n## Section Two\n\nMore content..."
        })}
        {ta(t("fields.contentAr"), form.content_ar, (v) => setForm((f) => ({ ...f, content_ar: v })), {
          rows: 14, dir: "rtl", placeholder: "## المقدمة\n\nمحتوى المقال هنا..."
        })}
      </div>

      {/* ── Image ────────────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.image")}</h3>
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-40 w-auto max-w-xs rounded-xl object-cover border border-(--border)"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-(--border) rounded-xl text-sm text-(--text-muted) hover:border-(--accent) hover:text-(--accent) transition"
          >
            <ImagePlus className="h-5 w-5" />
            {t("sections.imageHint")}
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* ── Publish toggle ────────────────────────────────────────────── */}
      <div className="surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-(--text-primary)">{t("sections.publish")}</p>
            <p className="text-xs text-(--text-muted) mt-0.5">
              {form.is_published ? t("sections.publishOn") : t("sections.publishOff")}
            </p>
          </div>
          <Switch
            checked={form.is_published}
            onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
          />
        </div>
      </div>

      {/* ── Submit ────────────────────────────────────────────────────── */}
      <div className="flex justify-end gap-3 pb-10">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? t("actions.saving")
            : defaultValues
              ? t("actions.save")
              : t("actions.create")}
        </Button>
      </div>
    </form>
  );
}
