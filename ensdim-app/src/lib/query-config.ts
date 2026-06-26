/**
 * Shared React Query staleTime presets, so cache freshness is tuned in one
 * place instead of scattered magic numbers across every hook.
 */
export const STALE_TIME = {
  SHORT:     30 * 1000,      // time-sensitive lists (tasks, notifications)
  MEDIUM:    60 * 1000,      // standard lists (projects, research, blog, case studies)
  LONG:      2 * 60 * 1000,  // slower-changing lists (clients)
  VERY_LONG: 5 * 60 * 1000,  // rarely-changing data (roles, team, KPIs)
} as const;
