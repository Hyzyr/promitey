'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { PricingCard } from './pricing-card';

const bgImage = '/images/ellipse-blurred.png';

export const PricingSection = () => {
  const t = useTranslations('landing.pricing');
  return (
    <section
      id="pricing"
      className="relative w-full pb-30 pt-22.5 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-neutral-900 rounded-xl overflow-hidden">
        {/* Top glow ellipse */}
        <div
          className="absolute left-[15%] top-[10%] w-[30%] h-0 circle shadow-[0px_0px_12vh_2vw_rgba(255,255,255,0.15)]"
          style={{ borderRadius: 'inherit' }}></div>
        {/* Bottom decorative image */}
        <img
          src={bgImage}
          alt="background-decorative"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] w-[125%] max-w-[unset] h-auto max-h-full object-fill pointer-events-none"
        />
      </div>

      <Container className="relative flex flex-col min-h-screen justify-center items-center gap-20">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-manrope font-normal text-[56px] leading-[1.1] tracking-[-1.12px] text-yellow-50">
            {t('title')}
          </p>
          <p className="font-manrope font-normal w-225.5 text-[24px] leading-[1.4] tracking-[-0.48px] text-neutral-30">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards row — items-end so ONE MONTH (shortest) aligns to bottom */}
        <div className="flex w-full items-end gap-2 justify-center">
          {/* ONE MONTH */}
          <div className="flex flex-1 items-center min-w-0 p-2">
            <PricingCard
              label={t('plans.oneMonth.label')}
              price="3 €"
              period={t('plans.oneMonth.period')}
              height="h-107.75"
              selectLabel={t('select')}
            />
          </div>

          {/* YEAR — featured */}
          <div
            className="glass backdrop-blur-lg flex flex-1 flex-col items-center min-w-0 overflow-hidden pb-2 px-2 rounded-xl shadow-[4px_11px_11px_0px_rgba(0,0,0,0.12)] relative"
          >
            {/* Best Offer label */}
            <div className="flex w-full items-center justify-center pb-3.5 pt-3 px-16.5">
              <p
                className="font-manrope font-bold text-[28px] tracking-[0.56px] text-center bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(182.28deg, rgb(251,251,251) 41.4%, rgb(254,247,177) 97.7%)',
                }}>
                {t('bestOffer')}
              </p>
            </div>
            <PricingCard
              label={t('plans.year.label')}
              originalPrice="36 €"
              price="16 €"
              priceColor="#ff6d41"
              discount="-50%"
              perMonth={t('perMonth', { value: '1' })}
              period={t('plans.year.period')}
              featured
              height="h-125"
              selectLabel={t('select')}
            />
          </div>

          {/* HALF YEAR */}
          <div className="flex flex-1 flex-col min-w-0 p-2">
            <PricingCard
              label={t('plans.halfYear.label')}
              originalPrice="18 €"
              price="12 €"
              discount="-33%"
              perMonth={t('perMonth', { value: '1.33' })}
              period={t('plans.halfYear.period')}
              height="h-125"
              selectLabel={t('select')}
            />
          </div>

          {/* THREE MONTHS */}
          <div className="flex flex-1 flex-col min-w-0 p-2">
            <PricingCard
              label={t('plans.quarter.label')}
              originalPrice="9 €"
              price="7.5 €"
              discount="-17%"
              perMonth={t('perMonth', { value: '1.67' })}
              period={t('plans.quarter.period')}
              height="h-125"
              selectLabel={t('select')}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
