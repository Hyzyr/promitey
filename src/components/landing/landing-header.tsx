"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "#benefits", label: "Benefits" },
  { href: "#pricing", label: "Pricing" },
  { href: "#guide", label: "How to connect" },
  { href: "#faq", label: "F.A.Q" },
];

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#201e1e]" style={{ backdropFilter: "blur(24.75px)" }}>
      {/* Desktop nav */}
      <div className="hidden w-full items-center justify-between px-[104px] py-[24px] lg:flex">
        {/* Left: Logo + Language switcher */}
        <div className="flex items-center gap-[24px]">
          {/* Logo */}
          <Link href="/" className="flex h-[56px] w-[284px] items-center gap-[12px]">
            {/* Logo image placeholder */}
            <div className="h-[54px] w-[32px] bg-[#e2e2e2] rounded-[4px]" />
            <p className="font-[family-name:var(--font-manrope)] text-[35px] text-[#fbfbfb] whitespace-nowrap">
              <span className="font-medium">Prometey</span>{" "}
              <span className="font-bold">VPN</span>
            </p>
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-[4px] rounded-[12px] bg-white/[0.12] p-[8px]">
            {/* Globe icon placeholder */}
            <div className="h-[24px] w-[24px] rounded-full bg-white/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbfbfb" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <span className="font-[family-name:var(--font-roboto)] font-normal text-[18px] text-[#fbfbfb]">  En</span>
            <div className="rotate-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbfbfb" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Nav links + Login */}
        <div className="flex items-center gap-[40px]">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-[family-name:var(--font-roboto)] font-normal text-[18px] text-[#fbfbfb]"
            >
              {label}
            </a>
          ))}
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-[16px] bg-[#ff6d41] px-[32px] py-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[18px] text-[#201e1e]"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-6 bg-[#e2e2e2] rounded-[4px]" />
          <span className="font-[family-name:var(--font-manrope)] text-[20px] font-bold text-[#fbfbfb]">
            Prometey VPN
          </span>
        </Link>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#fbfbfb]"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="space-y-4 border-t border-[#484747] px-5 py-6 lg:hidden">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block font-[family-name:var(--font-roboto)] text-[18px] text-[#fbfbfb]"
            >
              {label}
            </a>
          ))}
          <Link
            href="/login"
            className="block w-full rounded-[16px] bg-[#ff6d41] px-8 py-4 text-center font-[family-name:var(--font-manrope)] font-semibold text-[18px] text-[#201e1e]"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
