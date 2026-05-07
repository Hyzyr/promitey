import { getSiteUrl } from '@/lib/site-url';

interface SiteJsonLdProps {
  sameAs?: string[];
}

export const SiteJsonLd = ({ sameAs = [] }: SiteJsonLdProps) => {
  const baseUrl = getSiteUrl();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prometey VPN',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prometey VPN',
    url: baseUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
};
