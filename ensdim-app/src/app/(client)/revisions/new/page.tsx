"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { useMyProject } from "@/hooks/useProject";
import { useMilestones } from "@/hooks/useMilestones";
import { useCreateRevision } from "@/hooks/useRevisions";

export default function NewRevisionPage() {
  const t  = useTranslations("revisions.new");
  const tv = useTranslations("common.validation");

  const schema = z.object({
    category: z.enum(["bug", "revision", "feature", "question"]),
    title:    z.string().min(5, t("validation.titleMin")).max(120, t("validation.titleMax")),
    description: z.string().min(20, t("validation.descriptionMin")),
    priority: z.enum(["high", "medium", "low"]),
    milestone: z.string().optional(),
  });
  type FormData = z.infer<typeof schema>;

  const CATEGORIES = [
    { value: "bug",      label: t("category.bug"),      desc: t("category.bugDesc") },
    { value: "revision", label: t("category.revision"),  desc: t("category.revisionDesc") },
    { value: "feature",  label: t("category.feature"),   desc: t("category.featureDesc") },
    { value: "question", label: t("category.question"),  desc: t("category.questionDesc") },
  ];

  const [submitted, setSubmitted] = React.useState(false);

  const { data: project } = useMyProject();
  const { data: milestones } = useMilestones(project?.id);
  const createRevision = useCreateRevision();

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: "medium" },
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data: FormData) => {
    if (!project) {
      toast.error(t("errors.noProject"));
      return;
    }
    try {
      await createRevision.mutateAsync({
        project_id:   project.id,
        milestone_id: data.milestone || null,
        title:        data.title,
        description:  data.description,
        category:     data.category,
        priority:     data.priority,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : t("errors.failedSubmit"));
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto pt-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--success-subtle) mx-auto mb-4">
          <CheckCircle2 className="h-7 w-7 text-(--success)" />
        </div>
        <h2 className="text-xl font-bold text-(--text-primary)">{t("success.title")}</h2>
        <p className="mt-2 text-sm text-(--text-secondary)">
          {t("success.description")}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="secondary" asChild>
            <Link href={ROUTES.CLIENT.REVISIONS}>{t("success.viewAll")}</Link>
          </Button>
          <Button onClick={() => setSubmitted(false)}>{t("success.submitAnother")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link href={ROUTES.CLIENT.REVISIONS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" />
        {t("backToRevisions")}
      </Link>

      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Category */}
        <FormField label={t("category.label")} required error={errors.category?.message}>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setValue("category", cat.value as FormData["category"], { shouldValidate: true })}
                className={`rounded-lg border p-3 text-start text-sm transition-all ${
                  selectedCategory === cat.value
                    ? "border-(--accent) bg-(--accent-subtle) ring-1 ring-(--accent)"
                    : "border-(--border) hover:border-(--border-strong) hover:bg-(--bg-muted)"
                }`}
              >
                <div className="font-medium text-(--text-primary)">{cat.label}</div>
                <div className="text-xs text-(--text-muted) mt-0.5">{cat.desc}</div>
              </button>
            ))}
          </div>
        </FormField>

        {/* Title */}
        <FormField label={t("fields.title")} required htmlFor="title" error={errors.title?.message}>
          <Input
            id="title"
            placeholder={t("fields.titlePlaceholder")}
            error={!!errors.title}
            {...register("title")}
          />
        </FormField>

        {/* Description */}
        <FormField
          label={t("fields.description")}
          required
          htmlFor="description"
          error={errors.description?.message}
          hint={t("fields.descriptionHint")}
        >
          <Textarea
            id="description"
            placeholder={t("fields.descriptionPlaceholder")}
            className="min-h-30"
            error={!!errors.description}
            {...register("description")}
          />
        </FormField>

        {/* Priority + Milestone */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label={t("fields.priority")} required error={errors.priority?.message}>
            <Select onValueChange={(v) => setValue("priority", v as FormData["priority"])}>
              <SelectTrigger><SelectValue placeholder={t("fields.priorityPlaceholder")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="high">{t("priority.high")}</SelectItem>
                <SelectItem value="medium">{t("priority.medium")}</SelectItem>
                <SelectItem value="low">{t("priority.low")}</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label={t("fields.milestone")} optional>
            <Select onValueChange={(v) => setValue("milestone", v)}>
              <SelectTrigger><SelectValue placeholder={t("fields.milestonePlaceholder")} /></SelectTrigger>
              <SelectContent>
                {(milestones ?? []).map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" asChild>
            <Link href={ROUTES.CLIENT.REVISIONS}>{t("actions.cancel")}</Link>
          </Button>
          <Button type="submit" loading={isSubmitting || createRevision.isPending}>{t("actions.submit")}</Button>
        </div>
      </form>
    </div>
  );
}
