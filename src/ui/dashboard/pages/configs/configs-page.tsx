import { getLocale, getTranslations } from 'next-intl/server';

import { getAccessToken } from '@/lib/session';
import { redirect } from '@/i18n/navigation';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';

import { ConfigDownloadCard } from './config-download-card';
import { RecreateVpnButton } from './recreate-vpn-button';

const cardBackground =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

export const ConfigsPage = async () => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/login', locale });
  }

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.configs')}</Breadcrumbs>
      <ConfigDownloadCard />
      <section
        className="flex w-full max-w-212.5 flex-col gap-3 rounded-md px-5 py-3 shadow-[0_13px_25.6px_rgba(0,0,0,.04)]"
        style={{ background: cardBackground }}
      >
        <p className="font-montserrat text-base leading-[1.6] text-neutral-800">
          {t('configs.regenerateDescription')}
          <br />
          <strong className="font-semibold text-red-500">
            {t('configs.regenerateWarning')}
          </strong>
        </p>
        <RecreateVpnButton className="flex flex-col items-end" />
      </section>
    </>
  );
};
