'use client';

import { Globe, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Dropdown } from './dropdown';

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'En' },
  { value: 'ru', label: 'Ru' },
];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

  const trigger = (
    <div className="flex items-center gap-1 rounded-xl bg-white/12 p-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
        <Globe className="h-4 w-4 text-neutral-10" strokeWidth={2} />
      </div>
      <span className="font-roboto text-[18px] text-neutral-10">
        {current.label}
      </span>
      <ChevronRight className="h-4.5 w-4.5 rotate-90 text-neutral-10" strokeWidth={2} />
    </div>
  );

  const items = LOCALES.map((l) => ({
    value: l.value,
    label: l.label,
    onClick: () => router.replace(pathname, { locale: l.value }),
  }));

  return <Dropdown trigger={trigger} items={items} align="left" />;
}
