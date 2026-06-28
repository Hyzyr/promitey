'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { CreditCard } from 'lucide-react';

import { EXTERNAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { checkoutAction } from '@/ui/dashboard/server/billing-actions';

import type { BillingPlan } from '@/api/client/api-types';

const PLANS: readonly BillingPlan[] = [
  'monthly',
  'quarterly',
  'semiannual',
  'annual',
];

/** Map a server `ActionResult.code` to a translation key under `errors.*`. */
const ERROR_CODE_TO_KEY: Record<string, string> = {
  unknown_plan: 'errors.unknownPlan',
  billing_unavailable: 'errors.unavailable',
  billing_provider_error: 'errors.provider',
  unauthenticated: 'errors.unauthenticated',
};

const PLAN_LABELS: Record<BillingPlan, { title: string; duration: string }> = {
  monthly: { title: 'plans.monthly.title', duration: 'plans.monthly.duration' },
  quarterly: { title: 'plans.quarterly.title', duration: 'plans.quarterly.duration' },
  semiannual: { title: 'plans.semiannual.title', duration: 'plans.semiannual.duration' },
  annual: { title: 'plans.annual.title', duration: 'plans.annual.duration' },
};

export interface CheckoutPlansProps {
  className?: string;
}

export const CheckoutPlans = ({ className }: CheckoutPlansProps) => {
  const t = useTranslations('dashboard.billing.checkout');
  const [pendingPlan, setPendingPlan] = useState<BillingPlan | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (plan: BillingPlan) => {
    if (isPending) return;

    setErrorKey(null);
    setPendingPlan(plan);

    startTransition(async () => {
      const result = await checkoutAction(plan);

      if (result.ok) {
        // Redirect to the hosted WATA payment page.
        window.location.assign(result.data.payment_url);
        return;
      }

      setPendingPlan(null);
      setErrorKey(ERROR_CODE_TO_KEY[result.code] ?? 'errors.generic');
    });
  };

  return (
    <div className={cn('space-y-5', className)}>
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-neutral-800">{t('title')}</h3>
        <p className="font-manrope text-sm leading-relaxed text-neutral-600">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const isThisPlanLoading = isPending && pendingPlan === plan;

          return (
            <button
              key={plan}
              type="button"
              onClick={() => handleSelect(plan)}
              disabled={isPending}
              aria-busy={isThisPlanLoading}
              className={cn(
                'group flex flex-col items-start gap-1 rounded-md border border-neutral-30 bg-white px-4 py-3 text-left transition-colors',
                'hover:border-orange-500 hover:bg-orange-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                'disabled:cursor-not-allowed disabled:opacity-60',
              )}
            >
              <span className="text-base font-medium text-neutral-800">
                {t(PLAN_LABELS[plan].title)}
              </span>
              <span className="font-manrope text-sm text-neutral-500">
                {t(PLAN_LABELS[plan].duration)}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600">
                <CreditCard className="h-4 w-4" />
                {isThisPlanLoading ? t('processing') : t('choose')}
              </span>
            </button>
          );
        })}
      </div>

      {errorKey && (
        <p role="alert" className="font-manrope text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}

      <p className="font-manrope text-sm text-neutral-500">
        {t('manualHint')}{' '}
        <a
          href={EXTERNAL_LINKS.telegramBot}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-orange-600 underline-offset-2 hover:underline"
        >
          {t('manualCta')}
        </a>
      </p>
    </div>
  );
};
