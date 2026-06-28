import { createClient } from "@/lib/supabase/client";
import type { MilestoneRow } from "@/lib/supabase/types";

type Milestone = MilestoneRow;

export async function getMilestonesByProject(projectId: string): Promise<Milestone[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getMilestoneById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("milestones")
    .select(`
      *,
      files(id, name, storage_path, size, mime_type, category, uploaded_by, created_at)
    `)
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function approveMilestone(id: string): Promise<Milestone> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("milestones")
    .update({
      status: "approved",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateMilestoneStatus(
  id: string,
  status: Milestone["status"]
): Promise<Milestone> {
  const supabase = createClient();
  const updates: Partial<Milestone> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (status === "approved" || status === "completed") {
    updates.completed_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("milestones")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getMilestoneActivity(milestoneId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*, profiles(name, avatar_url)")
    .eq("entity_id", milestoneId)
    .eq("entity_type", "milestone")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);
  return data ?? [];
}
