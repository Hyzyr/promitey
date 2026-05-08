import { getLocale, getTranslations } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { EmailChangeConfirmForm } from '@/ui/dashboard/components/email-change-confirm-form';

interface EmailChangeConfirmPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const EmailChangeConfirmPage = async ({
  searchParams,
}: EmailChangeConfirmPageProps) => {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : null;

  if (!email) {
    const locale = await getLocale();
    return redirect({ href: '/dashboard/profile', locale });
  }

  const t = await getTranslations('dashboard.profile.emailChange');

  return (
    <section className="flex flex-col gap-6 rounded-lg bg-neutral-0 p-6 shadow-[0px_20px_32px_0px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-neutral-800">
          {t('confirmTitle')}
        </h1>
        <p className="max-w-150 text-sm leading-[1.6] text-neutral-500">
          {t('confirmDescription')}
        </p>
      </div>
      <EmailChangeConfirmForm email={email} />
    </section>
  );
};