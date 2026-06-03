import type { MilestoneStatus, ProjectStatus, RevisionStatus, InvoiceStatus, TaskStatus, ClientStatus } from "@/types";

export const MILESTONE_STATUS_LABELS: Record<MilestoneStatus, string> = {
  pending:     "Pending",
  in_progress: "In Progress",
  review:      "Ready for Review",
  approved:    "Approved",
  completed:   "Completed",
  delayed:     "Delayed",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning:    "Planning",
  ui_ux:       "UI/UX",
  development: "Development",
  review:      "Review",
  testing:     "Testing",
  delivery:    "Delivery",
  maintenance: "Maintenance",
  completed:   "Completed",
  on_hold:     "On Hold",
};

export const REVISION_STATUS_LABELS: Record<RevisionStatus, string> = {
  open:        "Open",
  in_review:   "In Review",
  in_progress: "In Progress",
  done:        "Done",
  rejected:    "Rejected",
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft:     "Draft",
  sent:      "Sent",
  viewed:    "Viewed",
  paid:      "Paid",
  overdue:   "Overdue",
  cancelled: "Cancelled",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo:        "Todo",
  in_progress: "In Progress",
  review:      "Review",
  done:        "Done",
  blocked:     "Blocked",
};

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  lead:          "Lead",
  interested:    "Interested",
  proposal_sent: "Proposal Sent",
  negotiation:   "Negotiation",
  active:        "Active Client",
  completed:     "Completed",
  lost:          "Lost",
};

export const REVISION_CATEGORY_LABELS = {
  bug:      "Bug",
  revision: "Revision",
  feature:  "Feature Request",
  question: "Question",
} as const;

export const PRIORITY_LABELS = {
  high:   "High",
  medium: "Medium",
  low:    "Low",
} as const;
