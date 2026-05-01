import { getTranslations } from 'next-intl/server';

import { AuthCard } from '@/ui/auth/components/auth-card';
import { VerifyCodeForm } from '@/ui/auth/components/verify-code-form';

export default async function VerifyCodePage() {
  const t = await getTranslations('auth.forgot');

  return (
    <AuthCard title={t('title')}>
      <VerifyCodeForm />
    </AuthCard>
  );
}
