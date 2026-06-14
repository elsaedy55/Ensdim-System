"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Switch } from "@/components/ui/switch";
import { UserAvatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, EyeOff, Lock, User, Phone, Camera, Building2 } from "lucide-react";
import { changePassword } from "@/lib/auth.service";
import {
  useMyProfile, useUpdateProfile, useUploadAvatar,
  useNotifPreferences, useUpdateNotifPreferences,
} from "@/hooks/useProfile";
import type { NotificationPrefsRow } from "@/lib/supabase/types";

type PrefRow    = NotificationPrefsRow;
type PrefUpdate = Partial<NotificationPrefsRow>;

// ─── Profile Tab ──────────────────────────────────────────────────

function ProfileTab() {
  const t  = useTranslations("settings.profile");
  const tv = useTranslations("common.validation");
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar  = useUploadAvatar();

  const schema = z.object({
    name:    z.string().min(2, tv("nameMin")),
    phone:   z.string().optional(),
    company: z.string().optional(),
  });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: profile?.name ?? "", phone: profile?.phone ?? "", company: profile?.company ?? "" },
  });

  React.useEffect(() => {
    if (profile) reset({ name: profile.name, phone: profile.phone ?? "", company: profile.company ?? "" });
  }, [profile, reset]);

  const onSubmit = async (data: Form) => {
    updateProfile.mutate(data, {
      onSuccess: () => toast.success(t("savedSuccess")),
      onError:   (e) => toast.error(e.message),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-lg mt-4">
        <Skeleton className="h-16 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mt-4">
      <div>
        <p className="text-sm font-medium text-(--text-primary)">{t("sectionTitle")}</p>
        <p className="text-xs text-(--text-muted) mt-0.5">{t("sectionDescription")}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <UserAvatar name={profile?.name ?? "U"} src={profile?.avatar_url ?? undefined} size="lg" />
          <label
            htmlFor="avatar-input"
            className="absolute -bottom-1 -inset-e-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-(--bg-surface) bg-(--accent) text-white hover:bg-(--accent-hover)"
            aria-label={t("avatar.changeButton")}
          >
            <Camera className="h-3.5 w-3.5" />
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAvatar.mutate(file, { onSuccess: () => toast.success(t("savedSuccess")), onError: (err) => toast.error(err.message) });
            }}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-(--text-primary)">{t("avatar.label")}</p>
          <p className="text-xs text-(--text-muted) mt-0.5">{t("avatar.hint")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label={t("fields.name")} required htmlFor="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" placeholder={t("fields.namePlaceholder")} error={!!errors.name} leftElement={<User className="h-4 w-4" />} {...register("name")} />
        </FormField>
        <FormField label={t("fields.email")} htmlFor="email" hint={t("fields.emailHint")}>
          <Input id="email" type="email" value={profile?.email ?? ""} disabled className="opacity-60 cursor-not-allowed" />
        </FormField>
        <FormField label={t("fields.phone")} htmlFor="phone">
          <Input id="phone" type="tel" autoComplete="tel" placeholder={t("fields.phonePlaceholder")} leftElement={<Phone className="h-4 w-4" />} {...register("phone")} />
        </FormField>
        <FormField label={t("fields.company")} htmlFor="company">
          <Input id="company" autoComplete="organization" placeholder={t("fields.companyPlaceholder")} leftElement={<Building2 className="h-4 w-4" />} {...register("company")} />
        </FormField>
        <Button type="submit" loading={isSubmitting || updateProfile.isPending}>{t("saveButton")}</Button>
      </form>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────

function SecurityTab() {
  const t  = useTranslations("settings.security");
  const ta = useTranslations("common.actions");
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew]         = React.useState(false);

  const schema = z.object({
    currentPassword: z.string().min(1, t("validation.currentRequired")),
    newPassword:     z.string().min(8, t("validation.newMin")),
    confirmPassword: z.string(),
  }).refine((d) => d.newPassword === d.confirmPassword, { message: t("validation.confirmMatch"), path: ["confirmPassword"] });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      reset();
      toast.success(t("savedSuccess"));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed.");
    }
  };

  const ToggleBtn = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button type="button" onClick={onToggle} className="text-(--text-muted) hover:text-(--text-secondary) transition-colors" aria-label={show ? ta("hidePassword") : ta("showPassword")}>
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <div className="space-y-6 max-w-lg mt-4">
      <div>
        <p className="text-sm font-medium text-(--text-primary)">{t("sectionTitle")}</p>
        <p className="text-xs text-(--text-muted) mt-0.5">{t("sectionDescription")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label={t("fields.currentPassword")} required htmlFor="current" error={errors.currentPassword?.message}>
          <Input id="current" type={showCurrent ? "text" : "password"} autoComplete="current-password" leftElement={<Lock className="h-4 w-4" />} rightElement={<ToggleBtn show={showCurrent} onToggle={() => setShowCurrent((p) => !p)} />} error={!!errors.currentPassword} {...register("currentPassword")} />
        </FormField>
        <FormField label={t("fields.newPassword")} required htmlFor="newpwd" error={errors.newPassword?.message}>
          <Input id="newpwd" type={showNew ? "text" : "password"} autoComplete="new-password" leftElement={<Lock className="h-4 w-4" />} rightElement={<ToggleBtn show={showNew} onToggle={() => setShowNew((p) => !p)} />} error={!!errors.newPassword} {...register("newPassword")} />
        </FormField>
        <FormField label={t("fields.confirmPassword")} required htmlFor="confirmpwd" error={errors.confirmPassword?.message}>
          <Input id="confirmpwd" type="password" autoComplete="new-password" leftElement={<Lock className="h-4 w-4" />} error={!!errors.confirmPassword} {...register("confirmPassword")} />
        </FormField>
        <Button type="submit" loading={isSubmitting}>{t("saveButton")}</Button>
      </form>
    </div>
  );
}

