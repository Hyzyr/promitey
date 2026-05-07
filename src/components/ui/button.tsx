'use client';

import { useLenis } from '@/components/providers/lenis-provider';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'secondary' | 'orange';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  href?: string;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  default:
    'bg-neutral-800 text-neutral-10 font-manrope font-semibold xl:font-bold hover:bg-neutral-700 active:bg-neutral-900 disabled:bg-neutral-40 disabled:text-neutral-200 disabled:hover:bg-neutral-40 disabled:active:bg-neutral-40',
  orange:
    'bg-primary-500 text-neutral-900 font-manrope font-semibold hover:bg-primary-400 active:bg-primary-600 disabled:bg-neutral-40 disabled:text-neutral-200 disabled:hover:bg-neutral-40 disabled:active:bg-neutral-40',
  secondary:
    'bg-neutral-800/12 text-neutral-800 font-manrope font-semibold shadow-[0px_4px_46px_10px_rgba(255,200,0,0.06)] hover:bg-neutral-800/20 active:bg-neutral-800/28 disabled:bg-neutral-30 disabled:text-neutral-200 disabled:shadow-none disabled:hover:bg-neutral-30 disabled:active:bg-neutral-30',
};

const sizeClasses: Record<Size, string> = {
  sm: 'rounded-md px-4 py-2 text-[18px] leading-[25px] tracking-[-0.02em]',
  md: 'rounded-md px-5 lg:px-8 py-3 lg:py-3.5 text-[18px]',
  lg: 'rounded-md lg:rounded-lg px-6 lg:px-16.5 py-3 lg:py-4 text-[22px]',
};

const isExternal = (href: string) =>
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('//');

const isAnchor = (href: string) => href.startsWith('#');

export const Button = ({
  ref,
  href,
  variant = 'default',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  const { scrollTo } = useLenis();
  const baseClass = cn(
    'flex items-center justify-center leading-[2.1] whitespace-nowrap',
    'transition duration-150 focus-visible:outline-none',
    'active:scale-[0.97]',
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:saturate-50 disabled:active:scale-100',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = isLoading ? (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  ) : (
    <span className="inline-flex items-center justify-center gap-2 leading-1.1">
      {children}
    </span>
  );

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const anchorOnClick = onClick as unknown as
      | React.MouseEventHandler<HTMLAnchorElement>
      | undefined;
    anchorOnClick?.(event);

    if (event.defaultPrevented || !href || !isAnchor(href)) {
      return;
    }

    event.preventDefault();
    scrollTo(href, {
      offset: -100,
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          onClick={handleAnchorClick}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    if (isAnchor(href)) {
      return (
        <a
          href={href}
          className={baseClass}
          onClick={handleAnchorClick}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={baseClass}
        onClick={
          onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
        {...(props as Omit<React.ComponentProps<typeof Link>, 'href'>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={baseClass}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export type GlassButtonProps = Omit<ButtonProps, 'variant'>;

export const GlassButton = ({
  ref,
  href,
  size = 'sm',
  isLoading = false,
  className,
  children,
  disabled,
  onClick,
  ...props
}: GlassButtonProps) => {
  const { scrollTo } = useLenis();
  const baseClass = cn(
    'glass flex items-center justify-center whitespace-nowrap',
    'font-manrope font-semibold text-neutral-800',
    'transition duration-150 focus-visible:outline-none',
    'hover:brightness-[1.06] active:scale-[0.97] active:brightness-95',
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:saturate-50 disabled:active:scale-100',
    sizeClasses[size],
    className,
  );

  const content = isLoading ? (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  ) : (
    <span className="inline-flex items-center justify-center gap-2 leading-1.1">
      {children}
    </span>
  );

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const anchorOnClick = onClick as unknown as
      | React.MouseEventHandler<HTMLAnchorElement>
      | undefined;
    anchorOnClick?.(event);

    if (event.defaultPrevented || !href || !isAnchor(href)) {
      return;
    }

    event.preventDefault();
    scrollTo(href, {
      offset: -100,
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          onClick={handleAnchorClick}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    if (isAnchor(href)) {
      return (
        <a
          href={href}
          className={baseClass}
          onClick={handleAnchorClick}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={baseClass}
        onClick={
          onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
        {...(props as Omit<React.ComponentProps<typeof Link>, 'href'>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={baseClass}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};
