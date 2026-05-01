'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';

interface ForgotPasswordFormValues {
  identifier: string;
}

export const ForgotPasswordForm = () => {
  const t = useTranslations('auth');
  const router = useRouter();

  const schema = z.object({
    identifier: z.string().min(1, t('errors.emailRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (_values: ForgotPasswordFormValues) => {
    // TODO: trigger reset email request.
    router.push('/forgot-password/verify');
  };

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
        type="text"
        autoComplete="username"
        placeholder={t('placeholders.emailOrLogin')}
        error={errors.identifier?.message}
        hideMessages
        {...register('identifier')}
      />

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
