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
        'group relative isolate -m-2 inline-flex items-center justify-center gap-2.5 rounded-sm p-2 text-lg capitalize transition-colors',
        'lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto lgx:justify-start',
        tone === 'primary'
          ? 'text-primary-500 hover:text-primary-400'
          : active
            ? 'font-medium text-neutral-900'
            : 'font-normal text-neutral-600 hover:text-neutral-900',
      )}
    >
      <span
        className={cn(
          'absolute inset-0 -z-1 h-full w-full  rounded-sm bg-neutral-20',
          'transition-[transform, opacity] duration-250 ease-out delay-75',
          active ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
        )}
      ></span>
      <Icon className="h-8 w-8" strokeWidth={1.5} />
      <span className="hidden lgx:inline">{label}</span>
      <span className="pointer-events-none absolute top-1/2 left-full z-20 ml-3 hidden -translate-y-1/2 rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium whitespace-nowrap text-neutral-10 normal-case opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
        {label}
      </span>
    </Link>
  );
};
