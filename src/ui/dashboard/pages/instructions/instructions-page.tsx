import { getLocale, getTranslations } from 'next-intl/server';

import { getAccessToken } from '@/lib/session';
import { redirect } from '@/i18n/navigation';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';

import { InstructionsTabs } from './instructions-tabs';

export const InstructionsPage = async () => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    redirect({ href: '/login', locale });
  }

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.instructions')}</Breadcrumbs>
      <InstructionsTabs />
    </>
  );
};
