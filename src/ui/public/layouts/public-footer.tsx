'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { LogoWithText } from '@/components/ui/logo';
import { FormatText } from '@/components/ui/format-text';
import {
  instaSVG,
  youtubeSVG,
  twitterSVG,
  telegramSVG,
} from '@/components/assets/social-media-svgs';
import { cn } from '@/lib/utils';

const SOCIAL = [
  { label: 'Instagram', icon: instaSVG },
  { label: 'YouTube', icon: youtubeSVG },
  { label: 'TikTok', icon: twitterSVG },
  { label: 'Telegram', icon: telegramSVG },
];

export const LandingFooter = () => {
  const t = useTranslations('landing.footer');

  const PLATFORM_LINKS = [
    { label: t('platform.links.dashboard'), href: '/dashboard' },
    { label: t('platform.links.benefits'), href: '#benefits' },
    { label: t('platform.links.pricing'), href: '#pricing' },
    { label: t('platform.links.connection'), href: '#guide' },
    { label: t('platform.links.faq'), href: '#faq' },
  ];

  const SUPPORT_LINKS = [
    { label: t('support.links.privacy'), href: '/privacy' },
    { label: t('support.links.terms'), href: '/terms' },
    { label: t('support.links.refund'), href: '/refund' },
    { label: t('support.links.aup'), href: '/aup' },
    { label: t('support.links.report'), href: '/report' },
  ];
  return (
    <footer className="relative w-full bg-neutral-900 pb-7.5 pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      <Container className="flex flex-col gap-8 md:gap-10 lg:gap-12 xl:gap-15">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-10 md:gap-12 lg:gap-14 xl:gap-8 items-start w-full">
          <div className="flex flex-col -order-1 lg:order-0 gap-6 w-full xl:w-[37%] xl:max-w-96 xl:pr-6">
            <div className="flex items-center gap-3">
              <LogoWithText size={25} />
            </div>

            <p className="font-montserrat font-light text-[15px] md:text-[16px] xl:text-[18px] leading-[1.55] tracking-[-0.24px] text-neutral-50 max-w-full xl:max-w-none">
              <FormatText text={t.raw('tagline')} />
            </p>

            <div className="flex flex-col gap-3 pt-4 xl:pt-6">
              <strong className="font-manrope font-normal text-[14px] md:text-[15px] xl:text-[16px] leading-[1.4] tracking-[-0.32px] text-[#bab9b9]">
                {t('follow')}
              </strong>
              <div className="flex gap-2 md:gap-3">
                {SOCIAL.map(({ label, icon }) => (
                  <Button
                    key={label}
                    aria-label={label}
                    size="sm"
                    className="p-2 md:p-2.5 bg-neutral-600 h-11 w-11">
                    {icon}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 xl:gap-6 w-full xl:grow xl:max-w-59.5 xl:shrink-0">
            <p className="font-manrope font-normal text-[18px] md:text-[19px] xl:text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              {t('platform.title')}
            </p>
            <nav className="flex flex-col gap-2 md:gap-2.5 xl:gap-3">
              {PLATFORM_LINKS.map(({ label, href }) => (
                <FooterLink key={label} href={href} label={label} />
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 xl:gap-6 w-full xl:w-60 xl:shrink-0">
            <strong className="font-manrope font-normal text-[18px] md:text-[19px] xl:text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              {t('support.title')}
            </strong>
            <nav className="flex flex-col gap-2 md:gap-2.5 xl:gap-3">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <FooterLink key={label} href={href} label={label} />
              ))}
            </nav>
          </div>

          <div className="flex flex-col -order-1 lg:order-0  gap-6 md:gap-7 xl:gap-8 w-full xl:grow xl:max-w-92 xl:pl-2">
            <strong className="font-manrope font-normal text-[18px] md:text-[19px] xl:text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              {t('contact.title')}
            </strong>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={(e) => e.preventDefault()}>
              <Input
                variant="dark"
                type="email"
                placeholder={t('contact.email')}
              />
              <Textarea
                variant="dark"
                placeholder={t('contact.message')}
                rows={4}
                className="h-32.75"
              />
              <Button
                type="submit"
                variant="orange"
                size="md"
                className="w-full md:w-40.5 xl:w-34.5">
                {t('contact.send')}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 pt-8 md:pt-9 xl:pt-10 w-full border-t border-neutral-600">
          <strong className="font-manrope font-normal text-[14px] md:text-[15px] xl:text-[16px] text-[#bab9b9] text-center md:text-left">
            {t('rights')}
          </strong>
          <span className="flex items-center font-manrope font-normal text-[14px] md:text-[15px] xl:text-[16px] text-[#bab9b9]">
            {t('credit')} <HyzyrLink />
          </span>
        </div>
      </Container>
    </footer>
  );
};

type FooterLinkProps = {
  href: string;
  label: string;
  className?: string;
};
const FooterLink = ({ href, label, className }: FooterLinkProps) => {
  return (
    <a
      key={href}
      href={href}
      className={cn(
        'font-manrope font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-neutral-20',
        'transition-colors ease-in duration-200 hover:text-neutral-50 active:text-neutral-100',
        className,
      )}>
      {label}
    </a>
  );
};

const HyzyrLink = () => {
  return (
    <a
      href="https://hyzyr.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex px-2 text-neutral-20 hover:text-neutral-50 active:text-neutral-100 transition-colors duration-200 ">
      <svg
        width="72"
        height="16"
        viewBox="0 0 72 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-[1em] font-[inherit]">
        <g>
          <rect width="17.6147" height="16" fill="#2B2929" />
          <path
            d="M11.3028 2.05469V3.49447H15.0811L14.2234 2.90419V13.0951L15.0811 12.5048H11.3028V13.9446H16V2.05469H11.3028Z"
            fill="currentColor"
          />
          <path
            d="M6.31053 13.9448V12.505H2.53222L3.38991 13.0953V2.90442L2.53222 3.4947H6.31053V2.05492H1.61328V13.9448H6.31053Z"
            fill="currentColor"
          />
          <rect
            x="9.91016"
            y="9.98193"
            width="6.01835"
            height="2.20183"
            transform="rotate(90 9.91016 9.98193)"
            fill="currentColor"
          />
          <rect
            x="9.91016"
            width="6.01835"
            height="2.20183"
            transform="rotate(90 9.91016 0)"
            fill="currentColor"
          />
        </g>
        <path
          d="M55.3392 3.74316H52.8438V7.07914L53.5894 7.96783L54.5969 9.16848H55.3392H56.2199V11.1027V11.331V12.4037H57.12H57.3116H57.7146H57.9062H58.7153V11.4395V11.2112V9.16848H59.596H60.4293L61.2107 8.23725L62.0915 7.18762V3.74316H59.596V6.97252H55.3392V3.74316Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.3093 9.90812L51.5117 6.0916L51.5234 6.07761V6.00543V4.1139L44.5676 12.4035H44.6597H46.2154H51.5234V9.90812H48.3093ZM50.4249 3.59619L43.45 11.9085V10.0031V9.99654L43.5242 9.90812L46.7267 6.0916L43.45 6.0916V3.59619H48.8206H50.3111H50.4249Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <path
          d="M35.3743 3.59619H32.8789V6.93216L33.6246 7.82085L34.6321 9.02151H35.3743H36.2551V10.9557V11.1841V12.2567H37.1551H37.3468H37.7498H37.9414H38.7505V11.2925V11.0642V9.02151H39.6312H40.4645L41.2459 8.09028L42.1266 7.04064V3.59619H39.6312V6.82555H35.3743V3.59619Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.8984 3.74316H25.3939V6.97252H29.0636V9.16849H25.3939V12.4037H22.8984V3.74316ZM29.6874 3.74316V12.4037H32.1461V3.74316H29.6874Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.9727 3.74316L71.3396 3.74316L71.3396 9.32115H69.2155L71.7405 12.3303H68.8739L66.3439 9.31527H65.4681V12.3303H62.9727L62.9727 3.74316ZM65.4681 7.11931V5.93912L69.1378 5.93912V7.11931H65.4681Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
      </svg>
    </a>
  );
};
