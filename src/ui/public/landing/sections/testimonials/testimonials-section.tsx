'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { useMedia } from '@/hooks/use-media';
import { cn } from '@/lib/utils';
import { AUTOPLAY_DELAY, SLIDES } from './data';
import { NavigationArrows } from './navigation-arrows';
import { PaginationDots } from './pagination-dots';
import { TestimonialCard } from './testimonial-card';
import { useTestimonialsCarousel } from './use-testimonials-carousel';

export const TestimonialsSection = () => {
  const t = useTranslations('landing.testimonials');
  const showPagination = useMedia('(min-width: 768px)');
  const {
    emblaRef,
    sectionRef,
    selectedIndex,
    activeDotIndex,
    isAutoPlaying,
    isInteractionPaused,
    isVisible,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useTestimonialsCarousel();

  const testimonialsCount = SLIDES.length / 3;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="testimonials"
      className={cn(
        'relative -mb-8 w-full overflow-hidden',
        'px-5 py-22.5',
        'md:px-12 md:py-16 lg:py-20 xl:px-26 xl:py-22.5',
      )}
    >
      <div className="pointer-events-none absolute -bottom-2 -left-5 w-[150%] pb-[80%] opacity-90 md:w-234.5 md:opacity-100">
        <img
          src="/images/bg-blur-bottom-left.png"
          alt="bg-blur"
          sizes="(min-width: 768px) 938px, 150vw"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain object-bottom-left"
        />
      </div>

      <div className="relative flex flex-col gap-12 md:gap-23 lg:gap-7.5 xl:gap-8">
        <div className="flex min-h-10 items-start justify-between gap-4 md:h-10.5 md:items-center lg:h-11 xl:h-12">
          <h2
            className={cn(
              'font-manrope text-neutral-600',
              'font-bold xl:font-light',
              'text-[24px] md:text-[32px] lg:text-[37px] xl:text-[40px]',
              'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
              'max-w-52.5 md:max-w-none',
            )}
          >
            {t('title')}
          </h2>
          <div className="hidden shrink-0 md:block">
            <NavigationArrows onPrev={scrollPrev} onNext={scrollNext} />
          </div>
        </div>

        <div className="pt-7 pb-10 md:pt-8 md:pb-11 xl:pt-9.25 xl:pb-12">
          <div
            className="gpu-layer -my-8 py-8 md:-my-9 md:py-9 xl:-my-10 xl:py-10"
            ref={emblaRef}
          >
            <div className="gpu-layer xsm:-ml-4 flex">
              {SLIDES.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 sm:flex-col-reverse sm:justify-center md:flex-row md:gap-0">
          <div className="md:hidden">
            <NavigationArrows onPrev={scrollPrev} onNext={scrollNext} />
          </div>
          {showPagination && (
            <PaginationDots
              count={testimonialsCount}
              activeIndex={activeDotIndex}
              progressKey={selectedIndex}
              showProgress={isAutoPlaying && !isInteractionPaused && isVisible}
              autoplayDelay={AUTOPLAY_DELAY}
              onDotClick={scrollTo}
            />
          )}
        </div>
      </div>
    </section>
  );
};
