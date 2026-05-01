'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';
import { useForgotPassword } from '@/ui/auth/hooks/use-forgot-password';

export const ForgotPasswordForm = () => {
  const t = useTranslations('auth');
  const { form, onSubmit, serverError, emailSent } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  if (emailSent) {
    return (
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <p className="font-montserrat text-[16px] font-semibold leading-[1.5] text-neutral-900">
          {t('forgot.emailSentTitle')}
        </p>
        <p className="font-montserrat text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
          {t('forgot.emailSentBody')}
        </p>
        <div className="flex w-full flex-col items-center pt-4">
          <AuthLink href="/login" className="py-1.5">
            {t('links.signIn')}
          </AuthLink>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-3"
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {t('forgot.emailDescription')}
      </p>

      <AuthStep label={t('forgot.step1')} />

      <Input
        type="email"
        autoComplete="email"
        placeholder={t('placeholders.email')}
        error={errors.email?.message}
        hideMessages
        {...register('email')}
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
