"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  toggleBlogPublished,
  deleteBlogPost,
  uploadBlogImage,
  type UpsertBlogPostInput,
} from "@/lib/services/blog.service";

const KEY = "blog-posts";

export function useBlogPosts() {
  return useQuery({
    queryKey:  [KEY],
    queryFn:   getAllBlogPosts,
    staleTime: 60 * 1000,
  });
}

export function useBlogPost(id: string | undefined) {
  return useQuery({
    queryKey:  [KEY, id],
    queryFn:   () => getBlogPostById(id!),
    enabled:   !!id,
    staleTime: 60 * 1000,
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpsertBlogPostInput) => createBlogPost(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUpdateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<UpsertBlogPostInput> }) =>
      updateBlogPost(id, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useToggleBlogPublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      toggleBlogPublished(id, isPublished),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUploadBlogImage() {
  return useMutation({
    mutationFn: ({ postId, file }: { postId: string; file: File }) =>
      uploadBlogImage(postId, file),
  });
}
