import { DashboardSidebar } from '@/ui/dashboard/components/dashboard-sidebar';
import { DashboardHeader } from '@/ui/dashboard/components/dashboard-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-30 lg:gap-[34px] lg:p-[30px]">
      <DashboardSidebar />

      <div className="flex w-full flex-1 flex-col lg:max-w-[1230px]">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-8 px-5 pt-4 pb-10 lg:px-0 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
