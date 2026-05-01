'use client';

import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Header menu toggle button — Figma node 6529:29161 (lucide/menu, 32px, orange).
 * Static menu/X icon, no morphing animation.
 */
export const HamburgerButton = ({ isOpen, onClick, className }: HamburgerButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className={cn(
        'relative flex h-8 w-8 items-center justify-center text-primary-500',
        'transition-transform duration-200 active:scale-90',
        'focus-visible:outline-none',
        className,
      )}
    >
      {isOpen ? (
        <X className="h-8 w-8" strokeWidth={2} />
      ) : (
        <Menu className="h-8 w-8" strokeWidth={2} />
      )}
    </button>
  );
};
