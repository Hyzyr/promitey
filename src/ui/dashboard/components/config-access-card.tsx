'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Download, ExternalLink, Link as LinkIcon, QrCode } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const secondaryAnchorClass = cn(
  anchorButtonClass,
  'bg-neutral-800/12 text-neutral-10 shadow-[0px_4px_46px_10px_rgba(255,200,0,0.06)] hover:bg-neutral-800/20 active:bg-neutral-800/28',
);

type ActiveModal = 'vless' | 'openvpn' | null;

export interface ConfigAccessCardProps {
  className?: string;
}

export const ConfigAccessCard = ({ className }: ConfigAccessCardProps) => {
  const t = useTranslations('dashboard.configs');
  const tCommon = useTranslations('common');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const openModal = (modal: ActiveModal) => {
    setActiveModal(modal);
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
          onClick={() => openModal('vless')}
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
        onClose={() => setActiveModal(null)}
        closeAriaLabel={tCommon('close')}
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

const VlessConfigModal = ({ isOpen, onClose, closeAriaLabel }: ConfigModalProps) => {
  const t = useTranslations('dashboard.configs.vless');
  const tCommon = useTranslations('common');
  const [config, setConfig] = useState<VlessConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const loadConfig = async () => {
    setIsLoading(true);
    setError(null);
    setCopyState('idle');

    const result = await getVlessConfigAction();
    reportForwardedServerError(result);
    setIsLoading(false);

    if (!result.ok) {
      setConfig(null);
      setError(t(`errors.${mapVlessErrorCode(result.code)}`));
      return;
    }

    setConfig(result.data);
  };

  const close = () => {
    onClose();
    setError(null);
    setCopyState('idle');
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

      {!config && (
        <Button
          type="button"
          variant="orange"
          size="md"
          onClick={loadConfig}
          isLoading={isLoading}
          className="w-full gap-2"
        >
          <QrCode className="h-4 w-4" />
          {t('load')}
        </Button>
      )}

      {error && <p className="text-sm leading-relaxed text-red-500">{error}</p>}

      {config && (
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
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-10">
              <LinkIcon className="h-4 w-4" />
              {t('linkLabel')}
            </p>
            <p className="break-all font-mono text-xs leading-relaxed text-neutral-300">
              {config.subscriptionUrl}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="orange"
              size="md"
              onClick={copyUrl}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {copyState === 'copied' ? t('copied') : t('copy')}
            </Button>
            <a
              href={config.subscriptionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryAnchorClass}
            >
              <ExternalLink className="h-4 w-4" />
              {t('open')}
            </a>
          </div>

          {copyState === 'failed' && (
            <p className="text-sm text-red-500">{t('copyFailed')}</p>
          )}

          <button
            type="button"
            onClick={close}
            className="w-full rounded-md py-2.5 font-manrope text-base font-semibold text-neutral-300 transition-colors hover:text-neutral-10"
          >
            {tCommon('close')}
          </button>
        </div>
      )}
    </Modal>
  );
};

const OpenvpnConfigModal = ({ isOpen, onClose, closeAriaLabel }: ConfigModalProps) => {
  const t = useTranslations('dashboard.configs.openvpn');
  const tCommon = useTranslations('common');
  const [region, setRegion] = useState('');

  const customDownloadHref = useMemo(() => {
    const normalizedRegion = region.trim();
    if (!normalizedRegion) return '';
    return `/api/configs/openvpn/${encodeURIComponent(normalizedRegion)}`;
  }, [region]);

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

      <div className="flex flex-col gap-3 rounded-sm bg-neutral-700 px-4 py-4">
        <h3 className="font-manrope text-base font-semibold text-neutral-10">
          {t('regionTitle')}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-300">
          {t('regionDescription')}
        </p>
        <Input
          label={t('regionLabel')}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
          placeholder={t('regionPlaceholder')}
          variant="dark"
        />
        {customDownloadHref ? (
          <a
            href={customDownloadHref}
            download
            className={orangeAnchorClass}
          >
            <Download className="h-4 w-4" />
            {t('downloadRegion')}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className={cn(
              orangeAnchorClass,
              'cursor-not-allowed opacity-70 saturate-50',
            )}
          >
          <Download className="h-4 w-4" />
          {t('downloadRegion')}
          </button>
        )}
      </div>

      <p className="text-sm leading-relaxed text-neutral-400">
        {t('listUnavailable')}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-md py-2.5 font-manrope text-base font-semibold text-neutral-300 transition-colors hover:text-neutral-10"
      >
        {tCommon('close')}
      </button>
    </Modal>
  );
};

function mapVlessErrorCode(code: string): 'accessDenied' | 'marzban' | 'generic' {
  if (code === 'config_access_denied' || code === 'unauthenticated') {
    return 'accessDenied';
  }
  if (code === 'marzban_unavailable') return 'marzban';
  return 'generic';
}