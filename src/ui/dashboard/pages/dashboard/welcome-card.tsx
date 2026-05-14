import { getTranslations } from 'next-intl/server';

const GRADIENT =
  'linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff';

interface WelcomeCardProps {
  email: string;
}

export const WelcomeCard = async ({ email }: WelcomeCardProps) => {
  const t = await getTranslations('dashboard.welcome');
  return (
    <section
      className="w-full max-w-212.5 overflow-hidden rounded-md px-5 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]"
      style={{ background: GRADIENT }}
    >
      <div className="flex flex-col gap-1 text-neutral-800">
        <h1
          className="text-[24px] leading-tight font-medium"
          dangerouslySetInnerHTML={{ __html: t.raw('title') }}
        />
        <p className="text-md">
          {t('signedInAs')}{' '}
          <span className="font-semibold text-orange-500 underline">
            {email}
          </span>
        </p>
      </div>
      <p className="mt-3 max-w-120 text-sm leading-[1.6] text-neutral-300">
        {t('body')}
      </p>
    </section>
  );
};
