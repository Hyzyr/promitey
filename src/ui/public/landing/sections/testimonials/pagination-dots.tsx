'use client';

type PaginationDotsProps = {
  count: number;
  activeIndex: number;
  progressKey: number;
  isAutoPlaying: boolean;
  autoplayDelay: number;
  onDotClick: (index: number) => void;
};

export const PaginationDots = ({
  count,
  activeIndex,
  progressKey,
  isAutoPlaying,
  autoplayDelay,
  onDotClick,
}: PaginationDotsProps) => {
  return (
    <div className="flex gap-4 items-center">
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={isActive ? 'true' : undefined}
            className="relative overflow-hidden rounded-full cursor-pointer shrink-0 transition-[width] duration-300"
            style={{
              width: isActive ? '72px' : '42px',
              height: '5px',
              background: '#e2e2e2',
            }}>
            {isActive && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  animationName: 'progress-fill',
                  animationDuration: `${autoplayDelay}ms`,
                  animationTimingFunction: 'linear',
                  animationFillMode: 'forwards',
                  animationPlayState: isAutoPlaying ? 'running' : 'paused',
                  background: '#2b2929',
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
