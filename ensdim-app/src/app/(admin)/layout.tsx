// No `force-dynamic` — layout renders once on first load and is preserved
// across client-side navigation. Middleware handles session refresh on every request.

import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/common/Sidebar/admin-sidebar";
import { Header } from "@/components/common/Header/header";
import { MobileSidebarTrigger } from "@/components/common/Sidebar/sidebar-mobile-trigger";
import { AdminBottomNav } from "@/components/common/BottomNav";
import { ROUTES } from "@/constants/routes";

async function getLayoutData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null, workspace: null, notificationCount: 0 };

  // workspace_id only comes from the profile row, so it must resolve first —
  // but the workspace and notifications queries that depend on it (or don't)
  // now run together instead of one nesting inside the other.
  const profileRes = await supabase
    .from("profiles")
    .select("name, role, avatar_url, workspace_id")
    .eq("id", user.id)
    .maybeSingle();

  const [workspaceRes, notifRes] = await Promise.all([
    profileRes.data?.workspace_id
      ? supabase.from("workspaces").select("name").eq("id", profileRes.data.workspace_id).maybeSingle()
      : Promise.resolve({ data: null }),
    supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false),
  ]);

  return {
    user,
    profile:           profileRes.data,
    workspace:         workspaceRes.data,
    notificationCount: (notifRes as any).count ?? 0,
  };
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [t, { user, profile, workspace, notificationCount }] = await Promise.all([
    getTranslations("admin.overview.actions"),
    getLayoutData(),
  ]);

  const adminUser = user && profile
    ? { name: profile.name, email: user.email ?? "", role: profile.role, avatar: profile.avatar_url ?? undefined }
    : undefined;

  const adminWorkspace = workspace ? { name: (workspace as any).name } : undefined;

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-base)">
      <AdminSidebar
        user={adminUser}
        workspace={adminWorkspace}
        notificationCount={notificationCount}
      />

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
