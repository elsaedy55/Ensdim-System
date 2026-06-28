"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ClientSidebar } from "./client-sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { localeDir, type Locale } from "@/i18n/common";

interface MobileSidebarTriggerProps {
  variant: "client" | "admin";
  user?: { name: string; email: string; avatar?: string; role?: string };
  workspace?: { name: string; logo?: string };
  notificationCount?: number;
  onLogout?: () => void;
}

export function MobileSidebarTrigger({
  variant,
  user,
  workspace,
  notificationCount = 0,
  onLogout,
}: MobileSidebarTriggerProps) {
  const t      = useTranslations("common.user");
  const locale = useLocale() as Locale;
  const side   = localeDir[locale] === "rtl" ? "right" : "left";

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="flex md:hidden"
        onClick={() => setOpen(true)}
        aria-label={t("navigationMenu")}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={side} className="p-0 w-60 bg-(--sidebar-bg)">
          <VisuallyHidden>
            <SheetTitle>{t("navigation")}</SheetTitle>
          </VisuallyHidden>
          {variant === "client" ? (
            <ClientSidebar
              user={user}
              notificationCount={notificationCount}
              onLogout={() => { setOpen(false); onLogout?.(); }}
              onNavigate={() => setOpen(false)}
              forceExpanded
            />
          ) : (
            <AdminSidebar
              user={user}
              workspace={workspace}
              notificationCount={notificationCount}
              onLogout={() => { setOpen(false); onLogout?.(); }}
              onNavigate={() => setOpen(false)}
              forceExpanded
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
