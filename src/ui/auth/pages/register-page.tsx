import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { AuthPolicy } from '@/ui/auth/components/auth-policy';
import { RegisterForm } from '@/ui/auth/components/register-form';

export const RegisterPage = async () => {
  const t = await getTranslations('auth.register');

  return (
    <AuthCard
      title={t('title')}
      subtitle={t('subtitle')}
      footer={<AuthPolicy />}
    >
      <RegisterForm />
    </AuthCard>
  );
};