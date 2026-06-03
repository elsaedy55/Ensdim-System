import { createClient } from "@/lib/supabase/client";

export interface TaskRow {
  id: string;
  workspace_id: string;
  project_id: string | null;
  milestone_id: string | null;
  title: string;
  description: string | null;
  type: "bug" | "feature" | "design" | "review" | "other";
  status: "todo" | "in_progress" | "review" | "done" | "blocked";
  priority: "high" | "medium" | "low";
  assignee_id: string | null;
  due_date: string | null;
  order: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TaskWithRelations extends TaskRow {
  assignee?: { id: string; name: string; avatar_url: string | null } | null;
  project?:  { id: string; name: string } | null;
  milestone?: { id: string; name: string } | null;
}

export type TaskStatus   = TaskRow["status"];
export type TaskType     = TaskRow["type"];
export type TaskPriority = TaskRow["priority"];

export async function getAllTasks(projectId?: string): Promise<TaskWithRelations[]> {
  const supabase = createClient();
  let query = supabase
    .from("tasks")
    .select(`
      *,
      assignee:profiles!assignee_id(id, name, avatar_url),
      project:projects(id, name),
      milestone:milestones(id, name)
    `)
    .order("order", { ascending: true });

  if (projectId) query = query.eq("project_id", projectId);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as TaskWithRelations[];
}

export async function createTask(input: Omit<TaskRow, "id" | "workspace_id" | "created_by" | "created_at" | "updated_at" | "order">): Promise<TaskRow> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles").select("workspace_id").eq("id", user.id).single();
  if (!profile) throw new Error("Profile not found");

  const { count } = await supabase
    .from("tasks").select("*", { count: "exact", head: true })
    .eq("workspace_id", profile.workspace_id).eq("status", input.status ?? "todo");

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      ...input,
      workspace_id: profile.workspace_id,
      created_by:   user.id,
      order:        count ?? 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateTask(id: string, updates: Partial<TaskRow>): Promise<TaskRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<TaskRow> {
  return updateTask(id, { status });
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function reorderTasks(tasks: Array<{ id: string; order: number }>): Promise<void> {
  const supabase = createClient();
  await Promise.all(
    tasks.map(({ id, order }) =>
      supabase.from("tasks").update({ order, updated_at: new Date().toISOString() }).eq("id", id)
    )
  );
}
