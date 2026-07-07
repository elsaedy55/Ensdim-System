"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllJobApplications,
  updateJobApplicationStatus,
  deleteJobApplication,
  type JobApplication,
  type JobApplicationStatus,
} from "@/lib/services/job-applications.service";

const KEY = "job-applications";

export function useJobApplications() {
  return useQuery({
    queryKey:  [KEY],
    queryFn:   getAllJobApplications,
    staleTime: 60 * 1000,
  });
}

export function useUpdateJobApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobApplicationStatus }) =>
      updateJobApplicationStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prev = qc.getQueryData<JobApplication[]>([KEY]);
      qc.setQueryData([KEY], prev?.map((a) => a.id === id ? { ...a, status } : a));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData([KEY], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteJobApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (application: Pick<JobApplication, "id" | "cv_path" | "portfolio_file_path">) =>
      deleteJobApplication(application),
    onMutate: async (application) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prev = qc.getQueryData<JobApplication[]>([KEY]);
      qc.setQueryData([KEY], prev?.filter((a) => a.id !== application.id));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData([KEY], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}
