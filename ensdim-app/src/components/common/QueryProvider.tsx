"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
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

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
