import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

interface SubscriptionCardProps {
  plan?: string;
  expiresAt?: string;
}

export const SubscriptionCard = async ({
  plan,
  expiresAt,
}: SubscriptionCardProps) => {
  const t = await getTranslations('dashboard.subscription');
  return (
    <section className="flex w-full max-w-212.5 flex-col gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_13px_61.2px_rgba(0,0,0,.07)]">
      <p className="text-lg leading-[1.6] text-neutral-800 font-roboto">
        {plan ? (
          <>
            {t('currentPlan')}{' '}
            <span className="font-semibold">&quot;{plan}&quot;</span>
            <br />
            {t('expiresAt')} <span className="font-semibold">{expiresAt}</span>
          </>
        ) : (
          <span className="text-neutral-400">{t('noSubscription')}</span>
        )}
      </p>
      <div className="hidden justify-end lg:flex">
        <Button
          variant="secondary"
          size="md"
          className="rounded-xl bg-[rgba(43,41,41,0.12)] text-neutral-800">
          {t('renew')}
        </Button>
      </div>
    </section>
  );
};
