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

/**
 * Testimonial card. Mobile (Figma 414px frame, card 314 wide):
 *   - bg #fbfbfb (active #ffffff) rounded-24 px-12 py-16, ml-16 (gap-16) between cards
 *   - inner row gap-12: avatar (~70x77 rounded-30) + text column gap-18
 *   - quote 14px Montserrat Regular leading 1.6 #6c6b6b
 *   - divider line border-neutral-40
 *   - name 18px Manrope Bold #2b2929 noWrap
 *   - role 14px Manrope Medium #484747
 *   - active border 1px #f96e67 (red-300), inactive border-neutral-40
 *   - quote badge size 36px top -22 right 15
 */
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
        'relative flex shrink-0 ml-[16px] md:ml-4 border items-stretch md:items-center',
        'w-[314px] md:w-131.25',
        'rounded-[24px] md:rounded-lg',
        'px-[12px] py-[16px] md:pl-4.5 md:pr-6 md:pb-2.5 md:pt-4.5',
        'gap-[16px] md:gap-4',
        active
          ? 'bg-neutral-0 border-red-300 md:border-primary-400'
          : 'bg-neutral-10 border-neutral-40',
        shadow,
      )}>
      {/* Quote badge — Figma mobile: 36x36 top -22 right 15 */}
      <div
        className="glass backdrop-blur-sm text-neutral-800 absolute
                   -top-[22px] right-[15px] md:-top-7.75 md:right-12
                   flex items-center justify-center rounded-full
                   w-[36px] h-[36px] md:w-15 md:h-15">
        <span className="icon text-[14px] md:text-[24px]">{quoteSVG}</span>
      </div>

      {/* Avatar with mask + Instagram badge */}
      <div className="relative shrink-0 self-end md:self-auto rounded-[30px] md:rounded-md w-[70px] h-[77px] md:w-42.5 md:h-47.5 overflow-hidden">
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

      {/* Text content — gap 18 mobile per Figma */}
      <div className="flex flex-1 flex-col gap-[18px] md:gap-3 pt-0 md:pt-4 h-full min-w-0">
        <p className="flex-1 font-montserrat font-normal text-[14px] md:text-[16px] leading-[1.6] text-[#6c6b6b]">
          {quote}
        </p>
        <div className="border-t border-neutral-40" />
        {/* Bottom block:
            - Mobile (Figma): stars row above name, role below name (all stacked).
            - Desktop: stars beside name on the same row, role below. */}
        <div className="flex flex-col gap-[6px] md:gap-1.5">
          {/* Mobile-only stars row */}
          <div className="md:hidden">
            <StarRating rating={rating} />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <p className="flex-1 font-manrope font-bold text-[18px] md:text-[18px] leading-[1.1] text-[#2b2929] whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </p>
            {/* Desktop stars (inline with name) */}
            <div className="hidden md:block">
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
