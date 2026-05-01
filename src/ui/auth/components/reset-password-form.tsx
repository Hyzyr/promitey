'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';
import { useResetPassword } from '@/ui/auth/hooks/use-reset-password';

export interface ResetPasswordFormProps {
  /** Reset token from URL search params. */
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const t = useTranslations('auth');
  const { form, onSubmit, serverError } = useResetPassword(token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-3"
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {t('forgot.resetDescription')}
      </p>

      <AuthStep label={t('forgot.step3')} />

      <Input
        type="password"
        autoComplete="new-password"
        placeholder={t('placeholders.password')}
        error={errors.password?.message}
        hideMessages
        {...register('password')}
      />
      <Input
        type="password"
        autoComplete="new-password"
        placeholder={t('placeholders.passwordRepeat')}
        error={errors.passwordRepeat?.message}
        hideMessages
        {...register('passwordRepeat')}
      />

      {serverError && (
        <p className="font-roboto text-center text-[14px] text-red-500">{serverError}</p>
      )}

      <div className="flex w-full justify-center pt-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full max-w-53.75 capitalize"
          isLoading={isSubmitting}
        >
          {t('forgot.next')}
        </Button>
      </div>

      <div className="flex w-full flex-col items-center pt-4">
        <AuthLink href="/register" className="py-1.5">
          {t('links.createAccount')}
        </AuthLink>
        <AuthLink href="/login" className="py-1.5">
          {t('links.signIn')}
        </AuthLink>
      </div>
    </form>
  );
};
