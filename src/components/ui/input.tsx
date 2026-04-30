'use client';

import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { useId } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared base props for both Input and Textarea
// ─────────────────────────────────────────────────────────────────────────────
interface BaseFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'light' | 'dark';
  className?: string;
  id?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Input-specific props
// ─────────────────────────────────────────────────────────────────────────────
interface InputProps extends BaseFieldProps {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  // Common convenience props at root level for better DX
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // All other native props go here if needed
  inputProps?: Omit<
    React.ComponentPropsWithRef<'input'>,
    'type' | 'placeholder' | 'value' | 'onChange' | 'className' | 'id'
  >;
}

// ─────────────────────────────────────────────────────────────────────────────
// Textarea-specific props
// ─────────────────────────────────────────────────────────────────────────────
interface TextareaProps extends BaseFieldProps {
  rows?: number;
  // Common convenience props
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // All other native props go here if needed
  textareaProps?: Omit<
    React.ComponentPropsWithRef<'textarea'>,
    'rows' | 'placeholder' | 'value' | 'onChange' | 'className' | 'id'
  >;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared styling utilities
// ─────────────────────────────────────────────────────────────────────────────
const getWrapperClasses = (error?: string, variant: 'light' | 'dark' = 'light') =>
  cn(
    'input', // Base utility from globals.css
    variant,
    error && 'error',
  );

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
// Input Component
// ─────────────────────────────────────────────────────────────────────────────
export const Input = ({
  label,
  error,
  hint,
  variant = 'light',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  id,
  type,
  placeholder,
  value,
  onChange,
  inputProps,
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className={getLabelClasses(variant)}>
          {label}
        </label>
      )}

      <div className={cn(getWrapperClasses(error, variant), 'relative flex items-center')}>
        {LeftIcon && (
          <LeftIcon
            className={cn('absolute left-5.5', getIconClasses(variant))}
          />
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            LeftIcon && 'pl-12',
            RightIcon && 'pr-12',
            className,
          )}
          {...inputProps}
        />

        {RightIcon && (
          <RightIcon
            className={cn('absolute right-5.5', getIconClasses(variant))}
          />
        )}
      </div>

      {error && <p className="font-roboto text-xs text-red-600">{error}</p>}
      {hint && !error && <p className={getHintClasses(variant)}>{hint}</p>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Textarea Component
// ─────────────────────────────────────────────────────────────────────────────
export const Textarea = ({
  label,
  error,
  hint,
  variant = 'light',
  className,
  id,
  rows = 4,
  placeholder,
  value,
  onChange,
  textareaProps,
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className={getLabelClasses(variant)}>
          {label}
        </label>
      )}

      <div className={cn(getWrapperClasses(error, variant), 'relative flex items-start')}>
        <textarea
          id={textareaId}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn('resize-none', className)}
          {...textareaProps}
        />
      </div>

      {error && <p className="font-roboto text-xs text-red-600">{error}</p>}
      {hint && !error && <p className={getHintClasses(variant)}>{hint}</p>}
    </div>
  );
};
