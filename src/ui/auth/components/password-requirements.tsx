'use client';

import { CheckCircle, Circle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export interface PasswordRequirementsProps {
  password: string;
}

const PASSWORD_MIN_LENGTH = 10;

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const t = useTranslations('auth.passwordRequirements');

  const requirements = [
    {
      label: t('minLength'),
      isMet: password.length >= PASSWORD_MIN_LENGTH,
    },
    {
      label: t('uppercase'),
      isMet: /[A-Z]/.test(password),
    },
    {
      label: t('lowercase'),
      isMet: /[a-z]/.test(password),
    },
    {
      label: t('number'),
      isMet: /\d/.test(password),
    },
  ];

  return (
    <div className="w-full rounded-sm bg-neutral-20 px-4 py-3">
      <p className="font-manrope text-xs font-medium text-neutral-600">
        {t('title')}
      </p>
      <ul className="mt-2 grid gap-1.5">
        {requirements.map(({ label, isMet }) => {
          const Icon = isMet ? CheckCircle : Circle;

          return (
            <li
              key={label}
              className={cn(
                'flex items-center gap-2 font-manrope text-xs',
                isMet ? 'text-green-600' : 'text-neutral-400',
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};