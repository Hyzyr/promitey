'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { registerAction } from '../server/auth-actions';

interface RegisterValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface UseRegisterReturn {
  form: ReturnType<typeof useForm<RegisterValues>>;
  onSubmit: (values: RegisterValues) => Promise<void>;
  serverError: string | null;
  success: boolean;
}

export function useRegister(): UseRegisterReturn {
  const t = useTranslations('auth');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const schema = z
    .object({
      email: z.string().min(1, t('errors.emailRequired')),
      password: z.string().min(8, t('errors.passwordMin')),
      passwordRepeat: z.string().min(1, t('errors.passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: t('errors.passwordMismatch'),
    });

  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    const map: Record<string, string> = {
      user_already_exists: t('errors.emailTaken'),
      too_many_requests: t('errors.tooManyRequests'),
    };
    return map[code] ?? t('errors.generic');
  }

  const onSubmit = async (values: RegisterValues) => {
    setServerError(null);
    const result = await registerAction({ email: values.email, password: values.password });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    setSuccess(true);
    router.replace('/login');
  };

  return { form, onSubmit, serverError, success };
}
