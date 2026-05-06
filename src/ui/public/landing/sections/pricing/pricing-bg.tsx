import { cn } from '@/lib/utils';

const bgImage = '/images/ellipse-blurred.png';
export const PricingBg = () => {
  return (
    <div
      className={cn(
        'absolute inset-0',
        'bg-neutral-900 rounded-lg xl:rounded-xl overflow-hidden',
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
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] w-[180%] h-[80%] lg:w-[125%] max-w-[unset] lg:h-auto lg:max-h-full object-fill pointer-events-none"
      />
    </div>
  );
};
