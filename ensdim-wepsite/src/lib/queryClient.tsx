import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:            3 * 60_000, // 3 min — serve from cache, no refetch on navigation
      gcTime:               10 * 60_000, // keep unused data 10 min
      retry:                1,
      refetchOnWindowFocus: false,
      refetchOnReconnect:   true,
      networkMode:          "offlineFirst",
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
