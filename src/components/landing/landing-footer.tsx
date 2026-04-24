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
    <footer className="relative w-full bg-[#201e1e] pb-[30px] pt-[80px]">
      <Container className="flex flex-col gap-[60px]">
        {/* Main columns */}
      <div className="flex gap-[16px] items-start w-full">

        {/* Col 1 — Brand */}
        <div className="flex w-[496px] shrink-0 flex-col gap-[24px] pr-[48px]">
          {/* Logo */}
          <div className="flex h-[56px] w-[293px] items-center gap-[12px]">
            {/* Logo image placeholder */}
            <div className="h-[54px] w-[32px] bg-[#484747] rounded-[4px]" />
            <p className="font-[family-name:var(--font-manrope)] text-[35px] text-[#ededed] whitespace-nowrap">
              <span className="font-medium">Prometey</span>{" "}
              <span className="font-bold">VPN</span>
            </p>
          </div>

          {/* Tagline */}
          <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.4] tracking-[-0.36px] text-[#ededed]">
            Opening up a free and high-speed gateway to the digital world.{" "}
            <strong className="font-semibold">Prometey</strong> provides
            uncompromising privacy and stability thanks to advanced VLESS and
            OpenVPN protocols.
          </p>

          {/* Social icons */}
          <div className="flex flex-col gap-[12px] pt-[24px]">
            <p className="font-[family-name:var(--font-manrope)] font-normal text-[16px] leading-[1.4] tracking-[-0.32px] text-[#bab9b9]">
              Follow us on:
            </p>
            <div className="flex gap-[8px]">
              {SOCIAL.map(({ label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex items-center justify-center rounded-[12px] bg-[#484747] p-[10px]"
                >
                  {/* Social icon placeholder */}
                  <div className="h-[24px] w-[24px]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 — Platform */}
        <div className="flex w-[238px] shrink-0 flex-col gap-[24px]">
          <p className="font-[family-name:var(--font-manrope)] font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
            Платформа
          </p>
          <nav className="flex flex-col gap-[12px] w-[171px]">
            {PLATFORM_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-[family-name:var(--font-manrope)] font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-[#f6f6f6]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Col 3 — Support */}
        <div className="flex w-[240px] shrink-0 flex-col gap-[24px]">
          <p className="font-[family-name:var(--font-manrope)] font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
            Информация и поддержка
          </p>
          <nav className="flex flex-col gap-[12px]">
            {SUPPORT_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-[family-name:var(--font-manrope)] font-medium text-[16px] leading-[1.4] tracking-[-0.32px] text-[#f6f6f6]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-1 flex-col items-end">
          <div className="flex w-[370px] flex-col gap-[32px]">
            <p className="font-[family-name:var(--font-manrope)] font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[#bab9b9]">
              Contact Us
            </p>
            <form className="flex flex-col gap-[16px] w-full" onSubmit={(e) => e.preventDefault()}>
              {/* Email input */}
              <div className="flex items-center rounded-[16px] border border-[#bab9b9] bg-[#f6f6f6] px-[22px] py-[18px]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="font-[family-name:var(--font-roboto)] font-medium w-full bg-transparent text-[16px] tracking-[0.32px] text-[#484747] outline-none placeholder:text-[#484747]"
                />
              </div>
              {/* Message textarea */}
              <div className="flex items-start rounded-[16px] border border-[#bab9b9] bg-[#f6f6f6] px-[22px] py-[18px]">
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="font-[family-name:var(--font-roboto)] font-medium w-full h-[131px] resize-none bg-transparent text-[16px] tracking-[0.32px] text-[#484747] outline-none placeholder:text-[#484747]"
                />
              </div>
              {/* Send button */}
              <button
                type="submit"
                className="w-[138px] rounded-[16px] bg-[#ff6d41] px-[32px] py-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[18px] tracking-[0.36px] text-[#201e1e]"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div className="flex items-center justify-between pt-[40px] w-full border-t border-[#484747]">
        <p className="font-[family-name:var(--font-manrope)] font-normal text-[16px] text-[#bab9b9]">
          © 2026 Prometey VPN. All rights reserved.
        </p>
        <p className="font-[family-name:var(--font-manrope)] font-normal text-[16px] text-[#bab9b9]">
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
