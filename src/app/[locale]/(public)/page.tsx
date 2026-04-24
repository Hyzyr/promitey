import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { ConnectGuide } from "@/components/landing/connect-guide";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <ConnectGuide />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </main>
  );
}
