'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useHeaderScroll } from '@/hooks/use-header-scroll';
import { useLenis } from '@/components/providers/lenis-provider';
import { LogoWithText } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Desktop header with scroll-based visibility.
 * - Hides when scrolling down
 * - Reveals when scrolling up
 * - Shows shadow when not at top
 * - Smooth scroll to sections with offset
 */
export const HeaderDesktop = () => {
  const t = useTranslations('landing.header');
  const { isVisible, isAtTop } = useHeaderScroll();
  const { scrollTo } = useLenis();

  const NAV = [
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#guide', label: t('nav.guide') },
    { href: '#faq', label: t('nav.faq') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: -100, duration: 1.2 });
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 bg-neutral-900',
          !isAtTop && 'shadow-lg'
        )}
      >
        <div className="container flex items-center justify-between py-4">
          {/* Left: Logo + Language switcher */}
          <div className="flex items-center gap-6">
            <LogoWithText />
            <LanguageSwitcher />
          </div>

          {/* Right: Nav links + Login button */}
          <div className="flex items-center gap-10">
            {NAV.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="font-roboto text-[18px] font-normal text-neutral-10 transition-colors hover:text-primary-500 active:text-primary-600"
              >
                {label}
              </a>
            ))}
            <Button href="/login" variant="orange" size="md">
              {t('login')}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
};
