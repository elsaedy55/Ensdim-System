"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent } from "@supabase/supabase-js";

export function SessionExpiredModal() {
  const t = useTranslations("dialogs.sessionExpired");
  const [open, setOpen] = React.useState(false);
  const router    = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  // Listen for Supabase auth state — SIGNED_OUT = session expired
  React.useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === "SIGNED_OUT") {
        setOpen(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = () => {
    setOpen(false);
    clearAuth();
    router.push(ROUTES.LOGIN + "?expired=true");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-sm text-center"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--warning-subtle)">
            <svg className="h-6 w-6 text-(--warning)" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-(--text-primary)">{t("title")}</h2>
            <p className="mt-1 text-sm text-(--text-muted)">{t("description")}</p>
          </div>
          <Button className="w-full" onClick={handleSignIn}>{t("signIn")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
