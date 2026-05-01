'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { recreateVpnAction } from '../server/vpn-actions';

export interface UseRecreateVpnReturn {
  loading: boolean;
  success: boolean;
  error: string | null;
  onRecreate: () => Promise<void>;
}

export function useRecreateVpn(): UseRecreateVpnReturn {
  const t = useTranslations('dashboard.vpn');
  const tAuth = useTranslations('auth');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRecreate = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    const result = await recreateVpnAction();
    setLoading(false);
    if (!result.ok) {
      if (result.code === 'rate_limited') {
        setError(t('rateLimited'));
      } else {
        setError(tAuth('errors.generic'));
      }
      return;
    }
    setSuccess(true);
  };

  return { loading, success, error, onRecreate };
}
