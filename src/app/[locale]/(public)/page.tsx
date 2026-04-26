import { HeroSection } from "@/ui/public/sections/hero-section";
import { BenefitsSection } from "@/ui/public/sections/benefits-section";
import { ConnectGuide } from "@/ui/public/sections/connect-guide";
import { TestimonialsSection } from "@/ui/public/sections/testimonials-section";
import { PricingSection } from "@/ui/public/sections/pricing-section";
import { FaqSection } from "@/ui/public/sections/faq-section";

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
