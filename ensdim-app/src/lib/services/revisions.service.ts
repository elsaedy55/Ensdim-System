import { createClient } from "@/lib/supabase/client";
import type { RevisionRow } from "@/lib/supabase/types";
import { notifyRevisionResolved } from "@/lib/services/notify.service";

type Revision = RevisionRow;
type RevisionInsert = Partial<RevisionRow>;

export async function getRevisionsByProject(projectId: string): Promise<Revision[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("revisions")
    .select(`
      *,
      submitted_profile:profiles!submitted_by(name, avatar_url),
      assigned_profile:profiles!assigned_to(name, avatar_url),
      milestones(name)
    `)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as Revision[]) ?? [];
}

export async function getRevisionById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("revisions")
    .select(`
      *,
      submitted_profile:profiles!submitted_by(name, avatar_url),
      assigned_profile:profiles!assigned_to(name, avatar_url),
      milestones(name),
      revision_attachments(
        files(id, name, storage_path, size, mime_type, uploaded_by, created_at)
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createRevision(
  revision: Omit<RevisionInsert, "submitted_by">
): Promise<Revision> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("revisions")
    .insert({ ...revision, submitted_by: user.id })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateRevisionStatus(
  id: string,
  status: Revision["status"],
  teamResponse?: string
): Promise<Revision> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("revisions")
    .update({
      status,
      ...(teamResponse ? { team_response: teamResponse } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (status === "done" || status === "rejected") {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await notifyRevisionResolved(supabase, data, user.id);
  }

  return data;
}

export async function attachFilesToRevision(revisionId: string, fileIds: string[]) {
  const supabase = createClient();
  const inserts = fileIds.map((fileId) => ({ revision_id: revisionId, file_id: fileId }));
  const { error } = await supabase.from("revision_attachments").insert(inserts);
  if (error) throw new Error(error.message);
}
