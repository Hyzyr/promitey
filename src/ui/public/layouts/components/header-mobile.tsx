'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/logo';
import { useHeaderScroll } from '@/hooks/use-header-scroll';
import { HamburgerButton } from './hamburger-button';
import { MobileMenu } from './mobile-menu';
import { cn } from '@/lib/utils';

export interface HeaderMobileProps {
  isAuthenticated?: boolean;
}

export const HeaderMobile = ({ isAuthenticated = false }: HeaderMobileProps) => {
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
          'gpu-layer fixed top-0 right-0 left-0 z-50',
          'flex items-center justify-between',
          'bg-neutral-900/95 backdrop-blur-[24.75px]',
          'px-5 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]',
          !isAtTop && 'shadow-lg shadow-black/20',
        )}
      >
        <Link href="/" className="flex h-7 items-center">
          <Logo className="inline-flex h-7 w-auto" />
        </Link>
        <HamburgerButton
          isOpen={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        />
      </motion.header>
      <MobileMenu isOpen={menuOpen} onClose={handleClose} isAuthenticated={isAuthenticated} />
    </>
  );
};
