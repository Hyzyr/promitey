'use client';

import { useTranslations } from 'next-intl';

import { useRegisterConfirm } from '@/ui/auth/hooks/use-register-confirm';

import { VerifyCodeForm } from './verify-code-form';

export interface RegisterConfirmFormProps {
  email: string;
}

export const RegisterConfirmForm = ({ email }: RegisterConfirmFormProps) => {
  const t = useTranslations('auth');
  const { onVerify, onSuccess } = useRegisterConfirm(email);

  return (
    <VerifyCodeForm
      recipient={email}
      description={t('register.confirmDescription')}
      stepLabel={t('register.confirmStep')}
      submitLabel={t('confirm.submit')}
      onVerify={onVerify}
      onSuccess={onSuccess}
    />
  );
};