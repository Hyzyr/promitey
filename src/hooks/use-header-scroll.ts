'use client';

import { useState, useRef } from 'react';
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
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    const direction = latest > previous ? 'down' : 'up';
    const scrollDifference = Math.abs(latest - previous);
    
    // Always update last known scroll position
    lastScrollY.current = latest;

    // Update isAtTop state (< 20px from top)
    setIsAtTop(latest < 20);

    // Show header when:
    // 1. At the top of the page (< 100px)
    // 2. Scrolling up with meaningful movement (> 10px threshold)
    // Hide header when scrolling down past 100px
    if (latest < 100) {
      setIsVisible(true);
    } else if (scrollDifference > 10) {
      setIsVisible(direction === 'up');
    }
  });

  return { isVisible, isAtTop };
}
