import Image from 'next/image';

import { cn } from '@/lib/utils';

export const GuidePreview = ({
  images,
  activeStep,
}: {
  images: string[];
  activeStep: number;
}) => {
  return (
    <div
      className={cn(
        'relative flex w-full shrink-0 mdx:w-auto mdx:grow xl:w-188.25',
        'mdx:min-h-88 lg:min-h-92 lgx:min-h-96 xl:min-h-102 xxl:min-h-[55vh]',
        'mdx:self-stretch',
      )}
    >
      <div
        className={cn(
          'relative aspect-1506/858 h-auto w-full mdx:absolute mdx:top-1/2 mdx:left-0 mdx:h-full mdx:max-h-80 mdx:w-auto mdx:-translate-y-1/2 xl:max-h-120',
          'rounded-md mdx:rounded-2xl xl:rounded-3xl',
          'overflow-hidden bg-neutral-800',
        )}
      >
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={'guide-instruction-' + (index + 1)}
            width={1506}
            height={858}
            loading={'eager'}
            className={cn(
              'pointer-events-none absolute inset-0 h-full w-full object-cover smooth',
              activeStep === index ? 'opacity-100 scale-100 delay-75' : 'opacity-0 scale-105 duration-200',
            )}
          />
        ))}
      </div>
    </div>
  );
};
