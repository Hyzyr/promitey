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

type CardId = 'customer-support' | 'try-it-free' | 'your-internet' | 'for-your-family' | 'high-speed';

export const BenefitsSection = () => {
  const t = useTranslations('landing.benefits');
  const [activeCard, setActiveCard] = useState<CardId>('your-internet');

  const enter = (id: CardId) => {
    return (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setActiveCard(id);
    };
  };

  const handleGridLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setActiveCard('your-internet');
  }

  return (
    <section id="benefits" className="w-full py-22.5 px-24">
      <div className="flex flex-col gap-9">
        <p className="font-manrope font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600">
          {t('title')}
        </p>

        <div
          className="grid grid-cols-3 grid-rows-2 gap-5"
          onPointerLeave={handleGridLeave}
        >
          <div className="contents" onPointerEnter={enter('customer-support')}>
            <CustomerSupportCard isActive={activeCard === 'customer-support'} />
          </div>
          <div className="contents" onPointerEnter={enter('try-it-free')}>
            <TryItFreeCard isActive={activeCard === 'try-it-free'} />
          </div>
          <div className="contents" onPointerEnter={enter('your-internet')}>
            <YourInternetCard isActive={activeCard === 'your-internet'} />
          </div>
          <div className="contents" onPointerEnter={enter('for-your-family')}>
            <ForYourFamilyCard isActive={activeCard === 'for-your-family'} />
          </div>
          <div className="contents" onPointerEnter={enter('high-speed')}>
            <HighSpeedCard isActive={activeCard === 'high-speed'} />
          </div>
        </div>
      </div>
    </section>
  );
}


