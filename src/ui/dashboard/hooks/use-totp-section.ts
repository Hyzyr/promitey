'use client';

import { useState, useTransition } from 'react';
import {
  setupTotpAction,
  enableTotpAction,
  disableTotpAction,
  type TotpSetupData,
} from '../server/profile-actions';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

type TotpView = 'idle' | 'setup' | 'disable';

export type TotpSectionState = {
  view: TotpView;
  enabled: boolean;
  isPending: boolean;
  error: string | null;
  setupData: TotpSetupData | null;
};

export function useTotpSection(initialEnabled: boolean) {
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<TotpView>('idle');
  const [enabled, setEnabled] = useState(initialEnabled);
  const [error, setError] = useState<string | null>(null);
  const [setupData, setSetupData] = useState<TotpSetupData | null>(null);

  function openSetup() {
    setError(null);
    startTransition(async () => {
      const result = await setupTotpAction();
      reportForwardedServerError(result);
      if (result.ok) {
        setSetupData(result.data);
        setView('setup');
      } else {
        setError(result.code);
      }
    });
  }

  function openDisable() {
    setError(null);
    setView('disable');
  }

  function cancel() {
    setView('idle');
    setError(null);
    setSetupData(null);
  }

  function enable(code: string) {
    setError(null);
    startTransition(async () => {
      const result = await enableTotpAction(code);
      reportForwardedServerError(result);
      if (result.ok) {
        setEnabled(true);
        setView('idle');
        setSetupData(null);
      } else {
        setError(result.code);
      }
    });
  }

  function disable(password: string, code: string) {
    setError(null);
    startTransition(async () => {
      const result = await disableTotpAction(password, code);
      reportForwardedServerError(result);
      if (result.ok) {
        setEnabled(false);
        setView('idle');
      } else {
        setError(result.code);
      }
    });
  }

  return { view, enabled, isPending, error, setupData, openSetup, openDisable, cancel, enable, disable };
}
