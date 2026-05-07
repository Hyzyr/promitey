import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { DashboardSidebar } from '@/ui/dashboard/components/dashboard-sidebar';
import { DashboardHeader } from '@/ui/dashboard/components/dashboard-header';
import { DevModeBanner } from '@/ui/dashboard/components/dev-mode-banner';
import { DEV_TEST_COOKIE } from '@/lib/dev-session';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.dashboard' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDevSession =
    process.env.NODE_ENV === 'development' &&
    (await cookies()).get(DEV_TEST_COOKIE)?.value === '1';

  return (
    <div className="flex min-h-screen bg-neutral-30 lg:gap-8.5 lg:p-7.5">
      <DashboardSidebar />

      <div className="flex w-full flex-1 flex-col lg:max-w-307">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-8 px-5 pt-4 pb-10 lg:px-0 lg:pt-0">
          {children}
        </main>
        {isDevSession && (
          <div className="px-5 pt-4 lg:px-0">
            <DevModeBanner />
          </div>
        )}
      </div>
    </div>
  );
}
