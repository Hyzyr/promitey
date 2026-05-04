'use client';

import { useContext } from 'react';

import { ToastContext, type ToastContextValue } from '@/components/providers/toast-provider';

/**
 * Returns toast dispatch functions.
 *
 * Usage (inside any client component or hook):
 *   const { success, error, info, dismiss } = useToast();
 *   error(mapApiError(code, tErrors));        // inline error message
 *   success(t('profile.emailChange.success')); // success feedback
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be called inside a component wrapped by <ToastProvider>.');
  }
  return ctx;
}
