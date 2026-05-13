import { getLocale, getTranslations } from 'next-intl/server';

import * as accountApi from '@/api/account';
import { redirect } from '@/i18n/navigation';
import { getAccessToken } from '@/lib/session';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { ChangePasswordForm } from '@/ui/dashboard/components/change-password-form';
import { TelegramLinkSection } from '@/ui/dashboard/components/telegram-link-section';
import { TotpSection } from '@/ui/dashboard/components/totp-section';

export const ProfilePage = async () => {
  const t = await getTranslations('dashboard');
  const token = await getAccessToken();

  if (!token) {
    const locale = await getLocale();
    return redirect({ href: '/login', locale });
  }

  const user = await accountApi.getMe(token);

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.profile')}</Breadcrumbs>
      <div className="w-full max-w-212.5 space-y-6">
        <section className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <h1 className="text-[28px] font-bold text-neutral-900">
            {t('profile.title')}
          </h1>
          <div className="mt-6 space-y-2">
            <p className="text-sm text-neutral-500">{t('profile.email')}</p>
            <p className="text-base font-medium text-neutral-900">
              {user.email}
            </p>
            <p className="pt-1 text-sm text-neutral-400">
              {t('profile.memberSince')}{' '}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </section>
        <section className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <TelegramLinkSection
            initialLinked={user.telegram_linked}
            linkedAt={user.linked_at}
          />
        </section>
        <section className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <TotpSection initialEnabled={user.totp_enabled} />
        </section>
        <section className="rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
          <ChangePasswordForm />
        </section>
      </div>
    </>
  );
};
