'use client';

import { useEffect, useRef } from 'react';
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
// Smooth-but-snappier spring for scroll-driven parallax (used on touch devices)
const SCROLL_SPRING = {
  type: 'spring',
  stiffness: 90,
  damping: 22,
  mass: 0.9,
} as const;

// ── Parallax hook ─────────────────────────────────────────────────────────────
// Desktop / mouse: parallax follows the cursor inside the card.
// Touch / mobile  (no hover): parallax follows the card's vertical position
//                              relative to the viewport center as the user scrolls.
export function useCardParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // ── Mouse handlers (desktop) ──
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
  };

  const onMouseLeave = () => {
    animate(rawX, 0, LEAVE_SPRING);
    animate(rawY, 0, LEAVE_SPRING);
  };

  // ── Scroll-driven parallax (touch devices / coarse pointers) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Only enable scroll mode where there is no hover capability.
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    if (!mq.matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      // Normalised offset: -1 (card centre at top of viewport) … +1 (at bottom).
      // We invert sign so as the user scrolls DOWN past the card,
      // foreground items drift UP (classic parallax feel).
      const norm = Math.max(
        -1,
        Math.min(1, (cardCenter - viewportCenter) / (vh / 2)),
      );
      animate(rawY, -norm, SCROLL_SPRING);
      // Subtle horizontal sway tied to vertical position (gives life on mobile)
      animate(rawX, -norm * 0.35, SCROLL_SPRING);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rawX, rawY]);

  return { ref, rawX, rawY, onMouseMove, onMouseLeave };
}

// ── ParallaxItem ──────────────────────────────────────────────────────────────
type ParallaxItemProps = {
  depth?: number;
  reverse?: boolean;
  rawX: MotionValue<number>;
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
};

// ── BenefitCard ───────────────────────────────────────────────────────────────
// Figma mobile spec (414px frame):
//   - bg #f6f6f6, rounded-16, border 1px (#e2e2e2 inactive / #fcb042 active)
//   - padding px-16 py-20
//   - title 24px Manrope Bold #2b2929 leading 1.2 tracking -0.48
//   - body  16px Montserrat Regular #6c6b6b leading 1.4
//   - gap-16 between title & body
//   - default height 384px (featured override via className -> 679px)
type BenefitCardProps = {
  title: string;
  description: string;
  ref: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  mediaClassName?: string;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
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
      data-benefit-card=""
      className={cn(
        'relative isolate flex h-96 xl:h-96 flex-col overflow-hidden',
        'rounded-[16px] border bg-neutral-20 transition-colors duration-200',
        'px-4 py-5 md:px-5 md:py-6 xl:px-4 xl:py-5',
        isActive ? 'border-orange-400' : 'border-neutral-40',
        className,
      )}>
      <h5
        className="font-manrope font-bold text-[#2b2929]
                   text-[24px] md:text-[26px] lg:text-[30px] xl:text-[36px]
                   leading-[1.2] xl:leading-[1.12] tracking-[-0.48px] xl:tracking-normal">
        <FormatText text={title} />
      </h5>
      <p
        className="font-montserrat font-normal text-[#6c6b6b]
                   text-[16px] md:text-[16px] lg:text-[17px] xl:text-[18px]
                   leading-[1.4] mt-4 xl:mt-4">
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
};
