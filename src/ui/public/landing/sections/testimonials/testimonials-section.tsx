'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { AUTOPLAY_DELAY, SLIDES } from './data';
import { NavigationArrows } from './navigation-arrows';
import { PaginationDots } from './pagination-dots';
import { TestimonialCard } from './testimonial-card';
import { useTestimonialsCarousel } from './use-testimonials-carousel';
import { cn } from '@/lib/utils';

export const TestimonialsSection = () => {
  const t = useTranslations('landing.testimonials');
  const {
    emblaRef,
    sectionRef,
    selectedIndex,
    activeDotIndex,
    isAutoPlaying,
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
        'relative w-full -mb-8 overflow-hidden',
        'px-5 py-22.5',
        'md:px-12 md:py-16 lg:py-20 xl:px-26 xl:py-22.5',
      )}>
      <div
        className="absolute -left-5 -bottom-2 w-[150%] lg:w-234.5 pb-[80%] pointer-events-none opacity-90 md:opacity-100"
        style={{ filter: 'blur(0.5px)' }}>
        <img
          src={'/images/bg-blur-bottom-left.png'}
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-bottom-left"
        />
      </div>

      <div className="relative flex flex-col gap-8 md:gap-7 lg:gap-7.5 xl:gap-8">
        <div className="flex items-start md:items-center justify-between gap-4 min-h-10 md:h-10.5 lg:h-11 xl:h-12">
          <h2
            className={cn(
              'font-manrope text-neutral-600',
              'font-bold xl:font-light',
              'text-[24px] md:text-[32px] lg:text-[37px] xl:text-[40px]',
              'leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]',
              'max-w-52.5 md:max-w-none',
            )}>
            {t('title')}
          </h2>
          <div className="hidden md:block shrink-0">
            <NavigationArrows onPrev={scrollPrev} onNext={scrollNext} />
          </div>
        </div>

        <div className="pt-7 md:pt-8 xl:pt-9.25 pb-10 md:pb-11 xl:pb-12">
          <div
            className="py-8 md:py-9 xl:py-10 -my-8 md:-my-9 xl:-my-10"
            ref={emblaRef}>
            <div className="flex -ml-4">
              {SLIDES.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-0">
          <div className="md:hidden">
            <NavigationArrows onPrev={scrollPrev} onNext={scrollNext} />
          </div>
          <PaginationDots
            count={testimonialsCount}
            activeIndex={activeDotIndex}
            progressKey={selectedIndex}
            isAutoPlaying={isAutoPlaying}
            autoplayDelay={AUTOPLAY_DELAY}
            onDotClick={scrollTo}
          />
        </div>
      </div>
    </section>
  );
};
