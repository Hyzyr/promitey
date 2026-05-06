'use client';

import { useEffect, useRef, useState, cloneElement } from 'react';
import { triangleSVG } from '@/components/assets';
import { cn } from '@/lib/utils';

type FaqItemProps = {
  itemId: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export const FaqItemComponent = ({
  itemId,
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setMaxHeight(height);
    }
  }, [answer, isOpen]);

  return (
    <div
      className={`flex flex-col rounded-[16px] bg-neutral-20 ${isOpen ? 'gap-2 md:gap-2.5 lg:gap-3' : ''}`}
      style={{
        border: isOpen ? '1px solid #ff6d41' : '1px solid #e2e2e2',
        boxShadow: isOpen ? 'none' : '0px 10px 11.05px 0px rgba(0,0,0,0.02)',
      }}>
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full items-center text-left',
          'gap-6 md:gap-6',
          'px-4 py-3 md:p-4 xl:p-6',
        )}
        aria-expanded={isOpen}
        aria-controls={itemId}>
        <span className="flex-1 font-manrope font-bold text-[18px] xl:text-[22px] leading-[1.2] text-[#2b2929]">
          {question}
        </span>
        {cloneElement(triangleSVG, {
          className:
            'shrink-0 w-[12px] h-[16px] transition-transform duration-200',
          style: {
            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
          },
          'aria-hidden': 'true',
        })}
      </button>

      <div
        id={itemId}
        role="region"
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${maxHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}>
        <div
          ref={contentRef}
          className="pb-5 pt-2 px-4 md:pb-5 md:pt-2 md:px-4 xl:px-6 xl:pt-0">
          <p className="font-montserrat font-normal text-[16px] xl:text-[18px] leading-[1.6] text-[#2b2929]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
