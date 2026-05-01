'use client';

import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { useId } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared base props
// ─────────────────────────────────────────────────────────────────────────────
interface BaseFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'light' | 'dark';
  className?: string;
  /** Optional override for the wrapper element class. */
  wrapperClassName?: string;
  /** Hide error/hint text region (e.g. when error is shown elsewhere). */
  hideMessages?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Input — accepts ALL native <input> props (RHF-friendly)
// ─────────────────────────────────────────────────────────────────────────────
type InputProps = BaseFieldProps &
  Omit<React.ComponentPropsWithRef<'input'>, 'className'> & {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
  };

// ─────────────────────────────────────────────────────────────────────────────
// Textarea — accepts ALL native <textarea> props (RHF-friendly)
// ─────────────────────────────────────────────────────────────────────────────
type TextareaProps = BaseFieldProps &
  Omit<React.ComponentPropsWithRef<'textarea'>, 'className'>;

// ─────────────────────────────────────────────────────────────────────────────
// Shared styling utilities
// ─────────────────────────────────────────────────────────────────────────────
const getWrapperClasses = (
  error?: string,
  variant: 'light' | 'dark' = 'light',
) => cn('input', variant, error && 'error');

const getLabelClasses = (variant: 'light' | 'dark' = 'light') =>
  cn(
    'font-roboto text-sm font-medium',
    variant === 'light' ? 'text-neutral-600' : 'text-neutral-20',
  );

const getHintClasses = (variant: 'light' | 'dark' = 'light') =>
  cn(
    'font-roboto text-xs',
    variant === 'light' ? 'text-neutral-300' : 'text-neutral-60',
  );

const getIconClasses = (variant: 'light' | 'dark' = 'light') =>
  cn(
    'pointer-events-none h-5 w-5',
    variant === 'light' ? 'text-neutral-60' : 'text-neutral-300',
  );

// ─────────────────────────────────────────────────────────────────────────────
// Input
// ─────────────────────────────────────────────────────────────────────────────
export const Input = ({
  ref,
  label,
  error,
  hint,
  variant = 'light',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  wrapperClassName,
  hideMessages = false,
  id,
  ...nativeProps
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className={getLabelClasses(variant)}>
          {label}
        </label>
      )}

      <div
        className={cn(
          getWrapperClasses(error, variant),
          'relative flex items-center',
          wrapperClassName,
        )}
      >
        {LeftIcon && (
          <LeftIcon
            className={cn('absolute left-5.5', getIconClasses(variant))}
          />
        )}

        <input
          id={inputId}
          ref={ref}
          className={cn(
            LeftIcon && 'pl-12',
            RightIcon && 'pr-12',
            className,
          )}
          {...nativeProps}
        />

        {RightIcon && (
          <RightIcon
            className={cn('absolute right-5.5', getIconClasses(variant))}
          />
        )}
      </div>

      {!hideMessages && error && (
        <p className="font-roboto text-xs text-red-600">{error}</p>
      )}
      {!hideMessages && hint && !error && (
        <p className={getHintClasses(variant)}>{hint}</p>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Textarea
// ─────────────────────────────────────────────────────────────────────────────
export const Textarea = ({
  ref,
  label,
  error,
  hint,
  variant = 'light',
  className,
  wrapperClassName,
  hideMessages = false,
  id,
  rows = 4,
  ...nativeProps
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className={getLabelClasses(variant)}>
          {label}
        </label>
      )}

      <div
        className={cn(
          getWrapperClasses(error, variant),
          'relative flex items-start',
          wrapperClassName,
        )}
      >
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn('resize-none', className)}
          {...nativeProps}
        />
      </div>

      {!hideMessages && error && (
        <p className="font-roboto text-xs text-red-600">{error}</p>
      )}
      {!hideMessages && hint && !error && (
        <p className={getHintClasses(variant)}>{hint}</p>
      )}
    </div>
  );
};
