import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from './common';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: Locale = (locales as readonly string[]).includes(raw ?? '')
    ? (raw as Locale)
    : defaultLocale;

  const [
    common, auth, dashboard, milestones, revisions,
    files, admin, dialogs, tables, payments, notifications, settings,
  ] = await Promise.all([
    import(`../messages/${locale}/common.json`).then((m) => m.default),
    import(`../messages/${locale}/auth.json`).then((m) => m.default),
    import(`../messages/${locale}/dashboard.json`).then((m) => m.default),
    import(`../messages/${locale}/milestones.json`).then((m) => m.default),
    import(`../messages/${locale}/revisions.json`).then((m) => m.default),
    import(`../messages/${locale}/files.json`).then((m) => m.default),
    import(`../messages/${locale}/admin.json`).then((m) => m.default),
    import(`../messages/${locale}/dialogs.json`).then((m) => m.default),
    import(`../messages/${locale}/tables.json`).then((m) => m.default),
    import(`../messages/${locale}/payments.json`).then((m) => m.default),
    import(`../messages/${locale}/notifications.json`).then((m) => m.default),
    import(`../messages/${locale}/settings.json`).then((m) => m.default),
  ]);

  return {
    locale,
    messages: {
      common, auth, dashboard, milestones, revisions,
      files, admin, dialogs, tables, payments, notifications, settings,
    },
  };
});
