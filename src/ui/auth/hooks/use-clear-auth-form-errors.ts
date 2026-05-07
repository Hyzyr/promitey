'use client';

import { useEffect } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export function useClearAuthFormErrors<TValues extends FieldValues>(
  form: UseFormReturn<TValues>,
  hasServerError: boolean,
  clearServerError: () => void,
): void {
  const { clearErrors, watch } = form;

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors();
      if (hasServerError) {
        clearServerError();
      }
    });

    return () => subscription.unsubscribe();
  }, [clearErrors, clearServerError, hasServerError, watch]);
}