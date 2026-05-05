'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FormatText } from '@/components/ui/format-text';
import { cn } from '@/lib/utils';
import { useMedia } from '@/hooks/use-media';

export const HeroSection = () => {
  const t = useTranslations('landing.hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMedia('(max-width: 1023px)');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const bgClass =
    'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[2000px] object-cover object-[center_78%] pointer-events-none';

  return (
    <section
      id="hero"
      className="relative isolate w-full min-h-170 pb-[8vh] md:min-h-205 h-[calc(100vh-56px)] xl:h-screen bg-neutral-30 flex items-center justify-center overflow-hidden">
      <div className="bg">
        {!isMobile && (
          <img src={'/images/main-bg.png'} alt="" className={bgClass} />
        )}
        {isMobile && (
          <img src={'/images/main-bg-mobile.png'} alt="" className={bgClass} />
        )}
      </div>

      <div
        className={cn(
          'relative z-10 flex w-full max-w-full flex-col items-center',
          'gap-10 md:gap-9 lg:gap-9 xl:gap-10',
          'px-5 md:px-12 xl:px-24',
          'pt-6 md:pt-7 lg:pt-8 xl:pt-10',
          'pb-8 md:pb-12 xl:pb-16',
        )}>
        <div className="flex w-full max-w-full flex-col items-center gap-7.5 md:gap-7 xl:gap-7.5 text-center">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-4 w-full">
            <p className="md:hidden font-manrope font-bold text-[20px] leading-[1.1] tracking-[0.2px] text-primary-500 text-center">
              {t('eyebrow')}
            </p>

            <h1
              className={cn(
                'font-manrope font-bold text-neutral-900 text-center',
                'text-[36px] md:text-[48px] lg:text-[60px] xl:text-[72px]',
                'leading-[1.1] tracking-[0.36px] md:tracking-[0.48px] xl:tracking-[0.72px]',
              )}>
              <span className="hidden md:flex md:flex-col md:items-center">
                <span className="whitespace-nowrap">{t('title.line1')}</span>
                <span className="whitespace-nowrap">{t('title.line2')}</span>
              </span>
              <span className="md:hidden block mx-auto max-w-76">
                {t('title.line2')}
              </span>
            </h1>
          </div>

          <p
            className={cn(
              'font-roboto font-normal text-[#2b2929] text-center',
              'text-[16px] md:text-[18px] lg:text-[21px] xl:text-[24px]',
              'leading-[1.4] tracking-[-0.32px] md:tracking-[-0.4px] xl:tracking-[-0.48px]',
              'max-w-full md:max-w-150 xl:max-w-198.5',
            )}>
            <FormatText text={t.raw('subtitle')} />
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4.5 md:gap-4.5 md:w-auto">
          <Button
            variant="default"
            size="lg"
            href="/register"
            className={cn(
              'px-8! py-4! text-[18px]! rounded-[16px]!',
              'md:px-12! md:py-4.5! md:text-[20px]!',
              'xl:px-16.5! xl:py-4! xl:text-[22px]! xl:rounded-lg!',
            )}
            style={{ boxShadow: '4px 11px 5.5px rgba(0,0,0,0.05)' }}>
            {t('ctaPrimary')}
          </Button>

          <Button
            variant="glass"
            size="md"
            href="#guide"
            className={cn(
              'w-52! px-4! py-2! text-[18px]! rounded-[16px]! tracking-[-0.36px]',
              'md:w-auto! md:px-10! md:py-3.5!',
              'xl:px-16.5! xl:py-4.5! xl:text-[22px]! xl:rounded-lg!',
            )}>
            {t('ctaSecondary')}
          </Button>
        </div>
      </div>
    </section>
  );
};
