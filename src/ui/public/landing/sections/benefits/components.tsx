'use client';

import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from 'framer-motion';
import { useObserver } from '@/hooks/use-observer';
import { cn } from '@/lib/utils';
import { FormatText } from '@/components/ui/format-text';

const ENTER_SPRING = {
  type: 'spring',
  stiffness: 35,
  damping: 16,
  mass: 1.4,
} as const;
const LEAVE_SPRING = { type: 'spring', stiffness: 280, damping: 38 } as const;
const SCROLL_SPRING = {
  type: 'spring',
  stiffness: 90,
  damping: 22,
  mass: 0.9,
} as const;

interface ParallaxContextValue {
  rawX: MotionValue<number>;
  rawY: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

function useParallaxContext() {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error('ParallaxItem must be inside BenefitCard');
  return ctx;
}

type ParallaxItemProps = {
  depth?: number;
  reverse?: boolean;
  children: React.ReactNode;
};

export const ParallaxItem = ({
  depth = 0.5,
  reverse = false,
  children,
}: ParallaxItemProps) => {
  const { rawX, rawY } = useParallaxContext();
  const MAX = 22;
  const d = reverse ? -1 : 1;
  const x = useTransform(rawX, (v) => d * v * depth * MAX);
  const y = useTransform(rawY, (v) => d * v * depth * MAX);
  return (
    <motion.div style={{ x, y }} className="gpu-layer absolute inset-0">
      {children}
    </motion.div>
  );
};

type BenefitCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  mediaClassName?: string;
};

export const BenefitCard = ({
  title,
  description,
  children,
  footer,
  isActive = false,
  className,
  mediaClassName,
}: BenefitCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const { ref: observerRef, isVisible } = useObserver<HTMLDivElement>({
    threshold: 0.05,
  });

  const setCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      observerRef.current = node;
    },
    [observerRef],
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
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
    if (!isVisible) return;
    animate(rawX, 0, LEAVE_SPRING);
    animate(rawY, 0, LEAVE_SPRING);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    if (!mq.matches) return;
    if (!isVisible) return;

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
      const norm = Math.max(
        -1,
        Math.min(1, (cardCenter - viewportCenter) / (vh / 2)),
      );
      animate(rawY, -norm, SCROLL_SPRING);
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
  }, [isVisible, rawX, rawY]);

  return (
    <ParallaxContext.Provider value={{ rawX, rawY }}>
      <div
        ref={setCardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-benefit-card=""
        className={cn(
          'benefit-card-shell gpu-layer',
          isActive ? 'border-orange-400' : 'border-neutral-40',
          className,
        )}
      >
        <h5
          className={cn(
            'font-manrope font-bold text-neutral-800',
            'text-[24px] md:text-[26px] lgx:text-[30px] xl:text-[36px]',
            'leading-[1.2] tracking-[-0.48px] xl:leading-[1.12] xl:tracking-normal',
          )}
        >
          <FormatText text={title} />
        </h5>
        <p
          className={cn(
            'font-montserrat font-normal text-neutral-300',
            'text-[16px] md:text-[16px] lg:text-[17px] xl:text-[18px]',
            'mt-4 leading-[1.4] xl:mt-4',
          )}
        >
          <FormatText text={description} />
        </p>
        <div
          className={cn(
            'benefit-card-media relative isolate -z-1 -mb-6 min-h-40 flex-1',
            mediaClassName,
          )}
        >
          {children}
        </div>
        {footer}
      </div>
    </ParallaxContext.Provider>
  );
};
