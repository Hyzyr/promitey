'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';

interface RegisterFormValues {
  identifier: string;
  password: string;
  passwordRepeat: string;
}

export const RegisterForm = () => {
  const t = useTranslations('auth');

  const schema = z
    .object({
      identifier: z.string().min(1, t('errors.emailRequired')),
      password: z.string().min(8, t('errors.passwordMin')),
      passwordRepeat: z.string().min(1, t('errors.passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: t('errors.passwordMismatch'),
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (_values: RegisterFormValues) => {
    // TODO: wire registration API.
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
      noValidate
    >
      <div className="flex w-full flex-col items-center gap-4">
        <Input
          type="text"
          autoComplete="username"
          placeholder={t('placeholders.emailOrLogin')}
          error={errors.identifier?.message}
          hideMessages
          {...register('identifier')}
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

      <div className="flex w-full justify-center">
        <AuthLink href="/login">{t('links.haveAccount')}</AuthLink>
      </div>
    </form>
  );
};
