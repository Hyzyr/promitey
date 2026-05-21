'use client';

import { useTranslations } from 'next-intl';

import type { UseLoginReturn } from '@/ui/auth/hooks/use-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface TotpFormProps {
  form: UseLoginReturn['totpForm'];
  onSubmit: UseLoginReturn['onTotpSubmit'];
  onBack: () => void;
  serverError: string | null;
  isRedirecting: boolean;
}

export const TotpForm = ({
  form,
  onSubmit,
  onBack,
  serverError,
  isRedirecting,
}: TotpFormProps) => {
  const t = useTranslations('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const hasErrors = Object.keys(errors).length > 0 || serverError !== null;
  const isSubmitBlocked = hasErrors || isRedirecting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {t('login.totpSubtitle')}
      </p>

      <Input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder={t('login.totpPlaceholder')}
        error={errors.code?.message}
        {...register('code')}
      />

      {serverError && (
        <p className="font-montserrat w-full max-w-81 self-center text-center text-[16px] leading-normal tracking-[0.16px] text-red-500">
          {serverError}
        </p>
      )}

      <div className="flex w-full flex-col gap-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full"
          isLoading={isSubmitting || isRedirecting}
          disabled={isSubmitBlocked}
        >
          {t('login.totpSubmit')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="w-full"
          onClick={onBack}
          disabled={isRedirecting}
        >
          {t('login.totpBack')}
        </Button>
      </div>

      {isRedirecting && (
        <p className="font-montserrat w-full max-w-81 self-center text-center text-[16px] leading-normal tracking-[0.16px] text-neutral-500">
          {t('login.redirecting')}
        </p>
      )}
    </form>
  );
};
