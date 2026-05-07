'use client';

import { useTranslations } from 'next-intl';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PricingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  price: string;
  originalPrice?: string;
  perMonth?: string;
  period: string;
  discount?: string;
  featured?: boolean;
  href: string;
  onProceed: () => void;
}

export const PricingConfirmModal = ({
  isOpen,
  onClose,
  label,
  price,
  originalPrice,
  perMonth,
  period,
  discount,
  featured = false,
  href,
  onProceed,
}: PricingConfirmModalProps) => {
  const t = useTranslations('landing.pricing');
  const tCommon = useTranslations('common');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('confirm.title')}
      ariaLabel={t('confirm.ariaLabel')}
      closeAriaLabel={tCommon('close')}
    >
      <p className="font-manrope text-[16px] leading-normal text-neutral-300">
        {t('confirm.body')}
      </p>

      {/* Plan summary card */}
      <div className="flex flex-col gap-3 rounded-sm bg-neutral-700 px-5 py-4">
        <strong
          className={cn(
            'font-manrope font-extrabold uppercase whitespace-nowrap',
            'text-[14px] tracking-[-0.42px]',
            featured ? 'text-primary-500' : 'text-neutral-10',
          )}>
          {label}
        </strong>

        {originalPrice && (
          <div className="flex items-center gap-3">
            <span className="relative font-manrope font-normal text-[20px] text-neutral-400">
              {originalPrice}
              <span className="absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 rounded-sm bg-neutral-400" />
            </span>
            {discount && (
              <span className="font-manrope font-bold text-[14px] text-primary-500">
                {discount}
              </span>
            )}
          </div>
        )}

        <p
          className={cn(
            'font-montserrat text-[48px] leading-none font-bold tracking-[-1.68px]',
            featured ? 'text-primary-600' : 'text-neutral-10',
          )}>
          {price}
        </p>

        <div className={cn(
          'flex flex-col gap-1 border-t border-neutral-600 pt-3',
          perMonth ? 'gap-1.5' : '',
        )}>
          {perMonth && (
            <span className="font-manrope font-normal text-[14px] text-neutral-400">
              {perMonth}
            </span>
          )}
          <span className="font-manrope font-normal text-[14px] text-neutral-400">
            {period}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          variant="orange"
          size="md"
          href={href}
          onClick={onProceed}
          className="w-full">
          {t('confirm.proceed')}
        </Button>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'w-full py-3.5 rounded-md',
            'font-manrope font-semibold text-[18px] leading-[2.1]',
            'text-neutral-300 transition-colors',
            'hover:text-neutral-10 active:text-neutral-400',
            'focus-visible:outline-none',
          )}>
          {tCommon('cancel')}
        </button>
      </div>
    </Modal>
  );
};
