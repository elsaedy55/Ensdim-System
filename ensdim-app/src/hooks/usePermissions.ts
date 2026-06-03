"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPermissions, type PermissionAction, type PermissionModule, type PermissionMatrix } from "@/lib/services/roles.service";
import { useRole } from "@/store/auth.store";

// ─── React Query hook for permissions ─────────────────────────────

export function useMyPermissionsQuery() {
  return useQuery({
    queryKey:  ["my-permissions"],
    queryFn:   getMyPermissions,
    staleTime: 10 * 60 * 1000,
  });
}

// ─── usePermissions hook (convenience) ───────────────────────────

export interface Permissions {
  can:    (action: PermissionAction, module: PermissionModule) => boolean;
  cannot: (action: PermissionAction, module: PermissionModule) => boolean;
  role:   string | null;
  isAdmin:   boolean;
  isClient:  boolean;
  matrix: PermissionMatrix;
  isLoading: boolean;
}

export function usePermissions(): Permissions {
  const role                         = useRole();
  const { data: matrix = {}, isLoading } = useMyPermissionsQuery();

  const can = React.useCallback(
    (action: PermissionAction, module: PermissionModule): boolean => {
      if (role === "admin") return true;
      return matrix[module]?.[action] === true;
    },
    [role, matrix],
  );

  return {
    can,
    cannot:    (action, module) => !can(action, module),
    role,
    isAdmin:   role === "admin",
    isClient:  role === "client",
    matrix,
    isLoading,
  };
}
