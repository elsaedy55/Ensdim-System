"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTasks, createTask, updateTask, updateTaskStatus, deleteTask, reorderTasks,
  type TaskRow, type TaskWithRelations, type TaskStatus,
} from "@/lib/services/tasks.service";
import { useUser, useWorkspaceId } from "@/store/auth.store";

export function useTasks(projectId?: string) {
  return useQuery({
    queryKey:  ["tasks", projectId ?? "all"],
    queryFn:   () => getAllTasks(projectId),
    staleTime: 30 * 1000,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  const workspaceId = useWorkspaceId();
  return useMutation({
    mutationFn: (input: Parameters<typeof createTask>[0]) => createTask(input, workspaceId!, userId!),
    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const queries = qc.getQueriesData<TaskWithRelations[]>({ queryKey: ["tasks"] });
      // No assignee/project/milestone join data yet — the UI is expected to
      // tolerate those being briefly absent until onSuccess's invalidate
      // swaps this in for the real, fully-joined row.
      const optimisticTask: TaskWithRelations = {
        ...input,
        id:           `temp-${crypto.randomUUID()}`,
        workspace_id: workspaceId!,
        created_by:   userId!,
        order:        Date.now(),
        created_at:   new Date().toISOString(),
        updated_at:   new Date().toISOString(),
      };
      queries.forEach(([key, data]) => {
        if (data) qc.setQueryData(key, [...data, optimisticTask]);
      });
      return { queries };
    },
    onError: (_, __, ctx) => {
      ctx?.queries.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TaskRow> }) =>
      updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const queries = qc.getQueriesData<TaskWithRelations[]>({ queryKey: ["tasks"] });
      queries.forEach(([key, data]) => {
        if (data) qc.setQueryData(key, data.map((t) => t.id === id ? { ...t, ...updates } : t));
      });
      return { queries };
    },
    onError: (_, __, ctx) => {
      ctx?.queries.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTaskStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      updateTaskStatus(id, status),
    onMutate: async ({ id, status }) => {
      // Optimistic update
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const queries = qc.getQueriesData<Awaited<ReturnType<typeof getAllTasks>>>({ queryKey: ["tasks"] });
      queries.forEach(([key, data]) => {
        if (data) {
          qc.setQueryData(key, data.map((t) => t.id === id ? { ...t, status } : t));
        }
      });
      return { queries };
    },
    onError: (_, __, ctx) => {
      ctx?.queries.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const queries = qc.getQueriesData<TaskWithRelations[]>({ queryKey: ["tasks"] });
      queries.forEach(([key, data]) => {
        if (data) qc.setQueryData(key, data.filter((t) => t.id !== id));
      });
      return { queries };
    },
    onError: (_, __, ctx) => {
      ctx?.queries.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useReorderTasks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tasks: Parameters<typeof reorderTasks>[0]) => reorderTasks(tasks),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
