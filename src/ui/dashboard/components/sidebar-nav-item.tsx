'use client';

import { Link } from '@/i18n/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
}

export const SidebarNavItem = ({
  href,
  icon: Icon,
  label,
  active,
}: SidebarNavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 capitalize transition-colors text-lg',
        active
          ? 'text-neutral-900 font-medium'
          : 'text-neutral-600 font-normal hover:text-neutral-900',
      )}>
      <Icon className="h-9 w-9" strokeWidth={1.5} />
      <span>{label}</span>
    </Link>
  );
};
