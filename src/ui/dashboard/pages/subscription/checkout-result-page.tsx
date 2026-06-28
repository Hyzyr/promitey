import { getLocale, getTranslations } from 'next-intl/server';
import { CheckCircle2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { redirect } from '@/i18n/navigation';
import { getAccessToken } from '@/lib/session';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { getCurrentSubscriptionOrNull } from '@/ui/dashboard/server/subscription-data';

export interface CheckoutResultPageProps {
  status: 'success' | 'fail';
}

/**
 * Return page shown after the user comes back from the hosted WATA payment
 * page. The real subscription state is re-read from the API so the message is
 * accurate regardless of which query params the provider appends on return.
 */
export const CheckoutResultPage = async ({ status }: CheckoutResultPageProps) => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    return redirect({ href: '/login', locale });
  }

  const isSuccess = status === 'success';
  const subscription = isSuccess ? await getCurrentSubscriptionOrNull(token) : null;
  const isActive = subscription?.status === 'active';

  const title = isSuccess
    ? t('subscription.result.successTitle')
    : t('subscription.result.failTitle');

  const description = isSuccess
    ? isActive
      ? t('subscription.result.successActive')
      : t('subscription.result.successPending')
    : t('subscription.result.failDescription');

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.subscription')}</Breadcrumbs>
      <div className="w-full max-w-212.5">
        <div className="rounded-md bg-white px-5 py-10 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
            <span
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full',
                isSuccess ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600',
              )}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-9 w-9" />
              ) : (
                <XCircle className="h-9 w-9" />
              )}
            </span>

            <h2 className="text-[24px] font-medium text-neutral-800">{title}</h2>

            <p className="font-manrope text-base leading-relaxed text-neutral-600">
              {description}
            </p>

            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              {isSuccess ? (
                <>
                  <Button
                    href="/dashboard/subscription"
                    variant="orange"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {t('subscription.result.backToSubscription')}
                  </Button>
                  {!isActive && (
                    <Button
                      href="/dashboard/subscription/success"
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      {t('subscription.result.refreshStatus')}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    href="/dashboard/subscription"
                    variant="orange"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {t('subscription.result.tryAgain')}
                  </Button>
                  <Button
                    href="/dashboard/subscription"
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {t('subscription.result.backToSubscription')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
