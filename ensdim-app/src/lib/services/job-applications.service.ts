import { createClient } from "@/lib/supabase/client";
import type { JobApplicationRow } from "@/lib/supabase/types";

export type JobApplication = JobApplicationRow;
export type JobApplicationStatus = JobApplicationRow["status"];

// ─── Fetch all (admin) ────────────────────────────────────────────

export async function getAllJobApplications(): Promise<JobApplication[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Update status ────────────────────────────────────────────────

export async function updateJobApplicationStatus(id: string, status: JobApplicationStatus): Promise<JobApplication> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Delete ───────────────────────────────────────────────────────

export async function deleteJobApplication(application: Pick<JobApplication, "id" | "cv_path" | "portfolio_file_path">): Promise<void> {
  const supabase = createClient();

  const paths = [application.cv_path, application.portfolio_file_path].filter((p): p is string => !!p);
  if (paths.length > 0) {
    await supabase.storage.from("job-applications").remove(paths);
  }

  const { error } = await supabase.from("job_applications").delete().eq("id", application.id);
  if (error) throw new Error(error.message);
}

// ─── File download (private bucket — signed URL) ───────────────────

export async function getJobApplicationFileUrl(path: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("job-applications")
    .createSignedUrl(path, 3600); // 1 hour
  if (error) throw new Error(error.message);
  return data.signedUrl;
}
