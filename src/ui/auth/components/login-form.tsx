'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';

interface LoginFormValues {
  identifier: string;
  password: string;
}

export const LoginForm = () => {
  const t = useTranslations('auth');
  const [rootError, setRootError] = useState<string | null>(null);

  const schema = z.object({
    identifier: z.string().min(1, t('errors.emailRequired')),
    password: z.string().min(1, t('errors.passwordRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (_values: LoginFormValues) => {
    // TODO: wire authentication API. For now, surface a sample failure to keep
    // the visual error state reachable for UX/QA.
    setRootError(t('errors.badCredentials'));
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
          autoComplete="current-password"
          placeholder={t('placeholders.password')}
          error={errors.password?.message}
          hideMessages
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

      {rootError && (
        <p className="font-montserrat w-full max-w-[324px] self-center text-center text-[16px] leading-[1.5] tracking-[0.16px] text-red-500">
          {rootError}
        </p>
      )}
    </form>
  );
};
