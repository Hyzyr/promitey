'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

import { linkByPublicCodeAction } from '../server/profile-actions';
import { useDelayedRefresh } from './use-delayed-refresh';

interface LinkByCodeValues {
  public_code: string;
}

export interface UseLinkByCodeReturn {
  form: ReturnType<typeof useForm<LinkByCodeValues>>;
  onSubmit: (values: LinkByCodeValues) => Promise<void>;
  serverError: string | null;
  success: boolean;
}

export function useLinkByCode(): UseLinkByCodeReturn {
  const tErrors = useTranslations('auth.errors');
  const refreshAfterDelay = useDelayedRefresh();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const schema = z.object({
    public_code: z.string().min(1, tErrors('codeRequired')),
  });

  const form = useForm<LinkByCodeValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    // invalid_code in this context means the public link code is invalid,
    // not a generic OTP code — use domain-specific label.
    return mapApiError(code, tErrors, {
      invalid_code: tErrors('invalidPublicCode'),
    });
  }

  const onSubmit = async (values: LinkByCodeValues) => {
    setServerError(null);
    const result = await linkByPublicCodeAction({ public_code: values.public_code });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    setSuccess(true);
    form.reset();
    void refreshAfterDelay();
  };

  return { form, onSubmit, serverError, success };
}
