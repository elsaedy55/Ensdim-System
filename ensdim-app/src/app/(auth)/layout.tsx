import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { loadMessages } from "@/lib/i18n/messages";
import ensdimLogo from "../../../public/brand/ensdim-logo.png";

// Namespace this route group's pages need, on top of the global set
// (common, notifications) already loaded by the root layout — see
// src/lib/i18n/messages.ts.
const AUTH_NAMESPACES = ["auth"] as const;

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const [globalMessages, extraMessages] = await Promise.all([
    getMessages(),
    loadMessages(locale, AUTH_NAMESPACES),
  ]);
  const messages = { ...globalMessages, ...extraMessages };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-(--bg-base) px-4 py-12">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src={ensdimLogo}
            alt="Ensdim"
            priority
            className="h-8 w-auto object-contain auth-logo"
          />
        </div>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
