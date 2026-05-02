'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Tracks N child cards inside a container ref. Returns the index of the card
 * whose vertical center is closest to the viewport center. Fires on scroll/resize.
 *
 * `enabled=false` disables tracking and returns the controlled fallback index.
 *
 * Use case: on mobile (no hover), highlight the benefit card currently centered
 * in the viewport as the user scrolls through the stack.
 */
export function useScrollActiveCard<T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: { enabled?: boolean; fallbackIndex?: number } = {},
) {
  const { enabled = true, fallbackIndex = 0 } = options;
  const containerRef = useRef<T>(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number>(0);

  // When disabled, derive activeIndex directly without any effect-driven state
  const activeIndex = enabled ? scrollActiveIndex : fallbackIndex;

  useEffect(() => {
    if (!enabled) return;
    const root = containerRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-benefit-card]'),
    );
    if (cards.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const viewportCenter = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        // Only consider cards at least partially visible
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setScrollActiveIndex(bestIdx);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [enabled, count, fallbackIndex]);

  return { containerRef, activeIndex };
}
