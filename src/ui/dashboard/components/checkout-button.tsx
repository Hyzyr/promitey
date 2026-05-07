'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

import { checkoutAction } from '../server/billing-actions';

export interface CheckoutButtonProps {
  className?: string;
}

export const CheckoutButton = ({ className }: CheckoutButtonProps) => {
  const t = useTranslations('dashboard.billing');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<'idle' | 'unavailable' | 'error'>('idle');

  const onClick = async () => {
    setLoading(true);
    setState('idle');
    const result = await checkoutAction();
    reportForwardedServerError(result);
    setLoading(false);
    if (!result.ok) {
      setState(result.code === 'billing_unavailable' ? 'unavailable' : 'error');
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="orange"
        size="md"
        isLoading={loading}
        onClick={onClick}
        className="gap-2"
      >
        <CreditCard className="h-4 w-4" />
        {t('renew')}
      </Button>

      {state === 'unavailable' && (
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
          {t('unavailable')}
        </p>
      )}

      {state === 'error' && (
        <p className="mt-3 text-sm text-red-500">{t('error')}</p>
      )}
    </div>
  );
};
