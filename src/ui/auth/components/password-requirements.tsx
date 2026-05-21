'use client';

import { CheckCircle, Circle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  getPasswordRequirementState,
  isPasswordRequirementsMet,
} from '@/ui/auth/password-validation';
import { cn } from '@/lib/utils';

export { isPasswordRequirementsMet };

export interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export const PasswordRequirements = ({ password, className }: PasswordRequirementsProps) => {
  const t = useTranslations('auth.passwordRequirements');

  const requirements = getPasswordRequirementState(password);

  return (
    <div className={cn('w-full rounded-sm bg-neutral-20 px-4 py-3', className)}>
      <p className="font-manrope text-xs font-medium text-neutral-600">
        {t('title')}
      </p>
      <ul className="mt-2 grid gap-1.5">
        {requirements.map(({ key, isMet }) => {
          const Icon = isMet ? CheckCircle : Circle;

          return (
            <li
              key={key}
              className={cn(
                'flex items-center gap-2 font-manrope text-xs',
                isMet ? 'text-green-600' : 'text-neutral-400',
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{t(key)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};