import { getTranslations } from 'next-intl/server';
import { Settings2 } from 'lucide-react';
import { ConfigTile } from './config-tile';
import { Link } from '@/i18n/navigation';

export const ConfigDownloadCard = async () => {
  const t = await getTranslations('dashboard.configs');
  return (
    <section className="w-full max-w-212.5 rounded-md bg-neutral-40 px-5 py-3">
      <header className="flex items-center justify-between gap-2.5 py-2">
        <h2 className="text-lg font-bold text-neutral-800">{t('title')}</h2>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm text-neutral-800 hover:text-neutral-900">
          <span className="hidden sm:inline">{t('edit')}</span>
          <Settings2 className="h-6 w-6" />
        </button>
      </header>

      <div className="flex gap-4 py-3">
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

      <p className="pb-2 text-base text-neutral-800 font-roboto">
        {t('howToPrompt')}{' '}
        <Link
          href="/dashboard/instructions"
          className="font-bold text-orange-600 underline">
          {t('howToCta')}
        </Link>
      </p>
    </section>
  );
};
