'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { resetPasswordAction } from '../server/auth-actions';

interface ResetPasswordValues {
  password: string;
  passwordRepeat: string;
}

export interface UseResetPasswordReturn {
  form: ReturnType<typeof useForm<ResetPasswordValues>>;
  onSubmit: (values: ResetPasswordValues) => Promise<void>;
  serverError: string | null;
}

export function useResetPassword(token: string): UseResetPasswordReturn {
  const t = useTranslations('auth');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z
    .object({
      password: z.string().min(8, t('errors.passwordMin')),
      passwordRepeat: z.string().min(1, t('errors.passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: t('errors.passwordMismatch'),
    });

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    const map: Record<string, string> = {
      invalid_token: t('errors.invalidResetToken'),
      token_expired: t('errors.invalidResetToken'),
      too_many_requests: t('errors.tooManyRequests'),
    };
    return map[code] ?? t('errors.generic');
  }

  const onSubmit = async (values: ResetPasswordValues) => {
    setServerError(null);
    const result = await resetPasswordAction({
      token,
      new_password: values.password,
    });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    router.replace('/login');
  };

  return { form, onSubmit, serverError };
}
