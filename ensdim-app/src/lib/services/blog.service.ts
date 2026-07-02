import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/utils/image-compression";
import type { BlogPostRow } from "@/lib/supabase/types";

export type BlogPost = BlogPostRow;

// Guards against requests that hang indefinitely (e.g. stale auth session,
// dropped connection) so the UI can surface an error instead of being stuck
// on "Saving..." forever.
function timeoutAfter(ms: number, label: string): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error(`${label} timed out after ${ms / 1000}s. Please check your connection and try again.`)),
      ms
    )
  );
}

export interface UpsertBlogPostInput {
  title_en: string;
  title_ar: string;
  slug: string;
  category_en: string;
  category_ar: string;
  description_en: string;
  description_ar: string;
  content_en: string;
  content_ar: string;
  read_time: number;
  image_url?: string | null;
  is_published: boolean;
}

// ─── Fetch all (admin) ────────────────────────────────────────────

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Fetch single ─────────────────────────────────────────────────

export async function getBlogPostById(id: string): Promise<BlogPost> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Create ───────────────────────────────────────────────────────

export async function createBlogPost(input: UpsertBlogPostInput): Promise<BlogPost> {
  const supabase = createClient();
  const now = new Date().toISOString();
  const { data, error } = await Promise.race([
    supabase
      .from("blog_posts")
      .insert({
        ...input,
        image_url: input.image_url ?? null,
        published_at: input.is_published ? now : null,
      })
      .select()
      .single(),
    timeoutAfter(30_000, "Saving the post"),
  ]);
  if (error) throw new Error(error.message);
  return data;
}

// ─── Update ───────────────────────────────────────────────────────

export async function updateBlogPost(
  id: string,
  input: Partial<UpsertBlogPostInput>
): Promise<BlogPost> {
  const supabase = createClient();
  const updates: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  };
  if ("is_published" in input && input.is_published && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }
  const { data, error } = await Promise.race([
    supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single(),
    timeoutAfter(30_000, "Saving the post"),
  ]);
  if (error) throw new Error(error.message);
  return data;
}

// ─── Toggle published ─────────────────────────────────────────────

export async function toggleBlogPublished(
  id: string,
  isPublished: boolean
): Promise<BlogPost> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Delete ───────────────────────────────────────────────────────

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = createClient();

  // Delete image from storage if it exists
  const { data: post } = await supabase
    .from("blog_posts")
    .select("image_url")
    .eq("id", id)
    .single();

  if (post?.image_url) {
    const path = post.image_url.split("/blog-images/")[1];
    if (path) {
      await supabase.storage.from("blog-images").remove([path]);
    }
  }

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Upload image ─────────────────────────────────────────────────

export async function uploadBlogImage(postId: string, file: File): Promise<string> {
  const supabase = createClient();
  const compressed = await compressImage(file);
  const ext  = compressed.name.split(".").pop();
  const path = `${postId}/${Date.now()}.${ext}`;

  const { error: storageError } = await Promise.race([
    supabase.storage.from("blog-images").upload(path, compressed, { upsert: true }),
    timeoutAfter(30_000, "Uploading the image"),
  ]);

  if (storageError) throw new Error(storageError.message);

  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}

// ─── Generate slug from title ─────────────────────────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
