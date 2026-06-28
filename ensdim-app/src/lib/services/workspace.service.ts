import { createClient } from "@/lib/supabase/client";

export interface WorkspaceSettings {
  name: string;
  currency: string;
}

export async function getWorkspace(workspaceId: string): Promise<WorkspaceSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .select("name, currency")
    .eq("id", workspaceId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateWorkspace(workspaceId: string, updates: Partial<WorkspaceSettings>): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("workspaces").update(updates).eq("id", workspaceId);
  if (error) throw new Error(error.message);
}
