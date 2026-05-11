import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSiteUrl } from '@/lib/site-url';
import {
  isLegalPageSlug,
  LEGAL_PAGE_SLUGS,
  SEO_ASSETS,
  type LegalPageSlug,
} from '@/lib/constants';
import { routing } from '@/i18n/routing';
import { LegalPage, type LegalContentSection } from '@/ui/public/legal/legal-page';

interface LegalRouteProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LEGAL_PAGE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: LegalRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const legalSlug = assertLegalSlug(slug);
  const t = await getTranslations({ locale, namespace: 'legal' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tHomeMeta = await getTranslations({ locale, namespace: 'meta.home' });
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/${locale}/legal/${legalSlug}`;
  const ogImageUrl = `${baseUrl}${SEO_ASSETS.openGraphImage}`;
  const title = t(`pages.${legalSlug}.title`);
  const description = t(`pages.${legalSlug}.description`);

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: pageUrl,
      siteName: tCommon('appName'),
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: SEO_ASSETS.openGraphImageWidth,
          height: SEO_ASSETS.openGraphImageHeight,
          alt: tHomeMeta('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        ru: `${baseUrl}/ru/legal/${legalSlug}`,
        en: `${baseUrl}/en/legal/${legalSlug}`,
        'x-default': `${baseUrl}/ru/legal/${legalSlug}`,
      },
    },
  };
}

export default async function LegalRoutePage({ params }: LegalRouteProps) {
  const { locale, slug } = await params;
  const legalSlug = assertLegalSlug(slug);
  const t = await getTranslations({ locale, namespace: 'legal' });
  const sections = t.raw(`pages.${legalSlug}.sections`) as LegalContentSection[];

  return (
    <LegalPage
      eyebrow={t('eyebrow')}
      title={t(`pages.${legalSlug}.title`)}
      description={t(`pages.${legalSlug}.description`)}
      updatedLabel={t('updatedLabel')}
      updatedValue={t('updatedValue')}
      sections={sections}
    />
  );
}

function assertLegalSlug(slug: string): LegalPageSlug {
  if (!isLegalPageSlug(slug)) notFound();
  return slug;
}
