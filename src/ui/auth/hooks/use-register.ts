'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

import { registerAction } from '../server/auth-actions';
import { useClearAuthFormErrors } from './use-clear-auth-form-errors';
import { saveRegistrationCredentials } from '../registration-session';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';
import { createPasswordSchema } from '@/ui/auth/password-validation';
import {
  PRICING_PLAN_QUERY_PARAM,
  getSelectedPricingPlanFromSearch,
  saveSelectedPricingPlan,
} from '@/lib/pricing-selection';

interface RegisterValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface UseRegisterReturn {
  form: ReturnType<typeof useForm<RegisterValues>>;
  onSubmit: (values: RegisterValues) => Promise<void>;
  serverError: string | null;
}

export function useRegister(): UseRegisterReturn {
  const tErrors = useTranslations('auth.errors');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const selectedPlan = getSelectedPricingPlanFromSearch(searchParams);

  const schema = z
    .object({
      email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
      password: createPasswordSchema(tErrors),
      passwordRepeat: z.string().min(1, tErrors('passwordRequired')),
    })
    .refine((d) => d.password === d.passwordRepeat, {
      path: ['passwordRepeat'],
      message: tErrors('passwordMismatch'),
    });

  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const clearServerError = useCallback(() => {
    setServerError(null);
  }, []);

  useClearAuthFormErrors(form, serverError !== null, clearServerError);

  useEffect(() => {
    if (selectedPlan) saveSelectedPricingPlan(selectedPlan);
  }, [selectedPlan]);

  const onSubmit = async (values: RegisterValues) => {
    setServerError(null);
    const result = await registerAction({ email: values.email, password: values.password });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    saveRegistrationCredentials(result.data.email, values.password);
    const verifyHref = `/register/confirm?email=${encodeURIComponent(result.data.email)}`;
    router.push(
      selectedPlan
        ? `${verifyHref}&${PRICING_PLAN_QUERY_PARAM}=${encodeURIComponent(selectedPlan)}`
        : verifyHref,
    );
  };

  return { form, onSubmit, serverError };
}
