'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

export interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  dismiss: (id: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

export const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

const AUTO_DISMISS_MS = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, message: string) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  const ctx = useMemo<ToastContextValue>(
    () => ({
      success: (msg) => show('success', msg),
      error: (msg) => show('error', msg),
      info: (msg) => show('info', msg),
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ─── Toaster (renders the toast stack) ───────────────────────────────────────

function Toaster({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-4 right-4 z-[9999] flex flex-col-reverse gap-2"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// ─── Individual toast card ────────────────────────────────────────────────────

const TYPE_CONFIG: Record<ToastType, { bar: string; icon: string; iconClass: string }> = {
  success: { bar: 'bg-green-500', icon: '✓', iconClass: 'text-green-600' },
  error: { bar: 'bg-red-500', icon: '✕', iconClass: 'text-red-600' },
  info: { bar: 'bg-neutral-400', icon: 'ℹ', iconClass: 'text-neutral-500' },
};

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const t = useTranslations('common');
  const [visible, setVisible] = useState(false);
  const config = TYPE_CONFIG[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        'pointer-events-auto relative flex w-80 overflow-hidden rounded-md bg-white shadow-lg',
        'transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
      )}
    >
      <div className={cn('w-1 shrink-0', config.bar)} />
      <div className="flex flex-1 items-start gap-3 px-4 py-3">
        <span className={cn('mt-0.5 shrink-0 text-sm font-bold leading-none', config.iconClass)} aria-hidden>
          {config.icon}
        </span>
        <p className="flex-1 text-sm font-medium leading-snug text-neutral-800">{toast.message}</p>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label={t('close')}
          className="ml-1 shrink-0 text-lg leading-none text-neutral-400 transition hover:text-neutral-700"
        >
          ×
        </button>
      </div>
    </div>
  );
}
