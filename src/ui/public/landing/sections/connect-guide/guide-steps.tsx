import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export const GuideSteps = ({
  steps,
  activeStep,
  onStepChange,
}: {
  steps: string[];
  activeStep: number;
  onStepChange: (step: number) => void;
}) => {
  const topPct = `${(activeStep / steps.length) * 100}%`;

  return (
    <div className="flex w-full shrink-0 items-center gap-6 mdx:max-w-[calc(50%-2rem)] mdx:grow mdx:gap-8 lg:w-auto lg:gap-10 xl:gap-13.25">
      <div
        className={cn(
          'relative flex w-full flex-col mdx:w-auto mdx:max-w-125 xl:w-176.25',
          'py-2.5 pl-6 md:pl-8 mdx:py-3 mdx:pl-8 lg:py-3.5 lg:pl-9 lgx:pl-10 xl:py-4 xl:pl-12',
          'gap-8 mdx:gap-5.5 lg:gap-6.5 lgx:gap-8 xl:gap-9',
          'font-manrope font-bold whitespace-pre-wrap',
          'text-[20px] mdx:text-[23px] lg:text-[28px] xl:text-[32px]',
        )}
      >
        <div className="absolute top-0 left-0 h-full w-1.25 shrink-0 mdx:w-1.25">
          <div className="absolute inset-0 rounded-sm bg-neutral-40" />
          <motion.div
            animate={{ top: topPct }}
            style={{ height: `${100 / steps.length}%` }}
            transition={{ type: 'spring', stiffness: 90, damping: 24, mass: 0.9 }}
            className="absolute left-0 w-1.25 rounded-sm bg-neutral-800 mdx:w-1.25"
          />
        </div>

        {steps.map((text, index) => (
          <button
            key={text}
            type="button"
            aria-current={activeStep === index ? 'step' : undefined}
            onClick={() => onStepChange(index)}
            onMouseEnter={() => onStepChange(index)}
            className={cn(
              'cursor-pointer rounded-sm text-left leading-[1.3] transition-colors duration-300 outline-none',
              'focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-4 focus-visible:ring-offset-white',
              activeStep === index ? 'text-neutral-800' : 'text-neutral-80',
            )}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};