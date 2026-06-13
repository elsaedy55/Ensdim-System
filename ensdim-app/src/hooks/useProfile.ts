"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/services/profile.service";
import type { ProfileRow, NotificationPrefsRow } from "@/lib/supabase/types";

type ProfileUpdate = Partial<ProfileRow>;
type PrefUpdate    = Partial<NotificationPrefsRow>;

export function useMyProfile() {
  return useQuery({
    queryKey:  ["profile"],
    queryFn:   getMyProfile,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates: Pick<ProfileUpdate, "name" | "phone" | "company">) => updateMyProfile(updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUploadAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useNotifPreferences() {
  return useQuery({
    queryKey: ["notif-prefs"],
    queryFn:  getNotificationPreferences,
  });
}

export function useUpdateNotifPreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (prefs: Partial<PrefUpdate>) => updateNotificationPreferences(prefs),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notif-prefs"] });
    },
  });
}
