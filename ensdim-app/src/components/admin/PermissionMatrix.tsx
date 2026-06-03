"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PermissionMatrix as PMType, PermissionAction, PermissionModule } from "@/lib/services/roles.service";

// ─── Config ───────────────────────────────────────────────────────

export const MODULES: PermissionModule[] = [
  "dashboard","projects","milestones","revisions","files",
  "invoices","financial","team","clients","roles","settings",
];

export const ACTIONS: PermissionAction[] = [
  "view","create","edit","delete","approve","export","manage",
];

interface PermissionMatrixProps {
  value: PMType;
  onChange: (matrix: PMType) => void;
  isSystem?: boolean;
  roleName?: string;
  disabled?: boolean;
}

export function PermissionMatrix({ value, onChange, isSystem, roleName, disabled }: PermissionMatrixProps) {
  const t = useTranslations("admin.roles.matrix");

  const toggle = (module: PermissionModule, action: PermissionAction) => {
    const current = value[module]?.[action] ?? false;
    onChange({
      ...value,
      [module]: { ...value[module], [action]: !current },
    });
  };

  const toggleModule = (module: PermissionModule) => {
    const modulePerms = value[module] ?? {};
    const allOn = ACTIONS.every((a) => modulePerms[a]);
    onChange({
      ...value,
      [module]: Object.fromEntries(ACTIONS.map((a) => [a, !allOn])) as PMType[PermissionModule],
    });
  };

  const toggleAction = (action: PermissionAction) => {
    const allOn = MODULES.every((m) => value[m]?.[action]);
    const next = { ...value };
    MODULES.forEach((m) => {
      next[m] = { ...next[m], [action]: !allOn };
    });
    onChange(next);
  };

  const isDisabled = disabled || isSystem;
  const [openModule, setOpenModule] = React.useState<PermissionModule | null>(null);

  return (
    <>
      {/* Mobile: accordion per module */}
      <div className="sm:hidden space-y-2">
        {MODULES.map((module) => {
          const modulePerms = value[module] ?? {};
          const isOpen = openModule === module;
          return (
            <div key={module} className="rounded-xl border border-(--border) overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenModule(isOpen ? null : module)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-(--text-primary) hover:bg-(--bg-muted) transition-colors"
              >
                <span>{t(`modules.${module}` as Parameters<typeof t>[0])}</span>
                <span className="text-xs text-(--text-muted)">
                  {ACTIONS.filter((a) => modulePerms[a]).length}/{ACTIONS.length}
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-(--border) px-4 py-3 space-y-3 bg-(--bg-muted)/30">
                  {ACTIONS.map((action) => (
                    <div key={action} className="flex items-center justify-between gap-3">
                      <span className="text-xs text-(--text-secondary) capitalize">{t(`actions.${action}` as Parameters<typeof t>[0])}</span>
                      {isSystem ? (
                        modulePerms[action]
                          ? <div className="h-4 w-4 rounded bg-(--success) flex items-center justify-center"><span className="text-white text-[8px]">✓</span></div>
                          : <Lock className="h-3 w-3 text-(--text-muted)" />
                      ) : (
                        <Switch
                          checked={modulePerms[action] ?? false}
                          onCheckedChange={() => toggle(module, action)}
                          disabled={isDisabled}
                          className="scale-75"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: full table */}
      <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border)">
            <th className="text-start px-3 py-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted) min-w-32">
              Module
            </th>
            {ACTIONS.map((action) => (
              <th key={action} className="text-center px-2 py-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted) min-w-16">
                <div className="flex flex-col items-center gap-1">
                  <span>{t(`actions.${action}` as Parameters<typeof t>[0])}</span>
                  {!isDisabled && (
                    <button
                      type="button"
                      onClick={() => toggleAction(action)}
                      className="text-[9px] text-(--accent) hover:underline font-normal lowercase"
                    >
                      {t("selectAll")}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border)">
          {MODULES.map((module) => {
            const modulePerms = value[module] ?? {};
            const allOn = ACTIONS.every((a) => modulePerms[a]);

            return (
              <tr key={module} className="hover:bg-(--bg-muted)/30 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-(--text-primary)">
                      {t(`modules.${module}` as Parameters<typeof t>[0])}
                    </span>
                    {!isDisabled && (
                      <button
                        type="button"
                        onClick={() => toggleModule(module)}
                        className="text-[9px] text-(--accent) hover:underline font-normal lowercase"
                      >
                        {allOn ? "none" : t("selectAll")}
                      </button>
                    )}
                  </div>
                </td>
                {ACTIONS.map((action) => {
                  const enabled = modulePerms[action] ?? false;

                  return (
                    <td key={action} className="px-2 py-2.5 text-center">
                      {isSystem ? (
                        <div className="flex items-center justify-center">
                          {enabled
                            ? <div className="h-4 w-4 rounded bg-(--success) flex items-center justify-center"><span className="text-white text-[8px]">✓</span></div>
                            : <Lock className="h-3 w-3 text-(--text-muted)" />
                          }
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Switch
                            checked={enabled}
                            onCheckedChange={() => toggle(module, action)}
                            disabled={isDisabled}
                            className="scale-75"
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {isSystem && (
        <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-xl bg-(--bg-muted) text-xs text-(--text-muted)">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          {t("locked")}
        </div>
      )}
      </div>
    </>
  );
}
