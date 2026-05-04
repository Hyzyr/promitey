'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { registerAction } from '../server/auth-actions';

import { mapApiError } from '@/lib/api-error';

interface RegisterValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface UseRegisterReturn {
  form: ReturnType<typeof useForm<RegisterValues>>;
  onSubmit: (values: RegisterValues) => Promise<void>;
  serverError: string | null;
}

export function useRegister(): UseRegisterReturn {
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z
    .object({
      email: z.string().min(1, tErrors('emailRequired')),
      password: z.string().min(8, tErrors('passwordMin')),
      passwordRepeat: z.string().min(1, tErrors('passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: tErrors('passwordMismatch'),
    });

  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const onSubmit = async (values: RegisterValues) => {
    setServerError(null);
    const result = await registerAction({ email: values.email, password: values.password });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    router.push(`/register/verify?email=${encodeURIComponent(result.data.email)}`);
  };

  return { form, onSubmit, serverError };
}
