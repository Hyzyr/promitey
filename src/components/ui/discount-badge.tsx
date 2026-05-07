'use client';

import { cn } from '@/lib/utils';

export interface DiscountBadgeProps {
  label: string;
  className?: string;
}

/**
 * DiscountBadge - Reusable badge component for displaying discount percentages
 * 
 * Used in pricing cards, promotional banners, and special offers.
 * Features a glassmorphism design with gradient background and shadow effects.
 * 
 * @example
 * ```tsx
 * <DiscountBadge label="-50%" />
 * <DiscountBadge label="SAVE 30%" className="absolute top-4 right-4" />
 * ```
 */
export const DiscountBadge = ({ label, className }: DiscountBadgeProps) => {
  return (
    <div
      className={cn(
        'discount-badge-glass relative flex items-center justify-center overflow-hidden rounded-xl px-4 py-2',
        className,
      )}
    >
      <span className="font-manrope font-medium text-[20px] text-neutral-600">
        {label}
      </span>
    </div>
  );
};
