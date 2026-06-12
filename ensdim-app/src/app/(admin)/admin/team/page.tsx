"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SkeletonCard } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Plus, MoreHorizontal, Mail, User, Users } from "lucide-react";
import { useAdminTeam } from "@/hooks/useAdmin";
import type { ProfileRow } from "@/lib/supabase/types";

// ─── Invite Modal ─────────────────────────────────────────────────

function InviteMemberModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("admin.team.invite");
  const qc = useQueryClient();
  const [form, setForm]       = React.useState({ name: "", email: "", role: "", message: "" });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.role) { toast.error(t("errors.emailRoleRequired")); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/invite", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: form.name, email: form.email, role: form.role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("errors.invitationFailed"));
      await qc.invalidateQueries({ queryKey: ["admin-team"] });
      toast.success(t("success"));
      onClose();
      setForm({ name: "", email: "", role: "", message: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : t("errors.failedInvite"));
    } finally {
      setLoading(false);
    }
  };

  const ROLES = [
    { value: "admin",           label: t("roles.admin") },
    { value: "project_manager", label: t("roles.projectManager") },
    { value: "developer",       label: t("roles.developer") },
    { value: "designer",        label: t("roles.designer") },
    { value: "accountant",      label: t("roles.accountant") },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>{t("title")}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <FormField label={t("fields.name")} htmlFor="inv-name">
            <Input id="inv-name" placeholder={t("fields.namePlaceholder")} leftElement={<User className="h-4 w-4" />} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </FormField>
          <FormField label={t("fields.email")} required htmlFor="inv-email">
            <Input id="inv-email" type="email" placeholder={t("fields.emailPlaceholder")} leftElement={<Mail className="h-4 w-4" />} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </FormField>
          <FormField label={t("fields.role")} required>
            <Select onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}>
              <SelectTrigger><SelectValue placeholder={t("fields.rolePlaceholder")} /></SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <p className="text-xs text-(--text-muted)">{t("note")}</p>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={onClose}>{t("actions.cancel")}</Button>
            <Button onClick={handleSubmit} loading={loading}>{t("submit")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Member Card ──────────────────────────────────────────────────

function MemberCard({ member }: { member: ProfileRow }) {
  const t = useTranslations("admin.team.memberCard");
  const initials = member.name.slice(0, 2).toUpperCase();
  const isPending = false; // TODO: check invite status

  return (
    <div className="surface p-5 space-y-3 hover:shadow-(--shadow-sm) transition-shadow">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-xl font-bold">
            {initials}
          </div>
          <span className={cn(
            "absolute -bottom-0.5 -inset-e-0.5 h-3.5 w-3.5 rounded-full border-2 border-(--bg-surface)",
            isPending ? "bg-(--warning)" : "bg-(--success)",
          )} />
        </div>
        <div>
          <p className="text-sm font-semibold text-(--text-primary)">{member.name}</p>
          <p className="text-xs text-(--text-muted) capitalize">{member.role?.replace("_", " ")}</p>
          {isPending && (
            <p className="text-[10px] text-(--warning-foreground) mt-0.5">{t("pendingInvite")}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-sm" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>{t("actions.edit")}</DropdownMenuItem>
            <DropdownMenuItem>{t("actions.changeRole")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>{t("actions.remove")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function AdminTeamPage() {
  const t = useTranslations("admin.team");
  const { data: members, isLoading } = useAdminTeam();
  const [inviteOpen, setInviteOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <Plus className="h-4 w-4" /> {t("inviteMember")}
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (members ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">{t("emptyState.title")}</p>
          <p className="text-xs text-(--text-muted) mt-1">{t("emptyState.description")}</p>
          <Button size="sm" className="mt-4" onClick={() => setInviteOpen(true)}>
            <Plus className="h-4 w-4" /> {t("inviteMember")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(members ?? []).map((m) => <MemberCard key={m.id} member={m} />)}
        </div>
      )}

      <InviteMemberModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}
