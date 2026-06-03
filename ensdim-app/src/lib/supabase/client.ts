import { createBrowserClient } from "@supabase/ssr";

// Database generic omitted intentionally — row types live in ./types.
// After deploying: npx supabase gen types typescript --project-id ID > src/lib/supabase/types.ts
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
