"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
  subscribeToNotifications,
} from "@/lib/services/notifications.service";
import { useUser } from "@/store/auth.store";

export function useNotifications() {
  return useQuery({
    queryKey:  ["notifications"],
    queryFn:   getMyNotifications,
    staleTime: 30 * 1000, // 30 seconds — notifications are time-sensitive
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey:  ["notifications-count"],
    queryFn:   getUnreadCount,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // Poll every minute as fallback
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onMutate: async (id) => {
      // Optimistic update
      await qc.cancelQueries({ queryKey: ["notifications"] });
      const prev = qc.getQueryData<Awaited<ReturnType<typeof getMyNotifications>>>(["notifications"]);
      qc.setQueryData(
        ["notifications"],
        prev?.map((n) => n.id === id ? { ...n, is_read: true } : n)
      );
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(["notifications"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["notifications-count"] });
    },
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["notifications-count"] });
    },
  });
}

// Real-time hook — subscribes to Supabase Realtime
export function useRealtimeNotifications() {
  const qc   = useQueryClient();
  const user = useUser();

  React.useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = subscribeToNotifications(user.id, (notification) => {
      // Prepend new notification to the list
      qc.setQueryData<Awaited<ReturnType<typeof getMyNotifications>>>(
        ["notifications"],
        (prev) => (prev ? [notification, ...prev] : [notification]),
      );
      // Increment unread count
      qc.setQueryData<number>(
        ["notifications-count"],
        (prev) => (prev ?? 0) + 1,
      );
    });

    return unsubscribe;
  }, [user?.id, qc]);
}
