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
  hydrate: (user: User, profile: Profile) => void;
  initialize: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user:            null,
  profile:         null,
  isLoading:       true,
  isAuthenticated: false,

  // Seeds the store from a server component's already-validated user +
  // profile (fetched once by the route group's layout), so the client
  // doesn't repeat that auth round-trip on every full page load.
  hydrate: (user, profile) => {
    set({ user, profile, isAuthenticated: true, isLoading: false });
  },

  initialize: async () => {
    const supabase = createClient();

    // A layout further down the tree may have already hydrated this
    // request's user/profile from its server-side fetch — skip the
    // redundant client-side fetch in that case.
    if (!get().user) {
      set({ isLoading: true });

      try {
        // getSession() reads the locally persisted session (no network call),
        // unlike getUser() which always revalidates against the Auth server.
        // That's fine here since this only feeds display state — actual data
        // access is still authorized server-side via RLS + middleware.
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user ?? null;

        if (!user) {
          set({ user: null, profile: null, isAuthenticated: false, isLoading: false });
        } else {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          set({ user, profile, isAuthenticated: true, isLoading: false });
        }
      } catch (err) {
        // e.g. the Supabase client's internal auth lock timing out after the
        // tab was idle (see client.ts's lockWithTimeout) — without this catch
        // the store is left stuck in isLoading: true forever, and the
        // rejection surfaces as an unhandled runtime error since callers
        // (AuthInitializer) don't await this function.
        console.warn("Auth initialization failed:", err);
        set({ user: null, profile: null, isAuthenticated: false, isLoading: false });
      }
    }

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (event === "SIGNED_OUT" || !session) {
        set({ user: null, profile: null, isAuthenticated: false });
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        try {
          const { data: updatedProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          set({ user: session.user, profile: updatedProfile, isAuthenticated: true });
        } catch (err) {
          console.warn("Failed to refresh profile after auth change:", err);
          set({ user: session.user, isAuthenticated: true });
        }
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
