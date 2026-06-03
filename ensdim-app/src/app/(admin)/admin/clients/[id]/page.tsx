"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkeletonCard } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatDate, cn } from "@/lib/utils";
import { ChevronLeft, Folder, DollarSign, Calendar, Phone, User, Activity } from "lucide-react";
import {
  useAdminClient, useAdminClientProjects, useAdminUpdateClientStatus,
} from "@/hooks/useAdmin";
import { PIPELINE_STAGES } from "@/components/admin/ClientPipelineView";
import type { ClientStatus } from "@/lib/supabase/types";

// ─── Overview Tab ─────────────────────────────────────────────────

function OverviewTab({ clientId }: { clientId: string }) {
  const { data: client }   = useAdminClient(clientId);
  const { data: projects } = useAdminClientProjects(clientId);
  const updateStatus       = useAdminUpdateClientStatus();

  if (!client) return null;

  const activeProjects    = (projects ?? []).filter((p) => p.status !== "completed").length;
  const completedProjects = (projects ?? []).filter((p) => p.status === "completed").length;
  const stage = PIPELINE_STAGES.find((s) => s.key === (client.client_status ?? "active"));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="surface p-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Overview</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Projects", value: (projects ?? []).length },
            { label: "Active",         value: activeProjects },
            { label: "Completed",      value: completedProjects },
            { label: "Since",          value: formatDate(client.created_at, { month: "short", year: "numeric" }) },
          ].map(({ label, value }) => (
            <div key={label} className="surface-muted rounded-xl p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-(--text-muted) mb-1">{label}</p>
              <p className="text-lg font-bold text-(--text-primary)">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface p-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Pipeline Stage</p>
        {stage && (
          <div className={cn("flex items-center gap-2 rounded-xl border px-3 py-2", stage.color)}>
            <span className={cn("h-2 w-2 rounded-full", stage.dot)} />
            <span className="text-sm font-semibold text-(--text-primary)">{stage.label}</span>
          </div>
        )}
        <Select
          value={client.client_status ?? "active"}
          onValueChange={(v) =>
            updateStatus.mutate({ clientId: client.id, status: v as ClientStatus }, {
              onSuccess: () => toast.success("Stage updated"),
              onError:   (e) => toast.error(e.message),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Change stage..." />
          </SelectTrigger>
          <SelectContent>
            {PIPELINE_STAGES.map((s) => (
              <SelectItem key={s.key} value={s.key}>
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full shrink-0", s.dot)} />
                  {s.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ─── Contact Tab ──────────────────────────────────────────────────

function ContactTab({ clientId }: { clientId: string }) {
  const { data: client } = useAdminClient(clientId);
  if (!client) return null;

  return (
    <div className="surface p-6 space-y-4 mt-4 max-w-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Contact Information</p>
      <div className="space-y-3">
        {[
          { icon: User,     label: "Full Name",     value: client.name },
          { icon: Phone,    label: "Phone",         value: client.phone ?? "Not provided" },
          { icon: Calendar, label: "Client Since",  value: formatDate(client.created_at, { month: "long", day: "numeric", year: "numeric" }) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--bg-muted)">
              <Icon className="h-4 w-4 text-(--text-muted)" />
            </div>
            <div>
              <p className="text-xs text-(--text-muted)">{label}</p>
              <p className="text-sm font-medium text-(--text-primary)">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────

function ProjectsTab({ clientId }: { clientId: string }) {
  const { data: projects, isLoading } = useAdminClientProjects(clientId);

  if (isLoading) return <div className="space-y-3 mt-4">{Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)}</div>;

  return (
    <div className="space-y-3 mt-4">
      {(projects ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <Folder className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">No projects yet.</p>
          <Button size="sm" className="mt-3" asChild>
            <Link href={ROUTES.ADMIN.PROJECT_NEW}>Create Project</Link>
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
  const { data: projects } = useAdminClientProjects(clientId);

  if ((projects ?? []).length === 0) {
    return (
      <div className="surface flex flex-col items-center justify-center py-12 text-center mt-4">
        <DollarSign className="h-8 w-8 text-(--text-muted) mb-2" />
        <p className="text-sm text-(--text-muted)">No invoices. Create a project first.</p>
      </div>
    );
  }

  return (
    <div className="surface p-5 mt-4 space-y-3">
      <p className="text-sm text-(--text-secondary)">
        Invoices are managed inside each project → Invoices tab.
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
  const [note, setNote] = React.useState("");

  return (
    <div className="surface p-5 mt-4 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Internal Notes</p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        placeholder="Add internal notes about this client (only visible to team)..."
        className="w-full rounded-xl border border-(--border) bg-(--bg-surface) px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent) focus:border-(--accent) resize-none"
      />
      <Button size="sm" onClick={() => toast.success("Note saved")}>Save Note</Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t      = useTranslations("admin.clients.detail");

  const { data: client,   isLoading } = useAdminClient(id);
  const { data: projects }            = useAdminClientProjects(id);

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
        <p className="text-sm text-(--text-muted)">Client not found.</p>
        <Link href={ROUTES.ADMIN.CLIENTS} className="mt-4 text-sm text-(--accent) hover:underline">Back to Clients</Link>
      </div>
    );
  }

  const stage = PIPELINE_STAGES.find((s) => s.key === (client.client_status ?? "active"));

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href={ROUTES.ADMIN.CLIENTS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> Back to Clients
      </Link>

      {/* Client Header */}
      <div className="surface p-6">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-xl font-bold select-none">
            {client.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-xl font-bold text-(--text-primary)">{client.name}</h1>
              {stage && (
                <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", stage.color)}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", stage.dot)} />
                  {stage.label}
                </span>
              )}
            </div>
            <p className="text-xs text-(--text-muted)">
              {t("projectCount", { count: (projects ?? []).length })} · Since {formatDate(client.created_at, { month: "long", year: "numeric" })}
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href={ROUTES.ADMIN.PROJECT_NEW}>+ New Project</Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList variant="underline" className="w-full">
          <TabsTrigger value="overview"  variant="underline">Overview</TabsTrigger>
          <TabsTrigger value="contact"   variant="underline">Contact</TabsTrigger>
          <TabsTrigger value="projects"  variant="underline" count={(projects ?? []).length}>{t("tabs.projects")}</TabsTrigger>
          <TabsTrigger value="invoices"  variant="underline">{t("tabs.invoices")}</TabsTrigger>
          <TabsTrigger value="notes"     variant="underline">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">  <OverviewTab  clientId={id} /> </TabsContent>
        <TabsContent value="contact">   <ContactTab   clientId={id} /> </TabsContent>
        <TabsContent value="projects">  <ProjectsTab  clientId={id} /> </TabsContent>
        <TabsContent value="invoices">  <InvoicesTab  clientId={id} /> </TabsContent>
        <TabsContent value="notes">     <NotesTab /> </TabsContent>
      </Tabs>
    </div>
  );
}
