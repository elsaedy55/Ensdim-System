"use client";

// Dashboard data is now composed from individual hooks.
// See: useMyProject, useMilestones, useMyInvoices, useFinancialSummary, useNotifications
// This file is kept for backward compatibility during migration.

export { useMyProject as useDashboard } from "./useProject";
