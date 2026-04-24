"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type LucideIcon } from "lucide-react";

type Variant = "default" | "secondary" | "orange";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: Variant;
  size?: Size;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isLoading?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800",
  secondary:
    "bg-neutral-30 text-neutral-900 hover:bg-neutral-40 active:bg-neutral-50",
  orange:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-[46px] px-5 text-sm  gap-2",
  md: "h-[57px] px-7 text-base gap-2",
  lg: "h-[66px] px-8 text-lg  gap-2",
};

const iconSize: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
};

export function Button({
  ref,
  variant = "default",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  asChild = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        "transition-colors duration-150 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className={iconSize[size]} />}
          {children}
          {RightIcon && <RightIcon className={iconSize[size]} />}
        </>
      )}
    </Comp>
  );
}
