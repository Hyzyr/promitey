'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollSteps } from '@/hooks/use-scroll-steps';
import { FormatText } from '@/components/ui/format-text';
import { cn } from '@/lib/utils';

export const ConnectGuide = () => {
  const t = useTranslations('landing.guide');
  const steps = [t('steps.0'), t('steps.1'), t('steps.2')];
  const { containerRef, activeStep } = useScrollSteps(steps.length);

  const topPct = `${(activeStep / steps.length) * 100}%`;

  return (
    <section
      id="guide"
      aria-label={t('title')}
      ref={containerRef}
      className="relative h-[120vh] xl:h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <section
          className={cn(
            'w-full overflow-hidden',
            'px-5 py-10',
            'md:px-12 md:py-16 lg:py-20',
            'xl:px-26 xl:py-22.5',
          )}>
          <div
            className={cn(
              'flex flex-col items-center',
              'gap-6 md:gap-12 lg:gap-16 xl:gap-20',
            )}>
            <h2
              className={cn(
                'font-manrope text-neutral-600 text-center',
                'font-bold xl:font-normal',
                'text-[24px] md:text-[32px] lg:text-[37px] xl:text-[40px]',
                'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
                'whitespace-nowrap xl:whitespace-pre',
                'px-0 md:px-4',
              )}>
              <FormatText text={t.raw('title')} />
            </h2>

            <div
              className={cn(
                'flex flex-col-reverse md:flex-row items-center w-full',
                'gap-6 md:gap-10 lg:gap-14 xl:gap-18.5 xl:justify-between',
              )}>
              <div className="flex shrink-0 items-center w-full md:w-auto gap-6 md:gap-8 lg:gap-10 xl:gap-13.25 xl:justify-between">
                <div
                  className={cn(
                    'relative flex flex-col w-full md:w-auto md:max-w-125 xl:w-176.25',
                    'pl-6 md:pl-8 lg:pl-10 xl:pl-12',
                    'py-3 md:py-3.5 lg:py-4',
                    'gap-9.25 md:gap-6 lg:gap-7.5 xl:gap-9.25',
                    'font-manrope font-bold whitespace-pre-wrap',
                    'text-[20px] md:text-[23px] lg:text-[28px] xl:text-[32px]',
                  )}>
                  <div className="absolute top-0 left-0 h-full w-1.25 md:w-1.25 shrink-0">
                    <div className="absolute inset-0 rounded-sm bg-neutral-40" />
                    <motion.div
                      animate={{ top: topPct }}
                      style={{ height: `${100 / steps.length}%` }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                      }}
                      className="absolute left-0 w-1.25 md:w-1.25 rounded-sm bg-[#2b2929]"
                    />
                  </div>
                  {steps.map((text, i) => (
                    <p
                      key={i}
                      className={
                        activeStep === i
                          ? 'leading-[1.3] text-[#2b2929] transition-colors duration-300'
                          : 'leading-[1.3] text-neutral-80 transition-colors duration-300'
                      }>
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  'relative w-full md:w-100 xl:w-188.25 shrink-0',
                  'aspect-1506/858 md:aspect-auto',
                  'md:min-h-100 xl:min-h-110',
                  'md:self-stretch',
                  'rounded-[16px] md:rounded-2xl xl:rounded-3xl',
                  'overflow-hidden bg-[#2b2929]',
                )}>
                <img
                  src="/images/temp-guide-img.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
