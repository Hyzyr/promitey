'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook to lock/unlock body scroll with scroll position preservation.
 * Useful for modals, mobile menus, and overlays.
 * 
 * @example
 * const { lock, unlock } = useScrollLock();
 * 
 * // Lock scroll when menu opens
 * useEffect(() => {
 *   if (isOpen) {
 *     lock();
 *   } else {
 *     unlock();
 *   }
 * }, [isOpen, lock, unlock]);
 */
export function useScrollLock() {
  const scrollPositionRef = useRef<number>(0);
  const isLockedRef = useRef(false);

  const lock = useCallback(() => {
    if (isLockedRef.current) return;

    // Store current scroll position
    scrollPositionRef.current = window.scrollY;
    isLockedRef.current = true;

    // Apply scroll lock styles to body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = '100%';
  }, []);

  const unlock = useCallback(() => {
    if (!isLockedRef.current) return;

    // Remove scroll lock styles
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');

    // Restore scroll position
    window.scrollTo(0, scrollPositionRef.current);
    isLockedRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isLockedRef.current = false;
      // Ensure scroll is unlocked when component unmounts
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
    };
  }, []);

  return { lock, unlock };
}
