'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTotpSection } from '../hooks/use-totp-section';

type Props = {
  initialEnabled: boolean;
};

export function TotpSection({ initialEnabled }: Props) {
  const t = useTranslations('dashboard.profile.totp');
  const { view, enabled, isPending, error, setupData, openSetup, openDisable, cancel, enable, disable } =
    useTotpSection(initialEnabled);

  const [enableCode, setEnableCode] = useState('');
  const [disablePassword, setDisablePassword] = useState('');
  const [disableCode, setDisableCode] = useState('');

  const errorKey = error ? (error === 'invalid_code' ? 'errors.invalid_code' : 'errors.generic') : null;

  if (view === 'setup' && setupData) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">{t('setup.title')}</h2>
        <p className="text-sm text-neutral-500">{t('setup.description')}</p>

        <div className="flex justify-center">
          <img
            src={setupData.qrDataUrl}
            alt="TOTP QR Code"
            width={200}
            height={200}
            className="rounded-lg border border-neutral-200"
          />
        </div>

        <details className="rounded-lg bg-neutral-50 px-4 py-3 text-sm">
          <summary className="cursor-pointer font-medium text-neutral-700">
            {t('setup.manualEntry')}
          </summary>
          <p className="mt-2 text-neutral-500">{t('setup.secret')}</p>
          <p className="mt-1 break-all font-mono text-sm font-bold tracking-wider text-neutral-900">
            {setupData.secret}
          </p>
        </details>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            {t('setup.codeLabel')}
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={enableCode}
            onChange={(e) => setEnableCode(e.target.value.replace(/\D/g, ''))}
            placeholder={t('setup.codePlaceholder')}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-center font-mono text-lg tracking-widest focus:border-neutral-400 focus:outline-none"
          />
        </div>

        {errorKey && (
          <p className="text-sm text-red-600">{t(errorKey as Parameters<typeof t>[0])}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => enable(enableCode)}
            disabled={isPending || enableCode.length < 6}
            className="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? '…' : t('setup.confirm')}
          </button>
          <button
            type="button"
            onClick={cancel}
            disabled={isPending}
            className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'disable') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">{t('disable.title')}</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            {t('disable.passwordLabel')}
          </label>
          <input
            type="password"
            value={disablePassword}
            onChange={(e) => setDisablePassword(e.target.value)}
            placeholder={t('disable.passwordPlaceholder')}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 focus:border-neutral-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            {t('disable.codeLabel')}
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={disableCode}
            onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ''))}
            placeholder={t('disable.codePlaceholder')}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-center font-mono text-lg tracking-widest focus:border-neutral-400 focus:outline-none"
          />
        </div>

        {errorKey && (
          <p className="text-sm text-red-600">{t(errorKey as Parameters<typeof t>[0])}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => disable(disablePassword, disableCode)}
            disabled={isPending || !disablePassword || disableCode.length < 6}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? '…' : t('disable.confirm')}
          </button>
          <button
            type="button"
            onClick={cancel}
            disabled={isPending}
            className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">{t('title')}</h2>
        <p className="mt-1 text-sm text-neutral-500">{t('description')}</p>
        <p className={`mt-2 text-sm font-medium ${enabled ? 'text-green-600' : 'text-neutral-400'}`}>
          {enabled ? t('status.enabled') : t('status.disabled')}
        </p>
      </div>
      {enabled ? (
        <button
          type="button"
          onClick={openDisable}
          disabled={isPending}
          className="shrink-0 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          {t('disable.button')}
        </button>
      ) : (
        <button
          type="button"
          onClick={openSetup}
          disabled={isPending}
          className="shrink-0 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {isPending ? '…' : t('setup.button')}
        </button>
      )}
    </div>
  );
}
