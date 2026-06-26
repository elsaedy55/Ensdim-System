"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Syncs a single string value (search query, active tab, filter...) with a
 * URL search param, so list pages keep their state on back/forward
 * navigation and are shareable via URL. Falls back to `fallback` when the
 * param is absent; setting the value to `fallback` removes the param.
 */
export function useUrlState(key: string, fallback = "") {
  const router       = useRouter();
  const pathname      = usePathname();
  const searchParams  = useSearchParams();

  const value = searchParams.get(key) ?? fallback;

  const setValue = React.useCallback((next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next && next !== fallback) {
      params.set(key, next);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams, key, fallback]);

  return [value, setValue] as const;
}
