'use client';

import { useTranslations } from 'next-intl';
import { Download, Globe2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

const openvpnRegions = [
  { code: 'auto', flagCode: null },
  { code: 'fr', flagCode: 'fr' },
  { code: 'uk', flagCode: 'gb' },
  { code: 'pl', flagCode: 'pl' },
  { code: 'us', flagCode: 'us' },
  { code: 'iq', flagCode: 'iq' },
  { code: 'ru', flagCode: 'ru' },
  { code: 'de', flagCode: 'de' },
  { code: 'nl', flagCode: 'nl' },
] as const;

export interface OpenvpnConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeAriaLabel: string;
  hasActiveSubscription: boolean;
}

export const OpenvpnConfigModal = ({
  isOpen,
  onClose,
  closeAriaLabel,
  hasActiveSubscription,
}: OpenvpnConfigModalProps) => {
  const t = useTranslations('dashboard.configs.openvpn');
  const tCommon = useTranslations('common');

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
      {hasActiveSubscription ? (
        <div className="flex flex-col gap-3 rounded-sm bg-neutral-700 px-4 py-4">
          <h3 className="font-manrope text-base font-semibold text-neutral-10">
            {t('regionTitle')}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-300">
            {t('regionDescription')}
          </p>
          <div className="flex flex-col gap-2">
            {openvpnRegions.map((region) => (
              <a
                key={region.code}
                href={`/api/configs/openvpn/${region.code}`}
                download
                className="inline-flex items-center gap-3 rounded-sm bg-neutral-10 px-3 py-2.5 font-manrope text-sm font-semibold text-neutral-900 transition hover:bg-primary-500 active:scale-[0.97]"
              >
                {region.flagCode ? (
                  <span
                    aria-hidden="true"
                    className="h-4.5 w-6 shrink-0 rounded-xs bg-cover bg-center"
                    style={{ backgroundImage: `url(https://flagcdn.com/w40/${region.flagCode}.png)` }}
                  />
                ) : (
                  <Globe2 className="h-5 w-6 shrink-0" />
                )}
                <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <span>{t(`countries.${region.code}`)}</span>
                  <span className="text-xs uppercase text-neutral-400">{region.code}</span>
                </span>
                <Download className="h-4 w-4 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 rounded-sm bg-neutral-700 px-4 py-4">
          <p className="text-sm leading-relaxed text-red-500">{t('errors.accessDenied')}</p>
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