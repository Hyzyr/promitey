import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { CheckoutButton } from '@/ui/dashboard/components/checkout-button';

export default async function SubscriptionPage() {
  const t = await getTranslations('dashboard');

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.subscription')}</Breadcrumbs>
      <div className="w-full max-w-212.5 rounded-2xl bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
        <h1 className="text-[28px] font-bold text-neutral-900">
          {t('subscription.title')}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          {t('billing.noSubscriptionInfo')}
        </p>

        <div className="mt-8">
          <CheckoutButton />
        </div>
      </div>
    </>
  );
}

