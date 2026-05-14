'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

import { recreateVpnAction } from '../server/vpn-actions';
import { useDelayedRefresh } from './use-delayed-refresh';

export interface UseRecreateVpnReturn {
  loading: boolean;
  success: boolean;
  error: string | null;
  onRecreate: () => Promise<void>;
}

export function useRecreateVpn(): UseRecreateVpnReturn {
  const t = useTranslations('dashboard.vpn');
  const tErrors = useTranslations('auth.errors');
  const refreshAfterDelay = useDelayedRefresh();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRecreate = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const result = await recreateVpnAction();
      reportForwardedServerError(result);
      if (!result.ok) {
        setError(mapApiError(result.code, tErrors, { rate_limited: t('rateLimited') }));
        return;
      }
      setSuccess(true);
      setLoading(false);
      await refreshAfterDelay();
    } catch {
      setError(tErrors('generic'));
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, onRecreate };
}
