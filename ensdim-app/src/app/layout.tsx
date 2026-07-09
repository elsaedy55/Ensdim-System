import type { Metadata, Viewport } from "next";
import { Barlow, Readex_Pro, Alexandria, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { localeDir } from "@/i18n/common";
import { QueryProvider } from "@/components/common/QueryProvider";
import { AppToaster } from "@/components/ui/toast";
import { OfflineBanner } from "@/components/common/OfflineBanner";
import { UploadStatusWidget } from "@/components/common/UploadStatusWidget";
import { AuthInitializer } from "@/components/common/AuthInitializer";
import "./globals.css";

// Matches the marketing site's identity: Barlow for headings, Readex Pro for
// body copy (both directions), Alexandria for Arabic headings.
const barlow     = Barlow({ variable: "--font-barlow", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });
const readexPro  = Readex_Pro({ variable: "--font-readex", subsets: ["latin", "arabic"], display: "swap" });
const alexandria = Alexandria({ variable: "--font-alexandria", subsets: ["latin", "arabic"], display: "swap" });
const geistMono  = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Ensdim — Agency Operating System", template: "%s | Ensdim" },
  description: "The complete agency operating system — manage projects, clients, milestones, and deliverables in one place.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale   = await getLocale();
  const messages = await getMessages();
  const dir      = localeDir[locale as keyof typeof localeDir] ?? "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${barlow.variable} ${readexPro.variable} ${alexandria.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full antialiased" suppressHydrationWarning>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthInitializer />
            <OfflineBanner />
            {children}
            <UploadStatusWidget />
            <AppToaster />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
