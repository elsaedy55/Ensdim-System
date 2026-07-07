"use client";

import * as React from "react";
import { useAuthStore } from "@/store/auth.store";
import type { User } from "@supabase/supabase-js";
import type { ProfileRow } from "@/lib/supabase/types";

// Seeds the auth store from data the route group's layout already fetched
// server-side, so AuthInitializer doesn't repeat that auth.getUser() +
// profile round-trip on the client for every full page load.
//
// Must run in useLayoutEffect, not useEffect: this component is nested
// inside {children} in the root layout, below <AuthInitializer />, which
// means AuthInitializer's own useEffect (an earlier sibling) always fires
// first in a plain useEffect race. React guarantees every useLayoutEffect
// in a commit runs before any useEffect in that same commit, so this is
// what actually lets AuthInitializer see the hydrated user in time to skip
// its redundant client-side fetch — component order in the JSX tree can't
// guarantee that on its own.
export function AuthHydrate({ user, profile }: { user: User; profile: ProfileRow }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  React.useLayoutEffect(() => {
    hydrate(user, profile);
  }, [hydrate, user, profile]);

  return null;
}
