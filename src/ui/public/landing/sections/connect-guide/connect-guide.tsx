'use client';

import { useTranslations } from 'next-intl';

import { useScrollSteps } from '@/hooks/use-scroll-steps';
import { cn } from '@/lib/utils';

import { GuidePreview } from './guide-preview';
import { GuideSteps } from './guide-steps';
import { GuideTitle } from './guide-title';
import { Container } from '@/components/ui/container';

export const ConnectGuide = () => {
  const t = useTranslations('landing.guide');
  const steps = [t('steps.0'), t('steps.1'), t('steps.2')];
  const { containerRef, activeStep } = useScrollSteps(steps.length);

  return (
    <section
      id="guide"
      aria-label={t('title')}
      ref={containerRef}
      className="relative h-[180vh] md:h-[200vh] xl:h-[240vh]"
    >
      <Container className="pb-5vh sticky top-0 flex h-screen items-center">
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
      </Container>
    </section>
  );
};
