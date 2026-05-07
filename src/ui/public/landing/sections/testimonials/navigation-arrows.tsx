'use client';

import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationArrows = ({ onPrev, onNext }: NavigationArrowsProps) => {
  const t = useTranslations('landing.testimonials');
  const buttonClass =
    'glass relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-150 hover:brightness-110 active:scale-95 active:brightness-95';

  return (
    <div className="flex gap-4 md:gap-1">
      <button
        onClick={onPrev}
        aria-label={t('previousLabel')}
        className={buttonClass}>
        <span className="icon text-[20px] text-neutral-900">
          <LucideChevronLeft />
        </span>
      </button>
      <button
        onClick={onNext}
        aria-label={t('nextLabel')}
        className={buttonClass}>
        <span className="icon text-[20px] text-neutral-900">
          <LucideChevronRight />
        </span>
      </button>
    </div>
  );
};
