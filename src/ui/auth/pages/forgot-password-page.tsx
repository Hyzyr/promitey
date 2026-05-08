import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { ForgotPasswordForm } from '@/ui/auth/components/forgot-password-form';

export const ForgotPasswordPage = async () => {
  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('title')} subtitle={t('emailDescription')}>
      <ForgotPasswordForm />
    </AuthCard>
  );
};