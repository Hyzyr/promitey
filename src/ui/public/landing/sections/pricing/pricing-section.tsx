'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { PricingCard } from './pricing-card';
import { cn } from '@/lib/utils';
import { PricingBg } from './pricing-bg';

export const PricingSection = () => {
  const t = useTranslations('landing.pricing');

  return (
    <section
      id="pricing"
      className={cn(
        'relative w-full overflow-hidden',
        'py-15 md:py-25 xl:pt-22.5 xl:pb-30',
      )}>
      <PricingBg />
      <Container
        className={cn(
          'relative flex flex-col items-center',
          'gap-20 xl:gap-20',
          'xl:min-h-screen xl:justify-center',
        )}>
        <div
          className={cn(
            'flex flex-col items-center text-center',
            'gap-4 xl:gap-4',
            'w-[320px] md:w-auto md:max-w-170 xl:max-w-none',
          )}>
          <h2
            className={cn(
              'font-manrope font-normal text-yellow-50',
              'text-[32px] md:text-[44px] xl:text-[56px]',
              'leading-[1.1]',
              'tracking-[-0.64px] xl:tracking-[-1.12px]',
            )}>
            {t('title')}
          </h2>
          <p
            className={cn(
              'font-manrope font-normal text-neutral-30',
              'text-[16px] md:text-[20px] xl:text-[24px]',
              'leading-[1.4]',
              'tracking-[-0.32px] xl:tracking-[-0.48px]',
              'w-full md:max-w-150 xl:max-w-180',
            )}>
            {t('subtitle')}
          </p>
        </div>

        <div
          className={cn(
            'grid grid-cols-2 xl:flex xl:flex-row',
            'items-stretch xl:items-end',
            'gap-0 xl:gap-2',
            'w-full max-w-93.5 md:max-w-175 xl:max-w-none',
            'xl:justify-center',
          )}>
          <CardWrapper>
            <PricingCard
              label={t('plans.oneMonth.label')}
              price="3 €"
              period={t('plans.oneMonth.period')}
              height="md:h-107.75"
              selectLabel={t('select')}
              href="/register"
            />
          </CardWrapper>

          <div
            className={cn(
              'relative isolate flex flex-1 flex-col items-center min-w-0',
              'bg-primary-500 xl:bg-transparent',
              'rounded-[18px] xl:rounded-xl overflow-hidden',
              'px-1 pb-2 xl:px-2 xl:pb-2',
              'xl:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]',
            )}>
            <span className="hidden xl:block glass absolute inset-0 rounded-[inherit] backdrop-blur-lg -z-1" />

            <CardWrapper
              className={cn(
                'flex w-full items-center justify-center',
                'pt-1.5 pb-2.5 xl:pt-3 xl:pb-3.5',
                'px-6 xl:px-16.5',
              )}>
              <strong
                className={cn(
                  'font-manrope font-bold xl:font-extrabold whitespace-nowrap text-center bg-clip-text text-transparent',
                  'text-[14px] md:text-[18px] xl:text-[24px]',
                  'tracking-[0.36px] xl:tracking-[0.56px]',
                )}
                style={{
                  backgroundImage:
                    'linear-gradient(182.28deg, rgb(251,251,251) 41.4%, rgb(254,247,177) 97.7%)',
                }}>
                {t('bestOffer')}
              </strong>
            </CardWrapper>

            <PricingCard
              label={t('plans.year.label')}
              originalPrice="24 €"
              price="12 €"
              priceColor="#e8633b"
              discount="-50%"
              perMonth={t('perMonth', { value: '1' })}
              period={t('plans.year.period')}
              featured
              height="md:h-125"
              selectLabel={t('select')}
              href="/register"
            />
          </div>
          <CardWrapper>
            <PricingCard
              label={t('plans.quarter.label')}
              originalPrice="6 €"
              price="5 €"
              discount="-16.6%"
              perMonth={t('perMonth', { value: '1.66' })}
              period={t('plans.quarter.period')}
              height="md:h-125"
              selectLabel={t('select')}
              href="/register"
            />
          </CardWrapper>
          <CardWrapper>
            <PricingCard
              label={t('plans.halfYear.label')}
              originalPrice="12 €"
              price="8 €"
              discount="-33.3%"
              perMonth={t('perMonth', { value: '1.33' })}
              period={t('plans.halfYear.period')}
              height="md:h-125"
              selectLabel={t('select')}
              href="/register"
            />
          </CardWrapper>
        </div>
      </Container>
    </section>
  );
};

const CardWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-1 items-end lg:items-stretch min-w-0',
        'px-1 py-2 xl:p-2',
        'xl:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]',
        className,
      )}>
      {children}
    </div>
  );
};
