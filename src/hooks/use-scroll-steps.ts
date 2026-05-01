import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

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
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const computeStep = (v: number) => {
    if (!Number.isFinite(v)) return 0;
    const clamped = Math.max(0, Math.min(0.9999, v));
    return Math.min(Math.floor(clamped * stepCount), stepCount - 1);
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(computeStep(v));
  });

  useEffect(() => {
    // Sync once after mount so reload-anywhere works (incl. reload from bottom).
    setActiveStep(computeStep(scrollYProgress.get()));
  }, [scrollYProgress, stepCount]);

  return { containerRef, activeStep };
}

