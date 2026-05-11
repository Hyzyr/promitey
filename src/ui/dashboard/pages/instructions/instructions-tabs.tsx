'use client';

import Image from 'next/image';
import { Download, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { androidSVG, appleSVG, windowsSVG } from '@/components/assets/os-svg';
import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type Protocol = 'openvpn' | 'vless';
type AppKey = 'windows' | 'android' | 'ios' | 'macos';

interface AppOption {
  key: AppKey;
  icon: ReactNode;
  href: string;
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
      href: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
    },
    {
      key: 'macos',
      icon: appleSVG,
      href: 'https://github.com/yanue/V2rayU',
    },
  ],
};

const cardBackground =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

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
                    'flex min-w-0 items-center gap-4 rounded-[13px] border py-2 pr-4 pl-2 text-left transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:scale-[0.98] lg:w-52.5',
                    'max-lg:flex-1 max-lg:gap-3 max-lg:pr-3',
                    selected
                      ? 'border-neutral-600 bg-neutral-300 text-neutral-10 shadow-[0_8px_18px_rgba(0,0,0,.08)]'
                      : 'border-neutral-30 bg-neutral-10 text-neutral-900 hover:-translate-y-0.5 hover:border-neutral-50 hover:bg-neutral-20',
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
            {activeApps.map(({ key, icon, href }) => {
              const content = (
                <>
                  <span className="icon h-10 w-10 shrink-0 text-neutral-600 transition-colors group-hover:text-neutral-900 lg:h-16.25 lg:w-16.25">
                    {icon}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5 font-manrope">
                    <strong className="text-[18px] leading-normal text-neutral-900">
                      {t(`protocols.${activeProtocol}.apps.${key}.title`)}
                    </strong>
                    <span
                      className={cn(
                        'text-base font-medium leading-[1.1]',
                        'text-neutral-300 group-hover:text-neutral-600',
                      )}
                    >
                      {t(`protocols.${activeProtocol}.apps.${key}.subtitle`)}
                    </span>
                  </span>
                  <Download className="h-8 w-8 shrink-0 text-neutral-600 transition-colors group-hover:text-neutral-900" />
                </>
              );

              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-18.5 min-w-62.5 items-center gap-4 rounded-[13px] bg-neutral-20 px-4 py-3 text-neutral-900 transition duration-150 hover:-translate-y-0.5 hover:bg-neutral-30 active:scale-[0.98] active:bg-neutral-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:min-h-25 lg:py-4 lg:pr-8"
                >
                  {content}
                </a>
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
