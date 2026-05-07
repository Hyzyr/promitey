'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Server,
  BookOpen,
  FileCog,
  CreditCard,
  User,
  HelpCircle,
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Logo, LogoWithText } from '@/components/ui/logo';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { SidebarNavItem } from './sidebar-nav-item';
import { LogoutButton } from './logout-button';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/dashboard/servers', icon: Server, labelKey: 'servers' },
  { href: '/dashboard/instructions', icon: BookOpen, labelKey: 'instructions' },
  { href: '/dashboard/configs', icon: FileCog, labelKey: 'configs' },
  {
    href: '/dashboard/subscription',
    icon: CreditCard,
    labelKey: 'subscription',
  },
  { href: '/dashboard/profile', icon: User, labelKey: 'profile' },
] as const;

const SIDEBAR_GRADIENT =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const dashboardPath = pathname.replace(/^\/(en|ru)(?=\/|$)/, '') || '/';

  return (
    <aside
      className={cn(
        'hidden lg:flex',
        'h-[calc(100vh-60px)] w-24 flex-col gap-8 overflow-visible',
        'rounded-md px-6 py-8 lgx:w-72 xlx:w-93.75',
        'shadow-[0_11px_19.4px_rgba(0,0,0,.04),0_13px_51.2px_rgba(0,0,0,.04)]',
      )}
      style={{ background: SIDEBAR_GRADIENT }}
    >
      <Link
        href="/"
        className="flex items-center justify-center gap-5 border-b border-neutral-20 pb-4 lgx:justify-start"
        aria-label={tCommon('appName')}
      >
        <LogoWithText dark className="hidden h-10 w-auto lgx:inline-flex" />
        <Logo className="inline-flex h-10 w-10 lgx:hidden" />
      </Link>

      <nav className="flex flex-1 flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={tNav(item.labelKey)}
            active={
              item.href === '/dashboard'
                ? dashboardPath === item.href
                : dashboardPath === item.href ||
                  dashboardPath.startsWith(`${item.href}/`)
            }
          />
        ))}
      </nav>

      <div className="flex flex-col gap-4 border-t border-neutral-20 py-5">
        <LanguageSwitcher
          variant="dark"
          size="responsive"
          className="lg:w-12 lgx:w-full"
          showTooltipOnCompact
        />
        <SidebarNavItem
          href="/dashboard/help"
          icon={HelpCircle}
          label={tNav('help')}
          active={dashboardPath.endsWith('/help')}
        />
        <LogoutButton
          className="group relative inline-flex items-center justify-center gap-2.5 rounded-sm text-lg font-normal lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto lgx:justify-start"
          iconClassName="h-8 w-8"
          labelClassName="hidden lgx:inline"
          showResponsiveTooltip
        />
      </div>
    </aside>
  );
};
