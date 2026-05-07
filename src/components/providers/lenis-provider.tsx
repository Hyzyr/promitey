'use client';

import Lenis from 'lenis';
import { createContext, startTransition, useContext, useEffect, useState } from 'react';

import { useWindowResize } from '@/hooks/use-window-resize';

export type ScrollToOptions = {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
};

export type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: ScrollToOptions) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

const nativeScrollTo = (target: string | number, options?: ScrollToOptions) => {
  if (typeof target === 'number') {
    window.scrollTo({ top: target + (options?.offset ?? 0), behavior: 'smooth' });
    return;
  }

  const element = document.querySelector(target);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
  window.scrollTo({ top, behavior: 'smooth' });
};

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const resizeTrigger = useWindowResize();

  useEffect(() => {
    if (!lenis) return;
    lenis.resize();
  }, [resizeTrigger, lenis]);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    startTransition(() => setLenis(lenisInstance));

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  const scrollTo = (target: string | number, options?: ScrollToOptions) => {
    if (!lenis) {
      nativeScrollTo(target, options);
      return;
    }
    lenis.scrollTo(target, options);
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

export function useLenis(): LenisContextValue {
  const context = useContext(LenisContext);

  if (context) {
    return context;
  }

  return {
    lenis: null,
    scrollTo: nativeScrollTo,
  };
}
