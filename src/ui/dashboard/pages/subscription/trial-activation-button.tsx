'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDelayedRefresh } from '@/ui/dashboard/hooks/use-delayed-refresh';
import { activatePromocodeAction } from '@/ui/dashboard/server/billing-actions';

const TRIAL_PROMOCODE = 'TRIAL7DAY';

export interface TrialActivationButtonProps {
  className?: string;
}

export const TrialActivationButton = ({ className }: TrialActivationButtonProps) => {
  const t = useTranslations('dashboard.subscription.trial');
  const refreshAfterDelay = useDelayedRefresh();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const activateTrial = () => {
    setMessage(null);
    setIsError(false);

    startTransition(async () => {
      const result = await activatePromocodeAction(TRIAL_PROMOCODE);

      if (!result.ok) {
        setIsError(true);
        setMessage(getTrialErrorMessage(result.code, t));
        return;
      }

      setMessage(t('success'));
      await refreshAfterDelay();
    });
  };

  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      <Button
        type="button"
        variant="orange"
        size="md"
        onClick={activateTrial}
        isLoading={isPending}
      >
        {t('button')}
      </Button>
      {message && (
        <p className={isError ? 'text-sm text-red-500' : 'text-sm text-green-600'}>
          {message}
        </p>
      )}
    </div>
  );
};

function getTrialErrorMessage(
  code: string,
  t: ReturnType<typeof useTranslations<'dashboard.subscription.trial'>>,
): string {
  if (code === 'code_already_used') return t('alreadyUsed');
  if (code === 'code_not_found') return t('unavailable');
  if (code === 'unauthenticated') return t('unauthenticated');

  return t('error');
}