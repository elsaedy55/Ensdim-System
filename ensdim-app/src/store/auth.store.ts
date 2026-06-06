"use client";

import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";
import type { ProfileRow, UserRole } from "@/lib/supabase/types";

type Profile = ProfileRow;

interface AuthState {
  // Supabase auth user
  user: User | null;
  // Extended profile from public.profiles
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  initialize: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user:            null,
  profile:         null,
  isLoading:       true,
  isAuthenticated: false,

  initialize: async () => {
    const supabase = createClient();
    set({ isLoading: true });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      set({ user: null, profile: null, isAuthenticated: false, isLoading: false });
      return;
    }

    // Fetch profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    set({ user, profile, isAuthenticated: true, isLoading: false });

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (event === "SIGNED_OUT" || !session) {
        set({ user: null, profile: null, isAuthenticated: false });
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const { data: updatedProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        set({ user: session.user, profile: updatedProfile, isAuthenticated: true });
      }
    });
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;
    const supabase = createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (profile) set({ profile });
  },

  clearAuth: () => {
    set({ user: null, profile: null, isAuthenticated: false, isLoading: false });
  },
}));

// ─── Convenience selectors ────────────────────────────────────────

export const useUser    = () => useAuthStore((s) => s.user);
export const useProfile = () => useAuthStore((s) => s.profile);
export const useRole    = (): UserRole | null => useAuthStore((s) => s.profile?.role as UserRole ?? null);
export const useWorkspaceId = () => useAuthStore((s) => s.profile?.workspace_id ?? null);
