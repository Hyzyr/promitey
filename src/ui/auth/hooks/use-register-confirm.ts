'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { registerConfirmAction } from '../server/auth-actions';

import { mapApiError } from '@/lib/api-error';

export interface UseRegisterConfirmReturn {
  isSubmitting: boolean;
  onVerify: (code: string) => Promise<{ ok: boolean; message?: string }>;
}

export function useRegisterConfirm(email: string): UseRegisterConfirmReturn {
  const tErrors = useTranslations('auth.errors');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const onVerify = async (code: string): Promise<{ ok: boolean; message?: string }> => {
    setIsSubmitting(true);
    try {
      const result = await registerConfirmAction({ email, code });
      if (!result.ok) {
        return { ok: false, message: mapErrorCode(result.code) };
      }
      router.replace('/login');
      return { ok: true };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onVerify };
}
