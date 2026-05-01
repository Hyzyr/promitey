'use client';

import { Languages, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const next = locale === 'ru' ? 'en' : 'ru';

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(() => router.replace(pathname, { locale: next }))
      }
      className="inline-flex h-12 w-fit items-center justify-center gap-3 rounded-xl bg-neutral-800 px-4 py-3 text-lg text-white transition-colors hover:bg-neutral-700 disabled:opacity-60">
      <Languages className="h-6 w-6" strokeWidth={1.75} />
      <span>
        <span className="font-bold">Language:</span>{' '}
        <span>{locale === 'ru' ? 'Ru' : 'En'}</span>
      </span>
      <ChevronDown className="h-[18px] w-[18px]" />
    </button>
  );
};
