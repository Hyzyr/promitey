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

interface ResetPasswordFormProps {
  /** User identifier (email/login) the new password belongs to. */
  recipient?: string;
}

interface ResetPasswordFormValues {
  password: string;
  passwordRepeat: string;
}

export const ResetPasswordForm = ({ recipient }: ResetPasswordFormProps) => {
  const t = useTranslations('auth');
  const router = useRouter();

  const schema = z
    .object({
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
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (_values: ResetPasswordFormValues) => {
    // TODO: submit new password to API.
    router.push('/login');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-3"
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {t('forgot.resetDescription')}{' '}
        {recipient && <span className="font-semibold">{recipient}.</span>}
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
