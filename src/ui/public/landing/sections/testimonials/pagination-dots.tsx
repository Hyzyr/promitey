'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  progressKey: number;
  showProgress: boolean;
  autoplayDelay: number;
  onDotClick: (index: number) => void;
}

export const PaginationDots = ({
  count,
  activeIndex,
  progressKey,
  showProgress,
  autoplayDelay,
  onDotClick,
}: PaginationDotsProps) => {
  const t = useTranslations('landing.testimonials');

  return (
    <div className="flex gap-4 items-center">
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={t('dotLabel', { number: i + 1 })}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'relative h-1.25 shrink-0 cursor-pointer overflow-hidden rounded-full transition-[width] duration-300',
              isActive ? 'w-18' : 'w-10.5',
              isActive && !showProgress ? 'bg-neutral-800' : 'bg-neutral-40',
            )}>
            {isActive && showProgress && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 rounded-full bg-neutral-800 will-change-[width]"
                style={{
                  animationName: 'progress-fill',
                  animationDuration: `${autoplayDelay}ms`,
                  animationTimingFunction: 'linear',
                  animationFillMode: 'forwards',
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
