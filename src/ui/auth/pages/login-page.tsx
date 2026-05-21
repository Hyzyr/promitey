import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { AuthPolicy } from '@/ui/auth/components/auth-policy';
import { DevLoginButton } from '@/ui/auth/components/dev-login-button';
import { LoginForm } from '@/ui/auth/components/login-form';
import { IS_DEV_MOCK_API_ENABLED } from '@/lib/dev-session';

export const LoginPage = async () => {
  const t = await getTranslations('auth.login');

  return (
    <AuthCard
      title={t('title')}
      subtitle={t('subtitle')}
      footer={<AuthPolicy />}
    >
      <LoginForm />

      {IS_DEV_MOCK_API_ENABLED && (
        <DevLoginButton className="w-full border-t border-neutral-100 pt-6" />
      )}
    </AuthCard>
  );
};