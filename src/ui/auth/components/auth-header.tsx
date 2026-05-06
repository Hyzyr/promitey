import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo, LogoWithText } from '@/components/ui/logo';

/**
 * Sticky auth header. Mirrors public-header structure but minimal:
 *   - Logo only on mobile
 *   - Logo + single "Features" link on desktop
 *
 * No language switcher / no nav menu: the auth pages stay focused.
 */
export const AuthHeader = () => {
  const t = useTranslations('auth.header');

  return (
    <header className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-5 py-4 backdrop-blur-[24.75px] md:px-10 lg:px-[101px] lg:py-6">
      <Link href="/" className="inline-flex" aria-label={t('logoLabel')}>
        <Logo className="inline-flex h-7 w-auto lg:hidden" />
        <LogoWithText className="hidden h-9 w-auto lg:inline-flex" />
      </Link>

      <Link
        href="/#benefits"
        className="hidden font-montserrat text-[18px] text-neutral-200 transition-colors hover:text-neutral-900 lg:inline-block"
      >
        {t('nav')}
      </Link>
    </header>
  );
};
