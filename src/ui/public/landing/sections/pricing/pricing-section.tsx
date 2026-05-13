'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { PricingCard } from './pricing-card';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PricingBg } from './pricing-bg';

const MATCH_ONE_MONTH_CARD_SIZE = true;
const STANDARD_CARD_HEIGHT = 'md:min-h-80 lgx:min-h-110 lgx:min-h-125';
const COMPACT_ONE_MONTH_CARD_HEIGHT = 'md:min-h-65 lgx:min-h-90 lgx:min-h-105';

export const PricingSection = () => {
  const t = useTranslations('landing.pricing');
  const oneMonthCardHeight = MATCH_ONE_MONTH_CARD_SIZE
    ? STANDARD_CARD_HEIGHT
    : COMPACT_ONE_MONTH_CARD_HEIGHT;

  return (
    <section
      id="pricing"
      className={cn(
        'relative w-full overflow-hidden',
        'py-15 md:py-25 xl:pt-22.5 xl:pb-30',
      )}
    >
      <PricingBg />
      <Container
        className={cn(
          'relative flex flex-col items-center',
          'gap-20 xl:gap-20',
          'xl:min-h-[min(100vh,900px)] xl:justify-center',
        )}
      >
        <div
          className={cn(
            'flex flex-col items-center text-center',
            'gap-4 xl:gap-4',
            'w-[320px] md:w-auto md:max-w-170 xl:max-w-none',
          )}
        >
          <h2
            className={cn(
              'font-manrope font-normal text-yellow-50',
              'text-[32px] md:text-[44px] xl:text-[56px]',
              'leading-[1.1]',
              'tracking-[-0.64px] xl:tracking-[-1.12px]',
            )}
          >
            {t('title')}
          </h2>
          <p
            className={cn(
              'font-manrope font-normal text-neutral-30',
              'text-[16px] md:text-[20px] xl:text-[24px]',
              'leading-[1.4]',
              'tracking-[-0.32px] xl:tracking-[-0.48px]',
              'w-full md:max-w-150 xl:max-w-180',
            )}
          >
            {t('subtitle')}
          </p>
        </div>

        <div
          className={cn(
            'grid grid-cols-2 lgx:flex lgx:flex-row',
            'items-stretch lgx:items-end',
            'gap-0 md:gap-2 lgx:gap-1 xlx:gap-2',
            'w-full max-w-120 md:max-w-175 lgx:max-w-none',
            'lgx:justify-center',
          )}
        >
          <CardWrapper>
            <PricingCard
              label={t('plans.oneMonth.label')}
              price="3 €"
              period={t('plans.oneMonth.period')}
              height={oneMonthCardHeight}
              reserveMissingMeta={MATCH_ONE_MONTH_CARD_SIZE}
              selectLabel={t('select')}
              planId="one-month"
              href={EXTERNAL_LINKS.telegramBilling}
            />
          </CardWrapper>

          <div
            className={cn(
              'relative isolate flex min-w-0 flex-1 flex-col items-center',
              'bg-primary-500 lgx:bg-transparent',
              'overflow-hidden rounded-[18px] lgx:rounded-xl',
              'px-1 pb-2 lgx:px-2 lgx:pb-2',
              'drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]',
            )}
          >
            <span className="absolute inset-0 -z-1 hidden rounded-[inherit] glass backdrop-blur-lg lgx:block" />

            <CardWrapper
              className={cn(
                'flex w-full items-center justify-center',
                'pt-1.5 pb-2.5 lgx:pb-3.5 xl:pt-3',
                'px-6 lgx:px-16.5',
              )}
            >
              <strong
                className={cn(
                  'pricing-offer-text bg-clip-text text-center font-manrope font-bold whitespace-nowrap text-transparent lgx:font-extrabold',
                  'text-[14px] md:text-[18px] lgx:text-[20px] xlx:text-[24px]',
                  'tracking-[0.36px] lgx:tracking-[0.56px]',
                )}
              >
                {t('bestOffer')}
              </strong>
            </CardWrapper>

            <PricingCard
              label={t('plans.year.label')}
              originalPrice="24 €"
              price="12 €"
              discount="-50%"
              perMonth={t('perMonth', { value: '1' })}
              period={t('plans.year.period')}
              featured
              height={STANDARD_CARD_HEIGHT}
              selectLabel={t('select')}
              planId="year"
              href={EXTERNAL_LINKS.telegramBilling}
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
              height={STANDARD_CARD_HEIGHT}
              selectLabel={t('select')}
              planId="quarter"
              href={EXTERNAL_LINKS.telegramBilling}
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
              height={STANDARD_CARD_HEIGHT}
              selectLabel={t('select')}
              planId="half-year"
              href={EXTERNAL_LINKS.telegramBilling}
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
        'flex min-w-0 flex-1 items-end lg:items-stretch',
        'px-1 py-2 lgx:p-2',
        'lgx:drop-shadow-[4px_11px_11px_rgba(0,0,0,0.12)]',
        className,
      )}
    >
      {children}
    </div>
  );
};
