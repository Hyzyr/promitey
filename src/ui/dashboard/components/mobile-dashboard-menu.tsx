'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Server,
  BookOpen,
  CreditCard,
  User,
  HelpCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { LogoutButton } from './logout-button';

const DRAWER_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/dashboard/servers', icon: Server, labelKey: 'servers' },
  { href: '/dashboard/instructions', icon: BookOpen, labelKey: 'instructions' },
  {
    href: '/dashboard/subscription',
    icon: CreditCard,
    labelKey: 'subscription',
  },
  { href: '/dashboard/profile', icon: User, labelKey: 'profile' },
  { href: '/dashboard/help', icon: HelpCircle, labelKey: 'help' },
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

  // Body scroll lock while menu open
  useEffect(() => {
    if (open) lock();
    else unlock();
    return () => unlock();
  }, [open, lock, unlock]);

  // Escape key closes menu
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
          {/* Backdrop — Figma: rgba(32,30,30,0.6) + backdrop-blur-[4px] */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-[rgba(32,30,30,0.6)] backdrop-blur-xs"
          />

          {/* Drawer panel — slides from bottom */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'absolute inset-x-0 bottom-0 flex flex-col gap-6',
              'rounded-t-2xl bg-neutral-800 px-8 pt-8 pb-10',
              'shadow-[0_-7px_30.2px_rgba(0,0,0,.12)]',
            )}>
            {/* Close button — top-right, inset 16 */}
            <button
              type="button"
              aria-label={tCommon('close')}
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 text-orange-500 hover:text-orange-400">
              <X className="h-8 w-8" />
            </button>

            <nav className="flex flex-col gap-4">
              {DRAWER_ITEMS.map(({ href, icon: Icon, labelKey }) => {
                const active = pathname === href;
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
                    )}>
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                    <span>{tNav(labelKey)}</span>
                  </Link>
                );
              })}

              {/* Logout */}
              <LogoutButton onBeforeLogout={() => onOpenChange(false)} />
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
