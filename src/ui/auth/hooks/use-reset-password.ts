'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { resetPasswordAction } from '../server/auth-actions';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

interface ResetPasswordValues {
  password: string;
  passwordRepeat: string;
}

export interface UseResetPasswordReturn {
  form: ReturnType<typeof useForm<ResetPasswordValues>>;
  onSubmit: (values: ResetPasswordValues) => Promise<void>;
  serverError: string | null;
}

export function useResetPassword(email: string, code: string): UseResetPasswordReturn {
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z
    .object({
      password: z.string().min(8, tErrors('passwordMin')),
      passwordRepeat: z.string().min(1, tErrors('passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: tErrors('passwordMismatch'),
    });

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    // invalid_code / code_expired for password-reset mean the reset link expired,
    // not a generic "invalid code" — use domain-specific override.
    return mapApiError(code, tErrors, {
      invalid_code: tErrors('invalidResetToken'),
      code_expired: tErrors('invalidResetToken'),
    });
  }

  const onSubmit = async (values: ResetPasswordValues) => {
    setServerError(null);
    const result = await resetPasswordAction({
      email,
      code,
      new_password: values.password,
    });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    router.replace('/login');
  };

  return { form, onSubmit, serverError };
}
