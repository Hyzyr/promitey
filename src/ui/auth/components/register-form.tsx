'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { useRegister } from '@/ui/auth/hooks/use-register';

export const RegisterForm = () => {
  const t = useTranslations('auth');
  const { form, onSubmit, serverError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

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
          hideMessages
          {...register('email')}
        />
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
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full"
          isLoading={isSubmitting}
        >
          {t('register.submit')}
        </Button>
      </div>

      {serverError && (
        <p className="font-montserrat w-full max-w-[324px] self-center text-center text-[16px] leading-[1.5] tracking-[0.16px] text-red-500">
          {serverError}
        </p>
      )}

      <div className="flex w-full justify-center">
        <AuthLink href="/login">{t('links.haveAccount')}</AuthLink>
      </div>
    </form>
  );
};
