'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResetPassword } from '@/ui/auth/hooks/use-reset-password';
import { readResetPasswordCode } from '@/ui/auth/reset-password-code-session';
import { cn } from '@/lib/utils';

import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';
import { PasswordRequirements, isPasswordRequirementsMet } from './password-requirements';
import { VerificationCodeInput, VERIFICATION_CODE_LENGTH } from './verification-code-input';

export interface ResetPasswordFormProps {
  /** Email address the reset code was sent to. */
  email: string;
  /** Optional verification code from a deep link or existing reset route. */
  initialCode?: string;
}

type ResetPasswordStep = 'code' | 'password';

const isVerificationCodeComplete = (code: string) =>
  new RegExp(`^\\d{${VERIFICATION_CODE_LENGTH}}$`).test(code);

export const ResetPasswordForm = ({
  email,
  initialCode = '',
}: ResetPasswordFormProps) => {
  const t = useTranslations('auth');
  const [step, setStep] = useState<ResetPasswordStep>('code');
  const [expectedCode] = useState(() =>
    readResetPasswordCode(email) ?? (isVerificationCodeComplete(initialCode) ? initialCode : null),
  );
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const { form, onSubmit, serverError } = useResetPassword(email, {
    initialCode,
    onInvalidCode: () => {
      setIsCodeSubmitted(true);
      setStep('code');
    },
  });

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, submitCount },
  } = form;
  const code = watch('code') ?? '';
  const password = watch('password') ?? '';
  const showPasswordRequirements =
    (password.length > 0 || submitCount > 0) && !isPasswordRequirementsMet(password);
  const codeError = isCodeSubmitted ? errors.code?.message : undefined;
  const isCodeStepDisabled = isSubmitting;
  const isSubmitDisabled = isSubmitting || !isValid || serverError !== null;

  const handleCodeChange = (nextCode: string) => {
    setIsCodeSubmitted(false);
    clearErrors('code');
    setValue('code', nextCode, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

  const handleCodeContinue = async () => {
    setIsCodeSubmitted(true);
    const isCodeValid = await trigger('code', { shouldFocus: true });

    if (!isCodeValid) return;

    if (expectedCode && code !== expectedCode) {
      setError('code', { type: 'manual', message: t('errors.invalidCode') });
      return;
    }

    setStep('password');
  };

  const renderAuthLinks = () => (
    <div className="flex w-full flex-col items-center pt-4">
      <AuthLink href="/register" className="py-1.5">
        {t('links.createAccount')}
      </AuthLink>
      <AuthLink href="/login" className="py-1.5">
        {t('links.signIn')}
      </AuthLink>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-3"
      noValidate
    >
      <input type="hidden" {...register('code')} />

      {step === 'code' ? (
        <>
          <AuthStep label={t('forgot.step2')} />

          <VerificationCodeInput
            value={code}
            onChange={handleCodeChange}
            error={codeError}
            disabled={isSubmitting}
          />

          {codeError && (
            <p className="font-manrope text-center text-[14px] text-red-500">
              {codeError}
            </p>
          )}

          <p className="font-manrope text-center text-[13px] leading-normal text-neutral-400">
            {t('forgot.codeDescription')}{' '}
            <span className="font-medium text-neutral-500">{email}</span>
          </p>

          <div className="flex w-full justify-center pt-3">
            <Button
              type="button"
              variant="orange"
              size="md"
              className="w-full max-w-53.75 capitalize"
              isLoading={isSubmitting}
              disabled={isCodeStepDisabled}
              onClick={handleCodeContinue}
            >
              {t('forgot.next')}
            </Button>
          </div>

          {renderAuthLinks()}
        </>
      ) : (
        <>
          <AuthStep label={t('forgot.step3')} />

          <Input
            type="password"
            autoComplete="new-password"
            placeholder={t('placeholders.password')}
            error={errors.password?.message}
            disabled={isSubmitting}
            {...register('password')}
          />
          <Input
            type="password"
            autoComplete="new-password"
            placeholder={t('placeholders.passwordRepeat')}
            error={errors.passwordRepeat?.message}
            disabled={isSubmitting}
            {...register('passwordRepeat')}
          />

          {showPasswordRequirements && <PasswordRequirements password={password} />}

          {serverError && (
            <p className="font-manrope text-center text-[14px] text-red-500">{serverError}</p>
          )}

          <div className="flex w-full flex-col gap-2 pt-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full max-w-53.75 capitalize"
              disabled={isSubmitting}
              onClick={() => setStep('code')}
            >
              {t('forgot.back')}
            </Button>
            <Button
              type="submit"
              variant="orange"
              size="md"
              className={cn('w-full max-w-53.75 capitalize')}
              isLoading={isSubmitting}
              disabled={isSubmitDisabled}
            >
              {t('forgot.submit')}
            </Button>
          </div>

          {renderAuthLinks()}
        </>
      )}
    </form>
  );
};
