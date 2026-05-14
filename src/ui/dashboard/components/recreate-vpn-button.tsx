'use client';

import { CheckCircle, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { useRecreateVpn } from '../hooks/use-recreate-vpn';

export interface RecreateVpnButtonProps {
  className?: string;
}

export const RecreateVpnButton = ({ className }: RecreateVpnButtonProps) => {
  const t = useTranslations('dashboard.vpn');
  const { loading, success, error, onRecreate } = useRecreateVpn();

  return (
    <div className={className}>
      <Button
        type="button"
        variant="secondary"
        size="md"
        isLoading={loading}
        onClick={onRecreate}
        className="gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        {t('recreate')}
      </Button>

      {success && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-green-600">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {t('recreateSuccess')}
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
