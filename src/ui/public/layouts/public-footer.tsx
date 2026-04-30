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
    <footer className="relative w-full bg-neutral-900 pb-7.5 pt-20">
      <Container className="flex flex-col gap-15">
        {/* Main columns */}
        <div className="flex gap-4 items-start w-full">
          {/* Col 1 — Brand */}
          <div className="flex w-124 shrink-0 flex-col gap-6 pr-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <LogoWithText size={25} />
            </div>

            {/* Tagline */}
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] tracking-[-0.36px] text-neutral-30">
              <FormatText text={t.raw('tagline')} />
            </p>

            {/* Social icons */}
            <div className="flex flex-col gap-3 pt-6">
              <p className="font-manrope font-normal text-[16px] leading-[1.4] tracking-[-0.32px] text-[#bab9b9]">
                {t('follow')}
              </p>
              <div className="flex gap-2">
                {SOCIAL.map(({ label, icon }) => (
                  <Button
                    key={label}
                    aria-label={label}
                    size="sm"
                    className="p-2.5 bg-neutral-600">
                    {icon}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Platform */}
          <div className="flex w-59.5 shrink-0 flex-col gap-6">
            <p className="font-manrope font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              {t('platform.title')}
            </p>
            <nav className="flex flex-col gap-3 w-42.75">
              {PLATFORM_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-manrope font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-neutral-20">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Support */}
          <div className="flex w-60 shrink-0 flex-col gap-6">
            <p className="font-manrope font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              {t('support.title')}
            </p>
            <nav className="flex flex-col gap-3">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-manrope font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-neutral-20">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-1 flex-col items-end">
            <div className="flex w-92.5 flex-col gap-8">
              <p className="font-manrope font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
                {t('contact.title')}
              </p>
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={(e) => e.preventDefault()}>
                {/* Email input */}
                <Input
                  variant="dark"
                  type="email"
                  placeholder={t('contact.email')}
                />
                {/* Message textarea */}
                <Textarea
                  variant="dark"
                  placeholder={t('contact.message')}
                  rows={4}
                  className="h-32.75"
                />
                {/* Send button */}
                <Button
                  type="submit"
                  variant="orange"
                  size="md"
                  className="w-34.5">
                  {t('contact.send')}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="flex items-center justify-between pt-10 w-full border-t border-neutral-600">
          <p className="font-manrope font-normal text-[16px] text-[#bab9b9]">
            {t('rights')}
          </p>
          <p className="font-manrope font-normal text-[16px] text-[#bab9b9]">
            {t('credit')}{' '}
            <a
              href="https://github.com/hyzyr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#bab9b9]">
              hyzyr
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};
