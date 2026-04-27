"use client";

import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface GlassButtonProps extends React.ComponentPropsWithRef<"button"> {
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-6 py-3 rounded-xl text-base",
  md: "px-8 py-4 rounded-2xl text-[18px]",
  lg: "px-16.5 py-4.5 rounded-[20px] text-[22px]",
};

export function GlassButton({
  ref,
  size = "md",
  className,
  children,
  ...props
}: GlassButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        "glass",
        "flex items-center justify-center whitespace-nowrap",
        "font-manrope font-semibold leading-[2.1] text-neutral-800",
        "transition duration-150 focus-visible:outline-none",
        "hover:brightness-[1.06] active:brightness-95 active:scale-[0.97]",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
