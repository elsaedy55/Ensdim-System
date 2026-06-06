"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { createClient } from "@/lib/supabase/client";

export function AuthInitializer() {
  const initialize = useAuthStore((s) => s.initialize);
  const router = useRouter();

  React.useEffect(() => {
    initialize();

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [initialize, router]);

  return null;
}
