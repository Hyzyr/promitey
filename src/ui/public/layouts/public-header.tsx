'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Logo, LogoWithText } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';

export const LandingHeader = () => {
  const t = useTranslations('landing.header');
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV = [
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#guide', label: t('nav.guide') },
    { href: '#faq', label: t('nav.faq') },
  ];

  return (
    <header className="absolute top-0 z-2 w-full bg-neutral-900">
      {/* Desktop nav */}
      <div className="container hidden w-full items-center justify-between px-26 py-4 lg:flex">
        {/* Left: Logo + Language switcher */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <LogoWithText />

          {/* Language switcher */}
          <LanguageSwitcher />
        </div>

        {/* Right: Nav links + Login */}
        <div className="flex items-center gap-10">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-roboto font-normal text-[18px] text-neutral-10">
              {label}
            </a>
          ))}
          <Button href="/login" variant="orange" size="md">{t('login')}</Button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <Logo />
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-10">
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="space-y-4 border-t border-neutral-600 px-5 py-6 lg:hidden">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block font-roboto text-[18px] text-neutral-10">
              {label}
            </a>
          ))}
          <Button href="/login" variant="orange" size="md" className="w-full">{t('login')}</Button>
        </div>
      )}
    </header>
  );
}
