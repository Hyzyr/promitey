import { getTranslations, getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import { getAccessToken } from '@/lib/session';

import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';

export default async function InstructionsPage() {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/login', locale });
  }

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.instructions')}</Breadcrumbs>
      <div className="w-full max-w-212.5 rounded-md bg-white px-5 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
        <h1 className="text-[28px] font-bold text-neutral-900">
          {t('instructions.title')}
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          {t('instructions.subtitle')}
        </p>
        <p className="mt-4 text-base text-neutral-600">
          Connection instructions implementation pending Figma design review.
        </p>
      </div>
    </>
  );
}
