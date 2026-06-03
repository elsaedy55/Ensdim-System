"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { DatePicker } from "@/components/ui/date-picker";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminCreateProject, useAdminClients, useAdminTeam } from "@/hooks/useAdmin";

// ─── Step indicator ───────────────────────────────────────────────

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2 shrink-0">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                done    ? "bg-(--success) text-white" :
                active  ? "bg-(--accent) text-white" :
                "bg-(--bg-muted) text-(--text-muted)"
              )}>
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn(
                "text-sm hidden sm:block",
                active ? "font-medium text-(--text-primary)" : "text-(--text-muted)"
              )}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-px", done ? "bg-(--success)" : "bg-(--border)")} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function CreateProjectPage() {
  const t      = useTranslations("admin.projects.create");
  const tv     = useTranslations("common.validation");
  const router = useRouter();

  const { data: clients } = useAdminClients();
  const { data: team }    = useAdminTeam();
  const createProject     = useAdminCreateProject();

  const [step, setStep] = React.useState(0);

  // Form data across steps
  const [formData, setFormData] = React.useState({
    name:            "",
    client_id:       "",
    description:     "",
    start_date:      "",
    target_delivery: "",
    pm_id:           "",
  });

  const steps = [t("steps.info"), t("steps.timeline"), t("steps.team")];

  // ── Step 1 schema ──
  const step1Schema = z.object({
    name:        z.string().min(2, tv("nameMin")),
    client_id:   z.string().min(1, "Please select a client"),
    description: z.string().optional(),
  });

  const { register: reg1, handleSubmit: hs1, setValue: sv1, formState: { errors: e1 } } =
    useForm({ resolver: zodResolver(step1Schema), defaultValues: { name: formData.name, client_id: formData.client_id, description: formData.description } });

  // ── Step 2 schema ──
  const step2Schema = z.object({
    start_date:      z.string().min(1, "Start date is required"),
    target_delivery: z.string().min(1, "Target delivery is required"),
  });

  const { handleSubmit: hs2, setValue: sv2, watch: w2, formState: { errors: e2 } } =
    useForm({ resolver: zodResolver(step2Schema), defaultValues: { start_date: formData.start_date, target_delivery: formData.target_delivery } });

  const startDate   = w2("start_date");
  const targetDate  = w2("target_delivery");

  // ── Step 3 (submit) ──
  const [pmId, setPmId] = React.useState(formData.pm_id);

  const onStep1 = (data: z.infer<typeof step1Schema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  const onStep2 = (data: z.infer<typeof step2Schema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onSubmit = async () => {
    createProject.mutate(
      {
        name:            formData.name,
        client_id:       formData.client_id,
        description:     formData.description,
        start_date:      formData.start_date,
        target_delivery: formData.target_delivery,
      },
      {
        onSuccess: (project) => {
          toast.success(t("success"));
          router.push(ROUTES.ADMIN.PROJECT(project.id));
        },
        onError: (e) => toast.error(e.message),
      }
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href={ROUTES.ADMIN.PROJECTS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" />
        {ROUTES.ADMIN.PROJECTS.split("/").pop()}
      </Link>

      <PageHeader title={t("title")} />

      <StepIndicator steps={steps} current={step} />

      {/* ── Step 1: Basic Info ── */}
      {step === 0 && (
        <form onSubmit={hs1(onStep1)} className="surface p-6 space-y-5">
          <h2 className="text-sm font-semibold text-(--text-primary)">{t("steps.info")}</h2>

          <FormField label={t("fields.name")} required htmlFor="name" error={e1.name?.message}>
            <Input id="name" placeholder={t("fields.namePlaceholder")} error={!!e1.name} {...reg1("name")} />
          </FormField>

          <FormField label={t("fields.client")} required error={e1.client_id?.message}>
            <Select onValueChange={(v) => sv1("client_id", v)} defaultValue={formData.client_id}>
              <SelectTrigger><SelectValue placeholder={t("fields.clientPlaceholder")} /></SelectTrigger>
              <SelectContent>
                {(clients ?? []).map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label={t("fields.description")} htmlFor="desc">
            <Textarea id="desc" placeholder={t("fields.descriptionPlaceholder")} rows={3} {...reg1("description")} />
          </FormField>

          <div className="flex justify-end">
            <Button type="submit">
              {t("actions.next")} <ChevronRight className="h-4 w-4 rtl:scale-x-[-1]" />
            </Button>
          </div>
        </form>
      )}

      {/* ── Step 2: Timeline ── */}
      {step === 1 && (
        <form onSubmit={hs2(onStep2)} className="surface p-6 space-y-5">
          <h2 className="text-sm font-semibold text-(--text-primary)">{t("steps.timeline")}</h2>

          <div className="grid grid-cols-2 gap-4">
            <FormField label={t("fields.startDate")} required error={e2.start_date?.message}>
              <DatePicker
                value={startDate}
                onChange={(d) => sv2("start_date", d ?? "")}
                placeholder="Pick start date"
              />
            </FormField>
            <FormField label={t("fields.targetDelivery")} required error={e2.target_delivery?.message}>
              <DatePicker
                value={targetDate}
                onChange={(d) => sv2("target_delivery", d ?? "")}
                placeholder="Pick delivery date"
              />
            </FormField>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="secondary" onClick={() => setStep(0)}>
              <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("actions.back")}
            </Button>
            <Button type="submit">
              {t("actions.next")} <ChevronRight className="h-4 w-4 rtl:scale-x-[-1]" />
            </Button>
          </div>
        </form>
      )}

      {/* ── Step 3: Team ── */}
      {step === 2 && (
        <div className="surface p-6 space-y-5">
          <h2 className="text-sm font-semibold text-(--text-primary)">{t("steps.team")}</h2>

          <FormField label={t("fields.projectManager")} htmlFor="pm">
            <Select onValueChange={setPmId} value={pmId}>
              <SelectTrigger><SelectValue placeholder={t("fields.projectManagerPlaceholder")} /></SelectTrigger>
              <SelectContent>
                {(team ?? []).map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name} ({m.role})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <p className="text-xs text-(--text-muted)">
            More team members can be assigned after the project is created.
          </p>

          <div className="flex justify-between">
            <Button type="button" variant="secondary" onClick={() => setStep(1)}>
              <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("actions.back")}
            </Button>
            <Button onClick={onSubmit} loading={createProject.isPending}>
              <Check className="h-4 w-4" /> {t("actions.create")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
