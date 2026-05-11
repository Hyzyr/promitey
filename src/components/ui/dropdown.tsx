'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  value: string;
  label: string;
  onClick: () => void;
}

export interface DropdownTriggerState {
  open: boolean;
}

export interface DropdownProps {
  trigger:
    | React.ReactNode
    | ((state: DropdownTriggerState) => React.ReactNode);
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
}

export const Dropdown = ({
  trigger,
  items,
  align = 'left',
  className,
  disabled = false,
  ariaLabel,
  triggerClassName,
  menuClassName,
  itemClassName,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerContent =
    typeof trigger === 'function' ? trigger({ open }) : trigger;

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
          triggerClassName,
        )}
      >
        {triggerContent}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute top-full z-50 mt-1.5 min-w-full overflow-hidden rounded-sm border border-white/10',
            'bg-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.35)]',
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName,
          )}
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              role="menuitem"
              className={cn(
                'w-full px-4 py-2.5 text-left font-roboto text-base text-neutral-10 transition-colors hover:bg-white/10 focus-visible:outline-none',
                itemClassName,
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
