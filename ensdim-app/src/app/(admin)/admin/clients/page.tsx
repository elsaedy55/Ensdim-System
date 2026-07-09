"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { SkeletonCard } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientPipelineView } from "@/components/admin/ClientPipelineView";
import { ClientActionsMenu } from "@/components/admin/ClientActionsMenu";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus, Users, UserPlus, Mail, Building2, Kanban, List, ArrowRight, Ban } from "lucide-react";
import { toast } from "sonner";
import { useAdminClients, useAdminDeleteClient } from "@/hooks/useAdmin";
import { useUrlState } from "@/hooks/useUrlState";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import type { ProfileRow } from "@/lib/supabase/types";

// ─── Add Client Modal ─────────────────────────────────────────────

function AddClientModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("admin.clients.add");
  const qc = useQueryClient();
  const [form, setForm]       = React.useState({ name: "", email: "", company: "" });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email) { toast.error(t("errors.nameEmailRequired")); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/invite", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: form.name, email: form.email, company: form.company || null, role: "client" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("errors.invitationFailed"));
      await qc.invalidateQueries({ queryKey: ["admin-clients"] });
      toast.success(t("success"));
      onClose();
      setForm({ name: "", email: "", company: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : t("errors.failedInvite"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <FormField label={t("fields.name")} required htmlFor="cname">
            <Input id="cname" placeholder={t("fields.namePlaceholder")} leftElement={<UserPlus className="h-4 w-4" />} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </FormField>
          <FormField label={t("fields.email")} required htmlFor="cemail">
            <Input id="cemail" type="email" placeholder={t("fields.emailPlaceholder")} leftElement={<Mail className="h-4 w-4" />} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </FormField>
          <FormField label={t("fields.company")} htmlFor="ccompany">
            <Input id="ccompany" placeholder={t("fields.companyPlaceholder")} leftElement={<Building2 className="h-4 w-4" />} value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
          </FormField>
          <p className="text-xs text-(--text-muted)">{t("inviteNote")}</p>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={onClose}>{t("actions.cancel")}</Button>
            <Button onClick={handleSubmit} loading={loading}>{t("submit")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Client Table Row ─────────────────────────────────────────────

function ClientTableRow({ client, onDelete }: { client: ProfileRow; onDelete: (id: string, name: string) => void }) {
  const t = useTranslations("admin.clients");
  const initials = client.name.slice(0, 2).toUpperCase();
  const status   = client.client_status ?? "active";
  const isBanned = !!client.banned_until && new Date(client.banned_until) > new Date();

  const statusColors: Record<string, string> = {
    lead:          "bg-(--bg-muted) text-(--text-muted)",
    interested:    "bg-(--accent-subtle) text-(--accent)",
    proposal_sent: "bg-(--warning-subtle) text-(--warning-foreground)",
    negotiation:   "bg-(--warning-subtle) text-(--warning-foreground)",
    active:        "bg-(--success-subtle) text-(--success-foreground)",
    completed:     "bg-(--success-subtle) text-(--success-foreground)",
    lost:          "bg-(--danger-subtle) text-(--danger-foreground)",
  };

  return (
    <div className="surface flex items-center gap-4 p-4 hover:shadow-(--shadow-sm) transition-shadow group">
      <Link href={ROUTES.ADMIN.CLIENT(client.id)} className="flex flex-1 min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-sm font-semibold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-(--text-primary) truncate group-hover:text-(--accent) transition-colors">
            {client.name}
          </p>
          <p className="text-xs text-(--text-muted) truncate mt-0.5">
            {[client.email, client.company].filter(Boolean).join(" · ") || t("addedOn", { date: new Date(client.created_at).toLocaleDateString() })}
          </p>
        </div>
        <span className={cn("hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", statusColors[status] ?? statusColors.active)}>
          {status.replace("_", " ")}
        </span>
        {isBanned && (
          <span className="inline-flex items-center gap-1 rounded-full bg-(--danger-subtle) text-(--danger-foreground) px-2 py-0.5 text-xs font-medium">
            <Ban className="h-3 w-3" /> {t("banned")}
          </span>
        )}
        <ArrowRight className="h-4 w-4 text-(--text-muted) opacity-0 group-hover:opacity-100 transition-opacity rtl:scale-x-[-1]" />
      </Link>
      <ClientActionsMenu
        clientId={client.id}
        clientName={client.name}
        isBanned={isBanned}
        onDelete={onDelete}
        triggerClassName="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function AdminClientsPage() {
  const t = useTranslations("admin.clients");
  const { data: clients, isLoading, error } = useAdminClients();
  const deleteClient = useAdminDeleteClient();

  const [search, setSearch]  = useUrlState("q");
  const [viewParam, setView] = useUrlState("view", "pipeline");
  const view = viewParam === "table" ? "table" : "pipeline";
  const [addOpen,  setAddOpen]  = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; name: string } | null>(null);

  const allClients = clients ?? [];
  const filtered   = search
    ? allClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : allClients;

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteClient.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(t("success.deleted"));
        setDeleteTarget(null);
      },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("list.title")}
        subtitle={t("list.subtitle")}
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> {t("list.addClient")}
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("list.searchPlaceholder")}
          className="max-w-xs"
        />

        {/* View toggle */}
        <div className="flex items-center rounded-xl border border-(--border) p-0.5 bg-(--bg-muted)/50">
          <button
            type="button"
            onClick={() => setView("pipeline")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              view === "pipeline"
                ? "bg-(--bg-surface) text-(--text-primary) shadow-(--shadow-xs)"
                : "text-(--text-muted) hover:text-(--text-primary)",
            )}
          >
            <Kanban className="h-3.5 w-3.5" /> {t("list.views.pipeline")}
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              view === "table"
                ? "bg-(--bg-surface) text-(--text-primary) shadow-(--shadow-xs)"
                : "text-(--text-muted) hover:text-(--text-primary)",
            )}
          >
            <List className="h-3.5 w-3.5" /> {t("list.views.table")}
          </button>
        </div>
      </div>

      {/* Content */}
      {error && <QueryErrorState title="Could not load clients" error={error} />}

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : error ? null : filtered.length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">{t("list.emptyState.title")}</p>
          <p className="text-xs text-(--text-muted) mt-1">{t("list.emptyState.description")}</p>
          <Button size="sm" className="mt-4" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> {t("list.emptyState.action")}
          </Button>
        </div>
      ) : view === "pipeline" ? (
        <ClientPipelineView clients={filtered} />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <ClientTableRow key={c.id} client={c} onDelete={(id, name) => setDeleteTarget({ id, name })} />
          ))}
        </div>
      )}

      <AddClientModal open={addOpen} onClose={() => setAddOpen(false)} />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={t("deleteDialog.title")}
        description={deleteTarget ? t("deleteDialog.description", { name: deleteTarget.name }) : undefined}
        onConfirm={handleDelete}
        loading={deleteClient.isPending}
      />
    </div>
  );
}
