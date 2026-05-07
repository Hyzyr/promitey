'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

import { loginAction, loginTotpAction } from '../server/auth-actions';
import { useClearAuthFormErrors } from './use-clear-auth-form-errors';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';
import {
  buildPostAuthHref,
  resolveSelectedPricingPlan,
  saveSelectedPricingPlan,
} from '@/lib/pricing-selection';

interface PasswordValues {
  email: string;
  password: string;
}

interface TotpValues {
  code: string;
}

export type LoginStep = 'password' | 'totp';

export interface UseLoginReturn {
  step: LoginStep;
  passwordForm: ReturnType<typeof useForm<PasswordValues>>;
  totpForm: ReturnType<typeof useForm<TotpValues>>;
  onPasswordSubmit: (values: PasswordValues) => Promise<void>;
  onTotpSubmit: (values: TotpValues) => Promise<void>;
  resetToPassword: () => void;
  serverError: string | null;
}

export function useLogin(): UseLoginReturn {
  const tErrors = useTranslations('auth.errors');
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<LoginStep>('password');
  const [tempToken, setTempToken] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const selectedPlan = resolveSelectedPricingPlan(searchParams);

  const passwordSchema = z.object({
    email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
    password: z.string().min(1, tErrors('passwordRequired')),
  });

  const totpSchema = z.object({
    code: z.string().length(6, tErrors('codeIncomplete')),
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const totpForm = useForm<TotpValues>({
    resolver: zodResolver(totpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const clearServerError = useCallback(() => {
    setServerError(null);
  }, []);

  useClearAuthFormErrors(passwordForm, serverError !== null, clearServerError);
  useClearAuthFormErrors(totpForm, serverError !== null, clearServerError);

  useEffect(() => {
    if (selectedPlan) saveSelectedPricingPlan(selectedPlan);
  }, [selectedPlan]);

  const redirectAfterAuth = () => {
    router.replace(buildPostAuthHref(selectedPlan));
  };

  const onPasswordSubmit = async (values: PasswordValues) => {
    setServerError(null);
    const result = await loginAction({ email: values.email, password: values.password });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    if (result.data.step === 'totp') {
      setTempToken(result.data.temp_token);
      setStep('totp');
    } else {
      redirectAfterAuth();
    }
  };

  const onTotpSubmit = async (values: TotpValues) => {
    setServerError(null);
    const result = await loginTotpAction({ temp_token: tempToken, code: values.code });
    reportForwardedServerError(result);
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    redirectAfterAuth();
  };

  const resetToPassword = () => {
    setStep('password');
    setTempToken('');
    setServerError(null);
    totpForm.reset();
  };

  return {
    step,
    passwordForm,
    totpForm,
    onPasswordSubmit,
    onTotpSubmit,
    resetToPassword,
    serverError,
  };
}
