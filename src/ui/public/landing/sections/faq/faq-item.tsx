'use client';

import { useEffect, useRef, useState, cloneElement } from 'react';
import { triangleSVG } from '@/components/assets';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * FAQ accordion item — Figma mobile spec:
 *   - bg #f6f6f6 rounded-16, border 1px
 *     - inactive: border #e2e2e2 + shadow [0 10 11.05 rgba(0,0,0,0.02)]
 *     - active:   border #ff6d41, no shadow
 *   - Button row: px-16 py-12 gap-24
 *     - Question 18px Manrope Bold #2b2929 leading 1.2
 *     - Triangle: w-12 h-16, points down (rotate-90) when OPEN, points right (default) when CLOSED
 *   - Content (open): pb-20 pt-8 px-16
 *     - Answer 16px Montserrat Regular #2b2929 leading 1.6
 */
export const FaqItemComponent = ({
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
      {/* Question row — Figma mobile: px-16 py-12 gap-24 */}
      <button
        onClick={onToggle}
        className="flex w-full items-center text-left
                   gap-6 md:gap-6
                   px-4 py-3 md:p-4"
        aria-expanded={isOpen}>
        <p className="flex-1 font-manrope font-bold text-[18px] leading-[1.2] text-[#2b2929]">
          {question}
        </p>
        {/* Arrow icon — triangle points DOWN by default; rotate -90 (points right) when CLOSED, 0 (down) when OPEN */}
        {cloneElement(triangleSVG, {
          className:
            'shrink-0 w-[12px] h-[16px] transition-transform duration-200',
          style: {
            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
          },
          'aria-hidden': 'true',
        })}
      </button>

      {/* Answer */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${maxHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}>
        <div
          ref={contentRef}
          className="pb-5 pt-2 px-4 md:pb-5 md:pt-2 md:px-4">
          <p className="font-montserrat font-normal text-[16px] leading-[1.6] text-[#2b2929]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
