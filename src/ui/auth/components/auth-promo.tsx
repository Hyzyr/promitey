'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

/**
 * Bottom-left glass promo card with carousel dots (desktop only).
 *
 * The single slide currently surfaces the network-power message; pagination
 * dots are wired but inert until additional slides are added.
 */
export const AuthPromo = () => {
  const t = useTranslations('auth.promo');
  const [active, setActive] = useState(0);
  const slides = [t('slide1')];

  return (
    <div
      className={cn(
        'glass relative hidden w-[671px] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-lg px-6 pt-4 pb-11 backdrop-blur-[9.25px]',
        'shadow-[0px_93px_16.6px_-52px_rgba(0,0,0,0.05),0px_56px_36.9px_-36px_rgba(0,0,0,0.12)]',
        'lg:flex',
      )}
    >
      <p className="font-montserrat text-center text-[24px] leading-tight font-semibold tracking-[-0.24px] text-yellow-50">
        {slides[active]}
      </p>

      <div className="absolute bottom-[15px] left-1/2 flex -translate-x-1/2 items-center gap-4">
        {/* Active dot — wider pill */}
        <button
          type="button"
          onClick={() => setActive(0)}
          className="grid place-items-start"
          aria-label="Slide 1"
        >
          <span className="h-[5px] w-[72px] rounded-lg bg-neutral-30 opacity-40" />
          <span className="-mt-[5px] h-[5px] w-[29px] rounded-lg bg-neutral-600" />
        </button>
        <span className="h-[5px] w-[42px] rounded-lg bg-neutral-30 opacity-40" />
        <span className="h-[5px] w-[42px] rounded-lg bg-neutral-30 opacity-40" />
      </div>
    </div>
  );
};
