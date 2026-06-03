"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ChevronLeft, Download, CheckCircle2, Eye } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAdminSendInvoice, useAdminMarkInvoicePaid } from "@/hooks/useAdmin";
import { useInvoice } from "@/hooks/useInvoices";

export default function AdminInvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t      = useTranslations("admin.financial");
  const ts     = useTranslations("admin.financial.invoiceDetail");

  const { data: invoice, isLoading } = useInvoice(id);
  const sendInvoice  = useAdminSendInvoice();
  const markPaid     = useAdminMarkInvoicePaid();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-sm text-(--text-muted)">Invoice not found.</p>
        <Link href={ROUTES.ADMIN.INVOICES} className="mt-4 text-sm text-(--accent) hover:underline">Back</Link>
      </div>
    );
  }

  const canSend    = invoice.status === "draft";
  const canMarkPaid = invoice.status === "sent" || invoice.status === "viewed";
  const hasProof   = !!invoice.payment_proof_url;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href={ROUTES.ADMIN.INVOICES} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> Back to Invoices
      </Link>

      {/* Header */}
      <div className="surface p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-(--text-muted) mb-0.5">{ts("title")}</p>
            <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight">{invoice.invoice_number}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-(--text-muted) flex-wrap">
              <span>Issued: {formatDate(invoice.issue_date, { month: "short", day: "numeric", year: "numeric" })}</span>
              <span>·</span>
              <span>Due: {formatDate(invoice.due_date, { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={invoice.status} size="md" />
            <Button variant="secondary" size="sm" asChild>
              <a href="#" download><Download className="h-4 w-4" /> {ts("download")}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Line items */}
      <div className="surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--border) bg-(--bg-muted)/50">
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wider text-(--text-muted)">Description</th>
              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-(--text-muted) w-16">Qty</th>
              <th className="px-5 py-3 text-end text-xs font-semibold uppercase tracking-wider text-(--text-muted) w-28">Unit Price</th>
              <th className="px-5 py-3 text-end text-xs font-semibold uppercase tracking-wider text-(--text-muted) w-28">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border)">
            {invoice.line_items.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-4 text-(--text-primary)">{item.description}</td>
                <td className="px-5 py-4 text-center text-(--text-secondary)">{item.quantity}</td>
                <td className="px-5 py-4 text-end text-(--text-secondary)">{formatCurrency(item.unit_price, invoice.currency)}</td>
                <td className="px-5 py-4 text-end font-medium text-(--text-primary)">{formatCurrency(item.total, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-(--border)">
            <tr><td colSpan={3} className="px-5 py-3 text-end text-sm text-(--text-muted)">Subtotal</td><td className="px-5 py-3 text-end font-medium text-(--text-primary)">{formatCurrency(invoice.subtotal, invoice.currency)}</td></tr>
            {invoice.vat_rate > 0 && <tr><td colSpan={3} className="px-5 py-2 text-end text-sm text-(--text-muted)">VAT ({invoice.vat_rate}%)</td><td className="px-5 py-2 text-end font-medium text-(--text-primary)">{formatCurrency(invoice.vat_amount, invoice.currency)}</td></tr>}
            <tr className="border-t border-(--border) bg-(--bg-muted)/30">
              <td colSpan={3} className="px-5 py-4 text-end text-sm font-semibold text-(--text-primary)">Total</td>
              <td className="px-5 py-4 text-end text-lg font-bold text-(--text-primary)">{formatCurrency(invoice.total, invoice.currency)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment proof */}
      {hasProof && (
        <div className="surface p-5 border-(--warning-muted) bg-(--warning-subtle)/20 space-y-4">
          <p className="text-sm font-semibold text-(--text-primary)">{ts("paymentProof.title")}</p>
          <Button size="sm" variant="secondary" asChild>
            <a href={invoice.payment_proof_url ?? "#"} target="_blank" rel="noopener noreferrer">
              <Eye className="h-4 w-4" /> {ts("paymentProof.view")}
            </a>
          </Button>
          {canMarkPaid && (
            <div className="flex items-center gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm">
                    <CheckCircle2 className="h-4 w-4" /> {ts("paymentProof.markPaid")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{ts("markPaidConfirm.title")}</AlertDialogTitle>
                    <AlertDialogDescription>{ts("markPaidConfirm.body")}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() =>
                      markPaid.mutate({ id, projectId: invoice.project_id }, {
                        onSuccess: () => toast.success(t("invoices.paidSuccess")),
                        onError:   (e) => toast.error(e.message),
                      })
                    }>
                      {ts("markPaidConfirm.confirm")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end flex-wrap">
        {canSend && (
          <Button loading={sendInvoice.isPending} onClick={() =>
            sendInvoice.mutate({ id, projectId: invoice.project_id }, {
              onSuccess: () => toast.success(t("createInvoice.sentSuccess")),
              onError:   (e) => toast.error(e.message),
            })
          }>
            Send to Client
          </Button>
        )}
        {canMarkPaid && !hasProof && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">
                <CheckCircle2 className="h-4 w-4" /> Mark as Paid
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{ts("markPaidConfirm.title")}</AlertDialogTitle>
                <AlertDialogDescription>{ts("markPaidConfirm.body")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() =>
                  markPaid.mutate({ id, projectId: invoice.project_id }, {
                    onSuccess: () => toast.success(t("invoices.paidSuccess")),
                    onError:   (e) => toast.error(e.message),
                  })
                }>
                  {ts("markPaidConfirm.confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {invoice.status === "paid" && invoice.paid_at && (
          <div className="flex items-center gap-2 text-sm text-(--success)">
            <CheckCircle2 className="h-4 w-4" />
            Paid on {formatDate(invoice.paid_at, { month: "long", day: "numeric", year: "numeric" })}
          </div>
        )}
      </div>
    </div>
  );
}
