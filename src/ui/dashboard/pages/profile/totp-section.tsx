'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTotpSection } from '@/ui/dashboard/hooks/use-totp-section';

export interface TotpSectionProps {
  initialEnabled: boolean;
  className?: string;
}

export function TotpSection({ initialEnabled, className }: TotpSectionProps) {
  const t = useTranslations('dashboard.profile.totp');
  const {
    view,
    enabled,
    isPending,
    error,
    setupData,
    openSetup,
    openDisable,
    cancel,
    enable,
    disable,
  } = useTotpSection(initialEnabled);

  const [enableCode, setEnableCode] = useState('');
  const [disablePassword, setDisablePassword] = useState('');
  const [disableCode, setDisableCode] = useState('');

  const errorKey = error
    ? error === 'invalid_code'
      ? 'errors.invalid_code'
      : 'errors.generic'
    : null;

  if (view === 'setup' && setupData) {
    return (
      <div className={cn('space-y-5', className)}>
        <div>
          <h2 className="text-[24px] font-medium text-neutral-800">
            {t('setup.title')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            {t('setup.description')}
          </p>
        </div>

        <div className="flex justify-center rounded-md bg-neutral-20 px-5 py-6">
          <div className="rounded-sm bg-neutral-0 p-3 shadow-[0_13px_25.6px_rgba(0,0,0,.04)]">
            <img
              src={setupData.qrDataUrl}
              alt={t('setup.qrAlt')}
              width={200}
              height={200}
              decoding="async"
              className="rounded-sm"
            />
          </div>
        </div>

        <details className="rounded-sm bg-neutral-20 px-4 py-3 text-sm">
          <summary className="cursor-pointer font-medium text-neutral-800">
            {t('setup.manualEntry')}
          </summary>
          <p className="mt-2 text-neutral-500">{t('setup.secret')}</p>
          <p className="mt-1 font-mono text-sm font-bold tracking-wider break-all text-neutral-900">
            {setupData.secret}
          </p>
        </details>

        <Input
          label={t('setup.codeLabel')}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={enableCode}
          onChange={(e) => setEnableCode(e.target.value.replace(/\D/g, ''))}
          placeholder={t('setup.codePlaceholder')}
          variant="light"
          className="text-center font-mono text-lg tracking-widest"
        />

        {errorKey && (
          <p className="text-sm text-red-600">
            {t(errorKey as Parameters<typeof t>[0])}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() => enable(enableCode)}
            disabled={isPending || enableCode.length < 6}
            isLoading={isPending}
            variant="orange"
            size="md"
            className="w-full sm:flex-1"
          >
            {t('setup.confirm')}
          </Button>
          <Button
            type="button"
            onClick={cancel}
            disabled={isPending}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    );
  }

  if (view === 'disable') {
    return (
      <div className={cn('space-y-5', className)}>
        <div>
          <h2 className="text-[24px] font-medium text-neutral-800">
            {t('disable.title')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Input
            label={t('disable.passwordLabel')}
            type="password"
            value={disablePassword}
            onChange={(e) => setDisablePassword(e.target.value)}
            placeholder={t('disable.passwordPlaceholder')}
            variant="light"
          />
          <Input
            label={t('disable.codeLabel')}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={disableCode}
            onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ''))}
            placeholder={t('disable.codePlaceholder')}
            variant="light"
            className="text-center font-mono text-lg tracking-widest"
          />
        </div>

        {errorKey && (
          <p className="text-sm text-red-600">
            {t(errorKey as Parameters<typeof t>[0])}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() => disable(disablePassword, disableCode)}
            disabled={isPending || !disablePassword || disableCode.length < 6}
            isLoading={isPending}
            variant="orange"
            size="md"
            className="w-full bg-red-600 text-neutral-0 hover:bg-red-500 active:bg-red-700 sm:flex-1"
          >
            {t('disable.confirm')}
          </Button>
          <Button
            type="button"
            onClick={cancel}
            disabled={isPending}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div>
        <h2 className="text-[24px] font-medium text-neutral-800">
          {t('title')}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">{t('description')}</p>
        <p
          className={cn(
            'mt-3 inline-flex rounded-sm px-3 py-1 text-sm font-medium',
            enabled
              ? 'bg-green-50 text-green-700'
              : 'bg-neutral-20 text-neutral-500',
          )}
        >
          {enabled ? t('status.enabled') : t('status.disabled')}
        </p>
      </div>
      <div className="flex items-start gap-2">
        {enabled ? (
          <Button
            type="button"
            onClick={openDisable}
            disabled={isPending}
            variant="secondary"
            size="md"
            className="shrink-0 text-red-600 hover:bg-red-50"
          >
            {t('disable.button')}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={openSetup}
            disabled={isPending}
            isLoading={isPending}
            variant="orange"
            size="md"
            className="shrink-0"
          >
            {t('setup.button')}
          </Button>
        )}
      </div>
    </div>
  );
}
