"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/lib/utils";
import { ChevronLeft, Plus, Trash2, Send, Save } from "lucide-react";
import { useAdminClients, useAdminClientProjects, useAdminCreateInvoice, useAdminProjects } from "@/hooks/useAdmin";

interface LineItem { id: string; description: string; quantity: number; unit_price: number }

export default function CreateInvoicePage() {
  const t      = useTranslations("admin.financial.createInvoice");
  const router = useRouter();
  const createInvoice = useAdminCreateInvoice();

  const { data: clients }  = useAdminClients();
  const { data: allProjects } = useAdminProjects();

  const [clientId,   setClientId]   = React.useState("");
  const [projectId,  setProjectId]  = React.useState("");
  const [issueDate,  setIssueDate]  = React.useState(new Date().toISOString().split("T")[0]);
  const [dueDate,    setDueDate]    = React.useState("");
  const [notes,      setNotes]      = React.useState("");
  const [vatRate,    setVatRate]    = React.useState(0);
  const [lineItems,  setLineItems]  = React.useState<LineItem[]>([
    { id: crypto.randomUUID(), description: "", quantity: 1, unit_price: 0 },
  ]);

  const clientProjects = (allProjects ?? []).filter((p) => p.client_id === clientId);

  const subtotal  = lineItems.reduce((s, i) => s + i.quantity * i.unit_price, 0);
  const vatAmount = subtotal * (vatRate / 100);
  const total     = subtotal + vatAmount;

  const nextInvoiceNumber = `INV-${String(Date.now()).slice(-4)}`;

  const addLine  = () => setLineItems((p) => [...p, { id: crypto.randomUUID(), description: "", quantity: 1, unit_price: 0 }]);
  const removeLine = (id: string) => setLineItems((p) => p.filter((i) => i.id !== id));
  const updateLine = (id: string, field: keyof LineItem, value: string | number) =>
    setLineItems((p) => p.map((i) => i.id === id ? { ...i, [field]: value } : i));

  const handleSubmit = async (send: boolean) => {
    if (!clientId || !projectId || !issueDate || !dueDate) {
      toast.error("Please fill in all required fields"); return;
    }
    if (lineItems.some((i) => !i.description)) {
      toast.error("All line items need a description"); return;
    }
    createInvoice.mutate(
      {
        project_id:     projectId,
        client_id:      clientId,
        invoice_number: nextInvoiceNumber,
        issue_date:     issueDate,
        due_date:       dueDate,
        currency:       "USD",
        notes:          notes || undefined,
        vat_rate:       vatRate,
        line_items:     lineItems.map((i) => ({ description: i.description, quantity: i.quantity, unit_price: i.unit_price })),
      },
      {
        onSuccess: (inv) => {
          toast.success(send ? t("sentSuccess") : t("success"));
          router.push(ROUTES.ADMIN.INVOICE(inv.id));
        },
        onError: (e) => toast.error(e.message),
      }
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href={ROUTES.ADMIN.INVOICES} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> Back to Invoices
      </Link>

      <PageHeader title={t("title")} />

      {/* Details */}
      <div className="surface p-6 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("sections.details")}</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label={t("fields.client")} required>
            <Select onValueChange={(v) => { setClientId(v); setProjectId(""); }}>
              <SelectTrigger><SelectValue placeholder={t("fields.clientPlaceholder")} /></SelectTrigger>
              <SelectContent>
                {(clients ?? []).map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label={t("fields.project")} required>
            <Select value={projectId} onValueChange={setProjectId} disabled={!clientId}>
              <SelectTrigger><SelectValue placeholder={t("fields.projectPlaceholder")} /></SelectTrigger>
              <SelectContent>
                {clientProjects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label={t("fields.invoiceNumber")} required htmlFor="inv-num">
            <Input id="inv-num" defaultValue={nextInvoiceNumber} readOnly className="opacity-70" />
          </FormField>
          <div className="col-span-1" />
          <FormField label={t("fields.issueDate")} required>
            <DatePicker value={issueDate} onChange={(d) => setIssueDate(d ?? "")} placeholder="Issue date" />
          </FormField>
          <FormField label={t("fields.dueDate")} required>
            <DatePicker value={dueDate} onChange={(d) => setDueDate(d ?? "")} placeholder="Due date" />
          </FormField>
        </div>
      </div>

      {/* Line items */}
      <div className="surface p-6 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("sections.lineItems")}</p>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted) pb-1">
            <span className="col-span-6">{t("lineItems.description")}</span>
            <span className="col-span-2 text-center">{t("lineItems.qty")}</span>
            <span className="col-span-2 text-end">{t("lineItems.unitPrice")}</span>
            <span className="col-span-1 text-end">{t("lineItems.total")}</span>
            <span className="col-span-1" />
          </div>

          {lineItems.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-6">
                <Input
                  placeholder={t("lineItems.description")}
                  value={item.description}
                  onChange={(e) => updateLine(item.id, "description", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number" min="1" value={item.quantity}
                  onChange={(e) => updateLine(item.id, "quantity", Number(e.target.value))}
                  className="text-center"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number" min="0" step="0.01" value={item.unit_price}
                  onChange={(e) => updateLine(item.id, "unit_price", Number(e.target.value))}
                />
              </div>
              <div className="col-span-1 text-end text-sm font-medium text-(--text-primary)">
                {formatCurrency(item.quantity * item.unit_price)}
              </div>
              <div className="col-span-1 flex justify-center">
                <Button size="icon-sm" variant="ghost" onClick={() => removeLine(item.id)} disabled={lineItems.length === 1}>
                  <Trash2 className="h-3.5 w-3.5 text-(--danger)" />
                </Button>
              </div>
            </div>
          ))}

          <Button size="sm" variant="secondary" onClick={addLine}>
            <Plus className="h-4 w-4" /> {t("lineItems.addItem")}
          </Button>
        </div>

        {/* Totals */}
        <div className="border-t border-(--border) pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-(--text-muted)">{t("totals.subtotal")}</span>
            <span className="font-medium text-(--text-primary)">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-(--text-muted)">{t("totals.vat", { rate: vatRate })}</span>
            <div className="flex items-center gap-2">
              <Input
                type="number" min="0" max="100" value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                className="w-16 text-center h-7 text-xs"
              />
              <span className="font-medium text-(--text-primary)">{formatCurrency(vatAmount)}</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-(--border) pt-2">
            <span className="font-semibold text-(--text-primary)">{t("totals.grandTotal")}</span>
            <span className="text-lg font-bold text-(--success)">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="surface p-6 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("sections.notes")}</p>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t("fields.notesPlaceholder")}
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 flex-wrap">
        <Button variant="secondary" onClick={() => handleSubmit(false)} loading={createInvoice.isPending}>
          <Save className="h-4 w-4" /> {t("actions.saveDraft")}
        </Button>
        <Button onClick={() => handleSubmit(true)} loading={createInvoice.isPending}>
          <Send className="h-4 w-4" /> {t("actions.send")}
        </Button>
      </div>
    </div>
  );
}
