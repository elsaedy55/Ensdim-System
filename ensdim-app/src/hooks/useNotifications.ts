"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
  subscribeToNotifications,
} from "@/lib/services/notifications.service";
import { useUser } from "@/store/auth.store";

export function useNotifications() {
  const userId = useUser()?.id;
  return useQuery({
    queryKey:  ["notifications", userId],
    queryFn:   () => getMyNotifications(createClient(), userId!),
    enabled:   !!userId,
    staleTime: 30 * 1000, // 30 seconds — notifications are time-sensitive
  });
}

export function useUnreadCount(initialCount?: number) {
  const userId = useUser()?.id;
  return useQuery({
    queryKey:  ["notifications-count", userId],
    queryFn:   () => getUnreadCount(createClient(), userId!),
    enabled:   !!userId,
    staleTime: 30 * 1000,
    // Realtime subscription (useRealtimeNotifications, mounted in Header on
    // every page) keeps this current — this interval is only a safety net
    // for a missed/dropped realtime event, so it doesn't need to be tight.
    refetchInterval: 5 * 60 * 1000,
    ...(initialCount !== undefined ? { initialData: initialCount } : {}),
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markNotificationRead(createClient(), id),
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
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: () => markAllNotificationsRead(createClient(), userId!),
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
