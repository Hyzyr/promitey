'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { prepareEmailChangeAction } from '../../auth/server/auth-actions';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

interface PrepareValues {
  new_email: string;
}

export interface UseEmailChangeReturn {
  prepareForm: ReturnType<typeof useForm<PrepareValues>>;
  onPrepareSubmit: (values: PrepareValues) => Promise<void>;
  serverError: string | null;
  isSubmitting: boolean;
}

export function useEmailChange(): UseEmailChangeReturn {
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prepareSchema = z.object({
    new_email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
  });

  const prepareForm = useForm<PrepareValues>({
    resolver: zodResolver(prepareSchema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const onPrepareSubmit = async (values: PrepareValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      const result = await prepareEmailChangeAction({ new_email: values.new_email });
      reportForwardedServerError(result);
      if (!result.ok) {
        setServerError(mapErrorCode(result.code));
        return;
      }
      router.push(
        `/dashboard/profile/email/confirm?email=${encodeURIComponent(values.new_email)}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    prepareForm,
    onPrepareSubmit,
    serverError,
    isSubmitting,
  };
}
