"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTasks, createTask, updateTask, updateTaskStatus, deleteTask, reorderTasks,
  type TaskRow, type TaskStatus,
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TaskRow> }) =>
      updateTask(id, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useReorderTasks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tasks: Parameters<typeof reorderTasks>[0]) => reorderTasks(tasks),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
