'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

import { loginAction, registerConfirmAction } from '../server/auth-actions';
import {
  clearRegistrationCredentials,
  getRegistrationCredentials,
} from '../registration-session';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';
import {
  buildPricingPlanHref,
  resolveSelectedPricingPlan,
  saveSelectedPricingPlan,
} from '@/lib/pricing-selection';

export interface UseRegisterConfirmReturn {
  isSubmitting: boolean;
  onVerify: (code: string) => Promise<{ ok: boolean; message?: string }>;
  onSuccess: () => void;
}

export function useRegisterConfirm(email: string): UseRegisterConfirmReturn {
  const tErrors = useTranslations('auth.errors');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedPlan = resolveSelectedPricingPlan(searchParams);

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  useEffect(() => {
    if (selectedPlan) saveSelectedPricingPlan(selectedPlan);
  }, [selectedPlan]);

  const onVerify = async (code: string): Promise<{ ok: boolean; message?: string }> => {
    setIsSubmitting(true);
    try {
      const result = await registerConfirmAction({ email, code });
      reportForwardedServerError(result);
      if (!result.ok) {
        return { ok: false, message: mapErrorCode(result.code) };
      }
      return { ok: true };
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSuccess = async () => {
    const credentials = getRegistrationCredentials(email);

    if (!credentials) {
      router.replace(selectedPlan ? buildPricingPlanHref('/login', selectedPlan) : '/login');
      return;
    }

    const loginResult = await loginAction({
      email: credentials.email,
      password: credentials.password,
    });
    clearRegistrationCredentials();
    reportForwardedServerError(loginResult);

    if (loginResult.ok && loginResult.data.step === 'done') {
      router.replace('/dashboard');
      return;
    }

    router.replace(selectedPlan ? buildPricingPlanHref('/login', selectedPlan) : '/login');
  };

  return { isSubmitting, onVerify, onSuccess };
}
