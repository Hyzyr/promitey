"use client";

import { useState } from "react";

const imgImage104 =
  "https://www.figma.com/api/mcp/asset/c2b20b7a-41f2-4b50-932e-f61074fb69ad";
const imgImage101 =
  "https://www.figma.com/api/mcp/asset/87f8262e-bf3d-4951-be6e-a24bd8093ee5";
const imgImage102 =
  "https://www.figma.com/api/mcp/asset/9dd3ee5d-08c3-45b7-a48a-a9683d274fe2";
const imgImage98 =
  "https://www.figma.com/api/mcp/asset/ab7649f4-cb30-4ce3-ada8-5be38fc02b30";
const imgImage99 =
  "https://www.figma.com/api/mcp/asset/d0b4bba1-2620-44a0-8e32-c5522cc38a67";
const imgIcon =
  "https://www.figma.com/api/mcp/asset/d74bd025-470a-41f8-9b2d-f1e3b0174f1e";
const imgIcon1 =
  "https://www.figma.com/api/mcp/asset/822a6dcb-8f44-4e09-980a-57e784eede00";
const imgInstagram =
  "https://www.figma.com/api/mcp/asset/259b3a17-925b-4bb8-a67e-447cd4b4e6a3";
const imgFrame1000008683 =
  "https://www.figma.com/api/mcp/asset/63b46145-ad42-4e49-983c-ae652d798ddf";
const imgObjects =
  "https://www.figma.com/api/mcp/asset/a6a933eb-9e16-448f-9609-ac82859f5902";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Mikhail S.",
    role: "Entrepreneur",
    quote:
      "Finally, one VPN for the whole family. I connected my wife's and children's phones, the smart TV, and my work laptop. And all of this on a single sub...",
    photo: imgImage102,
    border: "#e2e2e2",
    bg: "#fbfbfb",
  },
  {
    id: 2,
    name: "Ruslan T.",
    role: "Frontend Developer",
    quote:
      "Synchronization with the Telegram bot is genius. It's convenient to manage your subscription directly in the messenger. The support guys...",
    photo: imgImage98,
    border: "#f96e67",
    bg: "#ffffff",
  },
  {
    id: 3,
    name: "Elena M.",
    role: "Entrepreneur",
    quote:
      "Finally, one VPN for the whole family. I connected my wife's and children's phones, the smart TV, and my work laptop. And all of this on a single sub...",
    photo: imgImage99,
    border: "#e2e2e2",
    bg: "#fbfbfb",
  },
];

const DOTS = 4;

export function TestimonialsSection() {
  const [page, setPage] = useState(0);

  return (
    <section
      id="testimonials"
      className="relative w-full py-22.5 px-26 overflow-hidden"
    >
      {/* Blurred background decoration (left side) */}
      <div
        className="absolute -left-53.25 top-18.25 w-234.5 h-200 pointer-events-none"
        style={{ filter: "blur(0.5px)" }}
      >
        <img
          src={imgImage104}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Title row */}
        <div className="flex items-center justify-between h-12">
          <p className="font-manrope font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600 whitespace-nowrap">
            What our users are saying
          </p>
          {/* Navigation arrows */}
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="relative flex h-12 w-12 items-center justify-center rounded-[36px] overflow-hidden cursor-pointer"
              style={{
                boxShadow:
                  "4px 11px 11px rgba(0,0,0,0.02), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)",
              }}
              aria-label="Previous"
            >
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(4.4px)",
                  backgroundImage:
                    "linear-gradient(160.98deg, rgba(255,255,255,0.06) 7.1%, rgba(254,243,139,0.108) 42.8%, rgba(254,243,139,0.12) 67%, rgba(255,255,255,0.024) 95.5%)",
                }}
              />
              <img src={imgIcon} alt="" className="relative w-6 h-6" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="relative flex h-12 w-12 items-center justify-center rounded-[36px] overflow-hidden cursor-pointer"
              style={{
                boxShadow:
                  "4px 11px 11px rgba(0,0,0,0.02), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)",
              }}
              aria-label="Next"
            >
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(4.4px)",
                  backgroundImage:
                    "linear-gradient(160.98deg, rgba(255,255,255,0.06) 7.1%, rgba(254,243,139,0.108) 42.8%, rgba(254,243,139,0.12) 67%, rgba(255,255,255,0.024) 95.5%)",
                }}
              />
              <img src={imgIcon1} alt="" className="relative w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cards row */}
        <div className="flex gap-4 items-center pt-9.25">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative flex w-131.25 shrink-0 gap-4 rounded-3xl pl-4.5 pr-6 py-4.5 items-center"
              style={{
                border: `1px solid ${t.border}`,
                background: t.bg,
                boxShadow:
                  "0px 19px 11.15px rgba(0,0,0,0.06), 0px 35px 9.7px rgba(0,0,0,0.04)",
              }}
            >
              {/* Quote badge (absolute top-right) */}
              <div
                className="absolute -top-7.75 right-12 flex h-15 w-15 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(160.98deg, rgba(255,255,255,0.16) 7.1%, rgba(254,243,139,0.288) 42.8%, rgba(251,156,19,0.16) 67%, rgba(255,255,255,0.064) 95.5%)",
                  backdropFilter: "blur(3.7px)",
                  boxShadow: "inset 0px -1px 8.3px rgba(255,255,255,0.9)",
                }}
              >
                <img src={imgObjects} alt="" className="w-[29px] h-4.5" />
              </div>

              {/* Avatar */}
              <div className="relative shrink-0 w-[170px] h-[190px] overflow-hidden rounded-[16px]">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    WebkitMaskImage: `url('${imgImage101}')`,
                    maskImage: `url('${imgImage101}')`,
                    WebkitMaskSize: "170px 190px",
                    maskSize: "170px 190px",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                  }}
                />
                {/* Instagram icon overlay */}
                <div
                  className="absolute bottom-2 left-2.5 flex items-center justify-center w-7.5 h-7.5 rounded-full"
                  style={{
                    backdropFilter: "blur(1px)",
                    backgroundImage:
                      "linear-gradient(160.98deg, rgba(255,255,255,0.16) 7.1%, rgba(254,243,139,0.288) 42.8%, rgba(254,243,139,0.32) 67%, rgba(255,255,255,0.064) 95.5%)",
                    boxShadow: "inset 0px -1px 5px rgba(255,255,255,0.9)",
                  }}
                >
                  <img src={imgInstagram} alt="" className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col gap-3 pt-4 h-full">
                <p className="flex-1 font-montserrat font-normal text-[16px] leading-[1.6] text-[#6c6b6b] overflow-hidden">
                  {t.quote}
                </p>
                <div className="border-t border-neutral-40" />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-4">
                      <p className="flex-1 font-manrope font-bold text-[18px] leading-[1.1] text-[#2b2929] whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.name}
                    </p>
                    <img
                      src={imgFrame1000008683}
                      alt="5 stars"
                      className="h-[14px] w-[81px] shrink-0"
                    />
                  </div>
                  <p className="font-manrope font-medium text-[14px] leading-[1.1] text-neutral-600">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex gap-4 items-center justify-center">
          {Array.from({ length: DOTS }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className="rounded-full transition-all cursor-pointer"
              style={{
                width: i === page % DOTS ? "72px" : "42px",
                height: "5px",
                background: i === page % DOTS ? "#2b2929" : "#e2e2e2",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

