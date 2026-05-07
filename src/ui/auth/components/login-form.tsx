'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { useLogin } from '@/ui/auth/hooks/use-login';
import { TotpForm } from './totp-form';

export const LoginForm = () => {
  const t = useTranslations('auth');
  const {
    step,
    passwordForm,
    totpForm,
    onPasswordSubmit,
    onTotpSubmit,
    resetToPassword,
    serverError,
  } = useLogin();

  if (step === 'totp') {
    return (
      <TotpForm
        form={totpForm}
        onSubmit={onTotpSubmit}
        onBack={resetToPassword}
        serverError={serverError}
      />
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = passwordForm;
  const hasErrors = Object.keys(errors).length > 0 || serverError !== null;

  return (
    <form
      onSubmit={handleSubmit(onPasswordSubmit)}
      className="flex w-full flex-col gap-6"
      noValidate
    >
      <div className="flex w-full flex-col items-center gap-4">
        <Input
          type="email"
          autoComplete="email"
          placeholder={t('placeholders.email')}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          autoComplete="current-password"
          placeholder={t('placeholders.password')}
          error={errors.password?.message}
          {...register('password')}
        />
        <AuthLink href="/forgot-password">{t('links.forgot')}</AuthLink>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full"
          isLoading={isSubmitting}
          disabled={hasErrors}
        >
          {t('login.submit')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="w-full"
          href="/register"
        >
          {t('login.createAccount')}
        </Button>
      </div>

      {serverError && (
        <p className="w-full max-w-80 self-center text-center font-montserrat text-[16px] leading-normal tracking-[0.16px] text-red-500">
          {serverError}
        </p>
      )}
    </form>
  );
};
