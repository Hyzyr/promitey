'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

const bgImage = '/images/ellipse-blurred.png';

type PlanData = {
  label: string;
  originalPrice?: string;
  price: string;
  discount?: string;
  perMonth?: string;
  period: string;
  featured?: boolean;
};

type PricingCardProps = PlanData & {
  selectLabel: string;
};

/**
 * Pricing card. Mobile (Figma 414px) layout:
 *   - bg #f6f6f6 rounded-12 px-12 py-(22 top, 16 bottom) gap-16
 *   - Label 14px Manrope ExtraBold UPPER #2b2929 tracking -0.42
 *   - For discounted plans: row [strike-through 18px #a1a1a1] + [percent 16px #ff6d41 SemiBold]
 *   - Price 56px Montserrat Bold leading 0.8 tracking -1.68 (#e8633b for featured year, #2b2929 others)
 *   - Divider top, gap-6: "X.XX € / мес" + "N Месяц(ев)" (14px Manrope Regular #484747)
 *   - NO select button on mobile (hidden md:flex)
 * Desktop (xl): preserved larger 86px price + select button + bigger paddings.
 */
const PricingCard = ({
  label,
  originalPrice,
  price,
  discount,
  perMonth,
  period,
  featured = false,
  selectLabel,
}: PricingCardProps) => {
  const priceColor = featured ? '#e8633b' : '#2b2929';

  return (
    <div
      className="flex flex-col w-full h-full rounded-[12px] xl:rounded-[16px] bg-neutral-20
                 px-[12px] xl:px-6 pt-[22px] xl:pt-8 pb-[16px] xl:pb-8
                 gap-[16px] xl:gap-6"
      style={{ boxShadow: '0px 20px 32px 0px rgba(0,0,0,0.06)' }}>
      {/* Label */}
      <p
        className="font-manrope font-extrabold uppercase whitespace-nowrap text-[#2b2929]
                   text-[14px] xl:text-[24px]
                   leading-none tracking-[-0.42px] xl:tracking-[-0.72px]"
        style={{ textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)' }}>
        {label}
      </p>

      {/* Price block (height-matched between cards via min-h on the discount-having cards) */}
      <div className="flex flex-col gap-[6px] xl:gap-4 min-h-[86px] xl:min-h-0 justify-end">
        {/* Inline discount row (mobile + desktop) — only for discounted plans */}
        {originalPrice && (
          <div className="flex items-center gap-[12px] xl:gap-4">
            <span className="relative font-manrope font-normal text-[18px] xl:text-[32px] leading-none text-neutral-80 whitespace-nowrap">
              <span className="relative inline-block">
                {originalPrice}
                <span
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] xl:h-[3px] bg-[#878686]"
                  aria-hidden="true"
                />
              </span>
            </span>
            {discount && (
              <span className="font-manrope font-semibold text-[16px] xl:text-[20px] leading-none tracking-[-0.32px] text-primary-500 whitespace-nowrap">
                {discount}
              </span>
            )}
          </div>
        )}

        {/* Main price */}
        <p
          className="font-montserrat font-bold whitespace-nowrap
                     text-[56px] xl:text-[86px]
                     leading-[0.8] xl:leading-none
                     tracking-[-1.68px] xl:tracking-[-2.58px]"
          style={{
            color: priceColor,
            textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)',
          }}>
          {price}
        </p>
      </div>

      {/* Divider + period info */}
      <div
        className="flex flex-col xl:flex-row items-start xl:items-center
                   gap-[6px] xl:gap-0 border-t border-neutral-40
                   pt-[8px] xl:pt-4 pb-[6px] xl:pb-1.5
                   xl:justify-between">
        {perMonth && (
          <span className="font-manrope font-normal text-[14px] xl:text-[24px] text-neutral-600 whitespace-nowrap">
            {perMonth}
          </span>
        )}
        <span className="font-manrope font-normal text-[14px] xl:text-[24px] text-neutral-600 whitespace-nowrap">
          {period}
        </span>
      </div>

      {/* Select button — hidden on mobile per Figma */}
      <Button
        variant={featured ? 'orange' : 'secondary'}
        size="lg"
        className="hidden xl:flex w-full">
        {selectLabel}
      </Button>
    </div>
  );
};

