import type { ProjectRow, ProfileRow, SupabaseClient } from "@/lib/supabase/types";

type Project = ProjectRow;

export async function getMyProject(supabase: SupabaseClient, userId: string): Promise<Project | null> {
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

export async function getAllProjects(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles!client_id(name, email, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProjectById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getProjectMembers(supabase: SupabaseClient, projectId: string): Promise<ProfileRow[]> {
  const { data, error } = await supabase
    .from("project_members")
    .select("profiles(*)")
    .eq("project_id", projectId);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r: any) => r.profiles) as ProfileRow[];
}

export async function updateProject(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<ProjectRow>
) {
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
