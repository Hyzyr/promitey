'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailChange } from '../hooks/use-email-change';

export interface EmailChangeSectionProps {
  className?: string;
}

export const EmailChangeSection = ({ className }: EmailChangeSectionProps) => {
  const t = useTranslations('dashboard.profile');
  const searchParams = useSearchParams();
  const [success] = useState(searchParams.get('emailChanged') === '1');

  const {
    prepareForm,
    onPrepareSubmit,
    serverError,
    isSubmitting,
  } = useEmailChange();

  const {
    register: registerPrepare,
    handleSubmit: handlePrepareSubmit,
    formState: { errors: prepareErrors },
  } = prepareForm;

  return (
    <div className={className}>
      <h2 className="mb-2 text-[24px] font-medium text-neutral-800">
        {t('emailChange.title')}
      </h2>
      <p className="mb-4 text-sm text-neutral-500">
        {t('emailChange.description')}
      </p>

      {success ? (
        <p className="text-sm font-medium text-green-600">
          {t('emailChange.success')}
        </p>
      ) : (
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
      )}
    </div>
  );
};
