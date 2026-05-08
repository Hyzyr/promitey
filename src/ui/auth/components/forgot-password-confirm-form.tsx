'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import { VerifyCodeForm } from './verify-code-form';

export interface ForgotPasswordConfirmFormProps {
  email: string;
}

export const ForgotPasswordConfirmForm = ({ email }: ForgotPasswordConfirmFormProps) => {
  const t = useTranslations('auth');
  const router = useRouter();
  const verifiedCodeRef = useRef<string | null>(null);

  const onVerify = async (code: string): Promise<{ ok: boolean; message?: string }> => {
    verifiedCodeRef.current = code;
    return { ok: true };
  };

  const onSuccess = () => {
    const code = verifiedCodeRef.current;
    if (!code) return;

    router.push(
      `/forgot-password/reset?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
    );
  };

  return (
    <VerifyCodeForm
      recipient={email}
      description={t('forgot.confirmDescription')}
      stepLabel={t('forgot.step2')}
      submitLabel={t('forgot.next')}
      onVerify={onVerify}
      onSuccess={onSuccess}
    />
  );
};