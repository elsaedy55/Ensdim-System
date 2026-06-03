"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SkeletonCard } from "@/components/ui/skeleton";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { ROUTES } from "@/constants/routes";
import { formatDate, cn } from "@/lib/utils";
import { Plus, Folder, MoreHorizontal, Trash2, Eye, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminProjects, useAdminDeleteProject } from "@/hooks/useAdmin";
import type { ProjectWithClient } from "@/lib/services/admin.service";

// ─── ProjectRow ───────────────────────────────────────────────────

function ProjectRow({ project, onDelete }: { project: ProjectWithClient; onDelete: (id: string) => void }) {
  const health = project.health === "on_track"
    ? { label: "On Track", color: "text-(--success)" }
    : project.health === "at_risk"
      ? { label: "At Risk", color: "text-(--warning)" }
      : { label: "Delayed", color: "text-(--danger)" };

  return (
    <div className="surface flex items-center gap-4 p-4 hover:shadow-(--shadow-sm) transition-shadow group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <Link
            href={ROUTES.ADMIN.PROJECT(project.id)}
            className="text-sm font-semibold text-(--text-primary) hover:text-(--accent) transition-colors truncate"
          >
            {project.name}
          </Link>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex items-center gap-4 text-xs text-(--text-muted) flex-wrap">
          {project.client && <span>{project.client.name}</span>}
          {project.target_delivery && (
            <span>Due: {formatDate(project.target_delivery, { month: "short", day: "numeric", year: "numeric" })}</span>
          )}
          <span className={cn("font-medium", health.color)}>{health.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 w-28">
          <Progress value={project.progress} size="xs" colorByValue className="flex-1" />
          <span className="text-xs text-(--text-muted) w-8 text-end">{project.progress}%</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link href={ROUTES.ADMIN.PROJECT(project.id)} className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => onDelete(project.id)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href={ROUTES.ADMIN.PROJECT(project.id)}
          className="text-xs text-(--accent) hover:text-(--accent-hover) hidden sm:inline-flex items-center gap-1"
        >
          View <ArrowRight className="h-3 w-3 rtl:scale-x-[-1]" />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function AdminProjectsPage() {
  const t = useTranslations("admin.projects");
  const { data: projects, isLoading } = useAdminProjects();
  const deleteProject = useAdminDeleteProject();

  const [search, setSearch]     = React.useState("");
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const list = projects ?? [];

  const filtered = (status?: string) => {
    const base = status === "active"
      ? list.filter((p) => p.status !== "completed" && p.status !== "on_hold")
      : status === "delayed"
        ? list.filter((p) => p.health === "delayed")
        : status === "completed"
          ? list.filter((p) => p.status === "completed")
          : list;

    return search
      ? base.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      : base;
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteProject.mutate(deleteId, {
      onSuccess: () => { toast.success("Project deleted"); setDeleteId(null); },
      onError:   (e) => toast.error(e.message),
    });
  };

  const counts = {
    all:       list.length,
    active:    list.filter((p) => p.status !== "completed" && p.status !== "on_hold").length,
    delayed:   list.filter((p) => p.health === "delayed").length,
    completed: list.filter((p) => p.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("list.title")}
        subtitle={t("list.subtitle")}
        actions={
          <Button asChild>
            <Link href={ROUTES.ADMIN.PROJECT_NEW}>
              <Plus className="h-4 w-4" /> {t("list.newProject")}
            </Link>
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("list.searchPlaceholder")}
          className="max-w-xs"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList variant="underline" className="w-full">
            <TabsTrigger value="all"       variant="underline" count={counts.all}>{t("list.filters.all")}</TabsTrigger>
            <TabsTrigger value="active"    variant="underline" count={counts.active}>{t("list.filters.active")}</TabsTrigger>
            <TabsTrigger value="delayed"   variant="underline" count={counts.delayed}>{t("list.filters.delayed")}</TabsTrigger>
            <TabsTrigger value="completed" variant="underline" count={counts.completed}>{t("list.filters.completed")}</TabsTrigger>
          </TabsList>

          {(["all", "active", "delayed", "completed"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3">
              {filtered(tab === "all" ? undefined : tab).length === 0 ? (
                <div className="surface flex flex-col items-center justify-center py-16 text-center">
                  <Folder className="h-10 w-10 text-(--text-muted) mb-3" />
                  <p className="text-sm font-medium text-(--text-primary)">{t("list.emptyState.title")}</p>
                  <p className="text-xs text-(--text-muted) mt-1">{t("list.emptyState.description")}</p>
                  <Button size="sm" className="mt-4" asChild>
                    <Link href={ROUTES.ADMIN.PROJECT_NEW}>
                      <Plus className="h-4 w-4" /> {t("list.emptyState.action")}
                    </Link>
                  </Button>
                </div>
              ) : (
                filtered(tab === "all" ? undefined : tab).map((p) => (
                  <ProjectRow key={p.id} project={p} onDelete={setDeleteId} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        itemName={list.find((p) => p.id === deleteId)?.name}
        onConfirm={handleDelete}
        loading={deleteProject.isPending}
      />
    </div>
  );
}
