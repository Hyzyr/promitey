import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { ResetPasswordForm } from '@/ui/auth/components/reset-password-form';

export default async function ResetPasswordPage() {
  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('title')}>
      <ResetPasswordForm />
    </AuthCard>
  );
}
