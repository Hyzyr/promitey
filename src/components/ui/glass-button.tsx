'use client';

import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg';

export interface GlassButtonProps extends React.ComponentPropsWithRef<'button'> {
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: 'rounded-md px-4 py-2 text-[18px] leading-[25px] tracking-[-0.02em]',
  md: 'rounded-md px-4 py-2 text-[18px] leading-[25px] tracking-[-0.02em]',
  lg: 'rounded-md px-4 py-2 text-[18px] leading-[25px] tracking-[-0.02em]',
};

export const GlassButton = ({
  ref,
  size = 'md',
  className,
  children,
  ...props
}: GlassButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(
        'glass',
        'flex items-center justify-center whitespace-nowrap',
        'font-manrope font-semibold text-neutral-800',
        'transition duration-150 focus-visible:outline-none',
        'hover:brightness-[1.06] active:scale-[0.97] active:brightness-95',
        'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
