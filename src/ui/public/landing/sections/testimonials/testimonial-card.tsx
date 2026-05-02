'use client';

import { useTranslations } from 'next-intl';
import { instaSVG, quoteSVG } from '@/components/assets';
import { StarRating } from '@/components/ui/star-rating';
import { type Testimonial } from './data';
import { cn } from '@/lib/utils';

type TestimonialCardProps = {
  testimonial: Testimonial;
  active?: boolean;
};

export const TestimonialCard = ({
  testimonial,
  active = false,
}: TestimonialCardProps) => {
  const t = useTranslations();
  const { photo, nameKey, roleKey, quoteKey, rating } = testimonial;
  const name = t(nameKey as Parameters<typeof t>[0]);
  const role = t(roleKey as Parameters<typeof t>[0]);
  const quote = t(quoteKey as Parameters<typeof t>[0]);
  const shadow =
    'shadow-[0px_19px_11.15px_rgba(0,0,0,0.06),_0px_35px_9.7px_rgba(0,0,0,0.04)]';
  return (
    <div
      className={cn(
        'relative flex shrink-0 ml-4 md:ml-4 border items-stretch md:items-center',
        'w-78.5 md:w-131.25',
        'rounded-lg md:rounded-lg',
        'px-3 py-4 md:pl-4.5 md:pr-6 md:pb-2.5 md:pt-4.5',
        'gap-3 md:gap-4',
        active
          ? 'bg-neutral-0 border-red-300 md:border-primary-400'
          : 'bg-neutral-10 border-neutral-40',
        shadow,
      )}>
      <div
        className="glass backdrop-blur-sm text-neutral-800 absolute
                   -top-5.5 right-3.75 md:-top-7.75 md:right-12
                   flex items-center justify-center rounded-full
                   w-9 h-9 md:w-15 md:h-15">
        <span className="icon text-[14px] md:text-[24px]">{quoteSVG}</span>
      </div>

      <div className="relative shrink-0 self-end md:self-auto rounded-lg md:rounded-md w-17.5 h-19.25 md:w-42.5 md:h-47.5 overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full rounded-[inherit] object-cover"
        />
        <div className="absolute glass backdrop-blur-sm text-neutral-800 bottom-1 left-1 md:bottom-2 md:left-2.5 flex items-center justify-center w-5 h-5 md:w-7.5 md:h-7.5 rounded-full">
          <span className="icon text-neutral-60 text-[10px] md:text-[12px]">
            {instaSVG}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4.5 md:gap-3 pt-0 md:pt-4 h-full min-w-0">
        <p className="flex-1 font-montserrat font-normal text-[14px] md:text-[16px] leading-[1.6] text-[#6c6b6b]">
          {quote}
        </p>
        <div className="border-t border-neutral-40" />
        <div className="flex flex-col gap-1.5 md:gap-1.5">
          <div className="md:hidden">
            <StarRating rating={rating} />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <strong className="flex-1 font-manrope font-bold text-[18px] md:text-[18px] leading-[1.1] text-[#2b2929] whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </strong>
            <div className="hidden md:flex shrink-0 ">
              <StarRating rating={rating} />
            </div>
          </div>
          <p className="font-manrope font-medium text-[14px] md:text-[14px] leading-[1.1] text-neutral-600">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};
