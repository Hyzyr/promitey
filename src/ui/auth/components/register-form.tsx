'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { PasswordRequirements, isPasswordRequirementsMet } from './password-requirements';
import { useRegister } from '@/ui/auth/hooks/use-register';

export const RegisterForm = () => {
  const t = useTranslations('auth');
  const { form, onSubmit, serverError } = useRegister();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, submitCount },
  } = form;
  const password = watch('password') ?? '';
  const showPasswordRequirements =
    (submitCount > 0) && !isPasswordRequirementsMet(password);
  const isSubmitDisabled = isSubmitting || !isValid || serverError !== null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          autoComplete="new-password"
          placeholder={t('placeholders.password')}
          error={submitCount > 0 ? errors.password?.message : undefined}
          {...register('password')}
        />
        <Input
          type="password"
          autoComplete="new-password"
          placeholder={t('placeholders.passwordRepeat')}
          error={submitCount > 0 ? errors.passwordRepeat?.message : undefined}
          {...register('passwordRepeat')}
        />
      </div>

      {showPasswordRequirements && <PasswordRequirements password={password} />}

      <div className="flex w-full flex-col items-center gap-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full"
          isLoading={isSubmitting}
          disabled={submitCount !== 0 && isSubmitDisabled}
        >
          {t('register.submit')}
        </Button>
      </div>

      {serverError && (
        <p className="font-montserrat w-full max-w-81 self-center text-center text-[16px] leading-normal tracking-[0.16px] text-red-500">
          {serverError}
        </p>
      )}

      <div className="flex w-full justify-center">
        <AuthLink href="/login">{t('links.haveAccount')}</AuthLink>
      </div>
    </form>
  );
};
