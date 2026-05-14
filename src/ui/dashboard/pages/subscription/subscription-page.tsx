import { getLocale, getTranslations } from 'next-intl/server';

import * as accountApi from '@/api/account';
import { redirect } from '@/i18n/navigation';
import { getAccessToken } from '@/lib/session';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { CheckoutButton } from '@/ui/dashboard/components/checkout-button';
import { PromocodeSection } from '@/ui/dashboard/components/promocode-section';
import { SubscriptionCard } from '@/ui/dashboard/components/subscription-card';
import { getCurrentSubscriptionOrNull } from '@/ui/dashboard/server/subscription-data';

export const SubscriptionPage = async () => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    return redirect({ href: '/login', locale });
  }

  const [user, subscription] = await Promise.all([
    accountApi.getMe(token),
    getCurrentSubscriptionOrNull(token),
  ]);

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.subscription')}</Breadcrumbs>
      <div className="w-full max-w-212.5 space-y-6">
        <div className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <SubscriptionCard
            subscription={subscription}
            usedTrial={user.usedTrial}
            showRenewButton={false}
            className="max-w-none rounded-none bg-transparent px-0 py-0 shadow-none"
          />

          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            {t('billing.noSubscriptionInfo')}
          </p>

          <div className="mt-8">
            <CheckoutButton />
          </div>

          <PromocodeSection className="mt-8 border-t border-neutral-30 pt-6" />
        </div>
      </div>
    </>
  );
};