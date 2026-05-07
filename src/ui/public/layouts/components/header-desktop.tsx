'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useHeaderScroll } from '@/hooks/use-header-scroll';
import { useLenis } from '@/components/providers/lenis-provider';
import { LogoWithText } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface HeaderDesktopProps {
  isAuthenticated?: boolean;
}

/**
 * Desktop header with scroll-based visibility.
 * - Hides when scrolling down
 * - Reveals when scrolling up
 * - Shows shadow when not at top
 * - Smooth scroll to sections with offset
 */
export const HeaderDesktop = ({ isAuthenticated = false }: HeaderDesktopProps) => {
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
          'gpu-layer fixed top-0 right-0 left-0 z-50 bg-neutral-900',
          !isAtTop && 'shadow-lg'
        )}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <LogoWithText className="inline-flex h-9 w-auto xl:h-11" />
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-10">
            <nav aria-label="Main navigation" className="flex items-center gap-10">
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
            </nav>
            {isAuthenticated ? (
              <Button href="/dashboard" variant="orange" size="md">
                {t('dashboard')}
              </Button>
            ) : (
              <Button href="/login" variant="orange" size="md">
                {t('login')}
              </Button>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
};
