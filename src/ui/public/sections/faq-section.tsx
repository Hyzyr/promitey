"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const imgPolygon14 =
  "https://www.figma.com/api/mcp/asset/8f2a007e-17a6-484a-948d-06e6e89cd9ed";
const imgPolygon15 =
  "https://www.figma.com/api/mcp/asset/afdb9bf3-ba01-43c5-a0c6-7310774d5385";

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
    <section id="faq" className="w-full pb-30 pt-22.5">
      <Container className="flex flex-col gap-15 items-center">
        {/* Heading */}
        <p className="font-manrope font-medium text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600 text-center w-full">
          Frequently Asked Questions
        </p>

        {/* Accordion list */}
          <div className="flex w-[1010px] flex-col gap-6">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div
                key={i}
                className={`flex flex-col rounded-[16px] bg-neutral-20${isOpen ? " gap-3" : ""}`}
                style={{
                  border: isOpen ? "1px solid #ff6d41" : "1px solid #e2e2e2",
                  boxShadow: isOpen ? "none" : "0px 10px 22.1px 0px rgba(0,0,0,0.02)",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-2.5 p-6.5 text-left"
                  aria-expanded={isOpen}
                >
                  <p className="flex-1 font-manrope font-bold text-[24px] leading-[1.2] text-[#2b2929]">
                    {item.q}
                  </p>
                  {/* Arrow icon */}
                  {isOpen ? (
                    <div className="shrink-0" style={{ transform: "rotate(90deg)" }}>
                      <img src={imgPolygon14} alt="" className="w-[20px] h-[16px]" />
                    </div>
                  ) : (
                    <img src={imgPolygon15} alt="" className="shrink-0 w-[16px] h-[20px]" />
                  )}
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="pb-6.5 px-6.5">
                    <p className="font-montserrat font-normal text-[18px] leading-[1.6] text-[#2b2929]">
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
