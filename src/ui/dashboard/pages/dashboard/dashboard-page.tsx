import { getLocale, getTranslations } from 'next-intl/server';

import * as accountApi from '@/api/account';
import { getAccessToken } from '@/lib/session';
import { redirect } from '@/i18n/navigation';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { ConfigDownloadCard } from '@/ui/dashboard/components/config-download-card';
import { SubscriptionCard } from '@/ui/dashboard/components/subscription-card';
import { WelcomeCard } from '@/ui/dashboard/components/welcome-card';

export const DashboardPage = async () => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    return redirect({ href: '/login', locale });
  }

  const user = await accountApi.getMe(token);

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.home')}</Breadcrumbs>
      <WelcomeCard email={user.email} />
      <ConfigDownloadCard />
      <SubscriptionCard />
    </>
  );
};
