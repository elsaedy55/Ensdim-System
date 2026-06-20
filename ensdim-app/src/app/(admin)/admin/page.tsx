"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { KPICard } from "@/components/admin/KPICard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SkeletonKPICard } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Folder, Users, DollarSign, AlertTriangle, MessageSquare, Plus, UserPlus } from "lucide-react";
import { useAdminKPIs, useAdminRecentProjects } from "@/hooks/useAdmin";
import { useNotifications } from "@/hooks/useNotifications";

export default function AdminOverviewPage() {
  const t = useTranslations("admin.overview");

  const { data: kpis,     isLoading: kpisLoading }     = useAdminKPIs();
  const { data: projects, isLoading: projectsLoading } = useAdminRecentProjects(8);
  const { data: notifs }                               = useNotifications();

  const recentActivity = (notifs ?? []).slice(0, 6).map((n) => ({
    id:        n.id,
    message:   n.body,
    userName:  "Team",
    createdAt: n.created_at,
  }));

  const KPI_CONFIG = [
    { key: "activeProjects",  icon: "Folder",        variant: "default"  as const },
    { key: "activeClients",   icon: "Users",         variant: "default"  as const },
    { key: "monthlyRevenue",  icon: "DollarSign",    variant: "success"  as const },
    { key: "delayedProjects", icon: "AlertTriangle", variant: "warning"  as const },
    { key: "openRevisions",   icon: "MessageSquare", variant: "default"  as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href={ROUTES.ADMIN.CLIENTS}>
                <UserPlus className="h-4 w-4" /> {t("actions.addClient")}
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={ROUTES.ADMIN.PROJECT_NEW}>
                <Plus className="h-4 w-4" /> {t("actions.newProject")}
              </Link>
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {KPI_CONFIG.map(({ key, icon, variant }) =>
          kpisLoading ? (
            <SkeletonKPICard key={key} />
          ) : (
            <KPICard
              key={key}
              label={t(`kpis.${key}` as Parameters<typeof t>[0])}
              value={
                key === "monthlyRevenue"
                  ? formatCurrency(kpis?.monthlyRevenue ?? 0)
                  : (kpis?.[key as keyof typeof kpis] ?? 0) as number
              }
              icon={icon}
              variant={variant}
            />
          )
        )}
      </div>

      {/* Projects Table + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Projects Health Table */}
        <div className="xl:col-span-2 surface overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
            <h2 className="text-sm font-semibold text-(--text-primary)">{t("sections.activeProjects")}</h2>
            <Link href={ROUTES.ADMIN.PROJECTS} className="text-xs text-(--accent) hover:text-(--accent-hover)">
              {t("sections.viewAll")}
            </Link>
          </div>

          {projectsLoading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-(--bg-muted) rounded animate-pulse" />
              ))}
            </div>
          ) : (projects ?? []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <Folder className="h-10 w-10 text-(--text-muted) mb-3" />
              <p className="text-sm font-medium text-(--text-primary)">لا توجد مشاريع حتى الآن</p>
              <p className="text-xs text-(--text-muted) mt-1">أنشئ مشروعك الأول للبدء</p>
              <Button size="sm" className="mt-4" asChild>
                <Link href={ROUTES.ADMIN.PROJECT_NEW}>
                  <Plus className="h-4 w-4" /> مشروع جديد
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-(--border)">
                    {[
                      t("table.headers.project"),
                      t("table.headers.client"),
                      t("table.headers.stage"),
                      t("table.headers.progress"),
                      t("table.headers.health"),
                      t("table.headers.due"),
                    ].map((h) => (
                      <th key={h} className="px-5 py-3 text-start text-xs font-medium text-(--text-muted) uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border)">
                  {(projects ?? []).slice(0, 8).map((p) => {
                    const health = p.health === "on_track"
                      ? { label: t("health.onTrack"), color: "text-(--success)" }
                      : p.health === "at_risk"
                        ? { label: t("health.atRisk"), color: "text-(--warning)" }
                        : { label: t("health.delayed"), color: "text-(--danger)" };
                    return (
                      <tr key={p.id} className="hover:bg-(--bg-muted) transition-colors">
                        <td className="px-5 py-3">
                          <Link href={ROUTES.ADMIN.PROJECT(p.id)} className="font-medium text-(--text-primary) hover:text-(--accent) transition-colors">
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-5 py-3 text-(--text-secondary)">
                          {(p as any).client?.name ?? "—"}
                        </td>
                        <td className="px-5 py-3"><StatusBadge status={p.status} showDot /></td>
                        <td className="px-5 py-3 w-32">
                          <div className="flex items-center gap-2">
                            <Progress value={p.progress} size="xs" colorByValue className="flex-1" />
                            <span className="text-xs text-(--text-muted) shrink-0 w-8 text-end">{p.progress}%</span>
                          </div>
                        </td>
                        <td className={`px-5 py-3 text-xs font-medium ${health.color}`}>{health.label}</td>
                        <td className="px-5 py-3 text-(--text-muted) text-xs">
                          {p.target_delivery ? formatDate(p.target_delivery, { month: "short", day: "numeric" }) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* النشاط الأخير */}
        <div className="xl:col-span-1 surface p-5">
          <h2 className="text-sm font-semibold text-(--text-primary) mb-4">النشاط الأخير</h2>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-(--text-muted) text-center py-8">لا يوجد اي نشاط</p>
          ) : (
            <div className="relative ps-6 space-y-4">
              <div className="absolute inset-s-2 top-1 bottom-1 w-px bg-(--border)" aria-hidden />
              {recentActivity.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -inset-s-6 top-1 h-4 w-4 rounded-full border-2 border-(--bg-surface) bg-(--bg-muted) ring-1 ring-(--border)" />
                  <p className="text-sm text-(--text-secondary) leading-snug">{item.message}</p>
                  <time className="text-xs text-(--text-muted) mt-0.5 block">
                    {formatDate(item.createdAt, { month: "short", day: "numeric" })}
                  </time>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
