import type { Locale } from "@/i18n/common";

export type Namespace =
  | "common" | "notifications" | "auth" | "dashboard" | "milestones"
  | "revisions" | "files" | "payments" | "settings" | "admin" | "tables" | "dialogs";

type Messages = Record<string, unknown>;

const loaders: Record<Namespace, (locale: Locale) => Promise<{ default: Messages }>> = {
  common:        (l) => import(`@/messages/${l}/common.json`),
  notifications: (l) => import(`@/messages/${l}/notifications.json`),
  auth:          (l) => import(`@/messages/${l}/auth.json`),
  dashboard:     (l) => import(`@/messages/${l}/dashboard.json`),
  milestones:    (l) => import(`@/messages/${l}/milestones.json`),
  revisions:     (l) => import(`@/messages/${l}/revisions.json`),
  files:         (l) => import(`@/messages/${l}/files.json`),
  payments:      (l) => import(`@/messages/${l}/payments.json`),
  settings:      (l) => import(`@/messages/${l}/settings.json`),
  admin:         (l) => import(`@/messages/${l}/admin.json`),
  tables:        (l) => import(`@/messages/${l}/tables.json`),
  dialogs:       (l) => import(`@/messages/${l}/dialogs.json`),
};

// Namespaces needed on every route (global chrome — Header, Sidebar,
// BottomNav — plus the standalone notifications pages under both
// route groups). Loaded once by the root layout.
export const GLOBAL_NAMESPACES = ["common", "notifications"] as const satisfies readonly Namespace[];

// Loads just the requested namespaces for `locale`, keyed by namespace name
// (the shape NextIntlClientProvider expects for `messages`). Route-group
// layouts call this for the namespaces their own pages use and merge the
// result over GLOBAL_NAMESPACES, so a request never pays to parse and ship
// every namespace (e.g. the ~35KB admin.json) regardless of which page is
// actually being rendered.
//
// If a page reports a missing translation key after adding a new
// useTranslations() namespace, add that namespace to its route group's
// list here first — that's almost always the cause.
//
// `locale` is typed as `string` (not `Locale`) because it's meant to be fed
// straight from next-intl's own `getLocale()`, which isn't aware of this
// app's locale union — the value is already validated against `locales` in
// src/i18n/request.ts before anything reaches here.
export async function loadMessages(locale: string, namespaces: readonly Namespace[]): Promise<Messages> {
  const entries = await Promise.all(
    namespaces.map(async (ns) => [ns, (await loaders[ns](locale as Locale)).default] as const),
  );
  return Object.fromEntries(entries);
}
