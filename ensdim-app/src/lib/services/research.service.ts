import { createClient } from "@/lib/supabase/client";
import type { ResearchArticleRow } from "@/lib/supabase/types";

export type ResearchArticle = ResearchArticleRow;

export interface UpsertResearchInput {
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

export async function getAllResearchArticles(): Promise<ResearchArticle[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("research_articles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Fetch single ─────────────────────────────────────────────────

export async function getResearchArticleById(id: string): Promise<ResearchArticle> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("research_articles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Create ───────────────────────────────────────────────────────

export async function createResearchArticle(input: UpsertResearchInput): Promise<ResearchArticle> {
  const supabase = createClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("research_articles")
    .insert({
      ...input,
      image_url: input.image_url ?? null,
      published_at: input.is_published ? now : null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Update ───────────────────────────────────────────────────────

export async function updateResearchArticle(
  id: string,
  input: Partial<UpsertResearchInput>
): Promise<ResearchArticle> {
  const supabase = createClient();
  const updates: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  };
  if ("is_published" in input && input.is_published && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }
  const { data, error } = await supabase
    .from("research_articles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Toggle published ─────────────────────────────────────────────

export async function toggleResearchPublished(
  id: string,
  isPublished: boolean
): Promise<ResearchArticle> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("research_articles")
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

export async function deleteResearchArticle(id: string): Promise<void> {
  const supabase = createClient();

  // Delete image from storage if it exists
  const { data: article } = await supabase
    .from("research_articles")
    .select("image_url")
    .eq("id", id)
    .single();

  if (article?.image_url) {
    const path = article.image_url.split("/research-images/")[1];
    if (path) {
      await supabase.storage.from("research-images").remove([path]);
    }
  }

  const { error } = await supabase
    .from("research_articles")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Upload image ─────────────────────────────────────────────────

export async function uploadResearchImage(articleId: string, file: File): Promise<string> {
  const supabase = createClient();
  const ext  = file.name.split(".").pop();
  const path = `${articleId}/${Date.now()}.${ext}`;

  const { error: storageError } = await supabase.storage
    .from("research-images")
    .upload(path, file, { upsert: true });

  if (storageError) throw new Error(storageError.message);

  const { data } = supabase.storage.from("research-images").getPublicUrl(path);
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
