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
          className="text-sm font-medium text-neutral-900"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon className="pointer-events-none absolute left-4 h-5 w-5 text-neutral-80" />
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-[58px] w-full rounded-xl bg-neutral-20 px-4 text-base font-medium",
            "text-neutral-900 outline-none transition-all duration-150",
            "placeholder:font-normal placeholder:text-neutral-80",
            "focus:border-[1.5px] focus:border-[#7B3FE4]",
            error && "border-[1.5px] border-red-500 bg-primary-50",
            "disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-80",
            LeftIcon && "pl-11",
            RightIcon && "pr-11",
            className,
          )}
          {...props}
        />

        {RightIcon && (
          <RightIcon className="pointer-events-none absolute right-4 h-5 w-5 text-neutral-80" />
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-200">{hint}</p>}
    </div>
  );
}
