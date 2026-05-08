'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  CloackBlurred,
  DollarSVG,
  InfiniteBlurred,
  LaptopSVG,
  PhoneBlurred,
  RocketSVG,
  ThunderSVG,
  TvSVG,
  ZeroBlurred,
} from './benefits-shapes';
import { facebookSVG, telegramSVG, whatsappSVG } from '@/components/assets';
import { BenefitCard, ParallaxItem } from './components';
import { VideoCard } from '@/components/ui/video-card';
import { cn } from '@/lib/utils';

const imgTryItFree = '/images/benefits/arc-blured.png';
const imgHighSpeed = '/images/benefits/ellipse-blurred.png';
const imgCustomerSupport = '/images/benefits/o-shape-blurred.png';
const imgForYourFamily = '/images/benefits/square-blurred.png';
const imgYourInternet = '/images/benefits/circle-blurred.png';

type CardProps = {
  isActive?: boolean;
};

export const CustomerSupportCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.support');
  return (
    <BenefitCard
      isActive={isActive}
      className={cn(
        'md:col-start-1 md:row-start-2',
        'lgx:col-start-1 lgx:row-start-1',
      )}
      title={t('title')}
      description={t('body')}
    >
      <ParallaxItem depth={0.22} reverse>
        <Image
          src={imgCustomerSupport}
          alt="blurred-o-shape"
          width={520}
          height={520}
          loading="lazy"
          className="bgitem right-[2%] bottom-[-4%] h-[105%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25}>
        <ThunderSVG className="bgitem right-[2.5%] bottom-[26%] h-[40%]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45}>
        <CloackBlurred className="bgitem right-[10%] bottom-[9%] z-1 h-[70%]" />
      </ParallaxItem>
    </BenefitCard>
  );
};

export const TryItFreeCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.free');
  return (
    <BenefitCard
      isActive={isActive}
      className={cn(
        'md:col-start-2 md:row-start-2',
        'lgx:col-start-2 lgx:row-start-1',
      )}
      title={t('title')}
      description={t('body')}
    >
      <ParallaxItem depth={0.22} reverse>
        <Image
          src={imgTryItFree}
          alt="blurred-arc-shape"
          width={520}
          height={520}
          loading="lazy"
          className="bgitem right-[-1%] bottom-[-3%] h-[90%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25}>
        <DollarSVG className="bgitem right-[5.7%] bottom-[24.6%] h-[32%] rotate-[17.5deg]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45}>
        <ZeroBlurred className="bgitem right-[13%] bottom-[15%] h-[62%]" />
      </ParallaxItem>
    </BenefitCard>
  );
};

export const YourInternetCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.rules');
  return (
    <BenefitCard
      isActive={isActive}
      className="bigcard"
      mediaClassName="bigcard-media"
      title={t('title')}
      description={t('body')}
      footer={
        <div className="relative z-10 flex lgx:items-center mt-auto lgx:justify-end">
          <Button
            variant="default"
            size="md"
            className="rounded-md! px-8! py-4! text-[18px]! lgx:py-3.5!"
          >
            {t('cta')}
          </Button>
        </div>
      }
    >
      <ParallaxItem depth={0.22} reverse>
        <Image
          src={imgYourInternet}
          alt="blurred-circle-shape"
          width={640}
          height={640}
          loading="lazy"
          className="bgitem bottom-[-8%] left-[-4%] h-[78%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.15}>
        <span className="bgitem bottom-[63%] left-[35%] icon rotate-[-3.5deg] text-[5vh] tablet:bottom-[58%] tablet:left-[unset] tablet:right-50">
          {telegramSVG}
        </span>
      </ParallaxItem>
      <ParallaxItem depth={0.3}>
        <span className="bgitem bottom-[72%] left-[16%] icon -rotate-3 text-[5vh] tablet:bottom-[80%] tablet:left-[unset] tablet:right-60">
          {whatsappSVG}
        </span>
      </ParallaxItem>
      <ParallaxItem depth={0.45}>
        <span className="bgitem bottom-[52%] left-[22%] icon rotate-[-2.5deg] text-[5vh] tablet:bottom-[37%] tablet:left-[unset] tablet:right-65">
          {facebookSVG}
        </span>
      </ParallaxItem>
      <VideoCard
        src="/videos/woman-feedback-promitey.webm"
        title="#feedback"
        className="right-[2.5%] bottom-[12%] h-auto w-[40%] rotate-[6.18deg] transition-all will-change-auto hover:w-[45%] hover:rotate-0"
      />
    </BenefitCard>
  );
};

export const ForYourFamilyCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.family');
  return (
    <BenefitCard
      isActive={isActive}
      className={cn(
        'md:col-start-2 md:row-start-3',
        'lgx:col-start-1 lgx:row-start-2',
      )}
      title={t('title')}
      description={t('body')}
    >
      <ParallaxItem depth={0.22} reverse>
        <Image
          src={imgForYourFamily}
          alt="blurred-square-shape"
          width={520}
          height={520}
          loading="lazy"
          className="bgitem right-[7.5%] bottom-[-12%] h-[95%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25}>
        <LaptopSVG className="bgitem right-[11.5%] bottom-[1.5%] h-[58%] rotate-[4.8deg]" />
      </ParallaxItem>
      <ParallaxItem depth={0.15}>
        <TvSVG className="bgitem right-[50%] bottom-[19.5%] h-[43%] rotate-[-17.5deg]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45}>
        <PhoneBlurred className="bgitem right-[32%] bottom-[-1%] h-[80%] rotate-[15.5deg]" />
      </ParallaxItem>
    </BenefitCard>
  );
};

export const HighSpeedCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.speed');
  return (
    <BenefitCard
      isActive={isActive}
      className={cn(
        'md:col-start-1 md:row-start-3',
        'lgx:col-start-2 lgx:row-start-2',
      )}
      title={t('title')}
      description={t('body')}
    >
      <ParallaxItem depth={0.22} reverse>
        <Image
          src={imgHighSpeed}
          alt="blurred-ellipse-shape"
          width={520}
          height={520}
          loading="lazy"
          className="bgitem right-[2%] bottom-[4%] h-[98%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25}>
        <RocketSVG className="bgitem right-[16.5%] bottom-[60%] h-[28%]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45}>
        <InfiniteBlurred className="bgitem right-[3%] bottom-[4%] h-[75%] rotate-[8.5deg]" />
      </ParallaxItem>
    </BenefitCard>
  );
};
