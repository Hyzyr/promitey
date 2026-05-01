'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { FaqItemComponent } from './faq-item';
import { cn } from '@/lib/utils';

export const FaqSection = () => {
  const t = useTranslations('landing.faq');
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  const faqCount = 6;

  return (
    <section
      id="faq"
      className={cn(
        'w-full',
        'px-5 pt-22.5 pb-30',
        'md:px-0 md:pt-16 md:pb-20 lg:pt-20 lg:pb-25 xl:pt-22.5 xl:pb-30',
      )}>
      <Container className={cn('flex flex-col items-center px-0! md:px-[unset]!', 'gap-9 md:gap-10 lg:gap-12 xl:gap-15')}>
        <p
          className={cn(
            'font-manrope text-neutral-600 text-center w-full px-0 md:px-4',
            'font-bold xl:font-medium',
            'text-[24px] md:text-[32px] lg:text-[37px] xl:text-[40px]',
            'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
          )}>
          {t('title')}
        </p>

        <div className="flex w-full max-w-full md:max-w-170 xl:w-252.5 flex-col gap-4 md:gap-5 xl:gap-6">
          {Array.from({ length: faqCount }).map((_, i) => (
            <FaqItemComponent
              key={i}
              question={t(`items.${i}.q`)}
              answer={t(`items.${i}.a`)}
              isOpen={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
