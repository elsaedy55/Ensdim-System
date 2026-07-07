import { QueryClient } from "@tanstack/react-query";

// Shared defaults for every QueryClient instance in the app — the browser
// singleton (components/common/QueryProvider.tsx) and the fresh
// per-request instance used for server-side prefetching (getServerQueryClient
// below). Keep this the single source of truth so client and server caches
// behave the same way (same staleTime etc).
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:            3 * 60_000, // 3 min — serve from cache, no refetch on navigation
        gcTime:               10 * 60_000, // keep unused data 10 min
        retry:                1,
        refetchOnWindowFocus: false, // don't refetch when user switches tabs/clicks window
        refetchOnReconnect:   true,
        // Serve cached data immediately on a flaky/offline connection instead
        // of sitting in a perpetual loading state waiting on the network.
        networkMode:          "offlineFirst",
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

// A fresh QueryClient per server request — never a singleton on the server,
// or one request's prefetched data could leak into another's response.
export function getServerQueryClient() {
  return makeQueryClient();
}
