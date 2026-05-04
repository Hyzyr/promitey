'use client';

import { useTranslations } from 'next-intl';

import { VerifyCodeForm } from './verify-code-form';
import { useRegisterConfirm } from '@/ui/auth/hooks/use-register-confirm';

export interface RegisterVerifyFormProps {
  email: string;
}

export const RegisterVerifyForm = ({ email }: RegisterVerifyFormProps) => {
  const t = useTranslations('auth');
  const { onVerify } = useRegisterConfirm(email);

  return (
    <VerifyCodeForm
      recipient={email}
      stepLabel={t('forgot.step2')}
      onVerify={onVerify}
    />
  );
};
