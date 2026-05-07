'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { logoutAction } from '@/ui/auth/server/auth-actions';

export interface LogoutButtonProps {
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  onBeforeLogout?: () => void;
  showResponsiveTooltip?: boolean;
}

export const LogoutButton = ({
  className,
  iconClassName,
  labelClassName,
  onBeforeLogout,
  showResponsiveTooltip = false,
}: LogoutButtonProps) => {
  const t = useTranslations('nav');
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleLogout = async () => {
    if (pending) return;
    onBeforeLogout?.();
    setPending(true);
    await logoutAction();
    router.replace('/login');
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      aria-label={t('logout')}
      className={cn(
        'flex items-center gap-4 text-base font-normal',
        'text-primary-500 hover:text-primary-400 disabled:opacity-60',
        className,
      )}
    >
      <LogOut className={cn('h-8 w-8', iconClassName)} strokeWidth={1.5} />
      <span className={labelClassName}>{t('logout')}</span>
      {showResponsiveTooltip && (
        <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-10 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
          {t('logout')}
        </span>
      )}
    </button>
  );
};
