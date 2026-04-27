import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Tracks scroll progress through a container and maps it to discrete steps.
 * The container must span `stepCount × 100vh` to give each step equal scroll room.
 */
export function useScrollSteps(stepCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.min(Math.floor(v * stepCount), stepCount - 1);
    setActiveStep(step);
  });

  return { containerRef, activeStep };
}
