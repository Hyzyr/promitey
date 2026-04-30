'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { FormatText } from '@/components/ui/format-text';

// Slow spring on enter (smooth follow), fast spring on leave (snaps back)
const ENTER_SPRING = {
  type: 'spring',
  stiffness: 35,
  damping: 16,
  mass: 1.4,
} as const;
const LEAVE_SPRING = { type: 'spring', stiffness: 280, damping: 38 } as const;

// ── Parallax hook ─────────────────────────────────────────────────────────────
export function useCardParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    animate(
      rawX,
      (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2),
      ENTER_SPRING,
    );
    animate(
      rawY,
      (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2),
      ENTER_SPRING,
    );
  }

  const onMouseLeave = () => {
    animate(rawX, 0, LEAVE_SPRING);
    animate(rawY, 0, LEAVE_SPRING);
  }

  return { ref, rawX, rawY, onMouseMove, onMouseLeave };
}

// ── ParallaxItem ──────────────────────────────────────────────────────────────
// depth 0–1: how much this layer shifts (0 = still, 1 = ±12px max)

type ParallaxItemProps = {
  depth?: number;
  reverse?: boolean;
  // @ts-ignore - MotionValue is valid in client components (false positive in Next.js 16)
  rawX: MotionValue<number>;
  // @ts-ignore - MotionValue is valid in client components (false positive in Next.js 16)
  rawY: MotionValue<number>;
  children: React.ReactNode;
};

export const ParallaxItem = ({
  depth = 0.5,
  rawX,
  rawY,
  reverse = false,
  children,
}: ParallaxItemProps) => {
  const MAX = 22;
  const d = reverse ? -1 : 1;
  const x = useTransform(rawX, (v) => d * v * depth * MAX);
  const y = useTransform(rawY, (v) => d * v * depth * MAX);
  return (
    <motion.div style={{ x, y }} className="absolute inset-0">
      {children}
    </motion.div>
  );
}

type BenefitCardProps = {
  title: string;
  description: string;
  ref: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  mediaClassName?: string;
  // @ts-ignore - Event handlers are valid in client components (false positive in Next.js 16)
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  // @ts-ignore - Event handlers are valid in client components (false positive in Next.js 16)
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const BenefitCard = ({
  ref,
  onMouseMove,
  onMouseLeave,
  title,
  description,
  children,
  footer,
  isActive = false,
  className,
  mediaClassName,
}: BenefitCardProps) => {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        'relative isolate flex h-96 flex-col overflow-hidden rounded-md border bg-neutral-20 px-5 py-6.5 transition-colors duration-200',
        isActive ? 'border-orange-400' : 'border-neutral-40',
        className,
      )}>
      <h5 className="font-manrope font-bold text-[36px] leading-[1.12] text-[#2b2929]">
        <FormatText text={title} />
      </h5>
      <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
        <FormatText text={description} />
      </p>
      <div
        className={cn(
          'relative -z-1 flex-1 min-h-40 -mb-6 isolate',
          mediaClassName,
        )}>
        {children}
      </div>
      {footer}
    </div>
  );
}
