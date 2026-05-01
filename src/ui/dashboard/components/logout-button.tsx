'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { logoutAction } from '@/ui/auth/server/auth-actions';

export interface LogoutButtonProps {
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  /** Called synchronously before the logout action fires (e.g. to close a menu). */
  onBeforeLogout?: () => void;
}

export const LogoutButton = ({ className, iconClassName, labelClassName, onBeforeLogout }: LogoutButtonProps) => {
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
    </button>
  );
};
