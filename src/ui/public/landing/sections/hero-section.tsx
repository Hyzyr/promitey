import { useTranslations } from 'next-intl';
import { Button, GlassButton } from '@/components/ui/button';
import { FormatText } from '@/components/ui/format-text';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const t = useTranslations('landing.hero');

  const bgClass =
    'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[2000px] object-cover object-[center_78%] pointer-events-none';

  return (
    <section
      id="hero"
      className="relative isolate flex h-[calc(100vh-56px)] min-h-170 w-full items-center justify-center overflow-hidden bg-neutral-30 pb-[8vh] md:min-h-205 xl:h-screen"
    >
      <div className="bg">
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet="/images/main-bg-mobile.png"
          />
          <img
            src="/images/main-bg.png"
            alt=""
            className={bgClass}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div
        className={cn(
          'relative z-10 flex w-full max-w-full flex-col items-center',
          'gap-10 md:gap-9 lg:gap-9 xl:gap-10',
          'px-5 md:px-12 xl:px-24',
          'pt-6 md:pt-7 lg:pt-8 xl:pt-10',
          'pb-8 md:pb-12 xl:pb-16',
        )}
      >
        <div className="flex w-full max-w-full flex-col items-center gap-7.5 text-center md:gap-7 xl:gap-7.5">
          <div className="flex w-full flex-col items-center justify-center gap-4 md:gap-4">
            <p className="text-center font-manrope text-[20px] leading-[1.1] font-bold tracking-[0.2px] text-primary-500 md:hidden">
              {t('eyebrow')}
            </p>

            <h1
              className={cn(
                'text-center font-manrope font-bold text-neutral-900',
                'text-[36px] md:text-[48px] lg:text-[60px] xl:text-[72px]',
                'leading-[1.1] tracking-[0.36px] md:tracking-[0.48px] xl:tracking-[0.72px]',
              )}
            >
              <span className="hidden md:flex md:flex-col md:items-center">
                <span className="whitespace-nowrap">{t('title.line1')}</span>
                <span className="whitespace-nowrap">{t('title.line2')}</span>
              </span>
              <span className="mx-auto block max-w-76 md:hidden">
                {t('title.line2')}
              </span>
            </h1>
          </div>

          <p
            className={cn(
              'text-center font-roboto font-normal text-neutral-800',
              'text-[16px] md:text-[18px] lg:text-[21px] xl:text-[24px]',
              'leading-[1.4] tracking-[-0.32px] md:tracking-[-0.4px] xl:tracking-[-0.48px]',
              'max-w-full md:max-w-150 xl:max-w-198.5',
            )}
          >
            <FormatText text={t.raw('subtitle')} />
          </p>
        </div>

        <div className="flex w-[80%] flex-col items-center gap-4.5 md:max-w-150 md:gap-4.5">
          <Button variant="default" size="lg" href="/register">
            {t('ctaPrimary')}
          </Button>

          <GlassButton href="#guide">{t('ctaSecondary')}</GlassButton>
        </div>
      </div>
    </section>
  );
};
