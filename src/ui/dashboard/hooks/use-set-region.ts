'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { setRegionAction } from '../server/vpn-actions';

interface SetRegionValues {
  region: string;
}

export interface UseSetRegionReturn {
  form: ReturnType<typeof useForm<SetRegionValues>>;
  onSubmit: (values: SetRegionValues) => Promise<void>;
  serverError: string | null;
  success: boolean;
  currentRegion: string;
}

export function useSetRegion(initialRegion: string): UseSetRegionReturn {
  const tAuth = useTranslations('auth');
  const tDashboard = useTranslations('dashboard.vpn');
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(initialRegion);

  const schema = z.object({
    region: z.string().min(1, tDashboard('regionRequired')),
  });

  const form = useForm<SetRegionValues>({
    resolver: zodResolver(schema),
    defaultValues: { region: initialRegion },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SetRegionValues) => {
    setServerError(null);
    setSuccess(false);
    const result = await setRegionAction(values.region);
    if (!result.ok) {
      setServerError(tAuth('errors.generic'));
      return;
    }
    setCurrentRegion(result.data.region);
    setSuccess(true);
  };

  return { form, onSubmit, serverError, success, currentRegion };
}
