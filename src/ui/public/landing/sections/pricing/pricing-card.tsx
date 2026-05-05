'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { PricingConfirmModal } from './pricing-confirm-modal';

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
  href?: string;
  className?: string;
};

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
  href,
  className,
}: PricingCardProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <article
        className={cn(
          'relative flex flex-col w-full',
          'rounded-[12px] xl:rounded-lg bg-neutral-20 overflow-hidden',
          'px-3 xl:px-6 pt-5.5 xl:py-8 pb-4',
          'gap-4 xl:gap-4',
          'shadow-[0px_20px_32px_0px_rgba(0,0,0,0.06)]',
          height ?? '',
          className,
        )}>
        {/* Invisible tap target covers entire card on mobile/tablet only */}
        {href && (
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            aria-label={selectLabel}
            className="absolute inset-0 z-10 xl:hidden"
          />
        )}

        <div
          className={cn(
            'flex flex-1 flex-col items-start min-h-0',
            'gap-4 xl:gap-6',
          )}>
          <strong
            className={cn(
              'font-manrope font-extrabold uppercase whitespace-nowrap text-[#2b2929]',
              'text-[14px] xl:text-[24px]',
              'leading-none tracking-[-0.42px] xl:tracking-[-0.72px]',
            )}
            style={{ textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)' }}>
            {label}
          </strong>

          {originalPrice && (
            <div className="flex relative  ">
              <span className="col-start-1 row-start-1 font-manrope font-normal text-lg xl:text-[48px] leading-[0.9] text-neutral-50 whitespace-nowrap">
                {originalPrice}
              </span>
              <div className="absolute top-[50%] row-start-1 h-0.75 w-full bg-neutral-70 rounded-sm self-start" />
            </div>
          )}

          <span
            className={cn(
              'block font-montserrat font-bold whitespace-nowrap w-full',
              'text-[56px] xl:text-[86px]',
              'leading-[0.8] xl:leading-none',
              'tracking-[-1.68px] xl:tracking-[-2.58px]',
            )}
            style={{
              color: featured ? '#e8633b' : priceColor,
              textShadow: '0px 4px 8.4px rgba(254,243,139,0.17)',
            }}>
            {price}
          </span>
        </div>

        <div
          className={cn(
            'flex flex-col xl:flex-row items-start xl:items-center',
            'gap-1.5 xl:gap-0',
            'border-t border-neutral-40',
            'pt-2 xl:pt-4 pb-1.5 xl:pb-1.5 w-full',
            perMonth ? 'xl:justify-between' : '',
          )}>
          {perMonth && (
            <span className="font-manrope font-normal text-[14px] xl:text-[24px] text-neutral-600 whitespace-nowrap">
              {perMonth}
            </span>
          )}
          <span className="font-manrope font-normal text-[14px] xl:text-[24px] text-neutral-600 whitespace-nowrap">
            {period}
          </span>
        </div>

        <Button
          variant={featured ? 'orange' : 'secondary'}
          size="lg"
          href={href}
          className="hidden xl:flex w-full">
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
          href={href}
        />
      )}
    </>
  );
};
