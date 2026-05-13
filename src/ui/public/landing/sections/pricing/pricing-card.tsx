'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  buildPricingPlanHref,
  saveSelectedPricingPlan,
  type PricingPlanId,
} from '@/lib/pricing-selection';

import { PricingConfirmModal } from './pricing-confirm-modal';

export type PricingCardProps = {
  label: string;
  originalPrice?: string;
  price: string;
  discount?: string;
  perMonth?: string;
  period: string;
  featured?: boolean;
  height?: string;
  selectLabel: string;
  planId: PricingPlanId;
  href?: string;
  className?: string;
  reserveMissingMeta?: boolean;
};

export const PricingCard = ({
  label,
  originalPrice,
  price,
  discount,
  perMonth,
  period,
  featured = false,
  height,
  selectLabel,
  planId,
  href,
  className,
  reserveMissingMeta = false,
}: PricingCardProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const planHref = href ? buildPricingPlanHref(href, planId) : undefined;

  const handleSelect = () => {
    saveSelectedPricingPlan(planId);
  };

  return (
    <>
      <article
        className={cn(
          'relative flex w-full flex-col',
          'overflow-hidden rounded-sm bg-neutral-20 lgx:rounded-lg',
          'px-4 pt-5.5 pb-4 md:px-6 md:py-8 lgx:px-4 lgx:py-5 xl:px-6 xl:py-8',
          'gap-4 lgx:gap-4',
          'shadow-[0px_20px_32px_0px_rgba(0,0,0,0.06)]',
          height ?? '',
          className,
        )}
      >
        {href && (
          <button
            type="button"
            onClick={() => {
              handleSelect();
              setIsConfirmOpen(true);
            }}
            aria-label={selectLabel}
            className="absolute inset-0 z-10 lgx:hidden"
          />
        )}

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col items-start',
            'gap-4 lgx:gap-6',
          )}
        >
          <strong
            className={cn(
              'text-glow-yellow font-manrope font-extrabold whitespace-nowrap text-neutral-800 uppercase',
              'text-[14px] md:text-[18px] lgx:text-[22px] xl:text-[24px]',
              'leading-none tracking-[-0.42px] lgx:tracking-[-0.72px]',
            )}
          >
            {label}
          </strong>

          {originalPrice && (
            <div className="relative flex">
              <span className="col-start-1 row-start-1 font-manrope text-lg leading-[0.9] font-normal whitespace-nowrap text-neutral-50 md:text-[24px] lg:text-[36px] xlx:text-[48px]">
                {originalPrice}
              </span>
              <div className="absolute top-[50%] row-start-1 h-0.75 w-full self-start rounded-sm bg-neutral-70" />
            </div>
          )}

          {!originalPrice && reserveMissingMeta && (
            <div className="relative flex opacity-0" aria-hidden="true">
              <span className="col-start-1 row-start-1 font-manrope text-lg leading-[0.9] font-normal whitespace-nowrap text-neutral-50 md:text-[24px] lg:text-[36px] xlx:text-[48px]">
                0 €
              </span>
              <div className="absolute top-[50%] row-start-1 h-0.75 w-full self-start rounded-sm bg-neutral-70" />
            </div>
          )}

          <span
            className={cn(
              'block w-full font-montserrat font-bold whitespace-nowrap',
              'text-[56px] md:text-[64px] lgx:text-[86px]',
              'leading-[0.8] lgx:leading-none',
              'tracking-[-1.68px] lgx:tracking-[-2.58px]',
              'text-glow-yellow',
              featured ? 'text-primary-600' : 'text-neutral-800',
            )}
          >
            {price}
          </span>
        </div>

        <div
          className={cn(
            'flex flex-col items-start lgx:flex-row lgx:items-center',
            'gap-1.5 lgx:gap-0',
            'border-t border-neutral-40',
            'w-full pt-2 pb-1.5 lgx:pt-4 lgx:pb-1.5',
            perMonth || reserveMissingMeta ? 'lgx:justify-between' : '',
          )}
        >
          {perMonth && (
            <span className="font-manrope text-[14px]  font-normal whitespace-nowrap text-neutral-600 md:text-[20px] lg:text-[18px] lgx:text-[24px]">
              {perMonth}
            </span>
          )}
          {!perMonth && reserveMissingMeta && (
            <span
              className="font-manrope text-[14px] font-normal whitespace-nowrap text-neutral-600 opacity-0 md:text-[20px] lg:text-[18px] lgx:text-[24px]"
              aria-hidden="true"
            >
              0 € / mo
            </span>
          )}
          <span className="font-manrope text-[14px]  font-normal whitespace-nowrap text-neutral-600 md:text-[20px] lg:text-[18px] lgx:text-[24px]">
            {period}
          </span>
        </div>

        <Button
          variant={featured ? 'orange' : 'secondary'}
          size="lg"
          href={planHref}
          onClick={handleSelect}
          className="hidden w-full lgx:flex"
        >
          {selectLabel}
        </Button>
      </article>

      {href && (
        <PricingConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          label={label}
          price={price}
          originalPrice={originalPrice}
          perMonth={perMonth}
          period={period}
          discount={discount}
          featured={featured}
          href={planHref ?? href}
          onProceed={handleSelect}
        />
      )}
    </>
  );
};
