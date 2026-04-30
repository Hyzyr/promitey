"use client";

import { Button } from '@/components/ui/button';
import { DiscountBadge } from '@/components/ui/discount-badge';

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
 * PricingCard - Individual pricing plan card component
 * 
 * Displays a subscription plan with pricing details, optional discount badge,
 * and call-to-action button. Supports featured styling for highlighted plans.
 * 
 * @param label - Plan name (e.g., "1 Month", "1 Year")
 * @param originalPrice - Optional strikethrough price to show discount
 * @param price - Main price display
 * @param priceColor - Custom color for the price (defaults to dark gray, orange for featured)
 * @param discount - Optional discount percentage (e.g., "-50%")
 * @param perMonth - Optional monthly breakdown text
 * @param period - Subscription period text
 * @param featured - Whether this is the highlighted/recommended plan
 * @param height - Custom height class (defaults to h-107.75)
 * @param selectLabel - Text for the CTA button
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
  height = 'h-107.75',
  selectLabel,
}: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col gap-4 overflow-hidden rounded-lg bg-neutral-20 px-6 py-8 w-full ${height}`}
      style={{ boxShadow: '0px 20px 32px 0px rgba(0,0,0,0.06)' }}>
      {/* Top content block */}
      <div className="flex flex-1 flex-col gap-6 items-start min-h-0">
        {/* Plan label */}
        <p
          className="font-manrope font-extrabold text-[24px] leading-none tracking-[-0.72px] text-[#2b2929] whitespace-nowrap"
          style={{ textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)' }}>
          {label}
        </p>

        {/* Original price (strikethrough) */}
        {originalPrice && (
          <div
            className="relative inline-grid"
            style={{
              gridTemplateColumns: 'max-content',
              gridTemplateRows: 'max-content',
            }}>
            <p className="col-start-1 row-start-1 font-manrope font-normal text-[48px] leading-[0.9] text-neutral-80 whitespace-nowrap">
              {originalPrice}
            </p>
            <div className="col-start-1 row-start-1 h-1 w-23.25 bg-[#878686] mt-4.75 self-start" />
          </div>
        )}

        {/* Main price + discount badge */}
        <div className="flex items-center justify-between w-full">
          <p
            className="font-montserrat font-bold leading-none tracking-[-2.58px] text-[86px] whitespace-nowrap"
            style={{
              color: priceColor,
              textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)',
            }}>
            {price}
          </p>
          {discount && <DiscountBadge label={discount} />}
        </div>
      </div>

      {/* Divider + period */}
      <div
        className={`flex items-center border-t border-neutral-40 pt-4 pb-1.5 ${perMonth ? 'justify-between' : ''}`}>
        {perMonth && (
          <span className="font-manrope font-normal text-[24px] text-neutral-600 whitespace-nowrap">
            {perMonth}
          </span>
        )}
        <span className="font-manrope font-normal text-[24px] text-neutral-600 whitespace-nowrap">
          {period}
        </span>
      </div>

      {/* Select button */}
      <Button
        variant={featured ? 'orange' : 'secondary'}
        size="lg"
        className="w-full">
        {selectLabel}
      </Button>
    </div>
  );
}
