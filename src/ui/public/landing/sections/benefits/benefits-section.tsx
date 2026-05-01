'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CustomerSupportCard,
  TryItFreeCard,
  YourInternetCard,
  ForYourFamilyCard,
  HighSpeedCard,
} from './benefits-cards';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/use-media';
import { useScrollActiveCard } from '@/hooks/use-scroll-active-card';

type CardId =
  | 'customer-support'
  | 'try-it-free'
  | 'your-internet'
  | 'for-your-family'
  | 'high-speed';

// DOM order — must match render order below.
const CARD_ORDER: CardId[] = [
  'your-internet',
  'customer-support',
  'try-it-free',
  'high-speed',
  'for-your-family',
];

export const BenefitsSection = () => {
  const t = useTranslations('landing.benefits');
  const tRules = useTranslations('landing.benefits.items.rules');

  // Use scroll-based activation when hover is unavailable (touch / mobile).
  const isTouch = useMedia('(hover: none), (pointer: coarse)');

  // Hover-driven (desktop)
  const [hoveredCard, setHoveredCard] = useState<CardId>('your-internet');
  const enter = (id: CardId) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setHoveredCard(id);
  };
  const handleGridLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setHoveredCard('your-internet');
  };

  // Scroll-driven (mobile / touch) — picks card whose center is closest to viewport center.
  // The hook queries for [data-benefit-card] inside containerRef; cards expose that attribute on their root.
  const { containerRef, activeIndex } = useScrollActiveCard<HTMLDivElement>(
    CARD_ORDER.length,
    { enabled: isTouch, fallbackIndex: 0 },
  );

  const activeCard: CardId = isTouch ? CARD_ORDER[activeIndex] : hoveredCard;

  return (
    <section
      id="benefits"
      className="w-full px-[20px] py-[60px] md:px-12 md:py-16 lg:py-20 xl:px-24 xl:py-22.5">
      <div className="flex flex-col gap-[36px] md:gap-7 lg:gap-8 xl:gap-9">
        {/* Title */}
        <p
          className="font-manrope text-neutral-600
                     font-bold xl:font-light
                     text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px]
                     leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]">
          {t('title')}
        </p>

        {/* Cards. Each Card root carries data-benefit-card (set inside BenefitCard). */}
        <div
          ref={containerRef}
          className="flex flex-col gap-[20px]
                     md:grid md:grid-cols-2 md:gap-5
                     xl:grid-cols-3 xl:grid-rows-2"
          onPointerLeave={handleGridLeave}>
          {/* DOM order MUST match CARD_ORDER above */}
          <div className="contents" onPointerEnter={enter('your-internet')}>
            <YourInternetCard isActive={activeCard === 'your-internet'} />
          </div>
          <div className="contents" onPointerEnter={enter('customer-support')}>
            <CustomerSupportCard isActive={activeCard === 'customer-support'} />
          </div>
          <div className="contents" onPointerEnter={enter('try-it-free')}>
            <TryItFreeCard isActive={activeCard === 'try-it-free'} />
          </div>
          <div className="contents" onPointerEnter={enter('high-speed')}>
            <HighSpeedCard isActive={activeCard === 'high-speed'} />
          </div>
          <div className="contents" onPointerEnter={enter('for-your-family')}>
            <ForYourFamilyCard isActive={activeCard === 'for-your-family'} />
          </div>
        </div>

        {/* Bottom CTA — mobile only per Figma (#ff6d41 orange) */}
        <div className="flex justify-center xl:hidden">
          <Button
            variant="orange"
            size="md"
            className="!px-[32px] !py-[16px] !text-[18px] !rounded-[16px] !text-neutral-900">
            {tRules('cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};
