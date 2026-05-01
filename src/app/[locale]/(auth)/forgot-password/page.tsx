import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { ForgotPasswordForm } from '@/ui/auth/components/forgot-password-form';

export default async function ForgotPasswordPage() {
  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('title')}>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
