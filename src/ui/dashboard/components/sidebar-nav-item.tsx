'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import type { LucideIcon } from 'lucide-react';

export interface SidebarNavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
  tone?: 'default' | 'primary';
}

export const SidebarNavItem = ({
  href,
  icon: Icon,
  label,
  active,
  tone = 'default',
}: SidebarNavItemProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 rounded-sm capitalize transition-colors text-lg',
        'lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto lgx:justify-start',
        tone === 'primary'
          ? 'text-primary-500 hover:text-primary-400'
          : active
            ? 'text-neutral-900 font-medium'
            : 'text-neutral-600 font-normal hover:text-neutral-900',
      )}
    >
      <Icon className="h-8 w-8" strokeWidth={1.5} />
      <span className="hidden lgx:inline">{label}</span>
      <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium normal-case text-neutral-10 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
        {label}
      </span>
    </Link>
  );
};
