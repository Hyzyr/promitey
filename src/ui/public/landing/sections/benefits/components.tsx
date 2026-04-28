'use client';

import { useRef } from 'react';
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

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
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

  function onMouseLeave() {
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
  rawX: MotionValue<number>;
  rawY: MotionValue<number>;
  children: React.ReactNode;
};

export function ParallaxItem({
  depth = 0.5,
  rawX,
  rawY,
  reverse = false,
  children,
}: ParallaxItemProps) {
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
  className?: string;
  mediaClassName?: string;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export function BenefitCard({
  ref,
  onMouseMove,
  onMouseLeave,
  title,
  description,
  children,
  footer,
  className,
  mediaClassName,
}: BenefitCardProps) {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        'relative isolate flex h-96 flex-col overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-20 px-5 py-6.5',
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

// ── VideoCard ─────────────────────────────────────────────────────────────────

type VideoCardProps = {
  src: string;
  title: string;
  className?: string;
};

export function VideoCard({ src, title, className }: VideoCardProps) {
  return (
    <div
      className={cn('absolute overflow-hidden rounded-3xl aspect-[3/5] rotate-[6.18deg]', className)}
      style={{ boxShadow: '-41px 54px 16.8px -16px rgba(0, 0, 0, 0.25)' }}
    >
      <video
        src={src}
        className="h-full! w-full! object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          background:
            'linear-gradient(180deg, rgba(34, 34, 34, 0) 62.5%, rgba(34, 34, 34, 0.015) 81.25%, rgba(34, 34, 34, 0.5) 100%)',
          borderRadius: 'inherit',
        }}
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm"
            aria-label="Play video"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M1.5 1.5L10.5 7L1.5 12.5V1.5Z" fill="white" />
            </svg>
          </button>
          <span className="text-white text-[13px] font-medium leading-snug">{title}</span>
        </div>
      </div>
    </div>
  );
}
