import { createClient } from "@/lib/supabase/client";
import type { ProfileRow, NotificationPrefsRow } from "@/lib/supabase/types";

type Profile = ProfileRow;
type ProfileUpdate = Partial<ProfileRow>;

export async function getMyProfile(userId: string): Promise<Profile> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateMyProfile(userId: string, updates: Pick<ProfileUpdate, "name" | "phone" | "company">): Promise<Profile> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const supabase = createClient();

  const ext = file.name.split(".").pop();
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);

  // Update profile avatar_url
  await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", userId);

  return publicUrl;
}

export async function getNotificationPreferences(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notification_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateNotificationPreferences(
  userId: string,
  prefs: Partial<NotificationPrefsRow>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notification_preferences")
    .update(prefs)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
