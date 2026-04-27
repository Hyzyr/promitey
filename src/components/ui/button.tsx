"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type Variant = "default" | "secondary" | "orange";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  href?: string;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

// Exact values from Figma node 6265:3751
const variantClasses: Record<Variant, string> = {
  default:
    "bg-neutral-800 text-neutral-10 font-manrope font-bold " +
    "hover:bg-neutral-700 active:bg-neutral-900",
  orange:
    "bg-primary-500 text-neutral-900 font-manrope font-semibold " +
    "hover:bg-primary-400 active:bg-primary-600",
  secondary:
    "bg-[rgba(43,41,41,0.12)] text-neutral-800 font-manrope font-semibold shadow-[0px_4px_46px_10px_rgba(255,200,0,0.06)] " +
    "hover:bg-[rgba(43,41,41,0.20)] active:bg-[rgba(43,41,41,0.28)]",
};

// sm=12px radius, md=16px radius, lg=20px radius
const sizeClasses: Record<Size, string> = {
  sm: "px-6 py-3 rounded-xl text-base",
  md: "px-8 py-3.5 rounded-2xl text-[18px]",
  lg: "px-16.5 py-4 rounded-[20px] text-[22px]",
};

const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");

const isAnchor = (href: string) => href.startsWith("#");

export function Button({
  ref,
  href,
  variant = "default",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = cn(
    "flex items-center justify-center whitespace-nowrap leading-[2.1]",
    "transition duration-150 focus-visible:outline-none",
    "active:scale-[0.97]",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = isLoading ? (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  ) : (
    <span className="leading-1.1">{children}</span>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
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
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClass} {...(props as any)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={baseClass}
      {...props}
    >
      {content}
    </button>
  );
}

