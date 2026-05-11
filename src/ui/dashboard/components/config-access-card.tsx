'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Download, Link as LinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

import { ConfigTile } from './config-tile';
import { getVlessConfigAction, type VlessConfigData } from '../server/vpn-actions';

const cardBackground =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

const anchorButtonClass = cn(
  'flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[18px] leading-[2.1] whitespace-nowrap',
  'font-manrope font-semibold transition duration-150 focus-visible:outline-none active:scale-[0.97]',
);

const orangeAnchorClass = cn(
  anchorButtonClass,
  'bg-primary-500 text-neutral-900 hover:bg-primary-400 active:bg-primary-600',
);

type ActiveModal = 'vless' | 'openvpn' | null;
type VlessErrorKey = 'accessDenied' | 'marzban' | 'generic';

export interface ConfigAccessCardProps {
  className?: string;
}

export const ConfigAccessCard = ({ className }: ConfigAccessCardProps) => {
  const t = useTranslations('dashboard.configs');
  const tCommon = useTranslations('common');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [vlessConfig, setVlessConfig] = useState<VlessConfigData | null>(null);
  const [isVlessLoading, setIsVlessLoading] = useState(false);
  const [vlessErrorKey, setVlessErrorKey] = useState<VlessErrorKey | null>(null);
  const [vlessCopyState, setVlessCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const vlessRequestIdRef = useRef(0);

  const openModal = (modal: ActiveModal) => {
    setActiveModal(modal);
  };

  const openVlessModal = () => {
    const requestId = vlessRequestIdRef.current + 1;
    vlessRequestIdRef.current = requestId;

    setActiveModal('vless');
    setIsVlessLoading(true);
    setVlessErrorKey(null);
    setVlessCopyState('idle');
    setVlessConfig(null);

    getVlessConfigAction()
      .then((result) => {
        reportForwardedServerError(result);
        if (vlessRequestIdRef.current !== requestId) return;

        setIsVlessLoading(false);

        if (!result.ok) {
          setVlessErrorKey(mapVlessErrorCode(result.code));
          return;
        }

        setVlessConfig(result.data);
      })
      .catch(() => {
        if (vlessRequestIdRef.current !== requestId) return;
        setIsVlessLoading(false);
        setVlessErrorKey('generic');
      });
  };

  const closeVlessModal = () => {
    vlessRequestIdRef.current += 1;
    setActiveModal(null);
    setVlessErrorKey(null);
    setVlessCopyState('idle');
    setIsVlessLoading(false);
  };

  return (
    <section
      className={cn(
        'flex w-full max-w-212.5 flex-col gap-8 rounded-md px-5 py-4 shadow-[0_13px_25.6px_rgba(0,0,0,.04)]',
        className,
      )}
      style={{ background: cardBackground }}
    >
      <header className="flex flex-col gap-3">
        <h2 className="font-manrope text-[24px] leading-[1.2] font-bold text-neutral-800">
          {t('title')}
        </h2>
        <p className="font-manrope text-base text-neutral-800">
          {t('howToPrompt')}{' '}
          <Link
            href="/dashboard/instructions"
            className="font-bold text-orange-600 underline underline-offset-2"
          >
            {t('howToCta')}
          </Link>
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row">
        <ConfigTile
          onClick={openVlessModal}
          ariaLabel={t('vless.openAriaLabel')}
          logo="/images/vless-logo.svg"
          label={
            <>
              <span>{t('configuration')} </span>
              <strong>VLESS</strong>
            </>
          }
        />
        <ConfigTile
          onClick={() => openModal('openvpn')}
          ariaLabel={t('openvpn.openAriaLabel')}
          logo="/images/open-vpn-logo.svg"
          label={
            <>
              <span>{t('configuration')} </span>
              <strong>OpenVPN</strong>
            </>
          }
        />
      </div>

      <VlessConfigModal
        isOpen={activeModal === 'vless'}
        onClose={closeVlessModal}
        closeAriaLabel={tCommon('close')}
        config={vlessConfig}
        isLoading={isVlessLoading}
        errorKey={vlessErrorKey}
        copyState={vlessCopyState}
        setCopyState={setVlessCopyState}
      />
      <OpenvpnConfigModal
        isOpen={activeModal === 'openvpn'}
        onClose={() => setActiveModal(null)}
        closeAriaLabel={tCommon('close')}
      />
    </section>
  );
};

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeAriaLabel: string;
}

interface VlessConfigModalProps extends ConfigModalProps {
  config: VlessConfigData | null;
  isLoading: boolean;
  errorKey: VlessErrorKey | null;
  copyState: 'idle' | 'copied' | 'failed';
  setCopyState: (copyState: 'idle' | 'copied' | 'failed') => void;
}

const VlessConfigModal = ({
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

  const close = () => {
    onClose();
  };

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
      onClose={close}
      title={t('title')}
      ariaLabel={t('ariaLabel')}
      closeAriaLabel={closeAriaLabel}
      showCloseButton
      className="max-w-xl"
    >
      <p className="font-manrope text-base leading-relaxed text-neutral-300">
        {t('description')}
      </p>

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

          <Button
            type="button"
            variant="orange"
            size="md"
            onClick={close}
            className="w-full"
          >
            {tCommon('close')}
          </Button>
        </div>
      )}
    </Modal>
  );
};

const OpenvpnConfigModal = ({ isOpen, onClose, closeAriaLabel }: ConfigModalProps) => {
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
      <p className="font-manrope text-base leading-relaxed text-neutral-300">
        {t('description')}
      </p>

      <div className="flex flex-col gap-3 rounded-sm bg-neutral-700 px-4 py-4">
        <h3 className="font-manrope text-base font-semibold text-neutral-10">
          {t('savedTitle')}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-300">
          {t('savedDescription')}
        </p>
        <a
          href="/api/configs/openvpn"
          download
          className={orangeAnchorClass}
        >
          <Download className="h-4 w-4" />
          {t('downloadSaved')}
        </a>
      </div>

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

function mapVlessErrorCode(code: string): VlessErrorKey {
  if (code === 'config_access_denied' || code === 'unauthenticated') {
    return 'accessDenied';
  }
  if (code === 'marzban_unavailable') return 'marzban';
  return 'generic';
}