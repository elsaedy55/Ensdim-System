import { createBrowserClient } from "@supabase/ssr";
import { processLock } from "@supabase/auth-js";

// Singleton — one shared instance so all hooks share the same session + token refresh state.
let _client: ReturnType<typeof createBrowserClient> | null = null;

const AUTH_FETCH_TIMEOUT_MS = 10_000;

// Every Supabase call (table queries, storage, not just auth methods) calls
// auth.getSession() first to attach the access token — and when a second
// getSession()/refresh call comes in while one is already in flight on this
// client, it queues behind it with NO timeout of its own (that's a separate,
// in-process fast path that bypasses the library's lockAcquireTimeout, which
// only bounds cross-tab lock contention). So if a single auth fetch never
// settles — e.g. the network stalls while the tab is backgrounded/throttled
// after being left idle — it wedges that queue forever, and every later
// action on the page (and every other tab) hangs with no error, looking like
// the whole dashboard froze. Forcing auth requests to time out guarantees
// that queue always drains. Scoped to /auth/v1/ only, via URL sniffing since
// supabase-js has no per-client-type fetch hook, so storage uploads and
// table requests keep using the plain fetch and aren't affected.
function fetchWithAuthTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!url.includes("/auth/v1/")) return fetch(input, init);

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(new Error("Request timed out — please try again.")),
    AUTH_FETCH_TIMEOUT_MS,
  );

  const externalSignal = init?.signal;
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timeoutId));
}

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
        global: {
          fetch: fetchWithAuthTimeout,
        },
      },
    );
  }
  return _client;
}
