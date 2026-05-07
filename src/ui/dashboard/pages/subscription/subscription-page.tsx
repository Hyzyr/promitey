import { getLocale, getTranslations } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { getAccessToken } from '@/lib/session';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { CheckoutButton } from '@/ui/dashboard/components/checkout-button';
import { PromocodeSection } from '@/ui/dashboard/components/promocode-section';

export const SubscriptionPage = async () => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/login', locale });
  }

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.subscription')}</Breadcrumbs>
      <div className="w-full max-w-212.5 space-y-6">
        <div className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
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

        <div className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <PromocodeSection />
        </div>
      </div>
    </>
  );
};