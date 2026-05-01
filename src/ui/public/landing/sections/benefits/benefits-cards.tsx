'use client';

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
import {
  BenefitCard,
  ParallaxItem,
  useCardParallax,
} from './components';
import { VideoCard } from '@/components/ui/video-card';


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
  const { ref, rawX, rawY, onMouseMove, onMouseLeave } = useCardParallax();
  return (
    <BenefitCard
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      isActive={isActive}
      className="md:col-start-1 md:row-start-2 xl:col-start-1 xl:row-start-1"
      title={t('title')}
      description={t('body')}>
      <ParallaxItem depth={0.22} rawX={rawX} rawY={rawY} reverse>
        <img
          src={imgCustomerSupport}
          alt="blurred-o-shape"
          className="bg-item right-[2%] bottom-[-4%] h-[105%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25} rawX={rawX} rawY={rawY}>
        <ThunderSVG className="bg-item bottom-[26%] right-[2.5%] h-[40%]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45} rawX={rawX} rawY={rawY}>
        <CloackBlurred className="bg-item z-1 right-[10%] bottom-[9%] h-[70%]" />
      </ParallaxItem>
    </BenefitCard>
  );
};

export const TryItFreeCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.free');
  const { ref, rawX, rawY, onMouseMove, onMouseLeave } = useCardParallax();
  return (
    <BenefitCard
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      isActive={isActive}
      className="md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-1"
      title={t('title')}
      description={t('body')}>
      <ParallaxItem depth={0.22} rawX={rawX} rawY={rawY} reverse>
        <img
          src={imgTryItFree}
          alt="blurred-arc-shape"
          className="bg-item right-[-1%] bottom-[-3%] h-[90%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25} rawX={rawX} rawY={rawY}>
        <DollarSVG className="bg-item right-[5.7%] bottom-[24.6%] h-[32%] rotate-[17.5deg]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45} rawX={rawX} rawY={rawY}>
        <ZeroBlurred className="bg-item right-[13%] bottom-[15%] h-[62%]" />
      </ParallaxItem>
    </BenefitCard>
  );
};

export const YourInternetCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.rules');
  const { ref, rawX, rawY, onMouseMove, onMouseLeave } = useCardParallax();
  return (
    <BenefitCard
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      isActive={isActive}
      className="h-169.75! md:h-auto! md:col-span-2 md:row-start-1 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:row-span-2 md:px-5 md:py-6.5 xl:px-6 xl:py-8"
      mediaClassName="min-h-0"
      title={t('title')}
      description={t('body')}
      footer={
        <div className="flex items-center justify-end relative z-10">
          <Button
            variant="default"
            size="md"
            className="px-8! py-4! text-[18px]! rounded-[16px]! xl:px-8! xl:py-3.5! xl:text-[18px]!">
            {t('cta')}
          </Button>
        </div>
      }>
      <ParallaxItem depth={0.22} rawX={rawX} rawY={rawY} reverse>
        <img
          src={imgYourInternet}
          alt="blurred-circle-shape"
          className="bg-item left-[-4%] bottom-[-8%] h-[78%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.15} rawX={rawX} rawY={rawY}>
        <span className="bg-item icon color-neutral-800 left-[35%] bottom-[63%] text-[5vh] rotate-[-3.5deg]">
          {telegramSVG}
        </span>
      </ParallaxItem>
      <ParallaxItem depth={0.3} rawX={rawX} rawY={rawY}>
        <span className="bg-item icon color-neutral-800 left-[16%] bottom-[72%] text-[5vh] -rotate-3">
          {whatsappSVG}
        </span>
      </ParallaxItem>
      <ParallaxItem depth={0.45} rawX={rawX} rawY={rawY}>
        <span className="bg-item icon color-neutral-800 left-[22%] bottom-[52%] text-[5vh] rotate-[-2.5deg]">
          {facebookSVG}
        </span>
      </ParallaxItem>
      <VideoCard
        src="/videos/woman-feedback-promitey.webm"
        title="#feedback"
        className="right-[2.5%] bottom-[12%] w-[40%] h-auto rotate-[6.18deg] hover:rotate-0 hover:w-[45%] will-change-auto transition-all"
      />
    </BenefitCard>
  );
};

export const ForYourFamilyCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.family');
  const { ref, rawX, rawY, onMouseMove, onMouseLeave } = useCardParallax();
  return (
    <BenefitCard
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      isActive={isActive}
      className="md:col-start-2 md:row-start-3 xl:col-start-1 xl:row-start-2"
      title={t('title')}
      description={t('body')}>
      <ParallaxItem depth={0.22} rawX={rawX} rawY={rawY} reverse>
        <img
          src={imgForYourFamily}
          alt="blurred-square-shape"
          className="bg-item right-[7.5%] bottom-[-12%] h-[95%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25} rawX={rawX} rawY={rawY}>
        <LaptopSVG className="bg-item right-[11.5%] bottom-[1.5%] h-[58%] rotate-[4.8deg]" />
      </ParallaxItem>
      <ParallaxItem depth={0.15} rawX={rawX} rawY={rawY}>
        <TvSVG className="bg-item right-[50%] bottom-[19.5%] h-[43%] rotate-[-17.5deg]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45} rawX={rawX} rawY={rawY}>
        <PhoneBlurred className="bg-item right-[32%] bottom-[-1%] h-[80%] rotate-[15.5deg]" />
      </ParallaxItem>
    </BenefitCard>
  );
};

export const HighSpeedCard = ({ isActive }: CardProps) => {
  const t = useTranslations('landing.benefits.items.speed');
  const { ref, rawX, rawY, onMouseMove, onMouseLeave } = useCardParallax();
  return (
    <BenefitCard
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      isActive={isActive}
      className="md:col-start-1 md:row-start-3 xl:col-start-2 xl:row-start-2"
      title={t('title')}
      description={t('body')}>
      <ParallaxItem depth={0.22} rawX={rawX} rawY={rawY} reverse>
        <img
          src={imgHighSpeed}
          alt="blurred-ellipse-shape"
          className="bg-item right-[2%] bottom-[4%] h-[98%]"
        />
      </ParallaxItem>
      <ParallaxItem depth={0.25} rawX={rawX} rawY={rawY}>
        <RocketSVG className="bg-item right-[16.5%] bottom-[60%] h-[28%]" />
      </ParallaxItem>
      <ParallaxItem depth={0.45} rawX={rawX} rawY={rawY}>
        <InfiniteBlurred className="bg-item right-[3%] bottom-[4%] h-[75%] rotate-[8.5deg]" />
      </ParallaxItem>
    </BenefitCard>
  );
};
