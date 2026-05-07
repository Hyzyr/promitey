import { cn } from '@/lib/utils';

const bgImage = '/images/ellipse-blurred.png';
export const PricingBg = () => {
  return (
    <div
      className={cn(
        'absolute inset-0',
        'overflow-hidden rounded-lg bg-neutral-900 xl:rounded-xl',
      )}>
      <div
        className="absolute left-0 md:left-[15%] top-[10%] w-full md:w-[30%] opacity-30 h-0 circle shadow-[0px_0px_12vh_2vh_#fff]"
        style={{ borderRadius: 'inherit' }}
      />
      <img
        src={bgImage}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="gpu-layer pointer-events-none absolute bottom-0 left-1/2 h-[80%] w-[180%] max-w-[unset] -translate-x-1/2 translate-y-[40%] object-fill lg:h-auto lg:max-h-full lg:w-[125%]"
      />
    </div>
  );
};
