import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { ResetPasswordForm } from '@/ui/auth/components/reset-password-form';

interface ResetPasswordPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = typeof params.token === 'string' ? params.token : null;

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/forgot-password', locale });
  }

  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('title')}>
      {/* token is guaranteed non-null: redirect() above handles the null case */}
      <ResetPasswordForm token={token!} />
    </AuthCard>
  );
}
