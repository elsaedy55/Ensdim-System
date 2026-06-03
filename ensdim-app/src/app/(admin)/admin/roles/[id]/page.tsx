"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Skeleton } from "@/components/ui/skeleton";
import { PermissionMatrix } from "@/components/admin/PermissionMatrix";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, Lock } from "lucide-react";
import { useRoleById, useUpdateRole } from "@/hooks/useRoles";
import type { PermissionMatrix as PMType } from "@/lib/services/roles.service";

export default function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  const t      = useTranslations("admin.roles.createRole");
  const { data: role, isLoading } = useRoleById(id);
  const updateRole = useUpdateRole();

  const [name,        setName]        = React.useState("");
  const [description, setDescription] = React.useState("");
  const [permissions, setPermissions] = React.useState<PMType>({});

  React.useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description ?? "");
      setPermissions(role.permissions ?? {});
    }
  }, [role?.id]);

  const handleSave = () => {
    if (!name.trim()) { toast.error("Role name is required"); return; }
    updateRole.mutate(
      { id, updates: { name: name.trim(), description: description || null, permissions } },
      {
        onSuccess: () => toast.success("Role updated"),
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (!role) {
    return <div className="text-sm text-(--text-muted) py-16 text-center">Role not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href={ROUTES.ADMIN.ROLES} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> Back to Roles
      </Link>

      <PageHeader title={role.name} subtitle={role.is_system ? "System role — permissions are locked" : undefined} />

      {/* Basic info */}
      <div className="surface p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label={t("fields.name")} required htmlFor="r-name">
            <Input id="r-name" value={name} onChange={(e) => setName(e.target.value)} disabled={role.is_system} />
          </FormField>
        </div>
        <FormField label={t("fields.description")} htmlFor="r-desc">
          <Textarea id="r-desc" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} disabled={role.is_system} />
        </FormField>
      </div>

      {/* Permission matrix */}
      <div className="surface p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted) mb-4">{t("permissionMatrix")}</p>
        <PermissionMatrix
          value={permissions}
          onChange={setPermissions}
          isSystem={role.is_system}
          roleName={role.name}
        />
      </div>

      {/* Actions */}
      {!role.is_system && (
        <div className="flex items-center gap-3 justify-end">
          <Button variant="secondary" asChild><Link href={ROUTES.ADMIN.ROLES}>{t("actions.cancel")}</Link></Button>
          <Button onClick={handleSave} loading={updateRole.isPending}>{t("actions.save")}</Button>
        </div>
      )}
    </div>
  );
}
