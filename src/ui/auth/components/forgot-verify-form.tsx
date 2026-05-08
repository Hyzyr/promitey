'use client';

import { ForgotPasswordConfirmForm } from './forgot-password-confirm-form';

export interface ForgotVerifyFormProps {
  email: string;
}

export const ForgotVerifyForm = ({ email }: ForgotVerifyFormProps) => {
  return <ForgotPasswordConfirmForm email={email} />;
};
