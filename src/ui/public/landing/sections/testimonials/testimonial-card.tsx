'use client';

import Image from 'next/image';
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
        'relative ml-4 flex shrink-0 gpu-layer items-stretch border md:ml-4 md:items-center',
        'w-[calc(100vw-40px)] max-w-78.5 md:w-131.25 md:max-w-none',
        'rounded-lg md:rounded-lg',
        'px-3 py-4 md:pt-4.5 md:pr-6 md:pb-2.5 md:pl-4.5',
        'gap-3 md:gap-4',
        active
          ? 'border-red-300 bg-neutral-0 md:border-primary-400'
          : 'border-neutral-40 bg-neutral-10',
        shadow,
      )}
    >
      <div className="absolute -top-5.5 right-3.75 flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 glass backdrop-blur-sm md:-top-7.75 md:right-12 md:h-15 md:w-15">
        <span className="icon text-[14px] md:text-[24px]">{quoteSVG}</span>
      </div>

      <div className="relative hidden h-19.25 w-17.5 shrink-0 self-end overflow-hidden rounded-lg md:flex md:h-47.5 md:w-42.5 md:self-auto md:rounded-md">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 768px) 170px, 70px"
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
        />
        <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full text-neutral-800 glass backdrop-blur-sm md:bottom-2 md:left-2.5 md:h-7.5 md:w-7.5">
          <span className="icon text-[10px] text-neutral-60 md:text-[12px]">
            {instaSVG}
          </span>
        </div>
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col gap-4.5 pt-0 md:gap-3 md:pt-4">
        <p className="flex-1 font-montserrat text-[14px] leading-[1.6] font-normal text-neutral-300 md:text-[16px]">
          {quote}
        </p>
        <div className="border-t border-neutral-40" />
        <div className="flex gap-3">
          <div className="rounded-[50%] relative flex h-15 w-15 shrink-0 self-end overflow-hidden md:hidden">
            <Image
              src={photo}
              alt={name}
              fill
              sizes="60px"
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
            />
          </div>
          <div className="flex flex-col gap-1.5 md:gap-1.5">
            <div className="md:hidden">
              <StarRating rating={rating} />
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <strong className="flex-1 overflow-hidden font-manrope text-[18px] leading-[1.1] font-bold text-ellipsis whitespace-nowrap text-neutral-800 md:text-[18px]">
                {name}
              </strong>
              <div className="hidden shrink-0 md:flex">
                <StarRating rating={rating} />
              </div>
            </div>
            <p className="font-manrope text-[14px] leading-[1.1] font-medium text-neutral-600 md:text-[14px]">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
