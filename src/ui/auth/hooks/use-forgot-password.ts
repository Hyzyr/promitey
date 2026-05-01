'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { forgotPasswordAction } from '../server/auth-actions';

interface ForgotPasswordValues {
  email: string;
}

export interface UseForgotPasswordReturn {
  form: ReturnType<typeof useForm<ForgotPasswordValues>>;
  onSubmit: (values: ForgotPasswordValues) => Promise<void>;
  serverError: string | null;
  emailSent: boolean;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const t = useTranslations('auth');
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const schema = z.object({
    email: z.string().min(1, t('errors.emailRequired')),
  });

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    const map: Record<string, string> = {
      too_many_requests: t('errors.tooManyRequests'),
    };
    return map[code] ?? t('errors.generic');
  }

  const onSubmit = async (values: ForgotPasswordValues) => {
    setServerError(null);
    const result = await forgotPasswordAction({ email: values.email });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    setEmailSent(true);
  };

  return { form, onSubmit, serverError, emailSent };
}
