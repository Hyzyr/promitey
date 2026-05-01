'use client';

import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Hook to track scroll direction and position for header visibility control.
 * Returns visibility state based on scroll direction with threshold to prevent jitter.
 * 
 * @example
 * const { isVisible, isAtTop } = useHeaderScroll();
 * 
 * // Use in header component:
 * // - isVisible: Show header when scrolling up or at top
 * // - isAtTop: Remove shadow/change style when at page top
 */
export function useHeaderScroll() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const direction = latest > previous ? 'down' : 'up';
    
    // Threshold to prevent jitter on minor scroll movements
    const SCROLL_THRESHOLD = 50;
    const scrollDifference = Math.abs(latest - previous);

    // Update isAtTop state
    setIsAtTop(latest < 20);

    // Show header when:
    // 1. At the top of the page (< 100px)
    // 2. Scrolling up with meaningful movement (> threshold)
    // Hide header when scrolling down past top
    if (latest < 100) {
      setIsVisible(true);
    } else if (scrollDifference > SCROLL_THRESHOLD) {
      setIsVisible(direction === 'up');
    }
  });

  return { isVisible, isAtTop };
}
