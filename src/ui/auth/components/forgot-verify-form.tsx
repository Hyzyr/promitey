'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { VerifyCodeForm } from './verify-code-form';

export interface ForgotVerifyFormProps {
  email: string;
}

export const ForgotVerifyForm = ({ email }: ForgotVerifyFormProps) => {
  const t = useTranslations('auth');
  const router = useRouter();

  const onVerify = async (code: string): Promise<{ ok: boolean; message?: string }> => {
    router.push(
      `/forgot-password/reset?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
    );
    return { ok: true };
  };

  return (
    <VerifyCodeForm
      recipient={email}
      stepLabel={t('forgot.step2')}
      onVerify={onVerify}
    />
  );
};
