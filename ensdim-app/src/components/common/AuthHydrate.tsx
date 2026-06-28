"use client";

import * as React from "react";
import { useAuthStore } from "@/store/auth.store";
import type { User } from "@supabase/supabase-js";
import type { ProfileRow } from "@/lib/supabase/types";

// Seeds the auth store from data the route group's layout already fetched
// server-side, so AuthInitializer doesn't repeat that auth.getUser() +
// profile round-trip on the client for every full page load.
export function AuthHydrate({ user, profile }: { user: User; profile: ProfileRow }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  React.useEffect(() => {
    hydrate(user, profile);
  }, [hydrate, user, profile]);

  return null;
}
