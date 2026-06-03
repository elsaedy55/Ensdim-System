/* ============================================
   ENSDIM — CORE TYPE DEFINITIONS
   ============================================ */

// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = "admin" | "project_manager" | "developer" | "designer" | "accountant" | "sales" | "content_editor" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  workspaceId: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  workspaceId: string | null;
  isAuthenticated: boolean;
}

// ─── Workspace ───────────────────────────────────────────────────────────────

export interface Workspace {
  id: string;
  name: string;
  logo?: string;
  industry?: string;
  timezone: string;
  currency: string;
  createdAt: string;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus = "planning" | "ui_ux" | "development" | "review" | "testing" | "delivery" | "maintenance" | "completed" | "on_hold";
export type ProjectHealth = "on_track" | "at_risk" | "delayed";

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientId: string;
  clientName: string;
  status: ProjectStatus;
  health: ProjectHealth;
  progress: number;
  startDate: string;
  targetDelivery: string;
  pmId?: string;
  pmName?: string;
  teamIds: string[];
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Milestones ──────────────────────────────────────────────────────────────

export type MilestoneStatus = "pending" | "in_progress" | "review" | "approved" | "completed" | "delayed";

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  status: MilestoneStatus;
  progress: number;
  dueDate: string;
  startDate?: string;
  completedAt?: string;
  order: number;
  deliverables?: FileItem[];
  createdAt: string;
  updatedAt: string;
}

// ─── Revisions ───────────────────────────────────────────────────────────────

export type RevisionCategory = "bug" | "revision" | "feature" | "question";
export type RevisionStatus = "open" | "in_review" | "in_progress" | "done" | "rejected";
export type RevisionPriority = "high" | "medium" | "low";

export interface Revision {
  id: string;
  projectId: string;
  milestoneId?: string;
  milestoneName?: string;
  title: string;
  description: string;
  category: RevisionCategory;
  status: RevisionStatus;
  priority: RevisionPriority;
  submittedById: string;
  submittedByName: string;
  assignedToId?: string;
  assignedToName?: string;
  attachments?: FileItem[];
  teamResponse?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Files ───────────────────────────────────────────────────────────────────

export type FileCategory = "design" | "development" | "documentation" | "credentials" | "final_delivery" | "general";

export interface FileItem {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  category: FileCategory;
  projectId?: string;
  milestoneId?: string;
  uploadedById: string;
  uploadedByName: string;
  version?: number;
  createdAt: string;
}

// ─── Invoices ────────────────────────────────────────────────────────────────

export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discount: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  notes?: string;
  paymentProofUrl?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Notifications ───────────────────────────────────────────────────────────

export type NotificationType = "milestone_review" | "invoice_sent" | "file_uploaded" | "revision_submitted" | "revision_resolved" | "approval_complete" | "payment_received" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  link?: string;
  userId: string;
  createdAt: string;
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export type TaskStatus = "todo" | "in_progress" | "review" | "done" | "blocked";
export type TaskType = "bug" | "feature" | "design" | "review" | "other";

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: RevisionPriority;
  projectId?: string;
  projectName?: string;
  milestoneId?: string;
  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  dueDate?: string;
  attachments?: FileItem[];
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Clients / CRM ───────────────────────────────────────────────────────────

export type ClientStatus = "lead" | "interested" | "proposal_sent" | "negotiation" | "active" | "completed" | "lost";

export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  status: ClientStatus;
  notes?: string;
  activeProjectCount: number;
  totalPaid: number;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Team ────────────────────────────────────────────────────────────────────

export type InviteStatus = "pending" | "accepted" | "expired";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roleId: string;
  roleName: string;
  inviteStatus: InviteStatus;
  activeProjectCount: number;
  workspaceId: string;
  joinedAt?: string;
  createdAt: string;
}

// ─── Roles & Permissions ─────────────────────────────────────────────────────

export type PermissionAction = "view" | "create" | "edit" | "delete" | "approve" | "export" | "manage";
export type PermissionModule = "dashboard" | "projects" | "milestones" | "revisions" | "files" | "contracts" | "invoices" | "financial" | "team" | "analytics" | "clients" | "roles" | "settings";

export type PermissionMatrix = Record<PermissionModule, Partial<Record<PermissionAction, boolean>>>;

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  permissions: PermissionMatrix;
  userCount: number;
  workspaceId: string;
  createdAt: string;
}

// ─── Activity Logs ───────────────────────────────────────────────────────────

export type ActivityType = "project" | "milestone" | "revision" | "file" | "invoice" | "team" | "system";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  entityId?: string;
  entityType?: string;
  projectId?: string;
  createdAt: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface ClientDashboard {
  project: Project;
  pendingMilestones: Milestone[];
  pendingInvoices: Invoice[];
  recentActivity: ActivityItem[];
  financialSummary: {
    total: number;
    paid: number;
    remaining: number;
    nextDueDate?: string;
    nextDueAmount?: number;
  };
}

export interface AdminDashboard {
  kpis: {
    activeProjects: number;
    activeClients: number;
    monthlyRevenue: number;
    delayedProjects: number;
    newLeads: number;
  };
  projectsHealth: Array<Pick<Project, "id" | "name" | "clientName" | "status" | "health" | "progress" | "targetDelivery"> & { pmName?: string }>;
  recentActivity: ActivityItem[];
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
}
