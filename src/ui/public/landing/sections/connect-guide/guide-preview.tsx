import { cn } from '@/lib/utils';

export const GuidePreview = () => {
  return (
    <div
      className={cn(
        'relative flex w-full shrink-0 mdx:w-auto mdx:grow xl:w-188.25',
        'mdx:min-h-88 lg:min-h-92 lgx:min-h-96 xl:min-h-102',
        'mdx:self-stretch',
      )}
    >
      <div
        className={cn(
          'aspect-1506/858 h-auto w-full mdx:absolute mdx:top-1/2 mdx:left-0 mdx:h-full mdx:max-h-80 mdx:w-auto mdx:-translate-y-1/2',
          'rounded-md mdx:rounded-2xl xl:rounded-3xl',
          'overflow-hidden bg-neutral-800',
        )}
      >
        <img
          src="/images/temp-guide-img.png"
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="pointer-events-none inset-0 h-full w-full object-cover mdx:absolute"
        />
      </div>
    </div>
  );
};