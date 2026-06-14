import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { localeDir } from "@/i18n/common";
import { QueryProvider } from "@/components/common/QueryProvider";
import { AppToaster } from "@/components/ui/toast";
import { OfflineBanner } from "@/components/common/OfflineBanner";
import { UploadStatusWidget } from "@/components/common/UploadStatusWidget";
import { AuthInitializer } from "@/components/common/AuthInitializer";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const cairo     = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], display: "swap" });

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
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AuthInitializer />
              <OfflineBanner />
              {children}
              <UploadStatusWidget />
              <AppToaster />
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
