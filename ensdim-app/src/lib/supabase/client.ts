import { createBrowserClient } from "@supabase/ssr";
import { processLock } from "@supabase/auth-js";

// Singleton — one shared instance so all hooks share the same session + token refresh state.
let _client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!_client) {
    _client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          // Avoid the Navigator LockManager-based session lock: an in-flight
          // auth call aborted by client-side route navigation can leave the
          // lock held, deadlocking every subsequent Supabase request until a
          // full page reload. The process-level lock doesn't have this issue.
          lock: processLock,
        },
      },
    );
  }
  return _client;
}
