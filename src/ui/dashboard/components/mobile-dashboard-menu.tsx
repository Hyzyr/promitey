'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  TrafficCone,
  FileCog,
  CreditCard,
  User,
  X,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { cn } from '@/lib/utils';

import { LogoutButton } from './logout-button';

const DRAWER_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/dashboard/instructions', icon: TrafficCone, labelKey: 'instructions' },
  { href: '/dashboard/configs', icon: FileCog, labelKey: 'configs' },
  {
    href: '/dashboard/subscription',
    icon: CreditCard,
    labelKey: 'subscription',
  },
  { href: '/dashboard/profile', icon: User, labelKey: 'profile' },
] as const;

interface MobileDashboardMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileDashboardMenu = ({
  open,
  onOpenChange,
}: MobileDashboardMenuProps) => {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { lock, unlock } = useScrollLock();
  const dashboardPath = pathname.replace(/^\/(en|ru)(?=\/|$)/, '') || '/';

  useEffect(() => {
    if (open) lock();
    else unlock();
    return () => unlock();
  }, [open, lock, unlock]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onOpenChange(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  const handleNavClick = () => {
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fog-backdrop absolute inset-0"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'absolute inset-x-0 bottom-0 flex flex-col gap-6',
              'rounded-t-md bg-neutral-800 px-8 pt-8 pb-10',
              'shadow-[0_-7px_30.2px_rgba(0,0,0,.12)]',
            )}
          >
            <button
              type="button"
              aria-label={tCommon('close')}
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 text-orange-500 hover:text-orange-400"
            >
              <X className="h-8 w-8" />
            </button>

            <nav className="flex flex-col gap-4">
              {DRAWER_ITEMS.map(({ href, icon: Icon, labelKey }) => {
                const active =
                  href === '/dashboard'
                    ? dashboardPath === href
                    : dashboardPath === href ||
                      dashboardPath.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={handleNavClick}
                    className={cn(
                      'flex items-center gap-4 capitalize text-base',
                      active
                        ? 'text-neutral-20 font-medium'
                        : 'text-neutral-60 font-normal hover:text-neutral-20',
                    )}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                    <span>{tNav(labelKey)}</span>
                  </Link>
                );
              })}

              <LogoutButton onBeforeLogout={() => onOpenChange(false)} />
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