export const PricingSection = () => {
  const t = useTranslations('landing.pricing');

  return (
    <section
      id="pricing"
      className="relative w-full px-[20px] py-[60px] md:px-8 md:py-20 xl:px-0 xl:pb-30 xl:pt-22.5 overflow-hidden">
      {/* Dark background — mobile: rounded-24 contained; desktop: full bleed */}
      <div className="absolute inset-[20px] md:inset-8 xl:inset-0 bg-neutral-900 rounded-[24px] xl:rounded-xl overflow-hidden">
        {/* Top glow ellipse (decorative) */}
        <div
          className="absolute left-[15%] top-[10%] w-[30%] h-0 circle shadow-[0px_0px_12vh_2vw_rgba(255,255,255,0.15)]"
          style={{ borderRadius: 'inherit' }}
        />
        {/* Bottom decorative image */}
        <img
          src={bgImage}
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] w-[125%] max-w-[unset] h-auto max-h-full object-fill pointer-events-none"
        />
      </div>

      {/* Content wrapper — mobile px-0 (parent handles), desktop uses Container */}
      <div className="relative">
        <Container className="relative flex flex-col items-center gap-[80px] xl:gap-20 xl:min-h-screen xl:justify-center xl:py-0 px-0! xl:px-[unset]!">
          {/* Heading — mobile w-320 gap-16 */}
          <div className="flex flex-col items-center gap-[16px] xl:gap-4 text-center w-[320px] md:w-auto md:max-w-[680px] xl:max-w-none">
            <p
              className="font-manrope font-normal text-yellow-50
                         text-[32px] md:text-[40px] xl:text-[56px]
                         leading-[1.1]
                         tracking-[-0.64px] md:tracking-[-0.8px] xl:tracking-[-1.12px]">
              {t('title')}
            </p>
            <p
              className="font-manrope font-normal text-neutral-30
                         text-[16px] md:text-[20px] xl:text-[24px]
                         leading-[1.4]
                         tracking-[-0.32px] md:tracking-[-0.4px] xl:tracking-[-0.48px]
                         w-full md:w-auto xl:w-225.5">
              {t('subtitle')}
            </p>
          </div>

          {/* Cards grid
              - mobile (Figma 374px frame): 2 cols, gap-0, each cell has its own
                px-4 py-8 wrapper (so visual gap = 8px between siblings).
              - xl: 4 cols in a row.
              All cells stretch to equal height. */}
          <div
            className="grid grid-cols-2 xl:grid-cols-4 items-stretch
                       gap-0 xl:gap-2
                       w-full max-w-[374px] md:max-w-[700px] xl:max-w-none">
            {/* ONE MONTH */}
            <div className="flex flex-col px-[4px] py-[8px] xl:p-0">
              <PricingCard
                label={t('plans.oneMonth.label')}
                price="3 €"
                period={t('plans.oneMonth.period')}
                selectLabel={t('select')}
              />
            </div>

            {/* YEAR — featured.
                Mobile per Figma: solid bg #ff6d41 (orange), rounded-18,
                px-[4px] pb-[8px], with "Best Offer" gradient text on top + inner pricing card.
                Desktop preserves existing glass treatment. */}
            <div
              className="flex flex-col items-center
                         bg-primary-500 xl:bg-transparent xl:glass xl:backdrop-blur-lg
                         pb-[8px] px-[4px] xl:pb-2 xl:px-2
                         rounded-[18px]
                         shadow-[4px_11px_11px_0px_rgba(0,0,0,0.12)]
                         relative overflow-hidden">
              <div className="flex w-full items-center justify-center pt-[6px] pb-[10px] xl:pt-3 xl:pb-3.5 px-[24px] xl:px-16.5">
                <p
                  className="font-manrope font-bold text-center bg-clip-text text-transparent whitespace-nowrap
                             text-[18px] xl:text-[28px]
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
                discount="-50%"
                perMonth={t('perMonth', { value: '1' })}
                period={t('plans.year.period')}
                featured
                selectLabel={t('select')}
              />
            </div>

            {/* THREE MONTHS (per Figma — was previously labelled half-year) */}
            <div className="flex flex-col px-[4px] py-[8px] xl:p-0">
              <PricingCard
                label={t('plans.quarter.label')}
                originalPrice="6 €"
                price="5 €"
                discount="-16.6%"
                perMonth={t('perMonth', { value: '1.66' })}
                period={t('plans.quarter.period')}
                selectLabel={t('select')}
              />
            </div>

            {/* HALF YEAR */}
            <div className="flex flex-col px-[4px] py-[8px] xl:p-0">
              <PricingCard
                label={t('plans.halfYear.label')}
                originalPrice="12 €"
                price="8 €"
                discount="-33.3%"
                perMonth={t('perMonth', { value: '1.33' })}
                period={t('plans.halfYear.period')}
                selectLabel={t('select')}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
