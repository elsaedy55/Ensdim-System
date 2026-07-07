"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "@/lib/services/roles.service";
import { useWorkspaceId } from "@/store/auth.store";

type Role = Awaited<ReturnType<typeof getAllRoles>>[number];

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
  const workspaceId = useWorkspaceId();
  return useMutation({
    mutationFn: (input: Parameters<typeof createRole>[0]) => createRole(input, workspaceId!),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof updateRole>[1] }) =>
      updateRole(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey: ["roles"] });
      await qc.cancelQueries({ queryKey: ["role", id] });
      const prevList = qc.getQueryData<Role[]>(["roles"]);
      qc.setQueryData(["roles"], prevList?.map((r) => r.id === id ? { ...r, ...updates } : r));
      const prevSingle = qc.getQueryData<Role>(["role", id]);
      if (prevSingle) qc.setQueryData(["role", id], { ...prevSingle, ...updates });
      return { prevList, prevSingle };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.prevList) qc.setQueryData(["roles"], ctx.prevList);
      if (ctx?.prevSingle) qc.setQueryData(["role", id], ctx.prevSingle);
    },
    onSettled: (_, __, { id }) => {
      qc.invalidateQueries({ queryKey: ["roles"] });
      qc.invalidateQueries({ queryKey: ["role", id] });
    },
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["roles"] });
      const prev = qc.getQueryData<Role[]>(["roles"]);
      qc.setQueryData(["roles"], prev?.filter((r) => r.id !== id));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(["roles"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}
