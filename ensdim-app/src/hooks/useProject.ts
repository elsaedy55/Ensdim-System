"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProject, getAllProjects, updateProject, getProjectMembers } from "@/lib/services/projects.service";

export function useProjectMembers(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["project-members", projectId],
    queryFn:   () => getProjectMembers(projectId!),
    enabled:   !!projectId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyProject() {
  return useQuery({
    queryKey: ["project", "mine"],
    queryFn:  getMyProject,
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useAllProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn:  getAllProjects,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof updateProject>[1] }) =>
      updateProject(id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["project"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
