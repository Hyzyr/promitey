import { LandingJsonLd } from '@/components/seo';
import { HeroSection } from '@/ui/public/landing/sections/hero-section';
import { BenefitsSection } from '@/ui/public/landing/sections/benefits/benefits-section';
import { ConnectGuide } from '@/ui/public/landing/sections/connect-guide';
import { TestimonialsSection } from '@/ui/public/landing/sections/testimonials/testimonials-section';
import { PricingSection } from '@/ui/public/landing/sections/pricing';
import { FaqSection } from '@/ui/public/landing/sections/faq';
import { getAccessToken } from '@/lib/session';

export default async function LandingPage() {
  const isAuthenticated = !!(await getAccessToken());

  return (
    <>
      <LandingJsonLd />
      <HeroSection />
      <BenefitsSection isAuthenticated={isAuthenticated} />
      <ConnectGuide />
      {/* <TestimonialsSection />  */}
      <PricingSection />
      <FaqSection />
    </>
  );
}
