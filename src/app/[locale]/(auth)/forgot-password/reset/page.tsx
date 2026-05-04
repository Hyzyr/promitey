import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { ResetPasswordForm } from '@/ui/auth/components/reset-password-form';

interface ResetPasswordPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : null;
  const code = typeof params.code === 'string' ? params.code : null;

  if (!email || !code) {
    const locale = await getLocale();
    redirect({ href: '/forgot-password', locale });
  }

  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('title')}>
      {/* email and code are guaranteed non-null: redirect() above handles null cases */}
      <ResetPasswordForm email={email!} code={code!} />
    </AuthCard>
  );
}
