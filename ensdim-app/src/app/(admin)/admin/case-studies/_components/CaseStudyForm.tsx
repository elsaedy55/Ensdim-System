"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { generateSlug } from "@/lib/services/case-studies.service";
import type { UpsertCaseStudyInput, CaseStudy } from "@/lib/services/case-studies.service";
import { ImagePlus, X, Plus, Trash2 } from "lucide-react";

interface Props {
  defaultValues?: CaseStudy;
  onSubmit: (data: UpsertCaseStudyInput, imageFile?: File, galleryFiles?: File[]) => void;
  isLoading: boolean;
}

export function CaseStudyForm({ defaultValues, onSubmit, isLoading }: Props) {
  const t = useTranslations("admin.caseStudies.form");

  const [form, setForm] = React.useState<UpsertCaseStudyInput>({
    title_en:              defaultValues?.title_en              ?? "",
    title_ar:              defaultValues?.title_ar              ?? "",
    slug:                  defaultValues?.slug                  ?? "",
    sector_en:             defaultValues?.sector_en             ?? "",
    sector_ar:             defaultValues?.sector_ar             ?? "",
    card_problem_en:       defaultValues?.card_problem_en       ?? "",
    card_problem_ar:       defaultValues?.card_problem_ar       ?? "",
    card_solution_en:      defaultValues?.card_solution_en      ?? "",
    card_solution_ar:      defaultValues?.card_solution_ar      ?? "",
    card_impact_en:        defaultValues?.card_impact_en        ?? "",
    card_impact_ar:        defaultValues?.card_impact_ar        ?? "",
    outcome_en:            defaultValues?.outcome_en            ?? "",
    outcome_ar:            defaultValues?.outcome_ar            ?? "",
    situation_en:          defaultValues?.situation_en          ?? "",
    situation_ar:          defaultValues?.situation_ar          ?? "",
    problem_en:            defaultValues?.problem_en            ?? "",
    problem_ar:            defaultValues?.problem_ar            ?? "",
    built_en:              defaultValues?.built_en              ?? [],
    built_ar:              defaultValues?.built_ar              ?? [],
    outcomes_en:           defaultValues?.outcomes_en           ?? [],
    outcomes_ar:           defaultValues?.outcomes_ar           ?? [],
    solution_title_en:     defaultValues?.solution_title_en     ?? "",
    solution_title_ar:     defaultValues?.solution_title_ar     ?? "",
    solution_slug:         defaultValues?.solution_slug         ?? "",
    problem_page_title_en: defaultValues?.problem_page_title_en ?? "",
    problem_page_title_ar: defaultValues?.problem_page_title_ar ?? "",
    problem_page_slug:     defaultValues?.problem_page_slug     ?? "",
    image_url:             defaultValues?.image_url             ?? null,
    gallery_images:        defaultValues?.gallery_images        ?? [],
    demo_url:              defaultValues?.demo_url              ?? null,
    sort_order:            defaultValues?.sort_order            ?? 0,
    is_published:          defaultValues?.is_published          ?? false,
  });

  const [imageFile,    setImageFile]    = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    defaultValues?.image_url ?? null
  );
  const [galleryFiles,    setGalleryFiles]    = React.useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = React.useState<string[]>([]);
  const [slugEdited, setSlugEdited] = React.useState(!!defaultValues?.slug);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const galleryFileRef = React.useRef<HTMLInputElement>(null);

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

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    if (galleryFileRef.current) galleryFileRef.current.value = "";
  };

  const removeExistingGalleryImage = (index: number) => {
    setForm((f) => ({ ...f, gallery_images: f.gallery_images.filter((_, i) => i !== index) }));
  };

  const removeNewGalleryImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, imageFile ?? undefined, galleryFiles.length > 0 ? galleryFiles : undefined);
  };

  // ── Shared input/textarea renderers ───────────────────────────────

  const inp = (
    label: string,
    value: string | number,
    onChange: (v: string) => void,
    opts?: { type?: string; placeholder?: string; dir?: "ltr" | "rtl"; mono?: boolean; required?: boolean }
  ) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
        {label} {opts?.required !== false && <span className="text-red-400">*</span>}
      </label>
      <input
        type={opts?.type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={opts?.placeholder}
        dir={opts?.dir}
        required={opts?.required !== false}
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

  // ── Dynamic list editor for built[] / outcomes[] ──────────────────

  const listEditor = (
    label: string,
    items: string[],
    onChange: (items: string[]) => void,
    opts?: { dir?: "ltr" | "rtl"; placeholder?: string }
  ) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              dir={opts?.dir}
              placeholder={opts?.placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--accent) transition"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="h-9 w-9 shrink-0 rounded-xl border border-(--border) flex items-center justify-center text-(--text-muted) hover:text-red-500 hover:border-red-300 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="flex items-center gap-1.5 text-xs font-medium text-(--accent) hover:underline"
      >
        <Plus className="h-3.5 w-3.5" /> {t("actions.addItem")}
      </button>
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
              placeholder="From scattered follow-up to one clear pipeline"
              required
              className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--accent) transition"
            />
          </div>
          {inp(t("fields.titleAr"), form.title_ar, (v) => setForm((f) => ({ ...f, title_ar: v })), {
            dir: "rtl",
            placeholder: "من متابعة متفرقة إلى مسار واحد واضح",
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
              placeholder="scattered-follow-up"
              required
              className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-3 py-2.5 text-sm text-(--text-primary) font-mono outline-none focus:ring-2 focus:ring-(--accent) transition"
            />
            <p className="text-[11px] text-(--text-muted)">
              {t("fields.slugHint")}<span className="font-mono">{form.slug || "…"}</span>
            </p>
          </div>
          {/* Sort order */}
          {inp(t("fields.sortOrder"), form.sort_order, (v) => setForm((f) => ({ ...f, sort_order: parseInt(v) || 0 })), { type: "number", placeholder: "0" })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {inp(t("fields.sectorEn"), form.sector_en, (v) => setForm((f) => ({ ...f, sector_en: v })), { placeholder: "B2B SaaS" })}
          {inp(t("fields.sectorAr"), form.sector_ar, (v) => setForm((f) => ({ ...f, sector_ar: v })), { dir: "rtl", placeholder: "شركات B2B" })}
        </div>
      </div>

      {/* ── Card Summary (list page) ───────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.card")}</h3>
          <p className="text-xs text-(--text-muted) mt-1">{t("sections.cardHint")}</p>
        </div>
        {ta(t("fields.cardProblemEn"), form.card_problem_en, (v) => setForm((f) => ({ ...f, card_problem_en: v })), { rows: 2 })}
        {ta(t("fields.cardProblemAr"), form.card_problem_ar, (v) => setForm((f) => ({ ...f, card_problem_ar: v })), { rows: 2, dir: "rtl" })}
        {ta(t("fields.cardSolutionEn"), form.card_solution_en, (v) => setForm((f) => ({ ...f, card_solution_en: v })), { rows: 2 })}
        {ta(t("fields.cardSolutionAr"), form.card_solution_ar, (v) => setForm((f) => ({ ...f, card_solution_ar: v })), { rows: 2, dir: "rtl" })}
        {ta(t("fields.cardImpactEn"), form.card_impact_en, (v) => setForm((f) => ({ ...f, card_impact_en: v })), { rows: 2 })}
        {ta(t("fields.cardImpactAr"), form.card_impact_ar, (v) => setForm((f) => ({ ...f, card_impact_ar: v })), { rows: 2, dir: "rtl" })}
      </div>

      {/* ── Detail Page ──────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.detail")}</h3>
        {ta(t("fields.outcomeEn"), form.outcome_en, (v) => setForm((f) => ({ ...f, outcome_en: v })), { rows: 2 })}
        {ta(t("fields.outcomeAr"), form.outcome_ar, (v) => setForm((f) => ({ ...f, outcome_ar: v })), { rows: 2, dir: "rtl" })}
        {ta(t("fields.situationEn"), form.situation_en, (v) => setForm((f) => ({ ...f, situation_en: v })), { rows: 4 })}
        {ta(t("fields.situationAr"), form.situation_ar, (v) => setForm((f) => ({ ...f, situation_ar: v })), { rows: 4, dir: "rtl" })}
        {ta(t("fields.problemEn"), form.problem_en, (v) => setForm((f) => ({ ...f, problem_en: v })), { rows: 4 })}
        {ta(t("fields.problemAr"), form.problem_ar, (v) => setForm((f) => ({ ...f, problem_ar: v })), { rows: 4, dir: "rtl" })}
      </div>

      {/* ── What we built ────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.built")}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {listEditor(t("fields.builtEn"), form.built_en, (items) => setForm((f) => ({ ...f, built_en: items })))}
          {listEditor(t("fields.builtAr"), form.built_ar, (items) => setForm((f) => ({ ...f, built_ar: items })), { dir: "rtl" })}
        </div>
      </div>

      {/* ── Outcomes ─────────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.outcomes")}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {listEditor(t("fields.outcomesEn"), form.outcomes_en, (items) => setForm((f) => ({ ...f, outcomes_en: items })))}
          {listEditor(t("fields.outcomesAr"), form.outcomes_ar, (items) => setForm((f) => ({ ...f, outcomes_ar: items })), { dir: "rtl" })}
        </div>
      </div>

      {/* ── Related links ────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.related")}</h3>
          <p className="text-xs text-(--text-muted) mt-1">{t("sections.relatedHint")}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {inp(t("fields.solutionTitleEn"), form.solution_title_en, (v) => setForm((f) => ({ ...f, solution_title_en: v })), { required: false })}
          {inp(t("fields.solutionTitleAr"), form.solution_title_ar, (v) => setForm((f) => ({ ...f, solution_title_ar: v })), { dir: "rtl", required: false })}
        </div>
        {inp(t("fields.solutionSlug"), form.solution_slug, (v) => setForm((f) => ({ ...f, solution_slug: v })), { mono: true, required: false, placeholder: "crm-pipeline" })}

        <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-(--border)">
          {inp(t("fields.problemPageTitleEn"), form.problem_page_title_en, (v) => setForm((f) => ({ ...f, problem_page_title_en: v })), { required: false })}
          {inp(t("fields.problemPageTitleAr"), form.problem_page_title_ar, (v) => setForm((f) => ({ ...f, problem_page_title_ar: v })), { dir: "rtl", required: false })}
        </div>
        {inp(t("fields.problemPageSlug"), form.problem_page_slug, (v) => setForm((f) => ({ ...f, problem_page_slug: v })), { mono: true, required: false, placeholder: "scattered-follow-up" })}
        {inp(t("fields.demoUrl"), form.demo_url ?? "", (v) => setForm((f) => ({ ...f, demo_url: v || null })), { type: "url", required: false, placeholder: "https://demo.example.com" })}
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

      {/* ── Gallery ──────────────────────────────────────────────────── */}
      <div className="surface p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-(--text-primary)">{t("sections.gallery")}</h3>
          <p className="text-xs text-(--text-muted) mt-1">{t("sections.galleryHint")}</p>
        </div>

        {(form.gallery_images.length > 0 || galleryPreviews.length > 0) && (
          <div className="flex flex-wrap gap-3">
            {form.gallery_images.map((url, i) => (
              <div key={`existing-${i}`} className="relative">
                <img
                  src={url}
                  alt={`Gallery ${i + 1}`}
                  className="h-28 w-28 rounded-xl object-cover border border-(--border)"
                />
                <button
                  type="button"
                  onClick={() => removeExistingGalleryImage(i)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {galleryPreviews.map((url, i) => (
              <div key={`new-${i}`} className="relative">
                <img
                  src={url}
                  alt={`New gallery ${i + 1}`}
                  className="h-28 w-28 rounded-xl object-cover border border-(--border)"
                />
                <button
                  type="button"
                  onClick={() => removeNewGalleryImage(i)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => galleryFileRef.current?.click()}
          className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-(--border) rounded-xl text-sm text-(--text-muted) hover:border-(--accent) hover:text-(--accent) transition"
        >
          <ImagePlus className="h-5 w-5" />
          {t("sections.galleryAdd")}
        </button>
        <input
          ref={galleryFileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleGalleryFilesChange}
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
