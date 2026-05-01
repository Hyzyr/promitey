'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Languages, ChevronRight, X } from 'lucide-react';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useLenis } from '@/components/providers/lenis-provider';
import { useRouter, usePathname as useIntlPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'En' },
  { value: 'ru', label: 'Ru' },
];

/**
 * Full-screen mobile menu — Figma node 6529:29180.
 *
 * Pixel-perfect specs:
 * - Backdrop: bg-rgba(32,30,30,0.6) + backdrop-blur-[4px]
 * - Panel: bg #2B2929 (neutral-800), rounded-t-[16px]
 * - Padding: pt-[32px] pb-[40px] px-[32px]
 * - Gap between items: 24px
 * - Shadow: 0px -7px 30.2px rgba(0,0,0,0.12)
 * - Slides from bottom with spring animation
 */
export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations('landing.header');
  const pathname = usePathname();
  const intlPathname = useIntlPathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const { lock, unlock } = useScrollLock();
  const { scrollTo } = useLenis();
  const prevPathnameRef = useRef(pathname);
  const [langOpen, setLangOpen] = useState(false);

  const NAV = [
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#guide', label: t('nav.guide') },
    { href: '#faq', label: t('nav.faq') },
  ];

  const currentLocale = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

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
      scrollTo(href, { offset: -88, duration: 1.2 });
    }, 350);
  };

  const handleLocaleChange = (newLocale: Locale) => {
    setLangOpen(false);
    router.replace(intlPathname, { locale: newLocale });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(32,30,30,0.6)] backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'absolute bottom-0 left-0 right-0',
              'flex flex-col items-start justify-center gap-6',
              'rounded-tl-2xl rounded-tr-2xl bg-neutral-800',
              'px-8 pt-8 pb-10',
              'shadow-[0px_-7px_30.2px_0px_rgba(0,0,0,0.12)]',
              'max-h-[90vh] overflow-y-auto',
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-primary-500 transition-transform active:scale-90"
            >
              <X className="h-8 w-8" strokeWidth={2} />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center justify-center gap-3 rounded-xl bg-white/12 px-4 py-3 transition-colors hover:bg-white/16"
              >
                <Languages className="h-6 w-6 text-neutral-10" strokeWidth={2} />
                <span className="font-roboto text-[18px] leading-none text-neutral-10">
                  <span className="font-bold">Language:</span>
                  <span className="font-normal"> {currentLocale.label}</span>
                </span>
                <ChevronRight
                  className={cn(
                    'h-4.5 w-4.5 text-neutral-10 transition-transform',
                    langOpen ? '-rotate-90' : 'rotate-90',
                  )}
                  strokeWidth={2}
                />
              </button>

              {langOpen && (
                <ul
                  role="listbox"
                  className="absolute left-0 top-full z-10 mt-2 min-w-full overflow-hidden rounded-xl bg-neutral-700 shadow-lg"
                >
                  {LOCALES.map((l) => (
                    <li key={l.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={l.value === locale}
                        onClick={() => handleLocaleChange(l.value)}
                        className={cn(
                          'block w-full px-4 py-3 text-left font-roboto text-[16px] text-neutral-10 transition-colors hover:bg-neutral-600',
                          l.value === locale && 'bg-neutral-600',
                        )}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {NAV.map(({ href, label }) => (
              <button
                key={href}
                type="button"
                onClick={() => handleNavClick(href)}
                className="text-left font-roboto text-[18px] font-normal leading-none tracking-[0.36px] text-neutral-10 transition-colors hover:text-primary-500"
              >
                {label}
              </button>
            ))}

            <Button href="/login" variant="orange" size="md" className="w-full">
              {t('login')}
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
