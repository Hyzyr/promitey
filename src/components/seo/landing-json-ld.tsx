import { getLocale, getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/site-url';

import { FaqJsonLd } from './faq-json-ld';
import { ProductJsonLd } from './product-json-ld';

export const LandingJsonLd = async () => {
  const locale = await getLocale();
  const tFaq = await getTranslations({ locale, namespace: 'landing.faq' });
  const baseUrl = getSiteUrl();
  const registerUrl = `${baseUrl}/${locale}/register`;

  const rawItems = tFaq.raw('items') as Array<{ q: string; a: string }>;
  const faqItems = rawItems.map(({ q, a }) => ({ question: q, answer: a }));

  const pricingOffers = [
    { name: '1 Month', price: '3.00', url: registerUrl },
    { name: '3 Months', price: '5.00', url: registerUrl },
    { name: '6 Months', price: '8.00', url: registerUrl },
    { name: '12 Months', price: '12.00', url: registerUrl },
  ];

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <ProductJsonLd offers={pricingOffers} />
    </>
  );
};
