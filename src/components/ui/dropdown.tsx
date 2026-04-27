'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  value: string;
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  align = 'left',
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        onClick={() => setOpen((o) => !o)}
        className="focus-visible:outline-none">
        {trigger}
      </button>

      {open && (
        <div
          className={cn(
            'absolute top-full z-50 mt-1.5 min-w-full overflow-hidden rounded-xl border border-white/10',
            'bg-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.35)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}>
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left font-roboto text-base text-neutral-10 transition-colors hover:bg-white/10 focus-visible:outline-none">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
