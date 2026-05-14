import type { Metadata } from "next";
import { Inter, Manrope, Montserrat } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteMetadataBase } from '@/lib/site-url';
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tHomeMeta = await getTranslations({ locale, namespace: 'meta.home' });
  const appName = tCommon('appName');

  return {
    metadataBase: getSiteMetadataBase(),
    title: {
      default: appName,
      template: `%s | ${appName}`,
    },
    description: tHomeMeta('description'),
    applicationName: appName,
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <div className="relative z-10" id="popups" />
      </body>
    </html>
  );
}
