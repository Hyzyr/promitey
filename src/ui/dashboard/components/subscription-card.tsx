import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { TrialActivationButton } from './trial-activation-button';

import type { CurrentSubscriptionResponse } from '@/api/client/api-types';

export interface SubscriptionCardProps {
  subscription: CurrentSubscriptionResponse | null;
  usedTrial?: boolean;
  showRenewButton?: boolean;
  showTrialButton?: boolean;
  className?: string;
}

export const SubscriptionCard = async ({
  subscription,
  usedTrial,
  showRenewButton = true,
  showTrialButton = true,
  className,
}: SubscriptionCardProps) => {
  const t = await getTranslations('dashboard.subscription');
  const locale = await getLocale();
  const formattedEndDate = subscription
    ? formatSubscriptionEndDate(subscription.end_date, locale)
    : null;
  const statusLabel = subscription
    ? getSubscriptionStatusLabel(subscription.status, t)
    : null;
  const showTrial = usedTrial === false && showTrialButton;

  return (
    <section
      className={cn(
        'flex w-full max-w-212.5 flex-col gap-4 rounded-md bg-white px-5 py-4 shadow-[0_13px_61.2px_rgba(0,0,0,.07)]',
        className,
      )}
    >
      <div>
        <h2 className="text-[24px] font-medium text-neutral-800">
          {t('title')}
        </h2>

        {subscription ? (
          <div className="mt-3 space-y-2 font-manrope text-base leading-[1.6] text-neutral-700">
            {statusLabel && (
              <p>
                {t('status')}:{' '}
                <span className="font-medium text-neutral-800">
                  {statusLabel}
                </span>
              </p>
            )}
            <p>
              {t('currentPlan')}{' '}
              <span className="font-medium text-neutral-800">
                &quot;{subscription.subscription_type}&quot;
              </span>
            </p>
            <p>
              {t('expiresAt')}{' '}
              <span className="font-medium text-neutral-900">
                {formattedEndDate}
              </span>
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-1 font-manrope">
            <p className="text-base font-medium text-neutral-700">
              {t('noSubscription')}
            </p>
            <p className="text-sm leading-[1.6] text-neutral-500">
              {t('noSubscriptionDescription')}
            </p>
          </div>
        )}
      </div>
      {(showRenewButton || showTrial) && (
        <div className="flex items-center justify-end gap-3">
          {showTrial && <TrialActivationButton />}

          {showRenewButton && (
            <Button
              variant="secondary"
              size="md"
              href={EXTERNAL_LINKS.telegramBilling}
              className="rounded-sm bg-neutral-800/12 text-neutral-800"
            >
              {t('renew')}
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

function formatSubscriptionEndDate(endDate: string, locale: string): string {
  const timestamp = Date.parse(endDate);

  if (Number.isNaN(timestamp)) {
    return endDate;
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
    new Date(timestamp),
  );
}

function getSubscriptionStatusLabel(
  status: string,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string {
  if (status === 'active') return t('active');
  if (status === 'expired') return t('expired');

  return status;
}
