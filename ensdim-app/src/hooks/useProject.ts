"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_TIME } from "@/lib/query-config";
import { createClient } from "@/lib/supabase/client";
import { getMyProject, getAllProjects, updateProject, getProjectMembers } from "@/lib/services/projects.service";
import { useUser } from "@/store/auth.store";

export function useProjectMembers(projectId: string | undefined) {
  return useQuery({
    queryKey:  ["project-members", projectId],
    queryFn:   () => getProjectMembers(createClient(), projectId!),
    enabled:   !!projectId,
    staleTime: STALE_TIME.VERY_LONG,
  });
}

export function useMyProject() {
  const userId = useUser()?.id;
  return useQuery({
    queryKey: ["project", "mine", userId],
    queryFn:  () => getMyProject(createClient(), userId!),
    enabled:  !!userId,
    staleTime: STALE_TIME.VERY_LONG,
  });
}

export function useAllProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn:  () => getAllProjects(createClient()),
    staleTime: STALE_TIME.LONG,
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof updateProject>[2] }) =>
      updateProject(createClient(), id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["project"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
