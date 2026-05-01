'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { GlassButton } from '@/components/ui/glass-button';
import { FormatText } from '@/components/ui/format-text';

export const HeroSection = () => {
  const t = useTranslations('landing.hero');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const bgClass =
    'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[2000px] object-cover object-[center,30%] pointer-events-none';

  return (
    <section
      id="hero"
      className="relative isolate w-full min-h-[760px] md:min-h-[820px] xl:h-screen bg-neutral-30 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="bg">
        <img src={'/main-bg.png'} alt="" className={bgClass} />
      </div>

      {/* Content — Figma mobile: pb-32, px-20, gap-40 between text-block and buttons-block */}
      <div
        className="relative z-10 flex w-full max-w-full flex-col items-center
                   gap-[40px] md:gap-9 lg:gap-9 xl:gap-10
                   px-[20px] md:px-12 xl:px-24
                   pt-6 md:pt-7 lg:pt-8 xl:pt-10
                   pb-[32px] md:pb-12 xl:pb-16">
        {/* Text block — Figma: gap-30 inside (heading group → subtitle) */}
        <div className="flex w-full max-w-full flex-col items-center gap-[30px] md:gap-7 xl:gap-7.5 text-center">
          {/* Heading group — Figma: gap-16 between tagline & main heading */}
          <div className="flex flex-col items-center justify-center gap-[16px] md:gap-4 w-full">
            {/* Eyebrow tagline — mobile only per Figma (20px primary Manrope Bold) */}
            <p className="md:hidden font-manrope font-bold text-[20px] leading-[1.1] tracking-[0.2px] text-primary-500 text-center">
              {t('eyebrow')}
            </p>

            {/* Main heading — mobile single line (line2 wrapped at 304px), tablet/desktop 2 lines from translations */}
            <h1
              className="font-manrope font-bold text-neutral-900 text-center
                         text-[36px] md:text-[48px] lg:text-[60px] xl:text-[72px]
                         leading-[1.1] tracking-[0.36px] md:tracking-[0.48px] xl:tracking-[0.72px]">
              {/* line1 hidden on mobile (eyebrow above replaces it); shown md+ */}
              <span className="hidden md:flex md:flex-col md:items-center">
                <span className="whitespace-nowrap">{t('title.line1')}</span>
                <span className="whitespace-nowrap">{t('title.line2')}</span>
              </span>
              {/* mobile: only line2, constrained 304px so it wraps */}
              <span className="md:hidden block mx-auto max-w-[304px]">
                {t('title.line2')}
              </span>
            </h1>
          </div>

          {/* Subtitle — Figma mobile: 16px Roboto, leading 1.4, color #2b2929, full width */}
          <p
            className="font-roboto font-normal text-[#2b2929] text-center
                       text-[16px] md:text-[18px] lg:text-[21px] xl:text-[24px]
                       leading-[1.4] tracking-[-0.32px] md:tracking-[-0.4px] xl:tracking-[-0.48px]
                       max-w-full md:max-w-[600px] xl:max-w-[794px]">
            <FormatText text={t.raw('subtitle')} />
          </p>
        </div>

        {/* Buttons — Figma mobile: gap-18 vertical, primary CTA px-32 py-16 18px, glass w-208 px-16 py-8 18px */}
        <div className="flex w-full flex-col items-center gap-[18px] md:gap-4.5 md:w-auto">
          <Button
            variant="default"
            size="lg"
            className="!px-[32px] !py-[16px] !text-[18px] !rounded-[16px]
                       md:!px-12 md:!py-[18px] md:!text-[20px]
                       xl:!px-16.5 xl:!py-4 xl:!text-[22px] xl:!rounded-lg"
            style={{ boxShadow: '4px 11px 5.5px rgba(0,0,0,0.05)' }}>
            {t('ctaPrimary')}
          </Button>

          <GlassButton
            size="md"
            className="!w-[208px] !px-[16px] !py-[8px] !text-[18px] !rounded-[16px] tracking-[-0.36px]
                       md:!w-auto md:!px-10 md:!py-[14px]
                       xl:!px-16.5 xl:!py-4.5 xl:!text-[22px] xl:!rounded-lg">
            {t('ctaSecondary')}
          </GlassButton>
        </div>
      </div>
    </section>
  );
};
