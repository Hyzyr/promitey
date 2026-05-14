import { getLocale, getTranslations } from 'next-intl/server';

import * as accountApi from '@/api/account';
import { getAccessToken } from '@/lib/session';
import { redirect } from '@/i18n/navigation';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { ConfigDownloadCard } from '@/ui/dashboard/pages/configs/config-download-card';
import { SubscriptionCard } from '@/ui/dashboard/pages/subscription/subscription-card';
import { getCurrentSubscriptionOrNull } from '@/ui/dashboard/server/subscription-data';

import { WelcomeCard } from './welcome-card';

export const DashboardPage = async () => {
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
      <Breadcrumbs>{t('breadcrumb.home')}</Breadcrumbs>
      <WelcomeCard email={user.email} />
      <ConfigDownloadCard />
      <SubscriptionCard subscription={subscription} usedTrial={user.usedTrial} />
    </>
  );
};
