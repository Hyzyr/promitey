'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';
import { PasswordRequirements } from './password-requirements';
import { useResetPassword } from '@/ui/auth/hooks/use-reset-password';

export interface ResetPasswordFormProps {
  /** Email address the reset code was sent to. */
  email: string;
  /** Optional verification code from a deep link or existing reset route. */
  initialCode?: string;
}

export const ResetPasswordForm = ({
  email,
  initialCode = '',
}: ResetPasswordFormProps) => {
  const t = useTranslations('auth');
  const { form, onSubmit, serverError } = useResetPassword(email, initialCode);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form;
  const password = watch('password') ?? '';
  const isSubmitDisabled = !isValid || serverError !== null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-3"
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {t('forgot.codeDescription')}{' '}
        <span className="font-semibold">{email}.</span>
      </p>

      <AuthStep label={t('forgot.step2')} />

      <Input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder={t('forgot.codePlaceholder')}
        maxLength={6}
        error={errors.code?.message}
        {...register('code')}
      />

      <AuthStep label={t('forgot.step3')} />

      <Input
        type="password"
        autoComplete="new-password"
        placeholder={t('placeholders.password')}
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordRequirements password={password} />
      <Input
        type="password"
        autoComplete="new-password"
        placeholder={t('placeholders.passwordRepeat')}
        error={errors.passwordRepeat?.message}
        {...register('passwordRepeat')}
      />

      {serverError && (
        <p className="font-manrope text-center text-[14px] text-red-500">{serverError}</p>
      )}

      <div className="flex w-full justify-center pt-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full max-w-53.75 capitalize"
          isLoading={isSubmitting}
          disabled={isSubmitDisabled}
        >
          {t('forgot.submit')}
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
