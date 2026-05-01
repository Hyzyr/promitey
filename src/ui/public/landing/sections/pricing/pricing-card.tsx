'use client';

import { Button } from '@/components/ui/button';

export type PricingCardProps = {
  label: string;
  originalPrice?: string;
  price: string;
  priceColor?: string;
  discount?: string;
  perMonth?: string;
  period: string;
  featured?: boolean;
  height?: string;
  selectLabel: string;
};

/**
 * PricingCard
 *
 * Mobile (Figma 414px frame, node 6525:25688):
 *   - bg #f6f6f6 rounded-12 px-12 pt-22 pb-16 gap-16
 *   - label  14px Manrope ExtraBold UPPER #2b2929 tracking -0.42
 *   - inline discount row (when originalPrice): 18px line-through #a1a1a1 +
 *     16px SemiBold #ff6d41 percent
 *   - price 56px Montserrat Bold leading-0.8 tracking -1.68
 *     (#e8633b for featured year, #2b2929 others)
 *   - divider top, then "X € / мес" + "N Месяц(ев)" stacked, 14px #484747
 *   - NO select button on mobile (hidden xl:flex)
 *
 * Desktop (xl): preserves the prior larger layout with select button.
 */
export const PricingCard = ({
  label,
  originalPrice,
  price,
  priceColor = '#2b2929',
  discount,
  perMonth,
  period,
  featured = false,
  height,
  selectLabel,
}: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col w-full
                  rounded-[12px] xl:rounded-lg bg-neutral-20 overflow-hidden
                  px-[12px] xl:px-6 pt-[22px] xl:py-8 pb-[16px]
                  gap-4 xl:gap-4
                  shadow-[0px_20px_32px_0px_rgba(0,0,0,0.06)]
                  ${height ?? ''}`}>
      {/* Top content block */}
      <div className="flex flex-1 flex-col items-start min-h-0
                      gap-4 xl:gap-6">
        {/* Plan label */}
        <p
          className="font-manrope font-extrabold uppercase whitespace-nowrap text-[#2b2929]
                     text-[14px] xl:text-[24px]
                     leading-none tracking-[-0.42px] xl:tracking-[-0.72px]"
          style={{ textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)' }}>
          {label}
        </p>

        {/* Mobile: inline discount row above price */}
        {originalPrice && (
          <div className="flex xl:hidden items-center gap-3 w-full whitespace-nowrap">
            <span className="relative font-manrope font-normal text-[18px] leading-[0.9] text-neutral-80">
              <span className="relative inline-block">
                {originalPrice}
                <span
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#878686]"
                  aria-hidden="true"
                />
              </span>
            </span>
            {discount && (
              <span className="font-manrope font-semibold text-[16px] leading-none text-primary-500">
                {discount}
              </span>
            )}
          </div>
        )}

        {/* Desktop: large strikethrough block */}
        {originalPrice && (
          <div
            className="relative hidden xl:inline-grid"
            style={{
              gridTemplateColumns: 'max-content',
              gridTemplateRows: 'max-content',
            }}>
            <p className="col-start-1 row-start-1 font-manrope font-normal xl:text-[48px] leading-[0.9] text-neutral-80 whitespace-nowrap">
              {originalPrice}
            </p>
            <div className="col-start-1 row-start-1 h-1 xl:w-23.25 bg-[#878686] xl:mt-4.75 self-start" />
          </div>
        )}

        {/* Main price */}
        <p
          className="font-montserrat font-bold whitespace-nowrap w-full
                     text-[56px] xl:text-[86px]
                     leading-[0.8] xl:leading-none
                     tracking-[-1.68px] xl:tracking-[-2.58px]"
          style={{
            color: featured ? '#e8633b' : priceColor,
            textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)',
          }}>
          {price}
        </p>
      </div>

      {/* Divider + period info */}
      <div
        className={`flex flex-col xl:flex-row items-start xl:items-center
                    gap-1.5 xl:gap-0
                    border-t border-neutral-40
                    pt-2 xl:pt-4 pb-1.5 xl:pb-1.5 w-full
                    ${perMonth ? 'xl:justify-between' : ''}`}>
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
