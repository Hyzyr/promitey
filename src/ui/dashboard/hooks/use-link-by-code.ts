'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { linkByPublicCodeAction } from '../server/profile-actions';

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
  const t = useTranslations('auth');
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const schema = z.object({
    public_code: z.string().min(1, t('errors.codeRequired')),
  });

  const form = useForm<LinkByCodeValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    const map: Record<string, string> = {
      invalid_code: t('errors.invalidPublicCode'),
      already_linked: t('errors.alreadyLinked'),
      too_many_requests: t('errors.tooManyRequests'),
    };
    return map[code] ?? t('errors.generic');
  }

  const onSubmit = async (values: LinkByCodeValues) => {
    setServerError(null);
    const result = await linkByPublicCodeAction({ public_code: values.public_code });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    setSuccess(true);
  };

  return { form, onSubmit, serverError, success };
}
