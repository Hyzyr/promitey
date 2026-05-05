import { cookies } from 'next/headers';
import { DashboardSidebar } from '@/ui/dashboard/components/dashboard-sidebar';
import { DashboardHeader } from '@/ui/dashboard/components/dashboard-header';
import { DevModeBanner } from '@/ui/dashboard/components/dev-mode-banner';
import { DEV_TEST_COOKIE } from '@/lib/dev-session';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDevSession =
    process.env.NODE_ENV === 'development' &&
    (await cookies()).get(DEV_TEST_COOKIE)?.value === '1';

  return (
    <div className="flex min-h-screen bg-neutral-30 lg:gap-[34px] lg:p-[30px]">
      <DashboardSidebar />

      <div className="flex w-full flex-1 flex-col lg:max-w-[1230px]">
        <DashboardHeader />
        {isDevSession && (
          <div className="px-5 pt-4 lg:px-0">
            <DevModeBanner />
          </div>
        )}
        <main className="flex flex-1 flex-col gap-8 px-5 pt-4 pb-10 lg:px-0 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
