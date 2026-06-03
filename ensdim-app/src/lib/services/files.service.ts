import { createClient } from "@/lib/supabase/client";
import type { FileRow } from "@/lib/supabase/types";

export async function getFilesByProject(
  projectId: string,
  category?: string
): Promise<FileRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("files")
    .select("*, uploader:profiles!uploaded_by(name, avatar_url)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data as FileRow[]) ?? [];
}

export async function uploadProjectFile(params: {
  projectId: string;
  milestoneId?: string;
  file: File;
  category?: string;
}): Promise<FileRow> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const timestamp   = Date.now();
  const storagePath = `${params.projectId}/${timestamp}-${params.file.name}`;

  // 1. Upload to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("project-files")
    .upload(storagePath, params.file);

  if (storageError) throw new Error(storageError.message);

  // 2. Create file record in DB
  const { data, error } = await supabase
    .from("files")
    .insert({
      project_id:   params.projectId,
      milestone_id: params.milestoneId ?? null,
      name:         params.file.name,
      storage_path: storagePath,
      size:         params.file.size,
      mime_type:    params.file.type,
      category:     params.category ?? "general",
      uploaded_by:  user.id,
    })
    .select()
    .single();

  if (error) {
    // Clean up orphaned storage file
    await supabase.storage.from("project-files").remove([storagePath]);
    throw new Error(error.message);
  }

  return data;
}

export async function getSignedDownloadUrl(storagePath: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("project-files")
    .createSignedUrl(storagePath, 3600); // 1 hour

  if (error) throw new Error(error.message);
  return data.signedUrl;
}

export async function deleteFile(fileId: string, storagePath: string) {
  const supabase = createClient();

  // Remove from storage
  await supabase.storage.from("project-files").remove([storagePath]);

  // Remove from DB
  const { error } = await supabase.from("files").delete().eq("id", fileId);
  if (error) throw new Error(error.message);
}

export async function uploadPaymentProof(invoiceId: string, file: File): Promise<string> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const ext  = file.name.split(".").pop();
  const path = `${invoiceId}/proof.${ext}`;

  const { error: storageError } = await supabase.storage
    .from("payment-proofs")
    .upload(path, file, { upsert: true });

  if (storageError) throw new Error(storageError.message);

  // Get signed URL (private bucket)
  const { data } = await supabase.storage
    .from("payment-proofs")
    .createSignedUrl(path, 7 * 24 * 3600); // 7 days

  const url = data?.signedUrl ?? path;

  // Update invoice
  await supabase
    .from("invoices")
    .update({ payment_proof_url: url, updated_at: new Date().toISOString() })
    .eq("id", invoiceId);

  return url;
}
