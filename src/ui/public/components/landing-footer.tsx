"use client";

import { Container } from "@/components/ui/container";

const SOCIAL = [
  { label: "Instagram" },
  { label: "YouTube" },
  { label: "TikTok" },
  { label: "Telegram" },
];

const PLATFORM_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Benefits", href: "#benefits" },
  { label: "Plans & Pricing", href: "#pricing" },
  { label: "Connection", href: "#guide" },
  { label: "F.A.Q", href: "#faq" },
];

const SUPPORT_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "User Agreement", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms of Use (AUP)", href: "/aup" },
  { label: "Report a problem", href: "/report" },
];

export function LandingFooter() {
  return (
    <footer className="relative w-full bg-neutral-900 pb-7.5 pt-20">
      <Container className="flex flex-col gap-15">
        {/* Main columns */}
<div className="flex gap-4 items-start w-full">

        {/* Col 1 — Brand */}
          <div className="flex w-[496px] shrink-0 flex-col gap-6 pr-12">
          {/* Logo */}
            <div className="flex h-14 w-[293px] items-center gap-3">
              {/* Logo image placeholder */}
              <div className="h-[54px] w-8 bg-neutral-600 rounded-[4px]" />
              <p className="font-manrope text-[35px] text-neutral-30 whitespace-nowrap">
              <span className="font-medium">Prometey</span>{" "}
              <span className="font-bold">VPN</span>
            </p>
          </div>

          {/* Tagline */}
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] tracking-[-0.36px] text-neutral-30">
            Opening up a free and high-speed gateway to the digital world.{" "}
            <strong className="font-semibold">Prometey</strong> provides
            uncompromising privacy and stability thanks to advanced VLESS and
            OpenVPN protocols.
          </p>

          {/* Social icons */}
            <div className="flex flex-col gap-3 pt-6">
              <p className="font-manrope font-normal text-[16px] leading-[1.4] tracking-[-0.32px] text-[#bab9b9]">
              Follow us on:
            </p>
              <div className="flex gap-2">
              {SOCIAL.map(({ label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex items-center justify-center rounded-[12px] bg-neutral-600 p-2.5"
                >
                  {/* Social icon placeholder */}
                  <div className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 — Platform */}
          <div className="flex w-[238px] shrink-0 flex-col gap-6">
            <p className="font-manrope font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
            Платформа
          </p>
          <nav className="flex flex-col gap-3 w-[171px]">
            {PLATFORM_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-manrope font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-neutral-20"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Col 3 — Support */}
        <div className="flex w-[240px] shrink-0 flex-col gap-6">
          <p className="font-manrope font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
            Информация и поддержка
          </p>
          <nav className="flex flex-col gap-3">
            {SUPPORT_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-manrope font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-neutral-20"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-1 flex-col items-end">
          <div className="flex w-[370px] flex-col gap-8">
            <p className="font-manrope font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              Contact Us
            </p>
            <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
              {/* Email input */}
              <div className="flex items-center rounded-[16px] border border-[#bab9b9] bg-neutral-20 px-5.5 py-4.5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="font-roboto font-medium w-full bg-transparent text-[16px] tracking-[0.32px] text-neutral-600 outline-none placeholder:text-neutral-600"
                />
              </div>
              {/* Message textarea */}
              <div className="flex items-start rounded-[16px] border border-[#bab9b9] bg-neutral-20 px-5.5 py-4.5">
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="font-roboto font-medium w-full h-[131px] resize-none bg-transparent text-[16px] tracking-[0.32px] text-neutral-600 outline-none placeholder:text-neutral-600"
                />
              </div>
              {/* Send button */}
              <button
                type="submit"
                className="w-[138px] rounded-[16px] bg-primary-500 px-8 py-4 font-manrope font-semibold text-[18px] tracking-[0.36px] text-neutral-900"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div className="flex items-center justify-between pt-10 w-full border-t border-neutral-600">
        <p className="font-manrope font-normal text-[16px] text-[#bab9b9]">
          © 2026 Prometey VPN. All rights reserved.
        </p>
        <p className="font-manrope font-normal text-[16px] text-[#bab9b9]">
          Designed and developed by:{" "}
          <a
            href="https://github.com/hyzyr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#bab9b9]"
          >
            hyzyr
          </a>
        </p>
      </div>
      </Container>
    </footer>
  );
}
