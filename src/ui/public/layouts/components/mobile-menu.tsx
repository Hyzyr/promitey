'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useLenis } from '@/components/providers/lenis-provider';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated = false,
}: MobileMenuProps) => {
  const t = useTranslations('landing.header');
  const pathname = usePathname();
  const { lock, unlock } = useScrollLock();
  const { scrollTo } = useLenis();
  const prevPathnameRef = useRef(pathname);

  const NAV = [
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#guide', label: t('nav.guide') },
    { href: '#faq', label: t('nav.faq') },
  ];

  useEffect(() => {
    if (isOpen) lock();
    else unlock();
    return () => unlock();
  }, [isOpen, lock, unlock]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isOpen) onClose();
    }
  }, [pathname, isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      scrollTo(href, {
        offset: -88,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fog-backdrop absolute inset-0"
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'gpu-layer absolute right-0 bottom-0 left-0',
              'flex flex-col items-start justify-center gap-6 sm:gap-8',
              'rounded-tl-md rounded-tr-md bg-neutral-800',
              'px-8 pt-8 pb-10 sm:px-12 sm:pt-12 sm:pb-16',
              'bottom-sheet-shadow',
              'max-h-[90vh] overflow-y-auto',
            )}
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
          >
            <LanguageSwitcher
              variant="dark"
              size="full"
              dropdownClassName="w-[80%] max-w-120"
              onSelect={onClose}
            />
            <div className="flex-col flex gap-[inherit] py-2 sm:py-3">
              {NAV.map(({ href, label }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => handleNavClick(href)}
                  className="text-left font-manrope text-[18px] leading-none font-normal tracking-[0.36px] text-neutral-10 transition-colors hover:text-primary-500"
                >
                  {label}
                </button>
              ))}
            </div>
            {isAuthenticated ? (
              <Button
                href="/dashboard"
                variant="orange"
                size="md"
                className="w-full"
              >
                {t('dashboard')}
              </Button>
            ) : (
              <Button
                href="/login"
                variant="orange"
                size="md"
                className="w-full"
              >
                {t('login')}
              </Button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
