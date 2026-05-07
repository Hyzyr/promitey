'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  prepareEmailChangeAction,
  confirmEmailChangeAction,
} from '../../auth/server/auth-actions';

import { mapApiError } from '@/lib/api-error';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

type EmailChangeStep = 'prepare' | 'confirm';

interface PrepareValues {
  new_email: string;
}

interface ConfirmValues {
  code: string;
}

export interface UseEmailChangeReturn {
  step: EmailChangeStep;
  prepareForm: ReturnType<typeof useForm<PrepareValues>>;
  confirmForm: ReturnType<typeof useForm<ConfirmValues>>;
  onPrepareSubmit: (values: PrepareValues) => Promise<void>;
  onConfirmSubmit: (values: ConfirmValues) => Promise<void>;
  serverError: string | null;
  isSubmitting: boolean;
  reset: () => void;
}

export function useEmailChange(onSuccess?: () => void): UseEmailChangeReturn {
  const tErrors = useTranslations('auth.errors');
  const [step, setStep] = useState<EmailChangeStep>('prepare');
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prepareSchema = z.object({
    new_email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
  });

  const confirmSchema = z.object({
    code: z.string().min(1, tErrors('codeIncomplete')),
  });

  const prepareForm = useForm<PrepareValues>({
    resolver: zodResolver(prepareSchema),
    mode: 'onSubmit',
  });

  const confirmForm = useForm<ConfirmValues>({
    resolver: zodResolver(confirmSchema),
    mode: 'onSubmit',
  });

  function mapErrorCode(code: string): string {
    return mapApiError(code, tErrors);
  }

  const onPrepareSubmit = async (values: PrepareValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      const result = await prepareEmailChangeAction({ new_email: values.new_email });
      reportForwardedServerError(result);
      if (!result.ok) {
        setServerError(mapErrorCode(result.code));
        return;
      }
      setStep('confirm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onConfirmSubmit = async (values: ConfirmValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      const result = await confirmEmailChangeAction({ code: values.code });
      reportForwardedServerError(result);
      if (!result.ok) {
        setServerError(mapErrorCode(result.code));
        return;
      }
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('prepare');
    setServerError(null);
    prepareForm.reset();
    confirmForm.reset();
  };

  return {
    step,
    prepareForm,
    confirmForm,
    onPrepareSubmit,
    onConfirmSubmit,
    serverError,
    isSubmitting,
    reset,
  };
}
