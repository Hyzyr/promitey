import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo, LogoWithText } from '@/components/ui/logo';

export const AuthHeader = () => {
  const t = useTranslations('auth.header');

  return (
    <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-5 py-4 md:px-10 lg:px-25 lg:py-6">
      <Link href="/" className="inline-flex" aria-label={t('logoLabel')}>
        <Logo className="inline-flex h-7 w-auto lg:hidden" />
        <LogoWithText dark className="hidden h-9 w-auto lg:inline-flex" />
      </Link>
    </header>
  );
};
