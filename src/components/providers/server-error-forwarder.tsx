'use client';

import { useEffect } from 'react';

import {
  shouldForwardServerErrors,
  type ForwardedServerError,
} from '@/lib/server-error-forwarding';

export const ServerErrorForwarder = ({
  error,
}: {
  error?: ForwardedServerError;
}) => {
  useEffect(() => {
    if (!error || !shouldForwardServerErrors()) return;
    console.error('[Prometey SSR error]', error);
  }, [error]);

  return null;
};