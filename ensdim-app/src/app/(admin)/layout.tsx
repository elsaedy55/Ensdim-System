// No `force-dynamic` — layout renders once on first load and is preserved
// across client-side navigation. Middleware handles session refresh on every request.

import { NextIntlClientProvider, createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { loadMessages } from "@/lib/i18n/messages";
import { AdminSidebar } from "@/components/common/Sidebar/admin-sidebar";
import { Header } from "@/components/common/Header/header";
import { MobileSidebarTrigger } from "@/components/common/Sidebar/sidebar-mobile-trigger";
import { AdminBottomNav } from "@/components/common/BottomNav";
import { AuthHydrate } from "@/components/common/AuthHydrate";
import { ROUTES } from "@/constants/routes";

// Namespaces this route group's pages need, on top of the global set
// (common, notifications) already loaded by the root layout — see
// src/lib/i18n/messages.ts.
const ADMIN_NAMESPACES = ["admin", "tables", "dialogs", "settings", "files"] as const;

async function getLayoutData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null, workspace: null, notificationCount: 0 };

  // workspace_id only comes from the profile row, so it must resolve first —
  // but the workspace and notifications queries that depend on it (or don't)
  // now run together instead of one nesting inside the other.
  const profileRes = await supabase
    .from("profiles")
    .select("*")
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
  const locale = await getLocale();

  const [{ user, profile, workspace, notificationCount }, globalMessages, extraMessages] = await Promise.all([
    getLayoutData(),
    getMessages(),
    loadMessages(locale, ADMIN_NAMESPACES),
  ]);

  const messages = { ...globalMessages, ...extraMessages };
  // Server-side only — reads from `messages` directly instead of the
  // request-wide config (which no longer carries "admin"), since this
  // route group loads that namespace itself.
  const t = createTranslator({ locale, messages, namespace: "admin.overview.actions" });

  const adminUser = user && profile
    ? { name: profile.name, email: user.email ?? "", role: profile.role, avatar: profile.avatar_url ?? undefined }
    : undefined;

  const adminWorkspace = workspace ? { name: (workspace as any).name } : undefined;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex h-screen overflow-hidden bg-(--bg-base)">
        {user && profile && <AuthHydrate user={user} profile={profile} />}

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
    </NextIntlClientProvider>
  );
}
