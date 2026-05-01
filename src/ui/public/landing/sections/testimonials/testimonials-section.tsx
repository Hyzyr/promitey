'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { AUTOPLAY_DELAY, SLIDES } from './data';
import { NavigationArrows } from './navigation-arrows';
import { PaginationDots } from './pagination-dots';
import { TestimonialCard } from './testimonial-card';
import { useTestimonialsCarousel } from './use-testimonials-carousel';

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
      className="relative w-full -mb-8 overflow-hidden
                 px-[20px] py-[90px]
                 md:px-12 md:py-16 lg:py-20 xl:px-26 xl:py-22.5">
      {/* Background decoration */}
      <div
        className="absolute -left-53.25 top-18.25 w-234.5 h-200 pointer-events-none opacity-50 md:opacity-100"
        style={{ filter: 'blur(0.5px)' }}>
        <img
          src={'/images/bg-blur-bottom-left.png'}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative flex flex-col gap-[32px] md:gap-7 lg:gap-7.5 xl:gap-8">
        {/* Title row — arrows visible only on md+; on mobile they live at the bottom */}
        <div className="flex items-start md:items-center justify-between gap-4 min-h-[40px] md:h-10.5 lg:h-11 xl:h-12">
          <p
            className="font-manrope text-neutral-600
                       font-bold xl:font-light
                       text-[24px] md:text-[32px] lg:text-[37px] xl:text-[40px]
                       leading-[1.1] tracking-[-0.48px] xl:tracking-[-0.8px]
                       max-w-[210px] md:max-w-none">
            {t('title')}
          </p>
          <div className="hidden md:block shrink-0">
            <NavigationArrows onPrev={scrollPrev} onNext={scrollNext} />
          </div>
        </div>

        {/* Embla carousel viewport */}
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

        {/* Bottom controls.
            Mobile: arrows on either side of dots for thumb-friendly UX.
            Desktop: dots only (arrows live in header). */}
        <div className="flex items-center justify-center gap-[16px] md:gap-0">
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
