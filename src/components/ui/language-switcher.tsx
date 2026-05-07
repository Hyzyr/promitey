'use client';

import { useTransition } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Languages,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import type { Locale } from '@/i18n/routing';

import { Dropdown } from './dropdown';

const LOCALES: ReadonlyArray<{ value: Locale; label: string }> = [
  { value: 'en', label: 'En' },
  { value: 'ru', label: 'Ru' },
];

export interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
  size?: 'compact' | 'full' | 'responsive';
  align?: 'left' | 'right';
  className?: string;
  onSelect?: () => void;
  showTooltipOnCompact?: boolean;
}

export const LanguageSwitcher = ({
  variant = 'dark',
  size = 'compact',
  align = 'left',
  className,
  onSelect,
  showTooltipOnCompact = false,
}: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const current = LOCALES.find((item) => item.value === locale) ?? LOCALES[0];
  const ariaLabel = `${tCommon('language')}: ${current.label}`;
  const items = LOCALES.map((item) => ({
    value: item.value,
    label: item.label,
    onClick: () => {
      onSelect?.();
      startTransition(() => router.replace(pathname, { locale: item.value }));
    },
  }));

  const trigger = ({ open }: { open: boolean }) => {
    if (variant === 'light') {
      return (
        <div
          className={cn(
            'group relative inline-flex items-center justify-center gap-2.5 rounded-sm text-lg transition-colors',
            'lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto lgx:justify-start',
            'text-neutral-600 hover:text-neutral-900',
            isPending && 'opacity-60',
          )}
        >
          <Languages className="h-8 w-8" strokeWidth={1.5} />
          <span className="hidden lgx:inline">
            <span className="font-bold">{tCommon('language')}:</span>{' '}
            <span>{current.label}</span>
          </span>
          <ChevronDown
            className={cn(
              'hidden h-[18px] w-[18px] transition-transform lgx:block',
              open && 'rotate-180',
            )}
          />
          {showTooltipOnCompact && (
            <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-10 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
              {ariaLabel}
            </span>
          )}
        </div>
      );
    }

    if (size === 'responsive') {
      return (
        <div
          className={cn(
            'group relative inline-flex items-center justify-center gap-2.5 rounded-sm bg-neutral-800 text-lg text-neutral-10 transition-colors hover:bg-neutral-700',
            'lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto lgx:justify-start lgx:px-4 lgx:py-3',
            isPending && 'opacity-60',
          )}
        >
          <Languages className="h-8 w-8" strokeWidth={1.5} />
          <span className="hidden lgx:inline">
            <span className="font-bold">{tCommon('language')}:</span>{' '}
            <span>{current.label}</span>
          </span>
          <ChevronDown
            className={cn(
              'hidden h-[18px] w-[18px] transition-transform lgx:block',
              open && 'rotate-180',
            )}
          />
          {showTooltipOnCompact && (
            <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-10 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
              {ariaLabel}
            </span>
          )}
        </div>
      );
    }

    if (size === 'full') {
      return (
        <div
          className={cn(
            'flex w-full items-center justify-start gap-3 rounded-sm bg-white/12 px-[.85em] py-[.75em] text-[18px] transition-colors hover:bg-white/16 sm:text-[20px]',
            isPending && 'opacity-60',
          )}
        >
          <Languages className="h-6 w-6 text-neutral-10" strokeWidth={2} />
          <span className="grow text-left font-roboto leading-none text-neutral-10">
            <span className="font-bold">{tCommon('language')}:</span>
            <span className="font-normal"> {current.label}</span>
          </span>
          <ChevronRight
            className={cn(
              'h-4.5 w-4.5 text-neutral-10 transition-transform',
              open ? '-rotate-90' : 'rotate-90',
            )}
            strokeWidth={2}
          />
        </div>
      );
    }

    return (
      <div
        className={cn(
          'flex items-center gap-1 rounded-sm bg-neutral-800 p-2 transition-colors hover:bg-neutral-700',
          isPending && 'opacity-60',
        )}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/12">
          <Globe className="h-4 w-4 text-neutral-10" strokeWidth={2} />
        </div>
        <span className="font-roboto text-[18px] text-neutral-10">
          {current.label}
        </span>
        <ChevronRight
          className={cn(
            'h-4.5 w-4.5 text-neutral-10 transition-transform',
            open ? '-rotate-90' : 'rotate-90',
          )}
          strokeWidth={2}
        />
      </div>
    );
  };

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      align={align}
      className={className}
      disabled={isPending}
      ariaLabel={ariaLabel}
      menuClassName={
        variant === 'light'
          ? 'border-neutral-30 bg-neutral-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
          : size === 'full' || size === 'responsive'
            ? 'mt-2 rounded-md border-transparent bg-neutral-700 shadow-lg'
            : undefined
      }
      itemClassName={
        variant === 'light'
          ? 'text-neutral-900 hover:bg-neutral-20'
          : size === 'full' || size === 'responsive'
            ? 'py-3 text-neutral-10 hover:bg-neutral-600'
            : undefined
      }
    />
  );
};
