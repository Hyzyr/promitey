'use client';

import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { androidSVG, appleSVG, windowsSVG } from '@/components/assets/os-svg';
import { Modal } from '@/components/ui/modal';
import { VideoCard } from '@/components/ui/video-card';
import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type Protocol = 'openvpn' | 'vless';
type AppKey = 'windows' | 'android' | 'ios' | 'macos';

interface AppOption {
  key: AppKey;
  icon: ReactNode;
  href: string;
}

export interface InstructionsTabsProps {
  className?: string;
}

const protocols: Protocol[] = ['openvpn', 'vless'];

const protocolLogos: Record<Protocol, string> = {
  openvpn: '/images/open-vpn-logo.svg',
  vless: '/images/vless-logo.svg',
};

const videoSrc: Record<Protocol, string> = {
  openvpn: '/videos/woman-feedback-promitey.webm',
  vless: '/videos/woman-feedback-promitey.webm',
};

const videoPoster = '/images/feedback-video-poster.png';

const appOptions: Record<Protocol, AppOption[]> = {
  openvpn: [
    {
      key: 'windows',
      icon: windowsSVG,
      href: 'https://openvpn.net/client/',
    },
    {
      key: 'android',
      icon: androidSVG,
      href: 'https://openvpn.net/client/',
    },
    {
      key: 'ios',
      icon: appleSVG,
      href: 'https://openvpn.net/client/',
    },
    {
      key: 'macos',
      icon: appleSVG,
      href: 'https://openvpn.net/client/',
    },
  ],
  vless: [
    {
      key: 'windows',
      icon: windowsSVG,
      href: 'https://github.com/2dust/v2rayN',
    },
    {
      key: 'android',
      icon: androidSVG,
      href: 'https://github.com/2dust/v2rayNG',
    },
    {
      key: 'ios',
      icon: appleSVG,
      href: 'https://github.com/hiddify/hiddify-app',
    },
    {
      key: 'macos',
      icon: appleSVG,
      href: 'https://github.com/yanue/V2rayU',
    },
  ],
};

export const InstructionsTabs = ({ className }: InstructionsTabsProps) => {
  const t = useTranslations('dashboard.instructions');
  const tCommon = useTranslations('common');
  const [activeProtocol, setActiveProtocol] = useState<Protocol>('openvpn');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const activeApps = appOptions[activeProtocol];

  return (
    <section
      className={cn(
        'flex w-full flex-col gap-8 rounded-md px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)] lg:min-h-215 lg:bg-neutral-0 max-lg:rounded-none max-lg:bg-transparent max-lg:px-0 max-lg:py-0 max-lg:shadow-none',
        className,
      )}
    >
      <h1 className="text-[24px] font-medium text-neutral-800 max-lg:max-w-82">
        {t('title')}
      </h1>

      <div className="flex flex-col gap-8 border-t border-neutral-40 pt-6">
        <div className="flex flex-col gap-4">
          <p className="font-manrope text-[18px] font-light text-neutral-800 max-lg:font-semibold">
            {t('chooseApp')}
          </p>
          <div
            role="tablist"
            aria-label={t('tabs.ariaLabel')}
            className="flex w-full gap-3"
          >
            {protocols.map((protocol) => {
              const selected = activeProtocol === protocol;

              return (
                <button
                  key={protocol}
                  id={`${protocol}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${protocol}-panel`}
                  onClick={() => setActiveProtocol(protocol)}
                  className={cn(
                    'flex min-w-0 items-center gap-4 rounded-[13px] border py-2 pr-4 pl-2 text-left transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:scale-[0.98] lg:w-52.5',
                    'max-lg:flex-1 max-lg:gap-3 max-lg:pr-3',
                    selected
                      ? 'border-neutral-500 bg-neutral-400 text-neutral-10 shadow-[0_8px_18px_rgba(0,0,0,.08)]'
                      : 'border-neutral-30 bg-neutral-10 text-neutral-900 hover:-translate-y-0.5 hover:border-neutral-50 hover:bg-neutral-20',
                  )}
                >
                  <img
                    src={protocolLogos[protocol]}
                    alt=""
                    width={60}
                    height={60}
                    className="h-11.25 w-11.25 shrink-0 lg:h-15 lg:w-15"
                  />
                  <span className="font-manrope text-sm leading-normal lg:text-base">
                    <strong>{t(`protocols.${protocol}.clientTitle`)}</strong>
                    <br />
                    {t(`protocols.${protocol}.clientSubtitle`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${activeProtocol}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeProtocol}-tab`}
          className="flex flex-col gap-8"
        >
          <div className="grid w-full max-w-189 gap-2.5 lg:grid-cols-2">
            {activeApps.map(({ key, icon, href }) => {
              const content = (
                <>
                  <span className="icon h-10 w-10 shrink-0 text-neutral-800 transition-colors group-hover:text-neutral-900 lg:h-16.25 lg:w-16.25">
                    {icon}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5 font-manrope">
                    <strong className="text-[18px] leading-normal text-neutral-600 transition-colors group-hover:text-neutral-900">
                      {t(`protocols.${activeProtocol}.apps.${key}.title`)}
                    </strong>
                    <span
                      className={cn(
                        'text-base leading-[1.1] font-medium',
                        'text-neutral-300 transition-colors group-hover:text-neutral-600',
                      )}
                    >
                      {t(`protocols.${activeProtocol}.apps.${key}.subtitle`)}
                    </span>
                  </span>
                  <Download className="h-7 w-7 shrink-0 text-neutral-900 opacity-0 transition-opacity duration-450 ease-in-out group-hover:opacity-100" />
                </>
              );

              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-18.5 min-w-62.5 items-center gap-4 rounded-[13px] bg-neutral-20 px-4 py-3 text-neutral-900 transition duration-150 hover:-translate-y-0.5 hover:bg-neutral-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:scale-[0.98] active:bg-neutral-40 lg:min-h-25 lg:py-4 lg:pr-8"
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className="font-montserrat text-base text-neutral-600 lg:w-131.75">
            <p className="leading-[1.6] font-medium">{t('sources.title')}</p>
            <ul className="list-disc pl-6 leading-[1.6]">
              {t
                .raw(`protocols.${activeProtocol}.sources`)
                .map((source: string) => (
                  <li key={source}>{source}</li>
                ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[24px] font-medium text-neutral-800">
              {t('stepsTitle')}
            </h2>
            <ul className="list-disc pl-6 font-manrope text-base leading-[1.6] text-neutral-600">
              {t
                .raw(`protocols.${activeProtocol}.setupSteps`)
                .map((step: string) => (
                  <li key={step}>{step}</li>
                ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-125">
            <h2 className="text-[24px] font-medium text-neutral-800">
              {t('videoTitle')}
            </h2>
            <VideoCard
              src={videoSrc[activeProtocol]}
              title={t('videoAriaLabel')}
              autoPlay={false}
              poster={videoPoster}
              onPlayClick={() => setIsVideoModalOpen(true)}
              buttonClassName="top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 scale-100 group-hover:top-1/2 group-hover:right-1/2 group-hover:translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-100"
              className="relative w-full aspect-500/325 rounded-sm"
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={t('videoTitle')}
        ariaLabel={t('videoAriaLabel')}
        closeAriaLabel={tCommon('close')}
        showCloseButton
        className="max-w-250"
      >
        <video
          src={videoSrc[activeProtocol]}
          poster={videoPoster}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full rounded-sm bg-neutral-900 object-cover"
        />
      </Modal>
    </section>
  );
};
