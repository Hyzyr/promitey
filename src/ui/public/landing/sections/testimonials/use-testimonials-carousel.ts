import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { useObserver } from '@/hooks/use-observer';
import { AUTOPLAY_DELAY, IDLE_RESUME_DELAY, TESTIMONIALS } from './data';

export function useTestimonialsCarousel() {
  // useMemo avoids accessing .current during render (lint: react-hooks/refs)
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin,
  ]);

  const { ref: sectionRef, isVisible } = useObserver({ threshold: 0.1 });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);

  const userInteractedRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleIdleResume = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      userInteractedRef.current = false;
      setIsInteractionPaused(false);
      if (!emblaApi || !isVisible) return;
      emblaApi.scrollNext();
      setIsAutoPlaying(true);
      autoplayPlugin.play();
    }, IDLE_RESUME_DELAY);
  }, [autoplayPlugin, emblaApi, isVisible]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    if (!userInteractedRef.current) {
      setIsAutoPlaying(true);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Subscribe only — initial selectedIndex is 0 which matches useState(0)
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
    setIsInteractionPaused(true);
    autoplayPlugin.stop();
    scheduleIdleResume();
  }, [autoplayPlugin, scheduleIdleResume]);

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
        setIsInteractionPaused(false);
        setIsAutoPlaying(true);
        autoplayPlugin.play();
      } else {
        setIsAutoPlaying(false);
        setIsInteractionPaused(true);
        autoplayPlugin.stop();
        scheduleIdleResume();
      }
    } else {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      startTransition(() => {
        setIsAutoPlaying(false);
        setIsInteractionPaused(false);
      });
      autoplayPlugin.stop();
    }
  }, [isVisible, emblaApi, autoplayPlugin, scheduleIdleResume]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('pointerDown', handleUserInteraction);
    return () => {
      emblaApi.off('pointerDown', handleUserInteraction);
    };
  }, [emblaApi, handleUserInteraction]);

  return {
    emblaRef,
    sectionRef,
    selectedIndex,
    activeDotIndex: selectedIndex % TESTIMONIALS.length,
    isAutoPlaying,
    isInteractionPaused,
    isVisible,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
