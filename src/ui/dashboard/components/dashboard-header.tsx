'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';

import { Logo } from '@/components/ui/logo';
import { Link } from '@/i18n/navigation';

import { MobileDashboardMenu } from './mobile-dashboard-menu';

export const DashboardHeader = () => {
  const tNav = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center justify-between bg-neutral-900 px-5 lg:hidden">
        <Link href="/">
          <Logo className="inline-flex h-7 w-auto" />
        </Link>
        <button
          type="button"
          aria-label={tNav('menu')}
          onClick={() => setOpen(true)}
          className="text-orange-500 hover:text-orange-400">
          <Menu className="h-8 w-8" strokeWidth={2} />
        </button>
      </header>

      <MobileDashboardMenu open={open} onOpenChange={setOpen} />
    </>
  );
};
