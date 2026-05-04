'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { activatePromocodeAction } from '../server/billing-actions';

import { mapApiError } from '@/lib/api-error';

import type { PromocodeActivateResponse } from '@/api/client/api-types';

interface PromocodeValues {
  code: string;
}

export interface UsePromocodeReturn {
  form: ReturnType<typeof useForm<PromocodeValues>>;
  onSubmit: (values: PromocodeValues) => Promise<void>;
  result: PromocodeActivateResponse | null;
  serverError: string | null;
  isSubmitting: boolean;
}

export function usePromocode(): UsePromocodeReturn {
  const t = useTranslations('dashboard.subscription');
  const tErrors = useTranslations('auth.errors');
  const [result, setResult] = useState<PromocodeActivateResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = z.object({
    code: z.string().min(1, t('promocode.codeRequired')),
  });

  const form = useForm<PromocodeValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    // Promocode-specific codes are domain strings, not in auth.errors.
    return mapApiError(code, tErrors, {
      code_not_found: t('promocode.notFound'),
      code_already_used: t('promocode.alreadyUsed'),
    });
  }

  const onSubmit = async (values: PromocodeValues) => {
    setServerError(null);
    setResult(null);
    setIsSubmitting(true);
    try {
      const res = await activatePromocodeAction(values.code);
      if (!res.ok) {
        setServerError(mapErrorCode(res.code));
        return;
      }
      setResult(res.data);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, result, serverError, isSubmitting };
}
