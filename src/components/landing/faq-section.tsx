"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const FAQ_ITEMS = [
  {
    q: "What is Prometey VPN and how does it work?",
    a: "Prometey VPN is a service designed to ensure security and freedom on the internet. We use modern protocols (VLESS and OpenVPN) to encrypt your traffic and hide your real IP address from ISPs and websites.",
  },
  {
    q: "Why are your protocols better than regular ones?",
    a: 'We use VLESS—one of the fastest and most "invisible" protocols available today. It excels at bypassing blocks where conventional VPNs are powerless, while maintaining high connection speeds.',
  },
  {
    q: "On which devices can I use the VPN?",
    a: "iOS, Android, Windows, macOS, Linux, routers, and Smart TV.",
  },
  {
    q: "How many devices can I connect simultaneously?",
    a: "Up to 10 devices on one subscription.",
  },
  {
    q: "Do you have a free trial period?",
    a: "Yes. No card required — try the service and decide for yourself.",
  },
  {
    q: "What should I do if the key stops working?",
    a: "Write to us in Telegram — we will update the key in a minute.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section id="faq" className="w-full pb-[120px] pt-[90px]">
      <Container className="flex flex-col gap-[60px] items-center">
        {/* Heading */}
        <p className="font-[family-name:var(--font-manrope)] font-medium text-[40px] leading-[1.1] tracking-[-0.8px] text-[#484747] text-center w-full">
          Frequently Asked Questions
        </p>

        {/* Accordion list */}
        <div className="flex w-[1010px] flex-col gap-[24px]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div
                key={i}
                className={`flex flex-col rounded-[16px] bg-[#f6f6f6]${isOpen ? " gap-[12px]" : ""}`}
                style={{
                  border: isOpen ? "1px solid #ff6d41" : "1px solid #e2e2e2",
                  boxShadow: isOpen ? "none" : "0px 10px 22.1px 0px rgba(0,0,0,0.02)",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-[10px] p-[26px] text-left"
                  aria-expanded={isOpen}
                >
                  <p className="flex-1 font-[family-name:var(--font-manrope)] font-bold text-[24px] leading-[1.2] text-[#2b2929]">
                    {item.q}
                  </p>
                  {/* Arrow icon */}
                  <div
                    className="shrink-0 transition-transform"
                    style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <path d="M4 4L12 10L4 16" stroke="#2b2929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="pb-[26px] px-[26px]">
                    <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.6] text-[#2b2929]">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
