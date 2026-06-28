/**
 * Invoice "overdue" is never persisted as a status transition (no cron job
 * flips it in the DB), so it must be computed from due_date at read time —
 * checking the raw `status` column for "overdue" will always be empty.
 */
export function isInvoiceOverdue(invoice: { status: string; due_date: string }): boolean {
  return (
    (invoice.status === "sent" || invoice.status === "viewed") &&
    new Date(invoice.due_date) < new Date()
  );
}

/** Status to display/filter by, with the overdue check folded in. */
export function effectiveInvoiceStatus(invoice: { status: string; due_date: string }): string {
  return isInvoiceOverdue(invoice) ? "overdue" : invoice.status;
}
