import { createClient } from "@/lib/supabase/client";
import type { CaseStudyRow } from "@/lib/supabase/types";

export type CaseStudy = CaseStudyRow;

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

export interface UpsertCaseStudyInput {
  slug: string;
  title_en: string;
  title_ar: string;
  sector_en: string;
  sector_ar: string;
  card_problem_en: string;
  card_problem_ar: string;
  card_solution_en: string;
  card_solution_ar: string;
  card_impact_en: string;
  card_impact_ar: string;
  outcome_en: string;
  outcome_ar: string;
  situation_en: string;
  situation_ar: string;
  problem_en: string;
  problem_ar: string;
  built_en: string[];
  built_ar: string[];
  outcomes_en: string[];
  outcomes_ar: string[];
  solution_title_en: string;
  solution_title_ar: string;
  solution_slug: string;
  problem_page_title_en: string;
  problem_page_title_ar: string;
  problem_page_slug: string;
  image_url?: string | null;
  gallery_images: string[];
  demo_url?: string | null;
  sort_order: number;
  is_published: boolean;
}

// ─── Fetch all (admin) ────────────────────────────────────────────

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Fetch single ─────────────────────────────────────────────────

export async function getCaseStudyById(id: string): Promise<CaseStudy> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Create ───────────────────────────────────────────────────────

export async function createCaseStudy(input: UpsertCaseStudyInput): Promise<CaseStudy> {
  const supabase = createClient();
  const now = new Date().toISOString();
  const { data, error } = await Promise.race([
    supabase
      .from("case_studies")
      .insert({
        ...input,
        image_url: input.image_url ?? null,
        published_at: input.is_published ? now : null,
      })
      .select()
      .single(),
    timeoutAfter(30_000, "Saving the case study"),
  ]);
  if (error) throw new Error(error.message);
  return data;
}

// ─── Update ───────────────────────────────────────────────────────

export async function updateCaseStudy(
  id: string,
  input: Partial<UpsertCaseStudyInput>
): Promise<CaseStudy> {
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
      .from("case_studies")
      .update(updates)
      .eq("id", id)
      .select()
      .single(),
    timeoutAfter(30_000, "Saving the case study"),
  ]);
  if (error) throw new Error(error.message);
  return data;
}

// ─── Toggle published ─────────────────────────────────────────────

export async function toggleCaseStudyPublished(
  id: string,
  isPublished: boolean
): Promise<CaseStudy> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("case_studies")
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

export async function deleteCaseStudy(id: string): Promise<void> {
  const supabase = createClient();

  // Delete images from storage if they exist
  const { data: study } = await supabase
    .from("case_studies")
    .select("image_url, gallery_images")
    .eq("id", id)
    .single();

  const urls = [study?.image_url, ...(study?.gallery_images ?? [])].filter(
    (u): u is string => !!u
  );
  const paths = urls
    .map((u) => u.split("/case-study-images/")[1])
    .filter((p): p is string => !!p);

  if (paths.length > 0) {
    await supabase.storage.from("case-study-images").remove(paths);
  }

  const { error } = await supabase
    .from("case_studies")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Upload image ─────────────────────────────────────────────────

export async function uploadCaseStudyImage(caseStudyId: string, file: File): Promise<string> {
  const supabase = createClient();
  const ext  = file.name.split(".").pop();
  const path = `${caseStudyId}/${Date.now()}.${ext}`;

  const { error: storageError } = await Promise.race([
    supabase.storage.from("case-study-images").upload(path, file, { upsert: true }),
    timeoutAfter(30_000, "Uploading the image"),
  ]);

  if (storageError) throw new Error(storageError.message);

  const { data } = supabase.storage.from("case-study-images").getPublicUrl(path);
  return data.publicUrl;
}

// ─── Upload gallery image ──────────────────────────────────────────

export async function uploadCaseStudyGalleryImage(caseStudyId: string, file: File): Promise<string> {
  const supabase = createClient();
  const ext  = file.name.split(".").pop();
  const path = `${caseStudyId}/gallery/${Date.now()}.${ext}`;

  const { error: storageError } = await Promise.race([
    supabase.storage.from("case-study-images").upload(path, file, { upsert: true }),
    timeoutAfter(30_000, "Uploading the image"),
  ]);

  if (storageError) throw new Error(storageError.message);

  const { data } = supabase.storage.from("case-study-images").getPublicUrl(path);
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
