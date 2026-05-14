'use client';

import { useTransition } from 'react';
import { ChevronDown, ChevronRight, Globe, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import type { Locale } from '@/i18n/routing';

import { Dropdown } from './dropdown';

// ─── Constants ────────────────────────────────────────────────────────────────

const LOCALES: ReadonlyArray<{ value: Locale; label: string }> = [
  { value: 'en', label: 'En' },
  { value: 'ru', label: 'Ru' },
];

// ─── Trigger sub-components ───────────────────────────────────────────────────

interface TriggerProps {
  open: boolean;
  currentLabel: string;
  languageLabel: string;
  ariaLabel: string;
  isPending: boolean;
  showTooltip: boolean;
  className?: string;
}

/** Light variant — used in the public header desktop sidebar. */
const LightTrigger = ({
  open,
  currentLabel,
  languageLabel,
  ariaLabel,
  isPending,
  showTooltip,
  className,
}: TriggerProps) => (
  <div
    className={cn(
      'group relative w-full inline-flex items-center justify-center gap-2.5 rounded-sm text-lg transition-colors',
      'lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto mr-auto lgx:justify-start',
      'text-neutral-600 hover:text-neutral-900',
      isPending && 'opacity-60',
      className,
    )}
  >
    <Languages className="h-8 w-8" strokeWidth={1.5} />
    <span className="hidden lgx:inline">
      <span className="font-bold">{languageLabel}:</span>{' '}
      <span>{currentLabel}</span>
    </span>
    <ChevronDown
      className={cn(
        'hidden h-4.5 w-4.5 transition-transform lgx:block',
        open && 'rotate-180',
      )}
    />
    {showTooltip && (
      <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-10 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
        {ariaLabel}
      </span>
    )}
  </div>
);

/** Responsive variant — collapses to icon-only below lgx (e.g. dashboard sidebar). */
const ResponsiveTrigger = ({
  open,
  currentLabel,
  languageLabel,
  ariaLabel,
  isPending,
  showTooltip,
  className,
}: TriggerProps) => (
  <div
    className={cn(
      'group relative w-full inline-flex items-center justify-center gap-2.5 rounded-sm bg-neutral-800 text-lg text-neutral-10 transition-colors hover:bg-neutral-700',
      'lg:h-12 lg:w-12 lgx:h-auto lgx:w-auto mr-auto lgx:justify-start lgx:px-4 lgx:py-3',
      isPending && 'opacity-60',
      className,
    )}
  >
    <Languages className="h-8 w-8" strokeWidth={1.5} />
    <span className="hidden lgx:inline">
      <span className="font-bold">{languageLabel}:</span>{' '}
      <span>{currentLabel}</span>
    </span>
    <ChevronDown
      className={cn(
        'hidden h-4.5 w-4.5 transition-transform lgx:block',
        open && 'rotate-180',
      )}
    />
    {showTooltip && (
      <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-10 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block lgx:hidden">
        {ariaLabel}
      </span>
    )}
  </div>
);

/** Full variant — always shows label, used in mobile menus. */
const FullTrigger = ({
  open,
  currentLabel,
  languageLabel,
  isPending,
  className,
}: TriggerProps) => (
  <div
    className={cn(
      'flex w-full items-center justify-start gap-3 rounded-sm bg-white/12 px-[.85em] py-[.75em] text-[18px] transition-colors hover:bg-white/16 sm:text-[20px]',
      isPending && 'opacity-60',
      className,
    )}
  >
    <Languages className="h-6 w-6 text-neutral-10" strokeWidth={2} />
    <span className="grow text-left font-manrope leading-none text-neutral-10">
      <span className="font-bold">{languageLabel}:</span>
      <span className="font-normal"> {currentLabel}</span>
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

/** Compact variant — icon + label + arrow, default dark style. */
const CompactTrigger = ({
  open,
  currentLabel,
  isPending,
  className,
}: TriggerProps) => (
  <div
    className={cn(
      'flex items-center  w-full gap-1 rounded-sm bg-neutral-800 p-2 transition-colors hover:bg-neutral-700',
      isPending && 'opacity-60',
      className,
    )}
  >
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/12">
      <Globe className="h-4 w-4 text-neutral-10" strokeWidth={2} />
    </div>
    <span className="font-manrope text-[18px] text-neutral-10">{currentLabel}</span>
    <ChevronRight
      className={cn(
        'h-4.5 w-4.5 text-neutral-10 transition-transform',
        open ? '-rotate-90' : 'rotate-90',
      )}
      strokeWidth={2}
    />
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
  size?: 'compact' | 'full' | 'responsive';
  align?: 'left' | 'right';
  /** Applied to the trigger button root element. */
  className?: string;
  /** Applied to the Dropdown outer wrapper (the `relative` container box). */
  dropdownClassName?: string;
  onSelect?: () => void;
  showTooltipOnCompact?: boolean;
}

export const LanguageSwitcher = ({
  variant = 'dark',
  size = 'compact',
  align = 'left',
  className,
  dropdownClassName,
  onSelect,
  showTooltipOnCompact = false,
}: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const current = LOCALES.find((item) => item.value === locale) ?? LOCALES[0];
  const languageLabel = tCommon('language');
  const ariaLabel = `${languageLabel}: ${current.label}`;

  const items = LOCALES.map((item) => ({
    value: item.value,
    label: item.label,
    onClick: () => {
      onSelect?.();
      startTransition(() => router.replace(pathname, { locale: item.value }));
    },
  }));

  const sharedProps: Omit<TriggerProps, 'open'> = {
    currentLabel: current.label,
    languageLabel,
    ariaLabel,
    isPending,
    showTooltip: showTooltipOnCompact,
    className,
  };

  const trigger = ({ open }: { open: boolean }) => {
    const props = { ...sharedProps, open };
    if (variant === 'light') return <LightTrigger {...props} />;
    if (size === 'responsive') return <ResponsiveTrigger {...props} />;
    if (size === 'full') return <FullTrigger {...props} />;
    return <CompactTrigger {...props} />;
  };

  const isDarkExpanded = size === 'full' || size === 'responsive';

  const menuClassName =
    variant === 'light'
      ? 'border-neutral-30 bg-neutral-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
      : isDarkExpanded
        ? 'mt-2 rounded-md border-transparent bg-neutral-700 shadow-lg'
        : undefined;

  const itemClassName =
    variant === 'light'
      ? 'text-neutral-900 hover:bg-neutral-20'
      : isDarkExpanded
        ? 'py-3 text-neutral-10 hover:bg-neutral-600'
        : undefined;

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      align={align}
      className={dropdownClassName}
      disabled={isPending}
      ariaLabel={ariaLabel}
      menuClassName={menuClassName}
      itemClassName={itemClassName}
    />
  );
};
