'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useMedia } from '@/hooks/use-media';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Translated heading rendered at the top of the panel. */
  title?: string;
  children: React.ReactNode;
  /** aria-label for the dialog element (screen-reader description). */
  ariaLabel: string;
  /** aria-label for the ✕ close button — pass `t('common.close')`. */
  closeAriaLabel: string;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  ariaLabel,
  closeAriaLabel,
  className,
}: ModalProps) => {
  const { lock, unlock } = useScrollLock();
  const isDesktop = useMedia('(min-width: 1280px)');

  useEffect(() => {
    if (isOpen) lock();
    else unlock();
    return () => unlock();
  }, [isOpen, lock, unlock]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const panelInitial = isDesktop ? { opacity: 0, scale: 0.95 } : { y: '100%' };
  const panelAnimate = isDesktop ? { opacity: 1, scale: 1 } : { y: 0 };
  const panelExit = isDesktop ? { opacity: 0, scale: 0.95 } : { y: '100%' };
  const panelTransition = isDesktop
    ? ({ duration: 0.2, ease: 'easeOut' } as const)
    : ({ type: 'spring', damping: 32, stiffness: 320 } as const);

  const wrapperClass = isDesktop
    ? 'absolute inset-0 flex items-center justify-center p-4'
    : 'absolute bottom-0 left-0 right-0';

  const panelClass = cn(
    'relative flex flex-col gap-6',
    'bg-neutral-800',
    isDesktop
      ? 'rounded-sm px-8 py-8 shadow-[0px_8px_40px_rgba(0,0,0,0.35)] w-full max-w-md'
      : 'rounded-tl-2xl rounded-tr-2xl px-8 pt-8 pb-10 shadow-[0px_-7px_30.2px_0px_rgba(0,0,0,0.12)] max-h-[90vh] overflow-y-auto',
    className,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(32,30,30,0.6)] backdrop-blur-xs"
            aria-hidden="true"
          />

          <div className={wrapperClass}>
            <motion.div
              initial={panelInitial}
              animate={panelAnimate}
              exit={panelExit}
              transition={panelTransition}
              onClick={(e) => e.stopPropagation()}
              className={panelClass}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label={closeAriaLabel}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-primary-500 transition-transform active:scale-90"
              >
                <X className="h-7 w-7" strokeWidth={2} />
              </button>

              {title && (
                <h2 className="font-manrope font-bold text-[22px] leading-tight tracking-[-0.44px] text-neutral-10 pr-8">
                  {title}
                </h2>
              )}

              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
