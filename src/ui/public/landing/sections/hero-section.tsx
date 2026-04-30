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
    'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[2000px] object-cover object-[center, 30%] pointer-events-none';

  return (
    <section
      id="hero"
      className="relative isolate w-full h-screen bg-neutral-30 flex items-center justify-center overflow-hidden">
      {/* Background image with mask */}
      <div className="bg">
        <img src={'/main-bg.png'} alt="" className={bgClass} />
         {/* <video
          ref={videoRef}
          src="/kling_20260426_VIDEO_Video1this_3858_0.mp4"
          className={bgClass}
          autoPlay
          loop
          muted
        />  */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-10 items-center px-24">
        {/* Text block */}
        <div className="flex flex-col gap-7.5 items-center pt-10">
          {/* Heading */}
          <h1 className="flex flex-col font-manrope font-bold leading-[1.1] tracking-[0.72px] text-neutral-900 text-[72px] text-center items-center whitespace-nowrap">
            <p>{t('title.line1')}</p>
            <p>{t('title.line2')}</p>
          </h1>

          {/* Body */}
          <p className="font-roboto font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[#2b2929] text-center w-198.5">
            <FormatText text={t.raw('subtitle')} />
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4.5 items-center">
          {/* Primary CTA */}
          <Button
            variant="default"
            size="lg"
            className="w-97.5"
            style={{
              boxShadow: '4px 11px 5.5px rgba(0,0,0,0.05)',
            }}>
            {t('ctaPrimary')}
          </Button>

          {/* Glass button */}
          <GlassButton size="md" className="w-52 px-4 py-2 tracking-[-0.36px]">
            {t('ctaSecondary')}
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
