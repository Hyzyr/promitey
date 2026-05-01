import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * Footer policy line shown below the form on the login/register cards.
 * "By signing in, you confirm your agreement with the [Privacy Policy]."
 */
export const AuthPolicy = () => {
  const t = useTranslations('auth.footer');

  return (
    <p className="w-full max-w-[438px] text-center font-manrope text-[16px] leading-[1.6] tracking-[0.16px] text-neutral-600">
      {t('policy')}{' '}
      <Link
        href="/privacy"
        className="font-semibold text-neutral-300 underline hover:text-neutral-600"
      >
        {t('policyLink')}
      </Link>
    </p>
  );
};
