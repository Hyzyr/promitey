'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Header menu toggle button — Figma node 6529:29161 (lucide/menu, 32px, orange).
 * Static menu icon, no morphing animation.
 */
export const HamburgerButton = ({ isOpen, onClick, className }: HamburgerButtonProps) => {
  const t = useTranslations('landing.header');

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? t('closeMenu') : t('menu')}
      aria-expanded={isOpen}
      className={cn(
        'relative flex h-8 w-8 items-center justify-center text-primary-500',
        'transition-transform duration-200 active:scale-90',
        'focus-visible:outline-none',
        className,
      )}
    >
      <Menu className="h-8 w-8" strokeWidth={2} />
    </button>
  );
};
