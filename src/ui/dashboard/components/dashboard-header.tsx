'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { MobileDashboardMenu } from './mobile-dashboard-menu';
import { Logo } from '@/components/ui/logo';

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center justify-between bg-neutral-900 px-5 lg:hidden">
        <Link href="/">
          <Logo className="inline-flex h-7 w-auto" />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-orange-500 hover:text-orange-400">
          <Menu className="h-8 w-8" strokeWidth={2} />
        </button>
      </header>

      <MobileDashboardMenu open={open} onOpenChange={setOpen} />
    </>
  );
};
