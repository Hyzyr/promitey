'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { PricingCard } from './pricing-card';

const bgImage = '/images/ellipse-blurred.png';

/**
 * PricingSection — pixel-perfect mobile per Figma node 6525:25688.
 *
 * Mobile (414 frame):
 *   - section px-20 py-60
 *   - dark bg inset-20 rounded-24
 *   - heading w-320 gap-16, title 32px, subtitle 16px
 *   - 4 cards in a 2×2 grid wrapped at 374px
 *     (gap-0; visual gap from per-cell px-4 py-8 wrappers)
 *   - featured "Год" cell: solid bg #ff6d41 rounded-18 with "Best Offer" label on top
 *   - select buttons hidden on mobile
 *
 * Desktop (xl): preserves original 4-in-a-row glass layout.
 */
export const PricingSection = () => {
  const t = useTranslations('landing.pricing');

  return (
    <section
      id="pricing"
      className="relative w-full
                 px-[20px] py-[60px]
                 md:px-8 md:py-25
                 xl:px-0 xl:pt-22.5 xl:pb-30
                 overflow-hidden">
      {/* Dark background — mobile: inset 20px rounded-24; desktop: full bleed */}
      <div className="absolute inset-[20px] md:inset-8 xl:inset-0
                      bg-neutral-900 rounded-[24px] xl:rounded-xl overflow-hidden">
        {/* Top glow ellipse */}
        <div
          className="absolute left-[15%] top-[10%] w-[30%] h-0 circle shadow-[0px_0px_12vh_2vw_rgba(255,255,255,0.15)]"
          style={{ borderRadius: 'inherit' }}
        />
        {/* Bottom decorative orange image */}
        <img
          src={bgImage}
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] w-[125%] max-w-[unset] h-auto max-h-full object-fill pointer-events-none"
        />
      </div>

      <Container className="relative flex flex-col items-center
                            gap-[80px] xl:gap-20
                            xl:min-h-screen xl:justify-center">
        {/* Heading — mobile w-320 gap-16 */}
        <div className="flex flex-col items-center text-center
                        gap-[16px] xl:gap-4
                        w-[320px] md:w-auto md:max-w-[680px] xl:max-w-none">
          <p className="font-manrope font-normal text-yellow-50
                        text-[32px] md:text-[44px] xl:text-[56px]
                        leading-[1.1]
                        tracking-[-0.64px] xl:tracking-[-1.12px]">
            {t('title')}
          </p>
          <p className="font-manrope font-normal text-neutral-30
                        text-[16px] md:text-[20px] xl:text-[24px]
                        leading-[1.4]
                        tracking-[-0.32px] xl:tracking-[-0.48px]
                        w-full md:max-w-[600px] xl:max-w-180">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards
            Mobile: 2×2 grid, gap-0, each cell padded p-[4px_8px] (visual 8px gap).
            Desktop: 4-in-a-row, items-end. */}
        <div className="grid grid-cols-2 xl:flex xl:flex-row
                        items-stretch xl:items-end
                        gap-0 xl:gap-2
                        w-full max-w-[374px] md:max-w-[700px] xl:max-w-none
                        xl:justify-center">
          {/* ONE MONTH */}
          <div className="flex flex-1 items-stretch min-w-0
                          px-[4px] py-[8px] xl:p-2
                          xl:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]">
            <PricingCard
              label={t('plans.oneMonth.label')}
              price="3 €"
              period={t('plans.oneMonth.period')}
              height="md:h-107.75"
              selectLabel={t('select')}
            />
          </div>

          {/* YEAR — featured.
              Mobile: solid #ff6d41 wrapper, rounded-18, with "Best Offer" label on top.
              Desktop: glass treatment. */}
          <div className="relative isolate flex flex-1 flex-col items-center min-w-0
                          bg-primary-500 xl:bg-transparent
                          rounded-[18px] xl:rounded-xl overflow-hidden
                          px-[4px] pb-[8px] xl:px-2 xl:pb-2
                          xl:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]">
            {/* Glass layer (desktop only) */}
            <span className="hidden xl:block glass absolute inset-0 rounded-[inherit] backdrop-blur-lg -z-1" />

            {/* Best Offer label */}
            <div className="flex w-full items-center justify-center
                            pt-[6px] pb-[10px] xl:pt-3 xl:pb-3.5
                            px-[24px] xl:px-16.5">
              <p
                className="font-manrope font-bold xl:font-extrabold whitespace-nowrap text-center bg-clip-text text-transparent
                           text-[18px] xl:text-[24px]
                           tracking-[0.36px] xl:tracking-[0.56px]"
                style={{
                  backgroundImage:
                    'linear-gradient(182.28deg, rgb(251,251,251) 41.4%, rgb(254,247,177) 97.7%)',
                }}>
                {t('bestOffer')}
              </p>
            </div>

            <PricingCard
              label={t('plans.year.label')}
              originalPrice="24 €"
              price="12 €"
              priceColor="#e8633b"
              discount="-50%"
              perMonth={t('perMonth', { value: '1' })}
              period={t('plans.year.period')}
              featured
              height="md:h-125"
              selectLabel={t('select')}
            />
          </div>

          {/* THREE MONTHS */}
          <div className="flex flex-1 items-stretch min-w-0
                          px-[4px] py-[8px] xl:p-2
                          xl:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]">
            <PricingCard
              label={t('plans.quarter.label')}
              originalPrice="6 €"
              price="5 €"
              discount="-16.6%"
              perMonth={t('perMonth', { value: '1.66' })}
              period={t('plans.quarter.period')}
              height="md:h-125"
              selectLabel={t('select')}
            />
          </div>

          {/* HALF YEAR */}
          <div className="flex flex-1 items-stretch min-w-0
                          px-[4px] py-[8px] xl:p-2
                          xl:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]">
            <PricingCard
              label={t('plans.halfYear.label')}
              originalPrice="12 €"
              price="8 €"
              discount="-33.3%"
              perMonth={t('perMonth', { value: '1.33' })}
              period={t('plans.halfYear.period')}
              height="md:h-125"
              selectLabel={t('select')}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
