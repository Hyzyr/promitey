"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { useId } from "react";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export function Input({
  ref,
  label,
  error,
  hint,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="font-roboto text-sm font-medium text-neutral-600"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon className="pointer-events-none absolute left-5.5 h-5 w-5 text-neutral-60" />
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            // Figma node 6328:1180 — base
            "w-full rounded-2xl border border-neutral-60 bg-neutral-20",
            "px-5.5 py-4.5 font-roboto text-[16px] leading-[1.4] tracking-[0.32px] text-neutral-600",
            "outline-none transition-colors duration-150",
            "placeholder:text-neutral-60",
            // Figma: focused → border #6c6b6b
            "focus:border-neutral-300",
            // Figma: error → border #e02319
            error && "border-red-600",
            "disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-60",
            LeftIcon && "pl-12",
            RightIcon && "pr-12",
            className,
          )}
          {...props}
        />

        {RightIcon && (
          <RightIcon className="pointer-events-none absolute right-5.5 h-5 w-5 text-neutral-60" />
        )}
      </div>

      {error && <p className="font-roboto text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="font-roboto text-xs text-neutral-300">{hint}</p>}
    </div>
  );
}
