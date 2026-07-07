import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/server";
import { getServerQueryClient } from "@/lib/query-client";
import { getMyProject } from "@/lib/services/projects.service";
import { getMilestonesByProject } from "@/lib/services/milestones.service";
import { getMyInvoices, getFinancialSummary } from "@/lib/services/invoices.service";
import { getMyNotifications } from "@/lib/services/notifications.service";
import { DashboardClient } from "./DashboardClient";

// Prefetches the dashboard's data server-side (colocated with Supabase,
// instead of paying the round-trip from the visitor's browser) and hands it
// to DashboardClient already warm via HydrationBoundary — the client-side
// hooks in DashboardClient resolve from this cache instantly on first paint
// instead of firing their own fetch and rendering skeletons first.
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const queryClient = getServerQueryClient();

  if (user) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["project", "mine", user.id],
        queryFn:  () => getMyProject(supabase, user.id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["invoices", user.id],
        queryFn:  () => getMyInvoices(supabase, user.id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["financial-summary", user.id],
        queryFn:  () => getFinancialSummary(supabase, user.id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["notifications", user.id],
        queryFn:  () => getMyNotifications(supabase, user.id),
      }),
    ]);

    // Milestones need the project's id, so this can only start once the
    // project prefetch above has resolved.
    const project = queryClient.getQueryData<Awaited<ReturnType<typeof getMyProject>>>(["project", "mine", user.id]);
    if (project) {
      await queryClient.prefetchQuery({
        queryKey: ["milestones", project.id],
        queryFn:  () => getMilestonesByProject(supabase, project.id),
      });
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
