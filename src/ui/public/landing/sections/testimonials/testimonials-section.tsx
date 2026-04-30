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

  const testimonialsCount = SLIDES.length / 3; // Since SLIDES are tripled

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="testimonials"
      className="relative w-full py-22.5 px-26 overflow-hidden -mb-8">
      {/* Background decoration */}
      <div
        className="absolute -left-53.25 top-18.25 w-234.5 h-200 pointer-events-none"
        style={{ filter: 'blur(0.5px)' }}>
        <img src={'/images/bg-blur-bottom-left.png'} alt="background-decoration" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Title + arrows row */}
        <div className="flex items-center justify-between h-12">
          <p className="font-manrope font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600 whitespace-nowrap">
            {t('title')}
          </p>
          <NavigationArrows onPrev={scrollPrev} onNext={scrollNext} />
        </div>

        {/* Embla carousel viewport — py-10 / -my-10 gives clearance for floating badges */}
        <div className="pt-9.25 pb-12">
          <div className="py-10 -my-10" ref={emblaRef}>
            <div className="flex -ml-4">
              {SLIDES.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination with CSS-animated progress bar */}
        <div className="flex justify-center">
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
}
