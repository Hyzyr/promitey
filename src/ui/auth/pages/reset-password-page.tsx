import { getLocale, getTranslations } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { AuthCard } from '@/ui/auth/components/auth-card';
import { ResetPasswordForm } from '@/ui/auth/components/reset-password-form';

interface ResetPasswordPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : null;
  const code = typeof params.code === 'string' ? params.code : null;

  if (!email) {
    const locale = await getLocale();
    return redirect({ href: '/forgot-password', locale });
  }

  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('resetTitle')} subtitle={t('resetSubtitle')}>
      <ResetPasswordForm email={email} initialCode={code ?? ''} />
    </AuthCard>
  );
};