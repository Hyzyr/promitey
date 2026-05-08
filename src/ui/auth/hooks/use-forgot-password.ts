'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { forgotPasswordAction } from '../server/auth-actions';
import { useClearAuthFormErrors } from './use-clear-auth-form-errors';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

interface ForgotPasswordValues {
  email: string;
}

export interface UseForgotPasswordReturn {
  form: ReturnType<typeof useForm<ForgotPasswordValues>>;
  onSubmit: (values: ForgotPasswordValues) => Promise<void>;
  serverError: string | null;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
  });

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const clearServerError = useCallback(() => {
    setServerError(null);
  }, []);

  useClearAuthFormErrors(form, serverError !== null, clearServerError);

  const onSubmit = async (values: ForgotPasswordValues) => {
    setServerError(null);
    const result = await forgotPasswordAction({ email: values.email });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    router.push(`/forgot-password/confirm?email=${encodeURIComponent(result.data.email)}`);
  };

  return { form, onSubmit, serverError };
}
