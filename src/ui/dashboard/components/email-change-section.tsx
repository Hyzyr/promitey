'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailChange } from '../hooks/use-email-change';

export interface EmailChangeSectionProps {
  className?: string;
}

export const EmailChangeSection = ({ className }: EmailChangeSectionProps) => {
  const t = useTranslations('dashboard.profile');
  const [success, setSuccess] = useState(false);

  const {
    step,
    prepareForm,
    confirmForm,
    onPrepareSubmit,
    onConfirmSubmit,
    serverError,
    isSubmitting,
    reset,
  } = useEmailChange(() => setSuccess(true));

  const {
    register: registerPrepare,
    handleSubmit: handlePrepareSubmit,
    formState: { errors: prepareErrors },
    getValues: getPrepareValues,
  } = prepareForm;

  const {
    register: registerConfirm,
    handleSubmit: handleConfirmSubmit,
    formState: { errors: confirmErrors },
  } = confirmForm;

  return (
    <div className={className}>
      <h2 className="mb-2 text-lg font-semibold text-neutral-800">
        {t('emailChange.title')}
      </h2>
      <p className="mb-4 text-sm text-neutral-500">
        {t('emailChange.description')}
      </p>

      {success ? (
        <p className="text-sm font-medium text-green-600">
          {t('emailChange.success')}
        </p>
      ) : step === 'prepare' ? (
        <form onSubmit={handlePrepareSubmit(onPrepareSubmit)} noValidate>
          <div className="space-y-4">
            <Input
              label={t('emailChange.newEmailLabel')}
              type="email"
              autoComplete="email"
              variant="light"
              error={prepareErrors.new_email?.message}
              {...registerPrepare('new_email')}
            />
          </div>

          {serverError && (
            <p className="mt-3 text-sm text-red-500">{serverError}</p>
          )}

          <div className="mt-4">
            <Button type="submit" variant="orange" size="md" isLoading={isSubmitting}>
              {t('emailChange.submitPrepare')}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirmSubmit(onConfirmSubmit)} noValidate>
          <p className="mb-4 text-sm text-neutral-600">
            {t('emailChange.codeSentTo')}{' '}
            <span className="font-medium">{getPrepareValues('new_email')}</span>.
          </p>

          <div className="space-y-4">
            <Input
              label={t('emailChange.codeLabel')}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              variant="light"
              error={confirmErrors.code?.message}
              {...registerConfirm('code')}
            />
          </div>

          {serverError && (
            <p className="mt-3 text-sm text-red-500">{serverError}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="submit" variant="orange" size="md" isLoading={isSubmitting}>
              {t('emailChange.submitConfirm')}
            </Button>
            <Button type="button" variant="secondary" size="md" onClick={reset}>
              {t('emailChange.back')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
