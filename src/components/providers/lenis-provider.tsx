"use client";

import Lenis from "lenis";
import { createContext, startTransition, useContext, useEffect, useState } from "react";
import { useWindowResize } from "@/hooks/use-window-resize";

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
};

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: ScrollToOptions) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

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
    if (!lenis) return;
    lenis.scrollTo(target, options);
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

/**
 * Hook to access Lenis smooth scroll instance and methods.
 * Must be used within LenisProvider.
 * 
 * @example
 * const { scrollTo } = useLenis();
 * scrollTo('#section', { offset: -100, duration: 1.5 });
 */
export function useLenis() {
  const context = useContext(LenisContext);
  
  if (!context) {
    throw new Error('useLenis must be used within LenisProvider');
  }
  
  return context;
}
