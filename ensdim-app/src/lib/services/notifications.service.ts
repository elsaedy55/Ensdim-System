import { createClient } from "@/lib/supabase/client";
import type { NotificationRow, SupabaseClient } from "@/lib/supabase/types";

type Notification = NotificationRow;

export async function getMyNotifications(supabase: SupabaseClient, userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function markNotificationRead(supabase: SupabaseClient, id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function markAllNotificationsRead(supabase: SupabaseClient, userId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false);
  if (error) throw new Error(error.message);
}

export async function getUnreadCount(supabase: SupabaseClient, userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) return 0;
  return count ?? 0;
}

// Realtime subscriptions are inherently browser-only (no server equivalent),
// so this keeps its own client instead of taking one via DI like the rest
// of this file.
export function subscribeToNotifications(
  userId: string,
  onNew: (notification: Notification) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload: { new: unknown }) => {
        onNew(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
