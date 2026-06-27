'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';

import { loginAction, loginTotpAction } from '../server/auth-actions';
import { useClearAuthFormErrors } from './use-clear-auth-form-errors';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

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
  isRedirecting: boolean;
}

const AUTH_DEBUG_STORAGE_KEY = 'prometey-auth-debug';

const isAuthDebugEnabled = () => {
  if (typeof window === 'undefined') return false;

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('authDebug') === '1') return true;

  try {
    return window.localStorage.getItem(AUTH_DEBUG_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

export function useLogin(): UseLoginReturn {
  const tErrors = useTranslations('auth.errors');
  const locale = useLocale();

  const [step, setStep] = useState<LoginStep>('password');
  const [tempToken, setTempToken] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const passwordSchema = z.object({
    email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
    password: z.string().min(1, tErrors('passwordRequired')),
  });

  const totpSchema = z.object({
    code: z.string().regex(/^\d{6}$/, tErrors('codeIncomplete')),
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

  const redirectAfterAuth = async (source: 'password' | 'totp') => {
    setIsRedirecting(true);
    const target = `/${locale}/dashboard`;

    if (isAuthDebugEnabled()) {
      console.debug('[Prometey auth] redirecting to dashboard', {
        source,
        target,
        path: window.location.pathname,
      });
    }

    window.location.assign(target);

    // Safety net: in rare cases the first hard navigation can be interrupted
    // before the new document commits (e.g. an in-flight re-render). If we are
    // still on the login page shortly after, force the navigation again.
    window.setTimeout(() => {
      if (window.location.pathname.includes('/login')) {
        window.location.href = target;
      }
    }, 600);
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
      await redirectAfterAuth('password');
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
    await redirectAfterAuth('totp');
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
    isRedirecting,
  };
}
