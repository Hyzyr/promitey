'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { changePasswordAction } from '../server/profile-actions';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UseChangePasswordReturn {
  form: ReturnType<typeof useForm<ChangePasswordValues>>;
  onSubmit: (values: ChangePasswordValues) => Promise<void>;
  serverError: string | null;
  success: boolean;
}

export function useChangePassword(): UseChangePasswordReturn {
  const tErrors = useTranslations('auth.errors');
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const schema = z
    .object({
      currentPassword: z.string().min(1, tErrors('passwordRequired')),
      newPassword: z.string().min(8, tErrors('passwordMin')),
      confirmPassword: z.string().min(1, tErrors('passwordRequired')),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
      path: ['confirmPassword'],
      message: tErrors('passwordMismatch'),
    });

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const onSubmit = async (values: ChangePasswordValues) => {
    setServerError(null);
    setSuccess(false);
    const result = await changePasswordAction({
      current_password: values.currentPassword,
      new_password: values.newPassword,
    });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    setSuccess(true);
    form.reset();
  };

  return { form, onSubmit, serverError, success };
}
