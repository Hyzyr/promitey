'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { loginAction, loginTotpAction } from '../server/auth-actions';

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
  const t = useTranslations('auth');
  const router = useRouter();

  const [step, setStep] = useState<LoginStep>('password');
  const [tempToken, setTempToken] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const passwordSchema = z.object({
    email: z.string().min(1, t('errors.emailRequired')),
    password: z.string().min(1, t('errors.passwordRequired')),
  });

  const totpSchema = z.object({
    code: z.string().length(6, t('errors.codeIncomplete')),
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onSubmit',
  });

  const totpForm = useForm<TotpValues>({
    resolver: zodResolver(totpSchema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    const map: Record<string, string> = {
      invalid_credentials: t('errors.badCredentials'),
      invalid_totp: t('errors.invalidTotp'),
      too_many_requests: t('errors.tooManyRequests'),
    };
    return map[code] ?? t('errors.generic');
  }

  const onPasswordSubmit = async (values: PasswordValues) => {
    setServerError(null);
    const result = await loginAction({ email: values.email, password: values.password });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    if (result.data.step === 'totp') {
      setTempToken(result.data.temp_token);
      setStep('totp');
    } else {
      router.replace('/dashboard');
    }
  };

  const onTotpSubmit = async (values: TotpValues) => {
    setServerError(null);
    const result = await loginTotpAction({ temp_token: tempToken, code: values.code });
    if (!result.ok) {
      setServerError(mapErrorCode(result.code));
      return;
    }
    router.replace('/dashboard');
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
