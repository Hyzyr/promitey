import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { useObserver } from '@/hooks/use-observer';
import { AUTOPLAY_DELAY, IDLE_RESUME_DELAY, TESTIMONIALS } from './data';

export function useTestimonialsCarousel() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin.current,
  ]);

  const { ref: sectionRef, isVisible } = useObserver({ threshold: 0.1 });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const userInteractedRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleIdleResume = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      userInteractedRef.current = false;
      setIsAutoPlaying(true);
      autoplayPlugin.current.play();
    }, IDLE_RESUME_DELAY);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    if (!userInteractedRef.current) {
      setIsAutoPlaying(true);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [emblaApi, onSelect]);

  const handleUserInteraction = useCallback(() => {
    userInteractedRef.current = true;
    setIsAutoPlaying(false);
    autoplayPlugin.current.stop();
    scheduleIdleResume();
  }, [scheduleIdleResume]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    handleUserInteraction();
  }, [emblaApi, handleUserInteraction]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    handleUserInteraction();
  }, [emblaApi, handleUserInteraction]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      handleUserInteraction();
    },
    [emblaApi, handleUserInteraction],
  );

  useEffect(() => {
    if (!emblaApi) return;
    if (isVisible) {
      if (!userInteractedRef.current) {
        setIsAutoPlaying(true);
        autoplayPlugin.current.play();
      }
    } else {
      setIsAutoPlaying(false);
      autoplayPlugin.current.stop();
    }
  }, [isVisible, emblaApi]);

  return {
    emblaRef,
    sectionRef,
    selectedIndex,
    activeDotIndex: selectedIndex % TESTIMONIALS.length,
    isAutoPlaying,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
