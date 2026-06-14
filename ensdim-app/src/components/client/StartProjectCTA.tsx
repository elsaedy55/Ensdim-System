"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { useCreateClientInquiry } from "@/hooks/useInquiries";

export function StartProjectCTA() {
  const t = useTranslations("dashboard.startProjectCta");

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const createInquiry = useCreateClientInquiry();

  const handleSubmit = () => {
    createInquiry.mutate(message, {
      onSuccess: () => {
        toast.success(t("success"));
        setOpen(false);
        setMessage("");
      },
      onError: () => {
        toast.error(t("error"));
      },
    });
  };

  return (
    <div className="surface p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start rtl:sm:text-right">
      <div>
        <h3 className="text-base font-semibold text-(--text-primary)">{t("title")}</h3>
        <p className="mt-1 text-sm text-(--text-muted)">{t("description")}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={() => setOpen(true)} className="shrink-0 gap-2">
          <MessageSquarePlus className="h-4 w-4" />
          {t("button")}
        </Button>

        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>{t("dialogTitle")}</DialogTitle>
            <DialogDescription>{t("dialogDescription")}</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("placeholder")}
              rows={4}
            />
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">{t("cancel")}</Button>
            </DialogClose>
            <Button onClick={handleSubmit} loading={createInquiry.isPending}>
              {t("submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
