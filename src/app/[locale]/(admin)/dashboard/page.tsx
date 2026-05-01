import { getTranslations, getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { getAccessToken } from '@/lib/session';
import * as accountApi from '@/api/account';

import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { WelcomeCard } from '@/ui/dashboard/components/welcome-card';
import { ConfigDownloadCard } from '@/ui/dashboard/components/config-download-card';
import { SubscriptionCard } from '@/ui/dashboard/components/subscription-card';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/login', locale });
  }

  const user = await accountApi.getMe(token!);

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.home')}</Breadcrumbs>
      <WelcomeCard email={user.email} />
      <ConfigDownloadCard />
      <SubscriptionCard />
    </>
  );
}
