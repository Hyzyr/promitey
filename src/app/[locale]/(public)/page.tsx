import { HeroSection } from "@/ui/public/landing/sections/hero-section";
import { BenefitsSection } from "@/ui/public/landing/sections/benefits/benefits-section";
import { ConnectGuide } from "@/ui/public/landing/sections/connect-guide";
import { TestimonialsSection } from "@/ui/public/landing/sections/testimonials-section";
import { PricingSection } from "@/ui/public/landing/sections/pricing-section";
import { FaqSection } from "@/ui/public/landing/sections/faq-section";

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
