'use client';

import { useTranslations } from 'next-intl';

import { useScrollSteps } from '@/hooks/use-scroll-steps';
import { cn } from '@/lib/utils';

import { GuidePreview } from './guide-preview';
import { GuideSteps } from './guide-steps';
import { GuideTitle } from './guide-title';

export const ConnectGuide = () => {
  const t = useTranslations('landing.guide');
  const steps = [t('steps.0'), t('steps.1'), t('steps.2')];
  const { containerRef, activeStep } = useScrollSteps(steps.length);

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
            <GuideTitle title={t.raw('title')} />

            <div
              className={cn(
                'mx-auto flex w-full max-w-165 flex-col-reverse items-center mdx:mx-[unset] mdx:max-w-[unset] mdx:flex-row',
                'gap-8 lg:gap-14 xl:justify-between xl:gap-18.5',
              )}
            >
              <GuideSteps steps={steps} activeStep={activeStep} />
              <GuidePreview />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
