import { createClient } from "@/lib/supabase/client";

export type PermissionAction = "view" | "create" | "edit" | "delete" | "approve" | "export" | "manage";
export type PermissionModule = "dashboard" | "projects" | "milestones" | "revisions" | "files" | "invoices" | "financial" | "team" | "clients" | "roles" | "settings";
export type PermissionMatrix = Partial<Record<PermissionModule, Partial<Record<PermissionAction, boolean>>>>;

export interface RoleRow {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  is_system: boolean;
  permissions: PermissionMatrix;
  created_at: string;
}

export async function getAllRoles(): Promise<RoleRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .order("is_system", { ascending: false })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as RoleRow[];
}

export async function getRoleById(id: string): Promise<RoleRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("roles").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as RoleRow;
}

export async function createRole(input: { name: string; description?: string; permissions: PermissionMatrix }): Promise<RoleRow> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data: profile } = await supabase.from("profiles").select("workspace_id").eq("id", user.id).single();
  if (!profile) throw new Error("Profile not found");

  const { data, error } = await supabase
    .from("roles")
    .insert({ name: input.name, description: input.description ?? null, permissions: input.permissions, workspace_id: profile.workspace_id, is_system: false })
    .select().single();
  if (error) throw new Error(error.message);
  return data as RoleRow;
}

export async function updateRole(id: string, updates: Partial<Pick<RoleRow, "name" | "description" | "permissions">>): Promise<RoleRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("roles").update(updates).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as RoleRow;
}

export async function deleteRole(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("roles").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getMyPermissions(): Promise<PermissionMatrix> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const role = user.user_metadata?.role as string ?? "client";

  // Admins have all permissions
  if (role === "admin") {
    const allModules: PermissionModule[] = ["dashboard","projects","milestones","revisions","files","invoices","financial","team","clients","roles","settings"];
    const allActions: PermissionAction[] = ["view","create","edit","delete","approve","export","manage"];
    return Object.fromEntries(
      allModules.map((m) => [m, Object.fromEntries(allActions.map((a) => [a, true]))])
    ) as PermissionMatrix;
  }

  // Look up role permissions from roles table
  const { data: roles } = await supabase
    .from("roles")
    .select("permissions")
    .eq("name", roleNameFromType(role))
    .limit(1)
    .maybeSingle();

  return (roles?.permissions as PermissionMatrix) ?? {};
}

function roleNameFromType(role: string): string {
  const map: Record<string, string> = {
    project_manager: "Project Manager",
    developer:       "Developer",
    designer:        "Designer",
    accountant:      "Accountant",
    client:          "Client",
  };
  return map[role] ?? role;
}
