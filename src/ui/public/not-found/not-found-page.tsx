import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export const NotFoundPage = () => {
  const t = useTranslations('common.notFound');

  return (
    <section className="relative isolate flex min-h-[calc(100svh-56px)] items-center overflow-hidden bg-neutral-20 py-10 md:min-h-[calc(100svh-80px)] md:py-14 xl:py-18">
      <Container className="flex items-center justify-center">
        <div className="relative flex h-130 w-full max-w-330 items-center justify-center md:h-155 lg:h-175 xl:h-190">
          <img
            src="/images/404-bg.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-1 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain md:h-auto md:w-full"
          />

          <div
            className={cn(
              'flex w-full max-w-72 flex-col items-center text-center md:max-w-128 lg:max-w-150',
              'gap-5 md:gap-6 xl:gap-7',
              'px-4 md:px-8',
            )}
          >
            <p className="font-manrope text-[18px] font-bold leading-[1.1] text-primary-500 md:text-[22px] xl:text-[24px]">
              {t('eyebrow')}
            </p>

            <div className="flex flex-col items-center gap-4 md:gap-5">
              <h1
                className={cn(
                  'font-manrope font-bold text-neutral-900',
                  'text-[38px] leading-[1.08] md:text-[56px] xl:text-[72px]',
                )}
              >
                {t('title')}
              </h1>

              <p
                className={cn(
                  'font-manrope font-normal text-neutral-800',
                  'text-[16px] leading-[1.45] md:text-[20px] xl:text-[24px]',
                )}
              >
                {t('body')}
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-3 pt-2 md:w-auto md:flex-row md:gap-4">
              <Button href="/" size="lg" className="w-full md:w-auto">
                {t('home')}
              </Button>
              <Button
                href="/#pricing"
                variant="secondary"
                size="lg"
                className="w-full md:w-auto"
              >
                {t('pricing')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};