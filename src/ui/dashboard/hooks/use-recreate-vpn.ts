'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { recreateVpnAction } from '../server/vpn-actions';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

export interface UseRecreateVpnReturn {
  loading: boolean;
  success: boolean;
  error: string | null;
  onRecreate: () => Promise<void>;
}

export function useRecreateVpn(): UseRecreateVpnReturn {
  const t = useTranslations('dashboard.vpn');
  const tErrors = useTranslations('auth.errors');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRecreate = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    const result = await recreateVpnAction();
    reportForwardedServerError(result);
    setLoading(false);
    if (!result.ok) {
      setError(mapApiError(result.code, tErrors, { rate_limited: t('rateLimited') }));
      return;
    }
    setSuccess(true);
  };

  return { loading, success, error, onRecreate };
}
