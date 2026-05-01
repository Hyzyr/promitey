'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Server,
  BookOpen,
  CreditCard,
  User,
  HelpCircle,
} from 'lucide-react';
import { SidebarNavItem } from './sidebar-nav-item';
import { LanguageSwitcher } from './language-switcher';
import { LogoutButton } from './logout-button';
import { Logo } from '@/components/ui/logo';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/dashboard/servers', icon: Server, labelKey: 'servers' },
  { href: '/dashboard/instructions', icon: BookOpen, labelKey: 'instructions' },
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

  return (
    <aside
      className={cn(
        'hidden lg:flex',
        'h-[calc(100vh-60px)] w-[375px] flex-col gap-8 overflow-hidden',
        'rounded-2xl px-6 py-8',
        'shadow-[0_11px_19.4px_rgba(0,0,0,.04),0_13px_51.2px_rgba(0,0,0,.04)]',
      )}
      style={{ background: SIDEBAR_GRADIENT }}>
      {/* Logo block — Figma: 327×62, pb 16, border-bottom #f6f6f6 */}
      <div className="flex items-center gap-5 border-b border-neutral-20 pb-4">
        <Logo />
        <span className="font-inter text-[28px] font-medium text-red-900">
          Prometey <span className="font-bold">VPN</span>
        </span>
      </div>

      {/* Primary nav — gap 16 (gap-4) */}
      <nav className="flex flex-1 flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={tNav(item.labelKey)}
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          />
        ))}
      </nav>

      {/* Footer — border-top #f6f6f6, py 20 */}
      <div className="flex flex-col gap-4 border-t border-neutral-20 py-5">
        <LanguageSwitcher />
        <SidebarNavItem
          href="/dashboard/help"
          icon={HelpCircle}
          label={tNav('help')}
          active={pathname.endsWith('/help')}
        />
        <LogoutButton iconClassName="h-6 w-6" />
      </div>
    </aside>
  );
};
