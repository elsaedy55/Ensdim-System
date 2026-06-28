"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STALE_TIME } from "@/lib/query-config";
import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/services/profile.service";
import type { ProfileRow, NotificationPrefsRow } from "@/lib/supabase/types";
import { useUser, useProfile as useAuthProfile } from "@/store/auth.store";

type ProfileUpdate = Partial<ProfileRow>;
type PrefUpdate    = Partial<NotificationPrefsRow>;

export function useMyProfile() {
  const userId = useUser()?.id;
  // The layout already hydrated the auth store with this exact row server-side
  // — seed it as initialData so this screen doesn't show a spinner for data
  // we already have, while still letting React Query revalidate in the background.
  const seeded = useAuthProfile();
  return useQuery({
    queryKey:  ["profile", userId],
    queryFn:   () => getMyProfile(userId!),
    enabled:   !!userId,
    staleTime: STALE_TIME.VERY_LONG,
    ...(seeded ? { initialData: seeded } : {}),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: (updates: Pick<ProfileUpdate, "name" | "phone" | "company">) => updateMyProfile(userId!, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUploadAvatar() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: (file: File) => uploadAvatar(userId!, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useNotifPreferences() {
  const userId = useUser()?.id;
  return useQuery({
    queryKey: ["notif-prefs", userId],
    queryFn:  () => getNotificationPreferences(userId!),
    enabled:  !!userId,
  });
}

export function useUpdateNotifPreferences() {
  const qc = useQueryClient();
  const userId = useUser()?.id;
  return useMutation({
    mutationFn: (prefs: Partial<PrefUpdate>) => updateNotificationPreferences(userId!, prefs),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notif-prefs"] });
    },
  });
}
