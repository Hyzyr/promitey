'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { resetPasswordAction } from '../server/auth-actions';
import { useClearAuthFormErrors } from './use-clear-auth-form-errors';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

interface ResetPasswordValues {
  code: string;
  password: string;
  passwordRepeat: string;
}

export interface UseResetPasswordReturn {
  form: ReturnType<typeof useForm<ResetPasswordValues>>;
  onSubmit: (values: ResetPasswordValues) => Promise<void>;
  serverError: string | null;
}

export function useResetPassword(
  email: string,
  initialCode = '',
): UseResetPasswordReturn {
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z
    .object({
      code: z
        .string()
        .min(1, tErrors('codeRequired'))
        .regex(/^\d{6}$/, tErrors('codeIncomplete')),
      password: z
        .string()
        .min(10, tErrors('passwordMin'))
        .regex(/[A-Z]/, tErrors('passwordUppercase'))
        .regex(/[a-z]/, tErrors('passwordLowercase'))
        .regex(/\d/, tErrors('passwordNumber')),
      passwordRepeat: z.string().min(1, tErrors('passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: tErrors('passwordMismatch'),
    });

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      code: initialCode,
    },
  });

  function mapErrorCode(errorCode: string): string {
    // invalid_code / code_expired for password-reset mean the reset link expired,
    // not a generic "invalid code" — use domain-specific override.
    return mapApiError(errorCode, tErrors, {
      invalid_code: tErrors('invalidResetToken'),
      code_expired: tErrors('invalidResetToken'),
    });
  }

  const clearServerError = useCallback(() => {
    setServerError(null);
  }, []);

  useClearAuthFormErrors(form, serverError !== null, clearServerError);

  const onSubmit = async (values: ResetPasswordValues) => {
    setServerError(null);
    const result = await resetPasswordAction({
      email,
      code: values.code,
      new_password: values.password,
    });
    reportForwardedServerError(result);
    if (!result.ok) {
      const message = mapErrorCode(result.code);

      if (result.code === 'invalid_code' || result.code === 'code_expired') {
        form.setError('code', { type: 'server', message });
      }

      setServerError(message);
      return;
    }
    router.replace('/login');
  };

  return { form, onSubmit, serverError };
}
