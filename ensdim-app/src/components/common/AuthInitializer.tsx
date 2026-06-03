"use client";

import * as React from "react";
import { useAuthStore } from "@/store/auth.store";

/**
 * Initializes the client-side auth store once on mount.
 * Placed in the root layout so it runs on every page.
 */
export function AuthInitializer() {
  const initialize = useAuthStore((s) => s.initialize);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
}
