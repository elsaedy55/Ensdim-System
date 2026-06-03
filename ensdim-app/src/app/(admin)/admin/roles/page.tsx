"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { ROUTES } from "@/constants/routes";
import { Plus, ShieldCheck, Lock, MoreHorizontal, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoles, useDeleteRole } from "@/hooks/useRoles";

export default function AdminRolesPage() {
  const t = useTranslations("admin.roles");
  const { data: roles, isLoading } = useRoles();
  const deleteRole = useDeleteRole();
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteRole.mutate(deleteId, {
      onSuccess: () => { toast.success("Role deleted"); setDeleteId(null); },
      onError:   (e) => toast.error(e.message),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        actions={
          <Button asChild>
            <Link href={ROUTES.ADMIN.ROLE_NEW}>
              <Plus className="h-4 w-4" /> {t("newRole")}
            </Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (roles ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-16 text-center">
          <ShieldCheck className="h-10 w-10 text-(--text-muted) mb-3" />
          <p className="text-sm font-medium text-(--text-primary)">{t("emptyState.title")}</p>
          <p className="text-xs text-(--text-muted) mt-1">{t("emptyState.description")}</p>
          <Button size="sm" className="mt-4" asChild>
            <Link href={ROUTES.ADMIN.ROLE_NEW}><Plus className="h-4 w-4" /> {t("newRole")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(roles ?? []).map((role) => (
            <div key={role.id} className="surface p-5 space-y-4 hover:shadow-(--shadow-sm) transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    role.is_system ? "bg-(--bg-muted)" : "bg-(--accent-subtle)",
                  )}>
                    {role.is_system
                      ? <Lock className="h-4 w-4 text-(--text-muted)" />
                      : <ShieldCheck className="h-4 w-4 text-(--accent)" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-(--text-primary)">{role.name}</p>
                    {role.is_system && (
                      <span className="text-[10px] text-(--text-muted) border border-(--border) rounded-full px-1.5 py-0.5">
                        {t("systemBadge")}
                      </span>
                    )}
                  </div>
                </div>

                {!role.is_system && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon-sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.ADMIN.ROLE(role.id)}>{t("actions.edit")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem destructive onClick={() => setDeleteId(role.id)}>
                        {t("actions.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {role.description && (
                <p className="text-xs text-(--text-muted) line-clamp-2">{role.description}</p>
              )}

              <div className="flex items-center gap-2 text-xs text-(--text-muted)">
                <Users className="h-3.5 w-3.5" />
                <span>
                  {Object.keys(role.permissions ?? {}).length} modules configured
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        itemName={(roles ?? []).find((r) => r.id === deleteId)?.name}
        onConfirm={handleDelete}
        loading={deleteRole.isPending}
      />
    </div>
  );
}
