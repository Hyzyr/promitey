'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollSteps } from '@/hooks/use-scroll-steps';
import { FormatText } from '@/components/ui/format-text';

export const ConnectGuide = () => {
  const t = useTranslations('landing.guide');
  const steps = [t('steps.0'), t('steps.1'), t('steps.2')];
  const { containerRef, activeStep } = useScrollSteps(steps.length);

  const topPct = `${(activeStep / steps.length) * 100}%`;

  return (
    // stepCount × 100vh → each step owns one full viewport of scroll
    <div ref={containerRef} id="guide" className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <section className="w-full py-22.5 px-26 overflow-hidden">
          <div className="flex flex-col gap-20 items-center">
            {/* Heading */}
            <h2 className="font-manrope text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600 text-center whitespace-pre">
              <FormatText text={t.raw('title')} />
            </h2>

            {/* Two-column layout */}
            <div className=" flex items-center gap-18.5  w-full">
              {/* Left: progress bar + steps */}
              <div className="flex shrink-0 gap-13.25 items-center">
                {/* Progress bar */}

                {/* Step texts */}
                <div className="relative pl-12 py-4 flex flex-col gap-9.25  w-176.25 font-manrope font-bold text-[32px] whitespace-pre-wrap  ">
                  <div className="absolute top-0 left-0 h-full w-1.25 shrink-0 ">
                    {/* Track */}
                    <div className="absolute inset-0 rounded-sm bg-neutral-40" />
                    {/* Step fill — animates between discrete heights */}
                    <motion.div
                      animate={{ top: topPct }}
                      style={{ height: `${100 / steps.length}%` }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                      }}
                      className="absolute left-0 w-1.25 rounded-sm bg-[#2b2929]"
                    />
                  </div>
                  {steps.map((text, i) => (
                    <p
                      key={i}
                      className={
                        activeStep === i
                          ? 'leading-[1.2] text-[#2b2929] transition-colors duration-300'
                          : 'leading-normal text-neutral-80 transition-colors duration-300'
                      }>
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right: dark card with app screenshot */}
              <div className="relative self-stretch min-h-110 w-188.25 shrink-0 rounded-3xl overflow-hidden bg-[#2b2929]">
                <img
                  src="/temp-guide-img.png"
                  alt=""
                  className="absolute inset-0 w-auto h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
