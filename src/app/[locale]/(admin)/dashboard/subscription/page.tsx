import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { Button } from '@/components/ui/button';

export default async function SubscriptionPage() {
  const t = await getTranslations('dashboard');

  // TODO: replace with real subscription data
  const subscription = {
    plan: '7 days trial',
    status: 'active',
    startsAt: '15/04/26',
    expiresAt: '22/04/26',
  };

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.subscription')}</Breadcrumbs>
      <div className="w-full max-w-212.5 rounded-2xl bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
        <h1 className="text-[28px] font-bold text-neutral-900">
          {t('subscription.title')}
        </h1>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600">
              {t('subscription.currentPlan')}
            </span>
            <span className="text-xl font-semibold text-neutral-900">
              {subscription.plan}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600">
              {t('subscription.status')}
            </span>
            <span className="text-lg font-medium text-green-600">
              {t('subscription.active')}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600">
              {t('subscription.startsAt')}
            </span>
            <span className="text-lg text-neutral-900">
              {subscription.startsAt}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600">
              {t('subscription.expiresAt')}
            </span>
            <span className="text-lg text-neutral-900">
              {subscription.expiresAt}
            </span>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button variant="orange" size="md">
            {t('subscription.renew')}
          </Button>
        </div>
      </div>
    </>
  );
}
