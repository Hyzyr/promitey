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
      className="relative h-[120vh] xl:h-[240vh]"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <section
          className={cn(
            'w-full overflow-hidden',
            'px-5 py-8',
            'md:py-10 mdx:px-10 mdx:py-12',
            'lg:px-16 lg:py-14 lgx:px-20 lgx:py-16',
            'xl:px-26 xl:py-18',
          )}
        >
          <div
            className={cn(
              'flex flex-col items-center',
              'gap-10 md:gap-11 mdx:gap-10 lg:gap-12 lgx:gap-14 xl:gap-16',
            )}
          >
            <h2
              className={cn(
                'text-center font-manrope text-neutral-600',
                'font-bold xl:font-normal',
                'text-[24px] mdx:text-[32px] lg:text-[37px] xl:text-[40px]',
                'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
                'whitespace-nowrap xl:whitespace-pre',
                'px-0 mdx:px-4',
              )}
            >
              <FormatText text={t.raw('title')} />
            </h2>

            <div
              className={cn(
                'mx-auto flex w-full max-w-165 flex-col-reverse items-center mdx:mx-[unset] mdx:max-w-[unset] mdx:flex-row',
                'gap-8 lg:gap-14 xl:justify-between xl:gap-18.5',
              )}
            >
              <div className="flex w-full shrink-0 items-center gap-6 mdx:max-w-[calc(50%-2rem)] mdx:grow mdx:gap-8 lg:w-auto lg:gap-10 xl:gap-13.25">
                <div
                  className={cn(
                    'relative flex w-full flex-col mdx:w-auto mdx:max-w-125 xl:w-176.25',
                    'pl-6 md:pl-8 mdx:pl-8 lg:pl-9 lgx:pl-10 xl:pl-12',
                    'py-2.5 mdx:py-3 lg:py-3.5 xl:py-4',
                    'gap-8 mdx:gap-5.5 lg:gap-6.5 lgx:gap-8 xl:gap-9',
                    'font-manrope font-bold whitespace-pre-wrap',
                    'text-[20px] mdx:text-[23px] lg:text-[28px] xl:text-[32px]',
                  )}
                >
                  <div className="absolute top-0 left-0 h-full w-1.25 shrink-0 mdx:w-1.25">
                    <div className="absolute inset-0 rounded-sm bg-neutral-40" />
                    <motion.div
                      animate={{ top: topPct }}
                      style={{ height: `${100 / steps.length}%` }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                      }}
                      className="absolute left-0 w-1.25 rounded-sm bg-[#2b2929] mdx:w-1.25"
                    />
                  </div>
                  {steps.map((text, i) => (
                    <p
                      key={i}
                      className={
                        activeStep === i
                          ? 'leading-[1.3] text-[#2b2929] transition-colors duration-300'
                          : 'leading-[1.3] text-neutral-80 transition-colors duration-300'
                      }
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  'relative flex w-full shrink-0 mdx:w-auto mdx:grow xl:w-188.25',
                  'mdx:min-h-88 lg:min-h-92 lgx:min-h-96 xl:min-h-102',
                  'mdx:self-stretch',
                )}
              >
                <div
                  className={cn(
                    'aspect-1506/858 h-auto w-full mdx:absolute mdx:top-1/2 mdx:left-0 mdx:h-full mdx:max-h-80 mdx:w-auto mdx:-translate-y-1/2',
                    'rounded-[16px] mdx:rounded-2xl xl:rounded-3xl',
                    'overflow-hidden bg-[#2b2929]',
                  )}
                >
                  <img
                    src="/images/temp-guide-img.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="pointer-events-none inset-0 h-full w-full object-cover mdx:absolute"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
