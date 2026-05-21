'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { getTelegramLinkTokenAction } from '../server/profile-actions';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

export interface UseTelegramLinkTokenReturn {
  loading: boolean;
  error: string | null;
  onGetToken: () => Promise<void>;
}

export function useTelegramLinkToken(): UseTelegramLinkTokenReturn {
  const tErrors = useTranslations('auth.errors');
  const tTelegram = useTranslations('dashboard.profile.telegram');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGetToken = async () => {
    setError(null);
    setLoading(true);
    const result = await getTelegramLinkTokenAction();
    reportForwardedServerError(result);
    setLoading(false);
    if (!result.ok) {
      setError(mapApiError(result.code, tErrors));
      return;
    }

    if (!result.data.deep_link) {
      setError(tTelegram('linkUnavailable'));
      return;
    }

    window.open(result.data.deep_link, '_blank');
  };

  return { loading, error, onGetToken };
}
