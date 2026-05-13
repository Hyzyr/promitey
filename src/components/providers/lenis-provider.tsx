'use client';

import { createContext, startTransition, useContext, useEffect, useState } from 'react';

import { useWindowResize } from '@/hooks/use-window-resize';

import type Lenis from 'lenis';

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

const isSmoothScrollEnabled = process.env.NEXT_PUBLIC_ENABLE_SMOOTH_SCROLL === 'true';

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
  const [shouldEnableLenis, setShouldEnableLenis] = useState(false);

  useEffect(() => {
    setShouldEnableLenis(isSmoothScrollEnabled && !prefersNativeScroll());
  }, []);

  if (!shouldEnableLenis) {
    return (
      <LenisContext.Provider value={{ lenis: null, scrollTo: nativeScrollTo }}>
        {children}
      </LenisContext.Provider>
    );
  }

  return <ActiveLenisProvider>{children}</ActiveLenisProvider>;
};

const ActiveLenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const resizeTrigger = useWindowResize();

  useEffect(() => {
    if (!lenis) return;
    lenis.resize();
  }, [resizeTrigger, lenis]);

  useEffect(() => {
    let isMounted = true;
    let rafId = 0;
    let lenisInstance: Lenis | null = null;

    const setupLenis = async () => {
      const { default: LenisConstructor } = await import('lenis');

      if (!isMounted) return;

      lenisInstance = new LenisConstructor({
        autoResize: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        gestureOrientation: 'vertical',
        overscroll: true,
        smoothWheel: true,
        syncTouch: false,
      });

      startTransition(() => setLenis(lenisInstance));

      const raf = (time: number) => {
        if (!lenisInstance) return;

        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    void setupLenis();

    return () => {
      isMounted = false;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      lenisInstance?.destroy();
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

function prefersNativeScroll(): boolean {
  if (typeof navigator === 'undefined') return true;

  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAppleSafari =
    vendor.includes('Apple') &&
    /Safari/.test(userAgent) &&
    !/Chrome|CriOS|FxiOS|Edg|OPR/.test(userAgent);

  return isIOS || isAppleSafari;
}

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
