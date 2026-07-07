import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/server";
import { getServerQueryClient } from "@/lib/query-client";
import { adminGetKPIs, adminGetRecentProjects } from "@/lib/services/admin.service";
import { getMyNotifications } from "@/lib/services/notifications.service";
import { AdminOverviewClient } from "./AdminOverviewClient";

const RECENT_PROJECTS_LIMIT = 8;

// Prefetches the overview's data server-side (colocated with Supabase,
// instead of paying the round-trip from the visitor's browser) and hands it
// to AdminOverviewClient already warm via HydrationBoundary — the
// client-side hooks resolve from this cache instantly on first paint
// instead of firing their own fetch and rendering skeletons first.
export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const queryClient = getServerQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["admin-kpis"],
      queryFn:  () => adminGetKPIs(supabase),
    }),
    queryClient.prefetchQuery({
      queryKey: ["admin-projects-recent", RECENT_PROJECTS_LIMIT],
      queryFn:  () => adminGetRecentProjects(supabase, RECENT_PROJECTS_LIMIT),
    }),
    user
      ? queryClient.prefetchQuery({
          queryKey: ["notifications", user.id],
          queryFn:  () => getMyNotifications(supabase, user.id),
        })
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminOverviewClient />
    </HydrationBoundary>
  );
}
