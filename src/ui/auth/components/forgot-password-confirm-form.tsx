import { ResetPasswordForm } from './reset-password-form';

export interface ForgotPasswordConfirmFormProps {
  email: string;
}

export const ForgotPasswordConfirmForm = ({ email }: ForgotPasswordConfirmFormProps) => {
  return <ResetPasswordForm email={email} />;
};