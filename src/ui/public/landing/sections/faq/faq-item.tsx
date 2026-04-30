"use client";

import { useEffect, useRef, useState, cloneElement } from "react";
import { triangleSVG } from "@/components/assets";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export const FaqItemComponent = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  // Measure the inner content height whenever it changes or opens
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setMaxHeight(height);
    }
  }, [answer, isOpen]);

  return (
    <div
      className={`flex flex-col rounded-md bg-neutral-20${isOpen ? " gap-3" : ""}`}
      style={{
        border: isOpen ? "1px solid #ff6d41" : "1px solid #e2e2e2",
        boxShadow: isOpen ? "none" : "0px 10px 22.1px 0px rgba(0,0,0,0.02)",
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2.5 p-6.5 text-left"
        aria-expanded={isOpen}
      >
        <p className="flex-1 font-manrope font-bold text-[24px] leading-[1.2] text-[#2b2929]">
          {question}
        </p>
        {/* Arrow icon */}
        {cloneElement(triangleSVG, {
          className: "shrink-0 w-5 h-4 transition-transform duration-200",
          style: { transform: !isOpen ? "rotate(-90deg)" : "rotate(0deg)" },
          'aria-hidden': "true"
        })}
      </button>

      {/* Answer - outer container with max-height animation */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${maxHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Inner container - measured for height */}
        <div ref={contentRef} className="pb-6.5 px-6.5">
          <p className="font-montserrat font-normal text-[18px] leading-[1.6] text-[#2b2929]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
