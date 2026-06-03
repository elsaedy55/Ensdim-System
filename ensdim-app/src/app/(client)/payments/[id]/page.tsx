"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { FileUploadZone, type UploadFile } from "@/components/ui/file-upload-zone";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { ChevronLeft, Download, CheckCircle2, Upload } from "lucide-react";
import { useInvoice, useMarkInvoiceSeen, useUploadPaymentProof } from "@/hooks/useInvoices";

// ─── PaymentProofUploader ─────────────────────────────────────────

function PaymentProofUploader({ invoiceId }: { invoiceId: string }) {
  const t = useTranslations("payments.detail.proofUpload");
  const upload = useUploadPaymentProof();
  const [files, setFiles] = React.useState<UploadFile[]>([]);

  const handleUpload = async () => {
    const pendingFile = files.find((f) => f.status === "pending");
    if (!pendingFile) return;

    setFiles((prev) => prev.map((f) => f.id === pendingFile.id ? { ...f, status: "uploading" as const } : f));

    upload.mutate(
      { invoiceId, file: pendingFile.file },
      {
        onSuccess: () => {
          setFiles((prev) => prev.map((f) => f.id === pendingFile.id ? { ...f, status: "done" as const, progress: 100 } : f));
          toast.success(t("successMessage"));
        },
        onError: (err) => {
          setFiles((prev) => prev.map((f) => f.id === pendingFile.id ? { ...f, status: "error" as const } : f));
          toast.error(err.message);
        },
      }
    );
  };

  if (upload.isSuccess) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-(--success-muted) bg-(--success-subtle) px-4 py-3">
        <CheckCircle2 className="h-5 w-5 text-(--success) shrink-0" />
        <p className="text-sm text-(--success-foreground)">{t("alreadySubmitted")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FileUploadZone
        files={files}
        onFilesAdded={(newFiles) =>
          setFiles(newFiles.map((f) => ({ id: `${f.name}-${Date.now()}`, file: f, status: "pending" as const })))
        }
        onFileRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        maxSize={5 * 1024 * 1024}
        accept={["image/*", "application/pdf"]}
        maxFiles={1}
        disabled={upload.isPending}
      />
      <Button
        onClick={handleUpload}
        disabled={files.filter((f) => f.status === "pending").length === 0}
        loading={upload.isPending}
        leftIcon={<Upload className="h-4 w-4" />}
      >
        {upload.isPending ? t("uploading") : t("button")}
      </Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function InvoiceDetailPage() {
  const { id }  = useParams<{ id: string }>();
  const t       = useTranslations("payments.detail");
  const markSeen = useMarkInvoiceSeen();

  const { data: invoice, isLoading, error } = useInvoice(id);

  // Mark as "viewed" when client opens a "sent" invoice
  React.useEffect(() => {
    if (invoice?.status === "sent") markSeen.mutate(invoice.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice?.id, invoice?.status]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-sm text-(--text-muted)">Invoice not found.</p>
        <Link href={ROUTES.CLIENT.PAYMENTS} className="mt-4 text-sm text-(--accent) hover:underline">{t("backToPayments")}</Link>
      </div>
    );
  }

  const canUploadProof = invoice.status === "sent" || invoice.status === "viewed" || invoice.status === "overdue";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href={ROUTES.CLIENT.PAYMENTS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" />
        {t("backToPayments")}
      </Link>

      {/* Header */}
      <div className="surface p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-(--text-muted) mb-0.5">{t("invoice")}</p>
            <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight">{invoice.invoice_number}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-(--text-muted) flex-wrap">
              <span>{t("issueDate")}: {formatDate(invoice.issue_date, { month: "short", day: "numeric", year: "numeric" })}</span>
              <span>·</span>
              <span>{t("dueDate")}: {formatDate(invoice.due_date, { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={invoice.status} size="md" />
            <Button variant="secondary" size="sm" asChild>
              <a href="#" download><Download className="h-4 w-4" /> {t("downloadPdf")}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--border) bg-(--bg-muted)/50">
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wider text-(--text-muted)">{t("lineItems.description")}</th>
              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-(--text-muted) w-16">{t("lineItems.qty")}</th>
              <th className="px-5 py-3 text-end text-xs font-semibold uppercase tracking-wider text-(--text-muted) w-28">{t("lineItems.unitPrice")}</th>
              <th className="px-5 py-3 text-end text-xs font-semibold uppercase tracking-wider text-(--text-muted) w-28">{t("lineItems.total")}</th>
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
            <tr>
              <td colSpan={3} className="px-5 py-3 text-end text-sm text-(--text-muted)">{t("lineItems.subtotal")}</td>
              <td className="px-5 py-3 text-end font-medium text-(--text-primary)">{formatCurrency(invoice.subtotal, invoice.currency)}</td>
            </tr>
            {invoice.vat_rate > 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-2 text-end text-sm text-(--text-muted)">{t("lineItems.vat", { rate: invoice.vat_rate })}</td>
                <td className="px-5 py-2 text-end font-medium text-(--text-primary)">{formatCurrency(invoice.vat_amount, invoice.currency)}</td>
              </tr>
            )}
            <tr className="border-t border-(--border) bg-(--bg-muted)/30">
              <td colSpan={3} className="px-5 py-4 text-end text-sm font-semibold text-(--text-primary)">{t("lineItems.grandTotal")}</td>
              <td className="px-5 py-4 text-end text-lg font-bold text-(--text-primary)">{formatCurrency(invoice.total, invoice.currency)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Instructions */}
      {canUploadProof && (
        <div className="surface p-6">
          <h2 className="text-sm font-semibold text-(--text-primary) mb-2">{t("paymentInstructions.title")}</h2>
          <p className="text-sm text-(--text-muted) mb-3">{t("paymentInstructions.body")}</p>
        </div>
      )}

      {/* Upload Proof */}
      {canUploadProof && !invoice.payment_proof_url && (
        <div className="surface p-6 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-(--text-primary) mb-0.5">{t("proofUpload.title")}</h2>
            <p className="text-sm text-(--text-muted)">{t("proofUpload.description")}</p>
            <p className="text-xs text-(--text-muted) mt-0.5">{t("proofUpload.accepted")}</p>
          </div>
          <PaymentProofUploader invoiceId={invoice.id} />
        </div>
      )}

      {/* Proof already submitted */}
      {invoice.payment_proof_url && !invoice.paid_at && (
        <div className="flex items-center gap-2 rounded-xl border border-(--accent-muted) bg-(--accent-subtle) px-4 py-3">
          <CheckCircle2 className="h-5 w-5 text-(--accent) shrink-0" />
          <p className="text-sm text-(--accent)">{t("status.proofSubmitted")}</p>
        </div>
      )}

      {/* Paid */}
      {invoice.status === "paid" && invoice.paid_at && (
        <div className="flex items-center gap-2 rounded-xl border border-(--success-muted) bg-(--success-subtle) px-4 py-3">
          <CheckCircle2 className="h-5 w-5 text-(--success) shrink-0" />
          <p className="text-sm text-(--success-foreground)">Paid on {formatDate(invoice.paid_at, { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      )}
    </div>
  );
}
