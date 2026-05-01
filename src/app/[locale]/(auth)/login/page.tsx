import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { AuthPolicy } from '@/ui/auth/components/auth-policy';
import { LoginForm } from '@/ui/auth/components/login-form';

export default async function LoginPage() {
  const t = await getTranslations('auth.login');

  return (
    <AuthCard
      title={t('title')}
      subtitle={t('subtitle')}
      footer={<AuthPolicy />}
    >
      <LoginForm />
    </AuthCard>
  );
}
