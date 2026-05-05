'use client';

import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';

type NavigationArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const NavigationArrows = ({ onPrev, onNext }: NavigationArrowsProps) => {
  const buttonClass = "glass relative flex h-12 w-12 items-center justify-center rounded-[36px] cursor-pointer transition-all duration-150 hover:brightness-110 active:scale-95 active:brightness-95";

  return (
    <div className="flex gap-4 md:gap-1">
      <button
        onClick={onPrev}
        aria-label={'Previous testimonial'}
        className={buttonClass}>
        <span className="icon text-[20px] text-neutral-900">
          <LucideChevronLeft />
        </span>
      </button>
      <button
        onClick={onNext}
        aria-label={'Next testimonial'}
        className={buttonClass}>
        <span className="icon text-[20px] text-neutral-900">
          <LucideChevronRight />
        </span>
      </button>
    </div>
  );
};
