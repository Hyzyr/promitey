'use client';

import { RegisterConfirmForm } from './register-confirm-form';

export interface RegisterVerifyFormProps {
  email: string;
}

export const RegisterVerifyForm = ({ email }: RegisterVerifyFormProps) => {
  return <RegisterConfirmForm email={email} />;
};
