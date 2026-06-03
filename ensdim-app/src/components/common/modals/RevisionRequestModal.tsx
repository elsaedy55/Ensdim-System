"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RevisionCategory, RevisionPriority } from "@/types";

type FormData = {
  title: string;
  description: string;
  category: RevisionCategory;
  priority: RevisionPriority;
};

interface RevisionRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => Promise<void>;
  milestoneId?: string;
  milestoneName?: string;
}

export function RevisionRequestModal({
  open,
  onOpenChange,
  onSubmit,
  milestoneName,
}: RevisionRequestModalProps) {
  const t = useTranslations("revisions.modal");

  const schema = z.object({
    title:       z.string().min(5, t("validation.titleMin")),
    description: z.string().min(20, t("validation.descriptionMin")),
    category:    z.enum(["bug", "revision", "feature", "question"]),
    priority:    z.enum(["high", "medium", "low"]),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: "revision", priority: "medium" },
  });

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const onFormSubmit = async (data: FormData) => {
    await onSubmit(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          {milestoneName && (
            <p className="text-sm text-(--text-muted) mt-1">
              {t("for")} <span className="font-medium text-(--text-primary)">{milestoneName}</span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField label={t("fields.title")} required htmlFor="rev-title" error={errors.title?.message}>
            <Input
              id="rev-title"
              placeholder={t("fields.titlePlaceholder")}
              error={!!errors.title}
              {...register("title")}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label={t("fields.category")} required error={errors.category?.message}>
              <Select defaultValue="revision" onValueChange={(v) => setValue("category", v as RevisionCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("fields.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revision">{t("categories.revision")}</SelectItem>
                  <SelectItem value="bug">{t("categories.bug")}</SelectItem>
                  <SelectItem value="feature">{t("categories.feature")}</SelectItem>
                  <SelectItem value="question">{t("categories.question")}</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label={t("fields.priority")} required error={errors.priority?.message}>
              <Select defaultValue="medium" onValueChange={(v) => setValue("priority", v as RevisionPriority)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("fields.priorityPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t("priority.high")}</SelectItem>
                  <SelectItem value="medium">{t("priority.medium")}</SelectItem>
                  <SelectItem value="low">{t("priority.low")}</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField label={t("fields.description")} required htmlFor="rev-desc" error={errors.description?.message}>
            <Textarea
              id="rev-desc"
              placeholder={t("fields.descriptionPlaceholder")}
              rows={4}
              error={!!errors.description}
              {...register("description")}
            />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
              {t("actions.cancel")}
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {t("actions.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
