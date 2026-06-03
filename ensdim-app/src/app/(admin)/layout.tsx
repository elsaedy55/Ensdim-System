export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/common/Sidebar/admin-sidebar";
import { Header } from "@/components/common/Header/header";
import { MobileSidebarTrigger } from "@/components/common/Sidebar/sidebar-mobile-trigger";
import { AdminBottomNav } from "@/components/common/BottomNav";
import { ROUTES } from "@/constants/routes";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [t, supabase] = await Promise.all([
    getTranslations("admin.overview.actions"),
    createClient(),
  ]);

  const { data: { user } } = await supabase.auth.getUser();

  const [profileResult, workspaceResult, notifResult] = await Promise.all([
    user
      ? supabase.from("profiles").select("name, role, avatar_url, workspace_id").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
    user
      ? supabase.from("profiles").select("workspace_id").eq("id", user.id).maybeSingle().then(async (res) => {
          if (!res.data?.workspace_id) return { data: null };
          return supabase.from("workspaces").select("name").eq("id", res.data.workspace_id).maybeSingle();
        })
      : Promise.resolve({ data: null }),
    user
      ? supabase.from("notifications").select("*", { count: "exact", head: true })
          .eq("user_id", user.id).eq("is_read", false)
      : Promise.resolve({ count: 0 }),
  ]);

  const profile   = profileResult.data;
  const workspace = workspaceResult.data;

  const adminUser = user && profile
    ? { name: profile.name, email: user.email ?? "", role: profile.role, avatar: profile.avatar_url ?? undefined }
    : undefined;

  const adminWorkspace = workspace ? { name: (workspace as any).name } : undefined;

  const notificationCount = (notifResult as any).count ?? 0;

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-base)">
      <AdminSidebar user={adminUser} workspace={adminWorkspace} notificationCount={notificationCount} />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header
          user={adminUser}
          unreadCount={notificationCount}
          settingsRoute={ROUTES.ADMIN.SETTINGS}
          actionsData={[
            { href: ROUTES.ADMIN.CLIENTS,     label: t("addClient"),  icon: "UserPlus", variant: "secondary", size: "sm" },
            { href: ROUTES.ADMIN.PROJECT_NEW, label: t("newProject"), icon: "Plus",     size: "sm" },
          ]}
          actions={
            <MobileSidebarTrigger
              variant="admin"
              user={adminUser}
              workspace={adminWorkspace}
              notificationCount={notificationCount}
            />
          }
        />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            {children}
          </div>
        </main>
      </div>

      <AdminBottomNav notificationCount={notificationCount} />
    </div>
  );
}
