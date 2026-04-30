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
  const name = t(nameKey as any);
  const role = t(roleKey as any);
  const quote = t(quoteKey as any);
  const shadow =
    'shadow-[0px_19px_11.15px_rgba(0,0,0,0.06),_0px_35px_9.7px_rgba(0,0,0,0.04)]';
  return (
    <div
      className={cn(
        'relative flex w-131.25 shrink-0 gap-4 rounded-lg pl-4.5 pr-6 pb-2.5 pt-4.5 items-center ml-4 border',
        active ? 'bg-neutral-0  border-primary-400': 'bg-neutral-10  border-neutral-40',
        shadow,
      )}>
      {/* Quote badge — floats above card top-right */}
      <div className="glass backdrop-blur-sm text-neutral-800 absolute -top-7.75 right-12 flex h-15 w-15 items-center justify-center rounded-full">
        <span className="icon text-[24px]">{quoteSVG}</span>
      </div>

      {/* Avatar with mask + Instagram badge */}
      <div className="relative shrink-0 w-42.5 h-47.5 rounded-md">
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full rounded-[inherit] object-cover"
        />
        <div className="absolute glass backdrop-blur-sm text-neutral-800 bottom-2 left-2.5 flex items-center justify-center w-7.5 h-7.5 rounded-full">
          <span className="icon text-neutral-60 text-[12px]">{instaSVG}</span>
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col gap-3 pt-4 h-full">
        <p className="flex-1 font-montserrat font-normal text-[16px] leading-[1.6] text-[#6c6b6b]">
          {quote}
        </p>
        <div className="border-t border-neutral-40" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-4">
            <p className="flex-1 font-manrope font-bold text-[18px] leading-[1.1] text-[#2b2929] whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </p>
            <StarRating rating={rating} />
          </div>
          <p className="font-manrope font-medium text-[14px] leading-[1.1] text-neutral-600">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};
