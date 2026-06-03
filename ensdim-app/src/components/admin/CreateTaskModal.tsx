"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { useCreateTask } from "@/hooks/useTasks";
import { useAdminProjects, useAdminTeam } from "@/hooks/useAdmin";
import type { TaskStatus, TaskType, TaskPriority } from "@/lib/services/tasks.service";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  defaultStatus?: TaskStatus;
}

const TASK_TYPES: { value: TaskType; label: string; emoji: string }[] = [
  { value: "bug",     label: "Bug",     emoji: "🐛" },
  { value: "feature", label: "Feature", emoji: "✨" },
  { value: "design",  label: "Design",  emoji: "🎨" },
  { value: "review",  label: "Review",  emoji: "🔍" },
  { value: "other",   label: "Other",   emoji: "📌" },
];

export function CreateTaskModal({ open, onClose, defaultStatus = "todo" }: CreateTaskModalProps) {
  const t = useTranslations("admin.tasks.create");
  const { data: projects } = useAdminProjects();
  const { data: team }     = useAdminTeam();
  const createTask         = useCreateTask();

  const schema = z.object({
    title:       z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional(),
    type:        z.enum(["bug","feature","design","review","other"]),
    project_id:  z.string().optional(),
    assignee_id: z.string().optional(),
    priority:    z.enum(["high","medium","low"]),
    due_date:    z.string().optional(),
  });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } =
    useForm<Form>({
      resolver: zodResolver(schema),
      defaultValues: { type: "other", priority: "medium" },
    });

  const selectedType = watch("type");
  const dueDate      = watch("due_date");

  const onSubmit = async (data: Form) => {
    createTask.mutate(
      {
        title:        data.title,
        description:  data.description ?? null,
        type:         data.type,
        status:       defaultStatus,
        priority:     data.priority,
        project_id:   data.project_id ?? null,
        milestone_id: null,
        assignee_id:  data.assignee_id ?? null,
        due_date:     data.due_date ?? null,
      },
      {
        onSuccess: () => { toast.success(t("success")); reset(); onClose(); },
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type selector */}
          <div className="grid grid-cols-5 gap-1.5">
            {TASK_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue("type", type.value, { shouldValidate: true })}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-all",
                  selectedType === type.value
                    ? "border-(--accent) bg-(--accent-subtle) text-(--accent)"
                    : "border-(--border) hover:border-(--border-strong) text-(--text-muted)",
                )}
              >
                <span className="text-base">{type.emoji}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          <FormField label={t("fields.title")} required htmlFor="t-title" error={errors.title?.message}>
            <Input id="t-title" placeholder={t("fields.titlePlaceholder")} error={!!errors.title} {...register("title")} />
          </FormField>

          <FormField label={t("fields.description")} htmlFor="t-desc">
            <Textarea id="t-desc" rows={2} {...register("description")} />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label={t("fields.priority")} required>
              <Select defaultValue="medium" onValueChange={(v) => setValue("priority", v as TaskPriority)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label={t("fields.dueDate")}>
              <DatePicker
                value={dueDate ?? ""}
                onChange={(d) => setValue("due_date", d ?? "")}
                placeholder="Pick date"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label={t("fields.project")}>
              <Select onValueChange={(v) => setValue("project_id", v === "__none__" ? undefined : v)}>
                <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">None</SelectItem>
                  {(projects ?? []).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label={t("fields.assignee")}>
              <Select onValueChange={(v) => setValue("assignee_id", v === "__none__" ? undefined : v)}>
                <SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">Unassigned</SelectItem>
                  {(team ?? []).map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={isSubmitting || createTask.isPending}>
              {t("submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
