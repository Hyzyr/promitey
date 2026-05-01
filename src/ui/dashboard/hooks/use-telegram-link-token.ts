'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { getTelegramLinkTokenAction } from '../server/profile-actions';

import type { SiteLinkTokenResponse } from '@/api/client/api-types';

export interface UseTelegramLinkTokenReturn {
  linkData: SiteLinkTokenResponse | null;
  loading: boolean;
  error: string | null;
  onGetToken: () => Promise<void>;
}

export function useTelegramLinkToken(): UseTelegramLinkTokenReturn {
  const t = useTranslations('auth');
  const [linkData, setLinkData] = useState<SiteLinkTokenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGetToken = async () => {
    setError(null);
    setLoading(true);
    const result = await getTelegramLinkTokenAction();
    setLoading(false);
    if (!result.ok) {
      setError(t('errors.generic'));
      return;
    }
    setLinkData(result.data);
  };

  return { linkData, loading, error, onGetToken };
}
