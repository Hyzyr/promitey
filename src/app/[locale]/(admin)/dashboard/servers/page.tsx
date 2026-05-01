import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';

export default async function ServersPage() {
  const t = await getTranslations('dashboard');

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.servers')}</Breadcrumbs>
      <div className="w-full max-w-212.5 rounded-2xl bg-white px-5 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
        <h1 className="text-[28px] font-bold text-neutral-900">
          {t('servers.title')}
        </h1>
        <p className="mt-4 text-base text-neutral-600">
          Server list implementation pending Figma design review.
        </p>
      </div>
    </>
  );
}
