'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Copy, Link as LinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

import type { VlessConfigData } from '@/ui/dashboard/server/vpn-actions';

export type VlessErrorKey = 'accessDenied' | 'marzban' | 'generic';
export type VlessCopyState = 'idle' | 'copied' | 'failed';

export interface VlessConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeAriaLabel: string;
  config: VlessConfigData | null;
  isLoading: boolean;
  errorKey: VlessErrorKey | null;
  copyState: VlessCopyState;
  setCopyState: (copyState: VlessCopyState) => void;
}

export const VlessConfigModal = ({
  isOpen,
  onClose,
  closeAriaLabel,
  config,
  isLoading,
  errorKey,
  copyState,
  setCopyState,
}: VlessConfigModalProps) => {
  const t = useTranslations('dashboard.configs.vless');
  const tCommon = useTranslations('common');

  const copyUrl = async () => {
    if (!config) return;

    try {
      await navigator.clipboard.writeText(config.subscriptionUrl);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('title')}
      ariaLabel={t('ariaLabel')}
      closeAriaLabel={closeAriaLabel}
      showCloseButton
      className="max-w-xl"
    >
      {errorKey !== 'accessDenied' && (
        <p className="font-manrope text-base leading-relaxed text-neutral-300">
          {t('description')}
        </p>
      )}

      {isLoading && (
        <div className="flex min-h-55 items-center justify-center rounded-md bg-neutral-700 px-4 py-8 text-neutral-10">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="ml-3 font-manrope text-base font-semibold">{t('loading')}</span>
        </div>
      )}

      {errorKey && (
        <div className="flex flex-col gap-4 rounded-sm bg-neutral-700 px-4 py-4">
          <p className="text-sm leading-relaxed text-red-500">{t(`errors.${errorKey}`)}</p>
        </div>
      )}

      {!isLoading && config && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-center rounded-md bg-neutral-10 p-4">
            <Image
              src={config.qrDataUrl}
              alt={t('qrAlt')}
              width={220}
              height={220}
              unoptimized
              className="h-55 w-55"
            />
          </div>

          <div className="rounded-sm bg-neutral-700 px-4 py-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-neutral-10">
                <LinkIcon className="h-4 w-4 shrink-0" />
                {t('linkLabel')}
              </p>
              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-sm bg-primary-500 px-3 py-1.5 font-manrope text-xs font-semibold text-neutral-900 transition hover:bg-primary-400 active:scale-[0.97]"
              >
                <Copy className="h-3.5 w-3.5" />
                {copyState === 'copied' ? t('copied') : t('copy')}
              </button>
            </div>
            <p className="break-all font-mono text-xs leading-relaxed text-neutral-300">
              {config.subscriptionUrl}
            </p>
          </div>

          {copyState === 'failed' && (
            <p className="text-sm text-red-500">{t('copyFailed')}</p>
          )}
        </div>
      )}

      <Button
        type="button"
        variant="orange"
        size="md"
        onClick={onClose}
        className="w-full"
      >
        {tCommon('close')}
      </Button>
    </Modal>
  );
};

export function mapVlessErrorCode(code: string): VlessErrorKey {
  if (code === 'config_access_denied' || code === 'unauthenticated') {
    return 'accessDenied';
  }
  if (code === 'marzban_unavailable') return 'marzban';
  return 'generic';
}