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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteJobApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (application: Pick<JobApplication, "id" | "cv_path" | "portfolio_file_path">) =>
      deleteJobApplication(application),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}
