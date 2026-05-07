import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SiteJsonLd } from '@/components/seo';
import { getSiteUrl } from '@/lib/site-url';
import { getAccessToken } from '@/lib/session';
import { LandingHeader } from "@/ui/public/layouts/public-header";
import { LandingFooter } from "@/ui/public/layouts/public-footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    title: { absolute: t('title') },
    description: t('description'),
    keywords: t('keywords').split(',').map((k) => k.trim()),
    openGraph: {
      type: 'website',
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: pageUrl,
      siteName: 'Prometey VPN',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: 'Prometey VPN',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${baseUrl}/opengraph-image.png`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/ru`,
      },
    },
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();
  const isAuthenticated = !!token;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-0 text-neutral-900 antialiased">
      <SiteJsonLd />
      <LandingHeader isAuthenticated={isAuthenticated} />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
