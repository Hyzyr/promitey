import { useCallback, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useObserver } from "@/hooks/use-observer";

/**
 * Tracks scroll progress through a container and maps it to discrete steps.
 * The container must span `stepCount × 100vh` to give each step equal scroll room.
 *
 * Active step is computed live from scroll position, including initial mount —
 * so refreshing the page mid/below the section restores the correct active step
 * (e.g. user reloads at the bottom of the landing → last step is shown).
 */
export function useScrollSteps(stepCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: observerRef, isVisible } = useObserver<HTMLDivElement>({
    threshold: 0,
  });

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      observerRef.current = node;
    },
    [observerRef],
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const computeStep = useCallback(
    (v: number) => {
      if (!Number.isFinite(v)) return 0;
      const clamped = Math.max(0, Math.min(0.9999, v));
      return Math.min(Math.floor(clamped * stepCount), stepCount - 1);
    },
    [stepCount],
  );

  // Lazy initializer reads current scroll so reload-anywhere shows the correct step
  const [activeStep, setActiveStep] = useState(() =>
    computeStep(scrollYProgress.get()),
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isVisible) return;
    setActiveStep(computeStep(v));
  });

  return { containerRef: setContainerRef, activeStep, isVisible };
}
