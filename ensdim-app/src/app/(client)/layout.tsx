export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { ClientSidebar } from "@/components/common/Sidebar/client-sidebar";
import { Header } from "@/components/common/Header/header";
import { MobileSidebarTrigger } from "@/components/common/Sidebar/sidebar-mobile-trigger";
import { ClientBottomNav } from "@/components/common/BottomNav";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [profileResult, notifResult] = await Promise.all([
    user
      ? supabase.from("profiles").select("name, avatar_url").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
    user
      ? supabase.from("notifications").select("*", { count: "exact", head: true })
          .eq("user_id", user.id).eq("is_read", false)
      : Promise.resolve({ count: 0 }),
  ]);

  const profile = profileResult.data;

  const clientUser = user && profile
    ? { name: profile.name, email: user.email ?? "", avatar: profile.avatar_url ?? undefined }
    : undefined;

  const notificationCount = (notifResult as any).count ?? 0;

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-base)">
      <ClientSidebar user={clientUser} notificationCount={notificationCount} />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header
          user={clientUser}
          unreadCount={notificationCount}
          actions={
            <MobileSidebarTrigger
              variant="client"
              user={clientUser}
              notificationCount={notificationCount}
            />
          }
        />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {children}
          </div>
        </main>
      </div>

      <ClientBottomNav notificationCount={notificationCount} />
    </div>
  );
}
