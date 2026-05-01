import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/ui/dashboard/components/breadcrumbs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default async function ProfilePage() {
  const t = await getTranslations('dashboard');

  // TODO: replace with real user data
  const user = {
    email: 'octava@six.music',
    name: 'Octava Six',
  };

  return (
    <>
      <Breadcrumbs>{t('breadcrumb.profile')}</Breadcrumbs>
      <div className="w-full max-w-212.5 rounded-2xl bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
        <h1 className="text-[28px] font-bold text-neutral-900">
          {t('profile.title')}
        </h1>

        <div className="mt-6 space-y-6">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-neutral-800">
              {t('profile.personalInfo')}
            </h2>
            <div className="space-y-4">
              <Input
                label={t('profile.email')}
                type="email"
                defaultValue={user.email}
                variant="light"
              />
              <Input
                label={t('profile.name')}
                type="text"
                defaultValue={user.name}
                variant="light"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-neutral-800">
              {t('profile.changePassword')}
            </h2>
            <div className="space-y-4">
              <Input
                label={t('profile.currentPassword')}
                type="password"
                variant="light"
              />
              <Input
                label={t('profile.newPassword')}
                type="password"
                variant="light"
              />
              <Input
                label={t('profile.confirmPassword')}
                type="password"
                variant="light"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="orange" size="md">
              {t('profile.save')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
