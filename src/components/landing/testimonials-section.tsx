"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Mikhail S.",
    role: "Entrepreneur",
    quote:
      "Finally, one VPN for the whole family. I connected my wife's and children's phones, the smart TV, and my work laptop. And all of this on a single subscription.",
  },
  {
    id: 2,
    name: "Ruslan T.",
    role: "Frontend Developer",
    quote:
      "Synchronization with the Telegram bot is genius. It's convenient to manage your subscription directly in the messenger. The support guys are always on point.",
  },
  {
    id: 3,
    name: "Elena M.",
    role: "Entrepreneur",
    quote:
      "Finally, one VPN for the whole family. I connected my wife's and children's phones, the smart TV, and my work laptop. And all of this on a single subscription.",
  },
];

const DOTS = 4;

export function TestimonialsSection() {
  const [page, setPage] = useState(0);

  return (
    <section
      id="testimonials"
      className="relative w-full py-[90px] overflow-hidden"
    >
      {/* Background decoration — user handles */}

      <Container className="flex flex-col gap-[32px]">
        {/* Title row */}
        <div className="flex items-center justify-between h-[48px]">
          <p className="font-[family-name:var(--font-manrope)] font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-[#484747]">
            What our users are saying
          </p>
          {/* Navigation arrows */}
          <div className="flex gap-[4px]">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-[36px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(160.98deg, rgba(255,255,255,0.06) 7.1%, rgba(254,243,139,0.108) 42.8%, rgba(254,243,139,0.12) 67%, rgba(255,255,255,0.024) 95.5%)",
                backdropFilter: "blur(4.4px)",
                boxShadow:
                  "4px 11px 11px rgba(0,0,0,0.02), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)",
              }}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#2b2929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-[36px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(160.98deg, rgba(255,255,255,0.06) 7.1%, rgba(254,243,139,0.108) 42.8%, rgba(254,243,139,0.12) 67%, rgba(255,255,255,0.024) 95.5%)",
                backdropFilter: "blur(4.4px)",
                boxShadow:
                  "4px 11px 11px rgba(0,0,0,0.02), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)",
              }}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#2b2929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Cards row — pt-[37px] leaves room for quote badge overflow */}
        <div className="flex gap-[16px] items-center pt-[37px]">
          {TESTIMONIALS.map((t, idx) => {
            const isActive = idx === 1;
            return (
              <div
                key={t.id}
                className="relative flex w-[525px] shrink-0 gap-[16px] rounded-[24px] pl-[18px] pr-[24px] py-[18px] items-center"
                style={{
                  border: isActive ? "1px solid #f96e67" : "1px solid #e2e2e2",
                  background: isActive ? "#ffffff" : "#fbfbfb",
                  boxShadow:
                    "0px 19px 22.3px rgba(0,0,0,0.06), 0px 35px 19.4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Quote badge (absolute top-right) */}
                <div
                  className="absolute -top-[31px] right-[48px] flex h-[60px] w-[60px] items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(160.98deg, rgba(255,255,255,0.16) 7.1%, rgba(254,243,139,0.288) 42.8%, rgba(251,156,19,0.16) 67%, rgba(255,255,255,0.064) 95.5%)",
                    backdropFilter: "blur(3.7px)",
                    boxShadow: "inset 0px -1px 8.3px rgba(255,255,255,0.9)",
                  }}
                >
                  <svg width="29" height="18" viewBox="0 0 29 18" fill="none">
                    <path d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0L12 2.4C8.4 3.2 6.6 5.2 6 8H10.8V18H0ZM18 18V10.8C18 4.8 21.6 1.2 28.8 0L30 2.4C26.4 3.2 24.6 5.2 24 8H28.8V18H18Z" fill="#2b2929" fillOpacity="0.4"/>
                  </svg>
                </div>

                {/* Photo placeholder */}
                <div className="relative h-[190px] w-[170px] shrink-0 overflow-hidden rounded-[24px] bg-[#e2e2e2]" />

                {/* Text */}
                <div className="flex flex-1 flex-col gap-[12px] pt-[16px]">
                  <p className="font-[family-name:var(--font-montserrat)] font-normal text-[16px] leading-[1.6] text-[#6c6b6b]">
                    {t.quote}
                  </p>
                  <div className="border-t border-[#e2e2e2]" />
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[16px]">
                      <p className="font-[family-name:var(--font-manrope)] font-bold text-[18px] leading-[1.1] text-[#2b2929]">
                        {t.name}
                      </p>
                      {/* 5 stars */}
                      <div className="flex gap-[2px]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FF6D41">
                            <path d="M7 1L8.545 5.09H13L9.535 7.41L10.545 11.5L7 9.18L3.455 11.5L4.465 7.41L1 5.09H5.455L7 1Z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] text-[#484747]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex gap-[16px] items-center justify-center">
          {Array.from({ length: DOTS }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === page % DOTS ? "72px" : "42px",
                height: "5px",
                background: i === page % DOTS ? "#2b2929" : "#e2e2e2",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}


