import { getLocale, getTranslations } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { AuthCard } from '@/ui/auth/components/auth-card';
import { RegisterConfirmForm } from '@/ui/auth/components/register-confirm-form';

interface RegisterConfirmPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const RegisterConfirmPage = async ({
  searchParams,
}: RegisterConfirmPageProps) => {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : null;

  if (!email) {
    const locale = await getLocale();
    return redirect({ href: '/register', locale });
  }

  const t = await getTranslations('auth.register');

  return (
    <AuthCard title={t('verifyTitle')}>
      <RegisterConfirmForm email={email} />
    </AuthCard>
  );
};