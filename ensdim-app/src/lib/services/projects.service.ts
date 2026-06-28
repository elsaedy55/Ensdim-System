import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, ProfileRow } from "@/lib/supabase/types";

type Project = ProjectRow;

export async function getMyProject(userId: string): Promise<Project | null> {
  const supabase = createClient();

  // Clients have one active project
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles!client_id(name, email, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProjectById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getProjectMembers(projectId: string): Promise<ProfileRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project_members")
    .select("profiles(*)")
    .eq("project_id", projectId);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r: any) => r.profiles) as ProfileRow[];
}

export async function updateProject(
  id: string,
  updates: Partial<ProjectRow>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
