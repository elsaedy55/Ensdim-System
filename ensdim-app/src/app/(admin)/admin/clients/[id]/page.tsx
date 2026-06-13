"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkeletonCard } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";
import { formatDate, cn } from "@/lib/utils";
import { ChevronLeft, Folder, DollarSign, Calendar, Phone, User, Activity, Ban, CheckCircle2, Plus, Mail, Building2, Pencil } from "lucide-react";
import {
  useAdminClient, useAdminClientProjects, useAdminUpdateClientStatus, useAdminUpdateClient, useAdminDeleteClient,
} from "@/hooks/useAdmin";
import { PIPELINE_STAGES } from "@/components/admin/ClientPipelineView";
import { ClientActionsMenu } from "@/components/admin/ClientActionsMenu";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import type { ClientStatus } from "@/lib/supabase/types";

function stageLabel(stage: { label: string; labelAr: string }, locale: string) {
  return locale === "ar" ? stage.labelAr : stage.label;
}

// ─── Stat Card ────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, accent,
}: { icon: React.ElementType; label: string; value: React.ReactNode; accent: string }) {
  return (
    <div className="surface flex items-center gap-3 p-4">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", accent)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-(--text-muted)">{label}</p>
        <p className="text-base font-bold text-(--text-primary) truncate">{value}</p>
      </div>
    </div>
  );
}

// ─── Edit Client Modal ────────────────────────────────────────────

