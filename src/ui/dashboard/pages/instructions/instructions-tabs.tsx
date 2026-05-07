'use client';

import Image from 'next/image';
import {
  Apple,
  Bot,
  Download,
  MonitorDown,
  Play,
  Settings2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import type { LucideIcon } from 'lucide-react';

type Protocol = 'openvpn' | 'vless';
type PlatformTone = 'strong' | 'muted' | 'disabled';

interface AppOption {
  key: string;
  icon: LucideIcon;
  href?: string;
  tone: PlatformTone;
  downloadable?: boolean;
}

const protocols: Protocol[] = ['openvpn', 'vless'];

const protocolLogos: Record<Protocol, string> = {
  openvpn: '/images/open-vpn-logo.svg',
  vless: '/images/vless-logo.svg',
};

const appOptions: Record<Protocol, AppOption[]> = {
  openvpn: [
    {
      key: 'windows',
      icon: MonitorDown,
      href: 'https://openvpn.net/client/',
      tone: 'strong',
      downloadable: true,
    },
    {
      key: 'android',
      icon: Bot,
      href: 'https://openvpn.net/client/',
      tone: 'muted',
    },
    { key: 'ios', icon: Apple, tone: 'disabled' },
    {
      key: 'macos',
      icon: Apple,
      href: 'https://openvpn.net/client/',
      tone: 'disabled',
    },
  ],
  vless: [
    {
      key: 'windows',
      icon: MonitorDown,
      href: 'https://github.com/2dust/v2rayN',
      tone: 'strong',
      downloadable: true,
    },
    {
      key: 'android',
      icon: Bot,
      href: 'https://github.com/2dust/v2rayNG',
      tone: 'muted',
    },
    { key: 'ios', icon: Apple, tone: 'disabled' },
    {
      key: 'macos',
      icon: Apple,
      href: 'https://github.com/yanue/V2rayU',
      tone: 'disabled',
    },
  ],
};

const cardBackground =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

const toneClasses: Record<PlatformTone, string> = {
  strong: 'bg-neutral-30 text-neutral-900',
  muted: 'bg-neutral-20 text-neutral-900',
  disabled: 'bg-neutral-20 text-neutral-900',
};

export const InstructionsTabs = () => {
  const t = useTranslations('dashboard.instructions');
  const [activeProtocol, setActiveProtocol] = useState<Protocol>('openvpn');
  const activeApps = appOptions[activeProtocol];

  return (
    <section
      className="flex w-full flex-col gap-8 rounded-md px-5 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)] max-lg:rounded-none max-lg:bg-transparent max-lg:px-0 max-lg:py-0 max-lg:shadow-none lg:min-h-215"
      style={{ background: cardBackground }}
    >
      <h1 className="font-manrope text-[24px] font-bold leading-[1.2] text-neutral-800 max-lg:max-w-82 max-lg:leading-normal">
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
                    'flex min-w-0 items-center gap-4 rounded-[13px] border py-2 pr-4 pl-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:w-52.5',
                    'max-lg:flex-1 max-lg:gap-3 max-lg:pr-3',
                    selected
                      ? 'border-neutral-600 bg-neutral-300 text-neutral-10'
                      : 'border-neutral-30 bg-neutral-10 text-neutral-900 hover:border-neutral-40',
                  )}
                >
                  <Image
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
            {activeApps.map(({ key, icon: Icon, href, tone, downloadable }) => {
              const content = (
                <>
                  <Icon
                    className="h-10 w-10 shrink-0 lg:h-16.25 lg:w-16.25"
                    strokeWidth={1.5}
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5 font-manrope">
                    <strong className="text-[18px] leading-normal text-neutral-900">
                      {t(`protocols.${activeProtocol}.apps.${key}.title`)}
                    </strong>
                    <span
                      className={cn(
                        'text-base font-medium leading-[1.1]',
                        tone === 'strong'
                          ? 'text-neutral-600'
                          : 'text-neutral-300',
                      )}
                    >
                      {t(`protocols.${activeProtocol}.apps.${key}.subtitle`)}
                    </span>
                  </span>
                  {downloadable && (
                    <Download className="h-8 w-8 shrink-0 text-neutral-600" />
                  )}
                  {!downloadable && (
                    <Settings2 className="hidden h-6 w-6 shrink-0 text-neutral-600 lg:block" />
                  )}
                </>
              );

              return href ? (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex min-h-18.5 min-w-62.5 items-center gap-4 rounded-[13px] px-4 py-3 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:min-h-25 lg:py-4 lg:pr-8',
                    toneClasses[tone],
                  )}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={key}
                  className={cn(
                    'flex min-h-18.5 min-w-62.5 items-center gap-4 rounded-[13px] px-4 py-3 lg:min-h-25 lg:py-4 lg:pr-8',
                    toneClasses[tone],
                  )}
                >
                  {content}
                </div>
              );
            })}
          </div>

          <div className="font-montserrat text-base text-neutral-600 lg:w-131.75">
            <p className="font-medium leading-[1.6]">{t('sources.title')}</p>
            <ul className="list-disc pl-6 leading-[1.6]">
              {t
                .raw(`protocols.${activeProtocol}.sources`)
                .map((source: string) => (
                  <li key={source}>{source}</li>
                ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-manrope text-[20px] font-bold text-neutral-800 lg:text-[24px]">
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
            <h2 className="font-manrope text-[20px] font-bold text-neutral-800 lg:text-[24px]">
              {t('videoTitle')}
            </h2>
            <div
              aria-label={t('videoAriaLabel')}
              className="flex aspect-500/325 w-full items-center justify-center rounded-sm bg-neutral-40"
            >
              <Play
                className="h-16 w-16 fill-neutral-600 text-neutral-600"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
