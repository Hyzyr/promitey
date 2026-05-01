'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { useHeaderScroll } from '@/hooks/use-header-scroll';
import { HamburgerButton } from './hamburger-button';
import { MobileMenu } from './mobile-menu';
import { cn } from '@/lib/utils';

/**
 * Mobile header bar — Figma node 6529:29140.
 *
 * Notes:
 * - Figma's 88px height reserved space for the phone status bar / notch.
 *   In the browser we hug content and rely on env(safe-area-inset-top)
 *   for iOS notch padding instead.
 * - Hides on scroll-down, reveals on scroll-up (matches desktop behavior).
 * - Stays mounted while menu is open so the close X is reachable.
 */
export const HeaderMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isVisible, isAtTop } = useHeaderScroll();

  const handleClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const showHeader = isVisible || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50',
          'flex items-center justify-between',
          'bg-neutral-900/95 backdrop-blur-[24.75px]',
          'px-5 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]',
          !isAtTop && 'shadow-lg shadow-black/20',
        )}
      >
        <div className="flex h-7 items-center text-[14px]">
          <Logo />
        </div>
        <HamburgerButton
          isOpen={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        />
      </motion.header>

      <div className="h-14" aria-hidden="true" />

      <MobileMenu isOpen={menuOpen} onClose={handleClose} />
    </>
  );
};
