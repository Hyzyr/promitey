'use client';

import { useTranslations } from 'next-intl';
import { CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS } from '@/lib/constants';

export interface CheckoutButtonProps {
  className?: string;
}

export const CheckoutButton = ({ className }: CheckoutButtonProps) => {
  const t = useTranslations('dashboard.billing');

  return (
    <div className={className}>
      <Button
        type="button"
        variant="orange"
        size="md"
        onClick={() => window.location.assign(EXTERNAL_LINKS.telegramBot)}
        className="gap-2"
      >
        <CreditCard className="h-4 w-4" />
        {t('renew')}
      </Button>
    </div>
  );
};
