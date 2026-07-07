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

type BlogPost = Awaited<ReturnType<typeof getAllBlogPosts>>[number];

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
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<BlogPost[]>([KEY]);
      qc.setQueryData([KEY], prevList?.map((p) => p.id === id ? { ...p, ...input } : p));
      const prevSingle = qc.getQueryData<BlogPost>([KEY, id]);
      if (prevSingle) qc.setQueryData([KEY, id], { ...prevSingle, ...input });
      return { prevList, prevSingle };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.prevList) qc.setQueryData([KEY], ctx.prevList);
      if (ctx?.prevSingle) qc.setQueryData([KEY, id], ctx.prevSingle);
    },
    onSettled: (_, __, { id }) => {
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
    onMutate: async ({ id, isPublished }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<BlogPost[]>([KEY]);
      qc.setQueryData([KEY], prevList?.map((p) => p.id === id ? { ...p, is_published: isPublished } : p));
      return { prevList };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevList) qc.setQueryData([KEY], ctx.prevList);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prevList = qc.getQueryData<BlogPost[]>([KEY]);
      qc.setQueryData([KEY], prevList?.filter((p) => p.id !== id));
      return { prevList };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevList) qc.setQueryData([KEY], ctx.prevList);
    },
    onSettled: () => {
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
