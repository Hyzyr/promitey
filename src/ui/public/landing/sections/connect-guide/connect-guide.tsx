'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

import { GuidePreview } from './guide-preview';
import { GuideSteps } from './guide-steps';
import { GuideTitle } from './guide-title';

const guideImages = [
  '/images/guide/item01.png',
  '/images/guide/item02.png',
  '/images/guide/item03.png',
];

export const ConnectGuide = () => {
  const t = useTranslations('landing.guide');
  const steps = [t('steps.0'), t('steps.1'), t('steps.2')];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="guide"
      aria-label={t('title')}
      className="relative overflow-hidden py-15 md:py-25 xl:py-30"
    >
      <Container className="flex items-center">
        <div
          className={cn(
            'flex w-full flex-col items-center',
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
            <GuideSteps
              steps={steps}
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />
            <GuidePreview images={guideImages} activeStep={activeStep} />
          </div>
        </div>
      </Container>
    </section>
  );
};
