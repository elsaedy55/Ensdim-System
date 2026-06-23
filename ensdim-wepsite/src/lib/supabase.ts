import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface ResearchArticle {
  id: string;
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
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublishedResearchArticles(): Promise<ResearchArticle[]> {
  const { data, error } = await supabase
    .from("research_articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getResearchArticleBySlug(slug: string): Promise<ResearchArticle | null> {
  const { data, error } = await supabase
    .from("research_articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) return null;
  return data;
}

export interface BlogPost {
  id: string;
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
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) return null;
  return data;
}

export interface CaseStudy {
  id: string;
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
  image_url: string | null;
  gallery_images: string[];
  demo_url: string | null;
  sort_order: number;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) return null;
  return data;
}

// ─── Inquiries (consultation bookings + contact messages) ─────────

export interface InquiryInput {
  type: "consultation" | "contact";
  name: string;
  whatsapp: string;
  email?: string;
  company?: string;
  role?: string;
  country?: string;
  challenge?: string;
  budget?: string;
  details?: string;
  message?: string;
  source_page?: string;
  interest_type?: string;
  clicked_item?: string;
  language?: string;
}

export async function submitInquiry(input: InquiryInput): Promise<void> {
  const { error } = await supabase.from("inquiries").insert(input);
  if (error) throw new Error(error.message);
}

// ─── Job Applications (Careers page submissions) ───────────────────

export interface JobApplicationInput {
  full_name: string;
  email: string;
  whatsapp: string;
  country: string;
  city?: string;
  position: string;
  career_category?: string;
  experience_level: string;
  current_job_title?: string;
  previous_job_title?: string;
  years_of_experience: string;
  previous_companies?: string;
  key_projects?: string;
  tools_skills: string;
  portfolio_url?: string;
  availability: string;
  work_type_preference: string;
  cv_path: string;
  portfolio_file_path?: string;
  why_ensdim: string;
  strongest_experience: string;
  preferred_project_type?: string;
  source_page?: string;
  career_role?: string;
  interest_type?: string;
  language?: string;
}

async function uploadJobApplicationFile(file: File, label: "cv" | "portfolio"): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${crypto.randomUUID()}/${label}.${ext}`;
  const { error } = await supabase.storage
    .from("job-applications")
    .upload(path, file, { contentType: file.type || undefined });
  if (error) throw new Error(error.message);
  return path;
}

export async function uploadJobApplicationFiles(cvFile: File, portfolioFile: File | null) {
  const cv_path = await uploadJobApplicationFile(cvFile, "cv");
  const portfolio_file_path = portfolioFile ? await uploadJobApplicationFile(portfolioFile, "portfolio") : undefined;
  return { cv_path, portfolio_file_path };
}

export async function submitJobApplication(input: JobApplicationInput): Promise<void> {
  const { error } = await supabase.from("job_applications").insert(input);
  if (error) throw new Error(error.message);
}
