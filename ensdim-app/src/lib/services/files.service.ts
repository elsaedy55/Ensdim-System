import { createClient } from "@/lib/supabase/client";
import type { FileRow, CredentialData } from "@/lib/supabase/types";

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

// Uploads via XHR directly (instead of supabase-js's fetch-based upload) so
// we can report real byte-level progress through xhr.upload.onprogress.
function uploadFileWithProgress(params: {
  bucket: string;
  path: string;
  file: File;
  accessToken: string;
  onProgress?: (loaded: number, total: number) => void;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${params.bucket}/${params.path}`;

    const formData = new FormData();
    formData.append("cacheControl", "3600");
    formData.append("", params.file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    xhr.setRequestHeader("authorization", `Bearer ${params.accessToken}`);
    xhr.setRequestHeader("x-upsert", "false");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) params.onProgress?.(e.loaded, e.total);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }
      let message = xhr.statusText || "Upload failed";
      try {
        const body = JSON.parse(xhr.responseText);
        message = body.message || body.error || message;
      } catch {
        // ignore non-JSON error bodies
      }
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

export async function createFileRecord(params: {
  projectId: string;
  milestoneId?: string;
  name: string;
  storagePath: string;
  size: number;
  mimeType: string;
  category?: string;
}): Promise<FileRow> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("files")
    .insert({
      project_id:   params.projectId,
      milestone_id: params.milestoneId ?? null,
      name:         params.name,
      storage_path: params.storagePath,
      size:         params.size,
      mime_type:    params.mimeType,
      category:     params.category ?? "general",
      uploaded_by:  user.id,
    })
    .select()
    .single();

  if (error) {
    // Clean up orphaned storage file
    await supabase.storage.from("project-files").remove([params.storagePath]);
    throw new Error(error.message);
  }

  return data;
}

export async function uploadProjectFile(params: {
  projectId: string;
  milestoneId?: string;
  file: File;
  category?: string;
  onProgress?: (loaded: number, total: number) => void;
}): Promise<FileRow> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const timestamp   = Date.now();
  const storagePath = `${params.projectId}/${timestamp}-${params.file.name}`;

  // 1. Upload to Supabase Storage
  await uploadFileWithProgress({
    bucket: "project-files",
    path: storagePath,
    file: params.file,
    accessToken: session.access_token,
    onProgress: params.onProgress,
  });

  // 2. Create file record in DB
  return createFileRecord({
    projectId:   params.projectId,
    milestoneId: params.milestoneId,
    name:        params.file.name,
    storagePath,
    size:        params.file.size,
    mimeType:    params.file.type,
    category:    params.category,
  });
}

export async function createCredentialEntry(params: {
  projectId: string;
  name: string;
  credentialData: CredentialData;
}): Promise<FileRow> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("files")
    .insert({
      project_id:      params.projectId,
      name:            params.name,
      category:        "credentials",
      credential_data: params.credentialData,
      uploaded_by:     user.id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
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

export async function deleteFile(fileId: string, storagePath: string | null) {
  const supabase = createClient();

  // Remove from storage
  if (storagePath) {
    await supabase.storage.from("project-files").remove([storagePath]);
  }

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
