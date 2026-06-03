"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const t = useTranslations("common.offline");
  const [offline, setOffline] = React.useState(false);

  React.useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline  = () => setOffline(false);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online",  handleOnline);
    setOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online",  handleOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-center gap-2 bg-(--warning) px-4 py-2 text-sm font-medium text-white shadow-md">
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>{t("banner")}</span>
    </div>
  );
}
