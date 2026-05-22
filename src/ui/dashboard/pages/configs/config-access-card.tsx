'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';
import { getVlessConfigAction } from '@/ui/dashboard/server/vpn-actions';

import { ConfigTile } from './config-tile';
import { OpenvpnConfigModal } from './openvpn-config-modal';
import { VlessConfigModal, mapVlessErrorCode } from './vless-config-modal';

import type { VlessConfigData } from '@/ui/dashboard/server/vpn-actions';
import type { VlessCopyState, VlessErrorKey } from './vless-config-modal';

const cardBackground =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

type ActiveModal = 'vless' | 'openvpn' | null;

export interface ConfigAccessCardProps {
  hasActiveSubscription: boolean;
  className?: string;
}

export const ConfigAccessCard = ({ hasActiveSubscription, className }: ConfigAccessCardProps) => {
  const t = useTranslations('dashboard.configs');
  const tCommon = useTranslations('common');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [vlessConfig, setVlessConfig] = useState<VlessConfigData | null>(null);
  const [isVlessLoading, setIsVlessLoading] = useState(false);
  const [vlessErrorKey, setVlessErrorKey] = useState<VlessErrorKey | null>(null);
  const [vlessCopyState, setVlessCopyState] = useState<VlessCopyState>('idle');
  const vlessRequestIdRef = useRef(0);

  const openModal = (modal: Exclude<ActiveModal, null>) => {
    setActiveModal(modal);
  };

  const openVlessModal = () => {
    const requestId = vlessRequestIdRef.current + 1;
    vlessRequestIdRef.current = requestId;

    setActiveModal('vless');
    setVlessErrorKey(null);
    setVlessCopyState('idle');
    setVlessConfig(null);

    if (!hasActiveSubscription) {
      setIsVlessLoading(false);
      setVlessErrorKey('accessDenied');
      return;
    }

    setIsVlessLoading(true);

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
        <h2 className="text-[24px] font-medium text-neutral-800">
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
        hasActiveSubscription={hasActiveSubscription}
      />
    </section>
  );
};