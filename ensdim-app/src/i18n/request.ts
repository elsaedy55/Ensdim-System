import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { loadMessages, GLOBAL_NAMESPACES } from '@/lib/i18n/messages';
import { defaultLocale, locales, type Locale } from './common';

// Only the namespaces needed on every route (see GLOBAL_NAMESPACES). Each
// route group's layout loads its own extra namespaces on top of this —
// see (client)/layout.tsx, (admin)/layout.tsx, (auth)/layout.tsx.
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: Locale = (locales as readonly string[]).includes(raw ?? '')
    ? (raw as Locale)
    : defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale, GLOBAL_NAMESPACES),
  };
});
