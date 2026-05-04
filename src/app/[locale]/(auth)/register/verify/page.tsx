import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { RegisterVerifyForm } from '@/ui/auth/components/register-verify-form';

interface RegisterVerifyPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RegisterVerifyPage({ searchParams }: RegisterVerifyPageProps) {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : null;

  if (!email) {
    const locale = await getLocale();
    redirect({ href: '/register', locale });
  }

  const t = await getTranslations('auth.register');

  return (
    <AuthCard title={t('verifyTitle')}>
      <RegisterVerifyForm email={email!} />
    </AuthCard>
  );
}
