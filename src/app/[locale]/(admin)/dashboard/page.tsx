import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { WelcomeCard } from '@/ui/dashboard/components/welcome-card';
import { ConfigDownloadCard } from '@/ui/dashboard/components/config-download-card';
import { SubscriptionCard } from '@/ui/dashboard/components/subscription-card';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

  // TODO: replace with real session data (auth.getSession() / getServerSession())
  const user = { email: 'octava@six.music' };
  const subscription = { plan: '7 days trial', expiresAt: '22/04/26' };

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.home')}</Breadcrumbs>
      <WelcomeCard email={user.email} />
      <ConfigDownloadCard />
      <SubscriptionCard
        plan={subscription.plan}
        expiresAt={subscription.expiresAt}
      />
    </>
  );
}
