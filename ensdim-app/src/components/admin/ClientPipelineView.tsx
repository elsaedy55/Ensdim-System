"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAdminUpdateClientStatus } from "@/hooks/useAdmin";
import type { ProfileRow, ClientStatus } from "@/lib/supabase/types";

// ─── Pipeline stages ──────────────────────────────────────────────

export const PIPELINE_STAGES: {
  key: ClientStatus;
  label: string;
  labelAr: string;
  color: string;
  dot: string;
}[] = [
  { key: "lead",          label: "Lead",          labelAr: "عميل محتمل",    color: "border-(--border) bg-(--bg-muted)/30",         dot: "bg-(--text-muted)" },
  { key: "interested",    label: "Interested",    labelAr: "مهتم",           color: "border-(--accent-muted) bg-(--accent-subtle)/20", dot: "bg-(--accent)" },
  { key: "proposal_sent", label: "Proposal Sent", labelAr: "تم إرسال العرض", color: "border-(--warning-muted) bg-(--warning-subtle)/20", dot: "bg-(--warning)" },
  { key: "negotiation",   label: "Negotiation",   labelAr: "تفاوض",          color: "border-(--warning-muted) bg-(--warning-subtle)/30", dot: "bg-(--warning)" },
  { key: "active",        label: "Active",        labelAr: "نشط",            color: "border-(--success-muted) bg-(--success-subtle)/20", dot: "bg-(--success)" },
  { key: "completed",     label: "Completed",     labelAr: "مكتمل",          color: "border-(--success-muted) bg-(--success-subtle)/30", dot: "bg-(--success)" },
  { key: "lost",          label: "Lost",          labelAr: "خسارة",          color: "border-(--danger-muted) bg-(--danger-subtle)/20",   dot: "bg-(--danger)" },
];

// ─── ClientPipelineCard ────────────────────────────────────────────

function ClientPipelineCard({
  client,
  onStatusChange,
}: {
  client: ProfileRow;
  onStatusChange: (id: string, status: ClientStatus) => void;
}) {
  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <div className="group rounded-xl border border-(--border) bg-(--bg-surface) p-3.5 space-y-2.5 hover:shadow-(--shadow-sm) transition-shadow">
      {/* Avatar + Name */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-xs font-bold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={ROUTES.ADMIN.CLIENT(client.id)}
            className="text-sm font-medium text-(--text-primary) hover:text-(--accent) transition-colors truncate block"
          >
            {client.name}
          </Link>
          <p className="text-[10px] text-(--text-muted) truncate">{client.id.slice(0, 8)}</p>
        </div>
      </div>

      {/* Status changer — visible on hover */}
      <Select
        value={client.client_status ?? "active"}
        onValueChange={(v) => onStatusChange(client.id, v as ClientStatus)}
      >
        <SelectTrigger className="h-6 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PIPELINE_STAGES.map((s) => (
            <SelectItem key={s.key} value={s.key} className="text-xs">{s.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ─── ClientPipelineView (main export) ─────────────────────────────

interface ClientPipelineViewProps {
  clients: ProfileRow[];
}

export function ClientPipelineView({ clients }: ClientPipelineViewProps) {
  const updateStatus = useAdminUpdateClientStatus();

  const handleStatusChange = (clientId: string, status: ClientStatus) => {
    updateStatus.mutate(
      { clientId, status },
      {
        onSuccess: () => toast.success("Status updated"),
        onError:   (e) => toast.error(e.message),
      },
    );
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-max">
        {PIPELINE_STAGES.map((stage) => {
          const stageClients = clients.filter(
            (c) => (c.client_status ?? "active") === stage.key,
          );

          return (
            <div key={stage.key} className="w-52 shrink-0 space-y-2">
              {/* Column Header */}
              <div className={cn(
                "flex items-center justify-between rounded-xl border px-3 py-2",
                stage.color,
              )}>
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full shrink-0", stage.dot)} />
                  <span className="text-xs font-semibold text-(--text-primary)">
                    {stage.label}
                  </span>
                </div>
                {stageClients.length > 0 && (
                  <span className="text-[10px] font-bold text-(--text-muted) bg-(--bg-muted) rounded-full px-1.5 py-0.5">
                    {stageClients.length}
                  </span>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-12">
                {stageClients.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-(--border) py-4 text-center">
                    <p className="text-[10px] text-(--text-muted)">Empty</p>
                  </div>
                ) : (
                  stageClients.map((client) => (
                    <ClientPipelineCard
                      key={client.id}
                      client={client}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
