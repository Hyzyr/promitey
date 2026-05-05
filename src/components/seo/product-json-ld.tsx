interface PricingOffer {
  name: string;
  price: string;
  url: string;
}

interface ProductJsonLdProps {
  offers: PricingOffer[];
}

export const ProductJsonLd = ({ offers }: ProductJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Prometey VPN Subscription',
    description:
      'High-speed VPN subscription with VLESS and OpenVPN protocols. Up to 10 simultaneous devices, free trial period.',
    brand: {
      '@type': 'Brand',
      name: 'Prometey VPN',
    },
    category: 'Software/VPN',
    offers: offers.map(({ name, price, url }) => ({
      '@type': 'Offer',
      name,
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
