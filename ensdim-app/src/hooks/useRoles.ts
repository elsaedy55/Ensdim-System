"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "@/lib/services/roles.service";

export function useRoles() {
  return useQuery({
    queryKey:  ["roles"],
    queryFn:   getAllRoles,
    staleTime: 5 * 60 * 1000,
  });
}

// Named useRoleById to avoid conflict with useRole from auth.store
export function useRoleById(id: string | undefined) {
  return useQuery({
    queryKey:  ["role", id],
    queryFn:   () => getRoleById(id!),
    enabled:   !!id,
  });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createRole>[0]) => createRole(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof updateRole>[1] }) =>
      updateRole(id, updates),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["roles"] });
      qc.invalidateQueries({ queryKey: ["role", id] });
    },
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}