// ─── Notification Preferences Tab ────────────────────────────────

const NOTIF_ITEMS = ["milestoneReview", "invoiceSent", "fileUploaded", "revisionUpdated", "projectStatus"] as const;

const EMAIL_KEYS: Record<typeof NOTIF_ITEMS[number], keyof PrefRow> = {
  milestoneReview: "email_milestone_review",
  invoiceSent:     "email_invoice_sent",
  fileUploaded:    "email_file_uploaded",
  revisionUpdated: "email_revision_updated",
  projectStatus:   "email_project_status",
};

const INAPP_KEYS: Record<typeof NOTIF_ITEMS[number], keyof PrefRow> = {
  milestoneReview: "in_app_milestone_review",
  invoiceSent:     "in_app_invoice_sent",
  fileUploaded:    "in_app_file_uploaded",
  revisionUpdated: "in_app_revision_updated",
  projectStatus:   "in_app_revision_updated",
};

function NotificationsTab() {
  const t = useTranslations("settings.notificationPrefs");
  const { data: prefs, isLoading } = useNotifPreferences();
  const updatePrefs = useUpdateNotifPreferences();

  const toggle = (key: keyof PrefUpdate) => {
    if (!prefs) return;
    updatePrefs.mutate({ [key]: !prefs[key as keyof typeof prefs] }, {
      onSuccess: () => toast.success(t("savedSuccess")),
      onError:   (e) => toast.error(e.message),
    });
  };

  if (isLoading) {
    return <div className="space-y-3 max-w-lg mt-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>;
  }

  return (
    <div className="space-y-6 max-w-lg mt-4">
      <p className="text-sm font-medium text-(--text-primary)">{t("sectionTitle")}</p>
      {(["email", "inApp"] as const).map((section) => (
        <div key={section} className="surface p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{section === "email" ? t("emailSection") : t("inAppSection")}</p>
          {NOTIF_ITEMS.map((key) => {
            const prefKey = section === "email" ? EMAIL_KEYS[key] : INAPP_KEYS[key];
            const value   = prefs ? Boolean(prefs[prefKey]) : true;
            return (
              <div key={key} className="flex items-center justify-between gap-4">
                <p className="text-sm text-(--text-primary)">{t(`items.${key}`)}</p>
                <Switch checked={value} onCheckedChange={() => toggle(prefKey as keyof PrefUpdate)} disabled={updatePrefs.isPending} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function SettingsPage() {
  const t = useTranslations("settings");
  return (
    <div className="space-y-6">
      <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
      <Tabs defaultValue="profile">
        <TabsList variant="underline" className="w-full">
          <TabsTrigger value="profile"       variant="underline">{t("tabs.profile")}</TabsTrigger>
          <TabsTrigger value="security"      variant="underline">{t("tabs.security")}</TabsTrigger>
          <TabsTrigger value="notifications" variant="underline">{t("tabs.notifications")}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">       <ProfileTab />       </TabsContent>
        <TabsContent value="security">      <SecurityTab />      </TabsContent>
        <TabsContent value="notifications"> <NotificationsTab /> </TabsContent>
      </Tabs>
    </div>
  );
}
