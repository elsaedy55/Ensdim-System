import { useQuery } from "@tanstack/react-query";
import {
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getPublishedResearchArticles,
  getResearchArticleBySlug,
} from "../lib/supabase";
import { getPublishedCaseStudiesLocal, getCaseStudyBySlugLocal } from "../data/caseStudies";

// ─── Case studies (static content, see src/data/caseStudies.ts) ─────

export function useCaseStudies() {
  return useQuery({ queryKey: ["case-studies"], queryFn: async () => getPublishedCaseStudiesLocal() });
}

export function useCaseStudy(slug: string | undefined) {
  return useQuery({
    queryKey: ["case-study", slug],
    queryFn: async () => getCaseStudyBySlugLocal(slug!),
    enabled: !!slug,
  });
}

// ─── Blog posts ─────────────────────────────────────────────────────

export function useBlogPosts() {
  return useQuery({ queryKey: ["blog-posts"], queryFn: getPublishedBlogPosts });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug!),
    enabled: !!slug,
  });
}

// ─── Research articles ──────────────────────────────────────────────

export function useResearchArticles() {
  return useQuery({ queryKey: ["research-articles"], queryFn: getPublishedResearchArticles });
}

export function useResearchArticle(slug: string | undefined) {
  return useQuery({
    queryKey: ["research-article", slug],
    queryFn: () => getResearchArticleBySlug(slug!),
    enabled: !!slug,
  });
}
