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
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

type CardId =
  | 'customer-support'
  | 'try-it-free'
  | 'your-internet'
  | 'for-your-family'
  | 'high-speed';

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

  const isTouch = useMedia('(hover: none), (pointer: coarse)');

  const [hoveredCard, setHoveredCard] = useState<CardId>('your-internet');
  const enter = (id: CardId) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setHoveredCard(id);
  };
  const handleGridLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setHoveredCard('your-internet');
  };

  const { containerRef, activeIndex } = useScrollActiveCard<HTMLDivElement>(
    CARD_ORDER.length,
    { enabled: isTouch, fallbackIndex: 0 },
  );

  const activeCard: CardId = isTouch ? CARD_ORDER[activeIndex] : hoveredCard;

  return (
    <section
      id="benefits"
      className="w-full py-15 md:py-16 lg:py-20 xl:py-22.5">
      <Container>
        <div className="flex flex-col gap-9 md:gap-7 lg:gap-8 xl:gap-9">
          <h2
            className={cn(
              'font-manrope text-neutral-600',
              'font-bold xl:font-light',
              'text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px]',
              'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
            )}>
            {t('title')}
          </h2>

          <div
            ref={containerRef}
            // Elder (92a03bd): "flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:grid-rows-2"
            className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-5 lgx:grid-cols-3 lgx:grid-rows-2"
            onPointerLeave={handleGridLeave}>
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

          <div className="flex justify-center lgx:hidden">
            <Button
              variant="orange"
              size="md"
              className="px-8! py-4! text-[18px]! rounded-[16px]! text-neutral-900!">
              {tRules('cta')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
