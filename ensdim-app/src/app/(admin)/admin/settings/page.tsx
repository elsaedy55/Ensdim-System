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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserAvatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Globe, Building2, Clock, Eye, EyeOff, Lock } from "lucide-react";
import { useMyProfile, useUpdateProfile, useUploadAvatar } from "@/hooks/useProfile";
import { changePassword } from "@/lib/auth.service";
import { createClient } from "@/lib/supabase/client";
import { LOCALE_COOKIE, localeDir } from "@/i18n/common";

// ─── Workspace Tab ────────────────────────────────────────────────

function WorkspaceTab() {
  const t = useTranslations("admin.adminSettings.workspace");
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [currency, setCurrency]           = React.useState("USD");
  const [saving, setSaving]               = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from("profiles").select("workspace_id").eq("id", user.id).single();
      if (!profile) return;
      const { data: workspace } = await supabase.from("workspaces").select("name, currency").eq("id", profile.workspace_id).single();
      if (workspace) { setWorkspaceName(workspace.name); setCurrency(workspace.currency); }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from("profiles").select("workspace_id").eq("id", user.id).single();
      if (!profile) return;
      await supabase.from("workspaces").update({ name: workspaceName, currency }).eq("id", profile.workspace_id);
      toast.success(t("savedSuccess"));
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageChange = (lang: string) => {
    document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    document.documentElement.lang = lang;
    document.documentElement.dir  = localeDir[lang as "ar" | "en"] ?? "ltr";
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-lg mt-4">
      <div>
        <p className="text-sm font-medium text-(--text-primary)">{t("sectionTitle")}</p>
      </div>
      <div className="space-y-4">
        <FormField label={t("fields.name")} required htmlFor="ws-name">
          <Input id="ws-name" placeholder={t("fields.namePlaceholder")} leftElement={<Building2 className="h-4 w-4" />} value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
        </FormField>
        <FormField label={t("fields.currency")} htmlFor="ws-currency">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[["USD","$ US Dollar"],["EGP","LE Egyptian Pound"],["EUR","€ Euro"],["SAR","﷼ Saudi Riyal"]].map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label={t("fields.language")} htmlFor="ws-lang">
          <Select defaultValue={typeof document !== "undefined" ? document.documentElement.lang : "ar"} onValueChange={handleLanguageChange}>
            <SelectTrigger><Globe className="h-4 w-4 text-(--text-muted) me-2 shrink-0" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <Button onClick={handleSave} loading={saving}>{t("saveButton")}</Button>
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────

function SecurityTab() {
  const t  = useTranslations("admin.adminSettings.security");
  const ta = useTranslations("common.actions");
  const tv = useTranslations("common.validation");
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew]         = React.useState(false);

  const schema = z.object({
    currentPassword: z.string().min(1),
    newPassword:     z.string().min(8, tv("passwordMin")),
    confirmPassword: z.string(),
  }).refine((d) => d.newPassword === d.confirmPassword, { message: tv("passwordMatch"), path: ["confirmPassword"] });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      reset();
      toast.success(t("savedSuccess"));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  };

  const ToggleBtn = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button type="button" onClick={onToggle} className="text-(--text-muted) hover:text-(--text-secondary)">
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <div className="space-y-6 max-w-lg mt-4">
      <p className="text-sm font-medium text-(--text-primary)">{t("sectionTitle")}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Current password" required htmlFor="cur" error={errors.currentPassword?.message}>
          <Input id="cur" type={showCurrent ? "text" : "password"} leftElement={<Lock className="h-4 w-4" />} rightElement={<ToggleBtn show={showCurrent} onToggle={() => setShowCurrent((p) => !p)} />} error={!!errors.currentPassword} {...register("currentPassword")} />
        </FormField>
        <FormField label="New password" required htmlFor="newpwd" error={errors.newPassword?.message}>
          <Input id="newpwd" type={showNew ? "text" : "password"} leftElement={<Lock className="h-4 w-4" />} rightElement={<ToggleBtn show={showNew} onToggle={() => setShowNew((p) => !p)} />} error={!!errors.newPassword} {...register("newPassword")} />
        </FormField>
        <FormField label="Confirm new password" required htmlFor="confirmpwd" error={errors.confirmPassword?.message}>
          <Input id="confirmpwd" type="password" leftElement={<Lock className="h-4 w-4" />} error={!!errors.confirmPassword} {...register("confirmPassword")} />
        </FormField>
        <Button type="submit" loading={isSubmitting}>{t("saveButton")}</Button>
      </form>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────

function ProfileTab() {
  const t  = useTranslations("settings.profile");
  const tv = useTranslations("common.validation");
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar  = useUploadAvatar();

  const schema = z.object({ name: z.string().min(2, tv("nameMin")) });
  type Form = z.infer<typeof schema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: profile?.name ?? "" },
  });

  React.useEffect(() => { if (profile) reset({ name: profile.name }); }, [profile?.id]);

  if (isLoading) return <div className="space-y-3 mt-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>;

  return (
    <div className="space-y-6 max-w-lg mt-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <UserAvatar name={profile?.name ?? "A"} src={profile?.avatar_url ?? undefined} size="lg" />
          <label htmlFor="avatar-admin" className="absolute -bottom-1 -end-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-(--bg-surface) bg-(--accent) text-white hover:bg-(--accent-hover)">
            <Camera className="h-3.5 w-3.5" />
          </label>
          <input id="avatar-admin" type="file" accept="image/*" className="hidden" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadAvatar.mutate(file, { onSuccess: () => toast.success("Avatar updated"), onError: (err) => toast.error(err.message) });
          }} />
        </div>
        <div><p className="text-sm font-medium text-(--text-primary)">{profile?.name}</p><p className="text-xs text-(--text-muted) capitalize">{profile?.role?.replace("_", " ")}</p></div>
      </div>
      <form onSubmit={handleSubmit((d) => updateProfile.mutate(d, { onSuccess: () => toast.success(t("savedSuccess")), onError: (e) => toast.error(e.message) }))} className="space-y-4">
        <FormField label={t("fields.name")} required htmlFor="pname" error={errors.name?.message}>
          <Input id="pname" error={!!errors.name} {...register("name")} />
        </FormField>
        <Button type="submit" loading={isSubmitting || updateProfile.isPending}>{t("saveButton")}</Button>
      </form>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const t = useTranslations("admin.adminSettings");
  return (
    <div className="space-y-6">
      <PageHeader title={t("page.title")} subtitle={t("page.subtitle")} />
      <Tabs defaultValue="workspace">
        <TabsList variant="underline" className="w-full">
          <TabsTrigger value="workspace" variant="underline">{t("tabs.workspace")}</TabsTrigger>
          <TabsTrigger value="security"  variant="underline">{t("tabs.security")}</TabsTrigger>
          <TabsTrigger value="profile"   variant="underline">{t("tabs.profile")}</TabsTrigger>
        </TabsList>
        <TabsContent value="workspace"> <WorkspaceTab /> </TabsContent>
        <TabsContent value="security">  <SecurityTab  /> </TabsContent>
        <TabsContent value="profile">   <ProfileTab   /> </TabsContent>
      </Tabs>
    </div>
  );
}
