import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { AuthPolicy } from '@/ui/auth/components/auth-policy';
import { LoginForm } from '@/ui/auth/components/login-form';
import { DevLoginButton } from '@/ui/auth/components/dev-login-button';

export default async function LoginPage() {
  const t = await getTranslations('auth.login');

  return (
    <AuthCard
      title={t('title')}
      subtitle={t('subtitle')}
      footer={<AuthPolicy />}
    >
      <LoginForm />

      {process.env.NODE_ENV === 'development' && (
        <DevLoginButton className="w-full border-t border-neutral-100 pt-6" />
      )}
    </AuthCard>
  );
}
