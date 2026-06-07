export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Onboarding
  ONBOARDING: "/onboarding",

  // Client Portal
  CLIENT: {
    DASHBOARD: "/dashboard",
    PROJECT: "/project",
    MILESTONES: "/milestones",
    MILESTONE: (id: string) => `/milestones/${id}`,
    REVISIONS: "/revisions",
    REVISION_NEW: "/revisions/new",
    REVISION: (id: string) => `/revisions/${id}`,
    FILES: "/files",
    PAYMENTS: "/payments",
    PAYMENT: (id: string) => `/payments/${id}`,
    NOTIFICATIONS: "/notifications",
    SETTINGS: "/settings",
  },

  // Admin Dashboard
  ADMIN: {
    OVERVIEW: "/admin",
    PROJECTS: "/admin/projects",
    PROJECT_NEW: "/admin/projects/new",
    PROJECT: (id: string) => `/admin/projects/${id}`,
    CLIENTS: "/admin/clients",
    CLIENT: (id: string) => `/admin/clients/${id}`,
    TASKS: "/admin/tasks",
    TEAM: "/admin/team",
    FINANCIAL: "/admin/financial",
    INVOICES: "/admin/financial/invoices",
    INVOICE_NEW: "/admin/financial/invoices/new",
    INVOICE: (id: string) => `/admin/financial/invoices/${id}`,
    NOTIFICATIONS: "/admin/notifications",
    ROLES: "/admin/roles",
    ROLE_NEW: "/admin/roles/new",
    ROLE: (id: string) => `/admin/roles/${id}`,
    SETTINGS: "/admin/settings",
    RESEARCH: "/admin/research",
    RESEARCH_NEW: "/admin/research/new",
    RESEARCH_EDIT: (id: string) => `/admin/research/${id}`,
    INQUIRIES: "/admin/inquiries",
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.VERIFY_EMAIL,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];

export const CLIENT_ROLE_ROUTES = Object.values(ROUTES.CLIENT).map((r) =>
  typeof r === "function" ? null : r
).filter(Boolean);
