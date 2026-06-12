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
