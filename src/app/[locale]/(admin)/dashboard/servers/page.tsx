import { getTranslations, getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { getAccessToken } from '@/lib/session';
import * as vpnApi from '@/api/vpn';
import { isApiError } from '@/api/client/api-error';

import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { RegionSelector } from '@/ui/dashboard/components/region-selector';
import { RecreateVpnButton } from '@/ui/dashboard/components/recreate-vpn-button';

export default async function ServersPage() {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/login', locale });
  }

  let region = 'auto';
  try {
    const data = await vpnApi.getRegion(token!);
    region = data.region;
  } catch (e) {
    if (isApiError(e) && (e.status === 401 || e.status === 403)) {
      const locale = await getLocale();
      redirect({ href: '/login', locale });
    }
    // non-fatal — keep default 'auto' and let the user change it
  }

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.servers')}</Breadcrumbs>
      <div className="w-full max-w-212.5 space-y-6">
        <section className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <h1 className="mb-6 text-[28px] font-bold text-neutral-900">
            {t('servers.title')}
          </h1>
          <RegionSelector initialRegion={region} />
        </section>

        <section className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <h2 className="mb-1 text-lg font-semibold text-neutral-800">
            {t('vpn.recreateTitle')}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            {t('vpn.recreateDescription')}
          </p>
          <RecreateVpnButton />
        </section>
      </div>
    </>
  );
}

