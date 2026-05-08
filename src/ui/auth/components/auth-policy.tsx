import { useTranslations } from 'next-intl';
import { AuthLink } from './auth-link';

/**
 * Footer policy line shown below the form on the login/register cards.
 * "By signing in, you confirm your agreement with the [Privacy Policy]."
 */
export const AuthPolicy = () => {
  const t = useTranslations('auth.footer');

  return (
    <p className="max-w-80 w-[90%] text-center font-manrope text-[14px] md:text-[16px] leading-[1.6] tracking-[0.16px] text-neutral-600">
      {t('policy')}{' '}
      <AuthLink href="/privacy" className="text-[length:inherit]!">
        {t('policyLink')}
      </AuthLink>
    </p>
  );
};
