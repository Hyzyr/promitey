import { getLocale, getTranslations } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { AuthCard } from '@/ui/auth/components/auth-card';
import { ForgotPasswordConfirmForm } from '@/ui/auth/components/forgot-password-confirm-form';

interface ForgotPasswordConfirmPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const ForgotPasswordConfirmPage = async ({
  searchParams,
}: ForgotPasswordConfirmPageProps) => {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : null;

  if (!email) {
    const locale = await getLocale();
    return redirect({ href: '/forgot-password', locale });
  }

  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('resetTitle')} subtitle={t('resetSubtitle')}>
      <ForgotPasswordConfirmForm email={email} />
    </AuthCard>
  );
};