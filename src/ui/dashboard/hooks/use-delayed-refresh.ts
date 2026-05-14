'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DEFAULT_REFRESH_DELAY_MS = 800;

export function useDelayedRefresh(delayMs = DEFAULT_REFRESH_DELAY_MS) {
  const router = useRouter();

  return useCallback(async () => {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, delayMs);
    });

    router.refresh();
  }, [delayMs, router]);
}