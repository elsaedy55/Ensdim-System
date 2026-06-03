"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { PermissionMatrix } from "@/components/admin/PermissionMatrix";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft } from "lucide-react";
import { useCreateRole } from "@/hooks/useRoles";
import type { PermissionMatrix as PMType } from "@/lib/services/roles.service";

export default function CreateRolePage() {
  const t      = useTranslations("admin.roles.createRole");
  const router = useRouter();
  const createRole = useCreateRole();

  const [name,        setName]        = React.useState("");
  const [description, setDescription] = React.useState("");
  const [permissions, setPermissions] = React.useState<PMType>({});

  const handleSave = () => {
    if (!name.trim()) { toast.error("Role name is required"); return; }
    createRole.mutate(
      { name: name.trim(), description: description || undefined, permissions },
      {
        onSuccess: (role) => { toast.success(t("success")); router.push(ROUTES.ADMIN.ROLE(role.id)); },
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href={ROUTES.ADMIN.ROLES} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> Back to Roles
      </Link>

      <PageHeader title={t("title")} />

      {/* Basic info */}
      <div className="surface p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label={t("fields.name")} required htmlFor="r-name">
            <Input id="r-name" placeholder={t("fields.namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>
          <div className="col-span-2 sm:col-span-1" />
        </div>
        <FormField label={t("fields.description")} htmlFor="r-desc">
          <Textarea id="r-desc" rows={2} placeholder={t("fields.descriptionPlaceholder")} value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormField>
      </div>

      {/* Permission matrix */}
      <div className="surface p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted) mb-4">{t("permissionMatrix")}</p>
        <PermissionMatrix value={permissions} onChange={setPermissions} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <Button variant="secondary" asChild><Link href={ROUTES.ADMIN.ROLES}>{t("actions.cancel")}</Link></Button>
        <Button onClick={handleSave} loading={createRole.isPending}>{t("actions.save")}</Button>
      </div>
    </div>
  );
}
