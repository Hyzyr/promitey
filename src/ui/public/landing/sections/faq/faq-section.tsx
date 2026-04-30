"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FaqItemComponent } from "./faq-item";

export const FaqSection = () => {
  const t = useTranslations('landing.faq');
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  // Get the number of FAQ items from translations
  const faqCount = 6; // We know there are 6 items from the JSON

  return (
    <section id="faq" className="w-full pb-30 pt-22.5">
      <Container className="flex flex-col gap-15 items-center">
        {/* Heading */}
        <p className="font-manrope font-medium text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600 text-center w-full">
          {t('title')}
        </p>

        {/* Accordion list */}
        <div className="flex w-252.5 flex-col gap-6">
          {Array.from({ length: faqCount }).map((_, i) => (
            <FaqItemComponent
              key={i}
              question={t(`items.${i}.q`)}
              answer={t(`items.${i}.a`)}
              isOpen={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
