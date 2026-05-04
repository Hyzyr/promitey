'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { forgotPasswordAction } from '../server/auth-actions';

import { mapApiError } from '@/lib/api-error';

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
    email: z.string().min(1, tErrors('emailRequired')),
  });

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const onSubmit = async (values: ForgotPasswordValues) => {
    setServerError(null);
    const result = await forgotPasswordAction({ email: values.email });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    router.push(`/forgot-password/verify?email=${encodeURIComponent(result.data.email)}`);
  };

  return { form, onSubmit, serverError };
}
