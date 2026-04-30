"use client";

import { cn } from "@/lib/utils";

type DiscountBadgeProps = {
  label: string;
  className?: string;
};

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
        "relative flex items-center justify-center overflow-hidden rounded-xl px-4 py-2",
        className
      )}
      style={{
        background:
          'linear-gradient(169.87deg, rgba(255,255,255,0.12) 7.1%, rgba(255,109,65,0.24) 42.8%, rgba(255,109,65,0.24) 67%, rgba(255,255,255,0.048) 95.5%)',
        backdropFilter: 'blur(4.4px)',
        boxShadow:
          '4px 11px 11px 0px rgba(0,0,0,0.05), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)',
      }}>
      <span className="font-manrope font-medium text-[20px] text-neutral-600">
        {label}
      </span>
    </div>
  );
}
