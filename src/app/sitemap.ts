import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';
import { LEGAL_PAGE_SLUGS, SEO_ASSETS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();
  const ogImageUrl = `${baseUrl}${SEO_ASSETS.openGraphImage}`;
  const legalPages = LEGAL_PAGE_SLUGS.flatMap((slug) => [
    {
      url: `${baseUrl}/ru/legal/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal/${slug}`,
          en: `${baseUrl}/en/legal/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/legal/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.25,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal/${slug}`,
          en: `${baseUrl}/en/legal/${slug}`,
        },
      },
    },
  ]);

  return [
    {
      url: `${baseUrl}/ru`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [ogImageUrl],
      alternates: {
        languages: {
          ru: `${baseUrl}/ru`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [ogImageUrl],
      alternates: {
        languages: {
          ru: `${baseUrl}/ru`,
          en: `${baseUrl}/en`,
        },
      },
    },
    ...legalPages,
  ];
}
