'use client';

import { motion } from 'framer-motion';

import { tickSVG } from '@/components/assets/custom-svg';
import { cn } from '@/lib/utils';

export const CODE_SUCCESS_ANIMATION_MS = 1500;

export interface CodeSuccessAnimationProps {
  className?: string;
}

export const CodeSuccessAnimation = ({ className }: CodeSuccessAnimationProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-80 w-full items-center justify-center overflow-hidden',
        className,
      )}
    >
      <motion.img
        src="/images/circle-blurred.png"
        alt=""
        aria-hidden
        initial={{ y: 96, scale: 0.72, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-[70%] w-[70%] max-w-80 object-contain"
      />

      <motion.div
        initial={{ y: 72, scale: 0.2, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          delay: 0.45,
          duration: 0.55,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="relative z-10 flex aspect-square w-[38%] min-w-36 max-w-52 items-center justify-center text-green-600"
      >
        <span className="icon text-inherit">{tickSVG}</span>
      </motion.div>
    </div>
  );
};