function EditClientModal({
  open, onClose, client,
}: { open: boolean; onClose: () => void; client: { id: string; name: string; email: string | null; phone: string | null; company: string | null } }) {
  const t  = useTranslations("admin.clients.detail");
  const ta = useTranslations("common.actions");
  const updateClient = useAdminUpdateClient();

  const [form, setForm] = React.useState({ name: client.name, phone: client.phone ?? "", company: client.company ?? "" });

  React.useEffect(() => {
    setForm({ name: client.name, phone: client.phone ?? "", company: client.company ?? "" });
  }, [client]);

  const handleSubmit = () => {
    updateClient.mutate({ clientId: client.id, updates: { name: form.name, phone: form.phone || null, company: form.company || null } }, {
      onSuccess: () => {
        toast.success(t("clientUpdated"));
        onClose();
      },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("editDialog.title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <FormField label={t("fullName")} required htmlFor="ename">
            <Input id="ename" leftElement={<User className="h-4 w-4" />} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </FormField>
          <FormField label={t("email")} htmlFor="eemail" hint={t("editDialog.emailHint")}>
            <Input id="eemail" type="email" value={client.email ?? ""} disabled className="opacity-60 cursor-not-allowed" />
          </FormField>
          <FormField label={t("phone")} htmlFor="ephone">
            <Input id="ephone" type="tel" leftElement={<Phone className="h-4 w-4" />} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          </FormField>
          <FormField label={t("company")} htmlFor="ecompany">
            <Input id="ecompany" leftElement={<Building2 className="h-4 w-4" />} value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
          </FormField>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={onClose}>{ta("cancel")}</Button>
            <Button onClick={handleSubmit} loading={updateClient.isPending}>{ta("save")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────

function OverviewTab({ clientId }: { clientId: string }) {
  const t      = useTranslations("admin.clients.detail");
  const locale = useLocale();
  const { data: client }   = useAdminClient(clientId);
  const { data: projects } = useAdminClientProjects(clientId);
  const updateStatus       = useAdminUpdateClientStatus();
  const [editOpen, setEditOpen] = React.useState(false);

  if (!client) return null;

  const allProjects = projects ?? [];
  const stage = PIPELINE_STAGES.find((s) => s.key === (client.client_status ?? "active"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      {/* Pipeline Stage */}
      <div className="surface p-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("pipelineStage")}</p>
        {stage && (
          <div className={cn("flex items-center gap-2 rounded-xl border px-3 py-2", stage.color)}>
            <span className={cn("h-2 w-2 rounded-full", stage.dot)} />
            <span className="text-sm font-semibold text-(--text-primary)">{stageLabel(stage, locale)}</span>
          </div>
        )}
        <Select
          value={client.client_status ?? "active"}
          onValueChange={(v) =>
            updateStatus.mutate({ clientId: client.id, status: v as ClientStatus }, {
              onSuccess: () => toast.success(t("stageUpdated")),
              onError:   (e) => toast.error(e.message),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("changeStage")} />
          </SelectTrigger>
          <SelectContent>
            {PIPELINE_STAGES.map((s) => (
              <SelectItem key={s.key} value={s.key}>
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full shrink-0", s.dot)} />
                  {stageLabel(s, locale)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Account Info */}
      <div className="surface p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("accountInfo")}</p>
          <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="h-3.5 w-3.5" /> {t("editButton")}
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { icon: User,     label: t("fullName"),          value: client.name },
            { icon: Mail,     label: t("email"),             value: client.email ?? t("notProvided") },
            { icon: Building2, label: t("company"),          value: client.company ?? t("notProvided") },
            { icon: Phone,    label: t("phone"),             value: client.phone ?? t("notProvided") },
            { icon: Calendar, label: t("stats.clientSince"), value: formatDate(client.created_at, { month: "long", day: "numeric", year: "numeric" }) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--bg-muted)">
                <Icon className="h-4 w-4 text-(--text-muted)" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-(--text-muted)">{label}</p>
                <p className="text-sm font-medium text-(--text-primary) truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="surface p-5 space-y-3 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("recentProjects")}</p>
        {allProjects.length === 0 ? (
          <p className="text-sm text-(--text-muted) py-2">{t("noProjectsYet")}</p>
        ) : (
          <div className="space-y-2">
            {allProjects.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={ROUTES.ADMIN.PROJECT(p.id)}
                className="flex items-center gap-4 rounded-xl border border-(--border) p-3 hover:border-(--accent-muted) hover:bg-(--bg-muted)/40 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <p className="text-sm font-medium text-(--text-primary) truncate group-hover:text-(--accent) transition-colors">{p.name}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <Progress value={p.progress} size="xs" colorByValue className="w-32" />
                </div>
                <span className="text-xs text-(--text-muted) shrink-0">{p.progress}%</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <EditClientModal open={editOpen} onClose={() => setEditOpen(false)} client={client} />
    </div>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────

function ProjectsTab({ clientId }: { clientId: string }) {
  const t = useTranslations("admin.clients.detail");
  const { data: projects, isLoading } = useAdminClientProjects(clientId);

  if (isLoading) return <div className="space-y-3 mt-4">{Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)}</div>;

  return (
    <div className="space-y-3 mt-4">
      {(projects ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <Folder className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">{t("noProjectsYet")}</p>
          <Button size="sm" className="mt-3" asChild>
            <Link href={ROUTES.ADMIN.PROJECT_NEW}>{t("createProject")}</Link>
          </Button>
        </div>
      ) : (
        (projects ?? []).map((p) => (
          <Link key={p.id} href={ROUTES.ADMIN.PROJECT(p.id)} className="surface flex items-center gap-4 p-4 hover:shadow-(--shadow-sm) transition-shadow group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <p className="text-sm font-semibold text-(--text-primary) truncate group-hover:text-(--accent) transition-colors">{p.name}</p>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex items-center gap-2">
                <Progress value={p.progress} size="xs" colorByValue className="w-24" />
                <span className="text-xs text-(--text-muted)">{p.progress}%</span>
                {p.target_delivery && (
                  <span className="text-xs text-(--text-muted) hidden sm:block">
                    · Due {formatDate(p.target_delivery, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

// ─── Invoices Tab ─────────────────────────────────────────────────

function InvoicesTab({ clientId }: { clientId: string }) {
  const t = useTranslations("admin.clients.detail");
  const { data: projects } = useAdminClientProjects(clientId);

  if ((projects ?? []).length === 0) {
    return (
      <div className="surface flex flex-col items-center justify-center py-12 text-center mt-4">
        <DollarSign className="h-8 w-8 text-(--text-muted) mb-2" />
        <p className="text-sm text-(--text-muted)">{t("noInvoices")}</p>
      </div>
    );
  }

  return (
    <div className="surface p-5 mt-4 space-y-3">
      <p className="text-sm text-(--text-secondary)">
        {t("invoicesManagedNote")}
      </p>
      {(projects ?? []).map((p) => (
        <Link key={p.id} href={ROUTES.ADMIN.PROJECT(p.id)} className="flex items-center gap-2 text-sm text-(--accent) hover:underline">
          <Folder className="h-4 w-4 shrink-0" /> {p.name}
        </Link>
      ))}
    </div>
  );
}

// ─── Notes Tab ────────────────────────────────────────────────────

function NotesTab() {
  const t = useTranslations("admin.clients.detail");
  const [note, setNote] = React.useState("");

  return (
    <div className="surface p-5 mt-4 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("internalNotes")}</p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        placeholder={t("notesPlaceholder")}
        className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent) focus:border-(--accent) resize-none"
      />
      <Button size="sm" onClick={() => toast.success(t("noteSaved"))}>{t("saveNote")}</Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t      = useTranslations("admin.clients.detail");
  const tList  = useTranslations("admin.clients");
  const locale = useLocale();
  const router = useRouter();

  const { data: client,   isLoading } = useAdminClient(id);
  const { data: projects }            = useAdminClientProjects(id);
  const deleteClient = useAdminDeleteClient();
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleDelete = () => {
    deleteClient.mutate(id, {
      onSuccess: () => {
        toast.success(tList("success.deleted"));
        router.push(ROUTES.ADMIN.CLIENTS);
      },
      onError: (e) => toast.error(e.message),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-36 bg-(--bg-muted) rounded animate-pulse" />
        <div className="h-32 bg-(--bg-muted) rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-sm text-(--text-muted)">{t("clientNotFound")}</p>
        <Link href={ROUTES.ADMIN.CLIENTS} className="mt-4 text-sm text-(--accent) hover:underline">{t("backToClients")}</Link>
      </div>
    );
  }

  const allProjects       = projects ?? [];
  const activeProjects    = allProjects.filter((p) => p.status !== "completed").length;
  const completedProjects = allProjects.filter((p) => p.status === "completed").length;
  const stage = PIPELINE_STAGES.find((s) => s.key === (client.client_status ?? "active"));
  const isBanned = !!client.banned_until && new Date(client.banned_until) > new Date();

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href={ROUTES.ADMIN.CLIENTS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> {t("backToClients")}
      </Link>

      {/* Client Hero */}
      <div className="surface overflow-hidden p-0">
        <div className="h-16 bg-linear-to-r from-(--accent-subtle) via-(--accent-subtle)/40 to-transparent rtl:bg-linear-to-l" />
        <div className="px-6 pb-6 -mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-(--accent-subtle) text-(--accent) text-2xl font-bold ring-4 ring-(--bg-surface) select-none">
                {client.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-xl font-bold text-(--text-primary)">{client.name}</h1>
                  {stage && (
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", stage.color)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", stage.dot)} />
                      {stageLabel(stage, locale)}
                    </span>
                  )}
                  {isBanned && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-(--danger-muted) bg-(--danger-subtle) text-(--danger-foreground) px-2.5 py-0.5 text-xs font-medium">
                      <Ban className="h-3 w-3" /> {tList("banned")}
                    </span>
                  )}
                </div>
                <p className="text-xs text-(--text-muted)">
                  {t("projectCount", { count: allProjects.length })} · {t("since", { date: formatDate(client.created_at, { month: "long", year: "numeric" }) })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <Button size="sm" asChild>
                <Link href={ROUTES.ADMIN.PROJECT_NEW}>
                  <Plus className="h-4 w-4" /> {t("newProject")}
                </Link>
              </Button>
              <ClientActionsMenu
                clientId={client.id}
                clientName={client.name}
                isBanned={isBanned}
                onDelete={() => setDeleteOpen(true)}
                triggerClassName="h-9 w-9 border border-(--border)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Folder}       label={t("stats.totalProjects")} value={allProjects.length} accent="bg-(--accent-subtle) text-(--accent)" />
        <StatCard icon={Activity}     label={t("stats.active")}        value={activeProjects}      accent="bg-(--warning-subtle) text-(--warning-foreground)" />
        <StatCard icon={CheckCircle2} label={t("stats.completed")}     value={completedProjects}   accent="bg-(--success-subtle) text-(--success-foreground)" />
        <StatCard icon={Calendar}     label={t("stats.clientSince")}   value={formatDate(client.created_at, { month: "short", year: "numeric" })} accent="bg-(--bg-muted) text-(--text-muted)" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList variant="underline" className="w-full">
          <TabsTrigger value="overview"  variant="underline">{t("tabs.overview")}</TabsTrigger>
          <TabsTrigger value="projects"  variant="underline" count={allProjects.length}>{t("tabs.projects")}</TabsTrigger>
          <TabsTrigger value="invoices"  variant="underline">{t("tabs.invoices")}</TabsTrigger>
          <TabsTrigger value="notes"     variant="underline">{t("tabs.notes")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">  <OverviewTab  clientId={id} /> </TabsContent>
        <TabsContent value="projects">  <ProjectsTab  clientId={id} /> </TabsContent>
        <TabsContent value="invoices">  <InvoicesTab  clientId={id} /> </TabsContent>
        <TabsContent value="notes">     <NotesTab /> </TabsContent>
      </Tabs>

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={tList("deleteDialog.title")}
        description={tList("deleteDialog.description", { name: client.name })}
        onConfirm={handleDelete}
        loading={deleteClient.isPending}
      />
    </div>
  );
}
