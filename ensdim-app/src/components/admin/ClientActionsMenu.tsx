"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Ban, ShieldOff, Trash2 } from "lucide-react";
import { useAdminBanClient, useAdminUnbanClient } from "@/hooks/useAdmin";
import type { BanDuration } from "@/lib/services/admin.service";

interface ClientActionsMenuProps {
  clientId: string;
  clientName: string;
  isBanned: boolean;
  onDelete: (id: string, name: string) => void;
  triggerClassName?: string;
}

export function ClientActionsMenu({
  clientId, clientName, isBanned, onDelete, triggerClassName,
}: ClientActionsMenuProps) {
  const t      = useTranslations("admin.clients.actions");
  const tToast = useTranslations("admin.clients.success");
  const ban    = useAdminBanClient();
  const unban  = useAdminUnbanClient();

  const handleBan = (duration: BanDuration) => {
    ban.mutate(
      { clientId, duration },
      {
        onSuccess: () => toast.success(tToast("banned")),
        onError:   (e) => toast.error(e.message),
      },
    );
  };

  const handleUnban = () => {
    unban.mutate(clientId, {
      onSuccess: () => toast.success(tToast("unbanned")),
      onError:   (e) => toast.error(e.message),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className={triggerClassName ?? "h-7 w-7"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {isBanned ? (
          <DropdownMenuItem onClick={handleUnban} className="flex items-center gap-2">
            <ShieldOff className="h-4 w-4" /> {t("unban")}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              <Ban className="h-4 w-4" /> {t("ban")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleBan("1d")}>{t("banFor1d")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBan("7d")}>{t("banFor7d")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBan("30d")}>{t("banFor30d")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBan("permanent")} destructive>{t("banPermanent")}</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          destructive
          onClick={() => onDelete(clientId, clientName)}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" /> {t("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
