'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  CODE_SUCCESS_ANIMATION_MS,
  CodeSuccessAnimation,
} from '@/components/ui/code-success-animation';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';
import { confirmEmailChangeAction } from '@/ui/auth/server/auth-actions';

interface EmailChangeConfirmValues {
  code: string;
}

export interface EmailChangeConfirmFormProps {
  email: string;
}

export const EmailChangeConfirmForm = ({ email }: EmailChangeConfirmFormProps) => {
  const t = useTranslations('dashboard.profile.emailChange');
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const schema = z.object({
    code: z.string().min(6, tErrors('codeIncomplete')),
  });

  const form = useForm<EmailChangeConfirmValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const clearState = useCallback(() => {
    clearErrors();
    setServerError(null);
  }, [clearErrors]);

  const onSubmit = async (values: EmailChangeConfirmValues) => {
    setServerError(null);
    const result = await confirmEmailChangeAction({ code: values.code });
    reportForwardedServerError(result);

    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }

    setIsSuccess(true);
  };

  useEffect(() => {
    if (!isSuccess) return;

    const timeout = window.setTimeout(() => {
      router.replace('/dashboard/profile?emailChanged=1');
    }, CODE_SUCCESS_ANIMATION_MS);

    return () => window.clearTimeout(timeout);
  }, [isSuccess, router]);

  const hasErrors = Object.keys(errors).length > 0 || serverError !== null;

  if (isSuccess) {
    return <CodeSuccessAnimation />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-125 flex-col gap-5"
      noValidate
    >
      <p className="text-sm leading-[1.6] text-neutral-500">
        {t('codeSentTo')}{' '}
        <span className="font-medium text-neutral-800">{email}</span>.
      </p>

      <Input
        label={t('codeLabel')}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        variant="light"
        error={errors.code?.message}
        onInput={clearState}
        {...register('code')}
      />

      {serverError && (
        <p className="text-sm text-red-500">{serverError}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          isLoading={isSubmitting}
          disabled={hasErrors}
        >
          {t('submitConfirm')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => router.push('/dashboard/profile')}
        >
          {t('back')}
        </Button>
      </div>
    </form>
  );
};