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

export const HeaderDesktop = ({
  isAuthenticated = false,
}: HeaderDesktopProps) => {
  const t = useTranslations('landing.header');
  const { isVisible, isAtTop } = useHeaderScroll();
  const { scrollTo } = useLenis();

  const NAV = [
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#guide', label: t('nav.guide') },
    { href: '#faq', label: t('nav.faq') },
  ];

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    scrollTo(href, {
      offset: -5,
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'gpu-layer fixed top-0 right-0 left-0 z-50 bg-neutral-900',
          !isAtTop && 'shadow-lg',
        )}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3 lgx:gap-6">
            <Link href="/">
              <LogoWithText className="inline-flex h-8 w-auto lgx:h-9 xl:h-11" />
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-4 lgx:gap-8 xl:gap-10">
            <nav
              aria-label={t('navLabel')}
              className="flex items-center gap-4 lgx:gap-8 xl:gap-10"
            >
              {NAV.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(event) => handleNavClick(event, href)}
                  className="font-manrope text-[15px] font-normal text-neutral-10 transition-colors hover:text-primary-500 active:text-primary-600 lgx:text-[17px] xl:text-[18px]"
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
