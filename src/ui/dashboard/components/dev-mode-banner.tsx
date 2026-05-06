import { getTranslations } from 'next-intl/server';
import { devLogoutAction } from '@/ui/auth/server/dev-auth-actions';

export interface DevModeBannerProps {
  className?: string;
}

export const DevModeBanner = async ({ className }: DevModeBannerProps) => {
  const t = await getTranslations('dev');
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-sm border-2 border-dashed border-yellow-400 bg-yellow-50 px-4 py-2.5 ${className ?? ''}`}
      role="status"
      aria-label={t('bannerLabel')}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 shrink-0 animate-pulse rounded-full bg-yellow-500" aria-hidden="true" />
        <p className="font-manrope text-sm font-semibold text-yellow-800">
          {t('bannerTitle')}
        </p>
        <p className="hidden font-manrope text-sm text-yellow-700 sm:block">
          — {t('bannerDescription')}
        </p>
      </div>
      <form action={devLogoutAction}>
        <button
          type="submit"
          className="shrink-0 rounded-sm px-3 py-1 font-manrope text-xs font-semibold text-yellow-800 transition-colors hover:bg-yellow-200 active:bg-yellow-300"
        >
          {t('exitButton')}
        </button>
      </form>
    </div>
  );
};
