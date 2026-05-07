import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

import { ConfigTile } from './config-tile';

const cardBackground =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

export const ConfigDownloadCard = async () => {
  const t = await getTranslations('dashboard.configs');
  return (
    <section
      className="flex w-full max-w-212.5 flex-col gap-8 rounded-md px-5 py-4 shadow-[0_13px_25.6px_rgba(0,0,0,.04)]"
      style={{ background: cardBackground }}
    >
      <header className="flex flex-col gap-3">
        <h2 className="font-manrope text-[24px] font-bold leading-[1.2] text-neutral-800">
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
          href="/api/configs/vless"
          logo="/images/vless-logo.svg"
          label={
            <>
              <span>{t('configuration')} </span>
              <strong>VLESS</strong>
            </>
          }
        />
        <ConfigTile
          href="/api/configs/openvpn"
          logo="/images/open-vpn-logo.svg"
          label={
            <>
              <span>{t('configuration')} </span>
              <strong>OpenVPN</strong>
            </>
          }
        />
      </div>
    </section>
  );
};
