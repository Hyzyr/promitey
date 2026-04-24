import { Container } from "@/components/ui/container";

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full py-[90px]">
      <Container className="flex flex-col gap-[36px]">
        {/* Heading */}
        <p className="font-[family-name:var(--font-manrope)] font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-[#484747]">
          Why choose Prometey?
        </p>

        {/* 3-column grid: left 2 cols = 2×2, right col = 1 tall card */}
        <div className="grid grid-cols-3 grid-rows-2 gap-[20px]">

          {/* ── CUSTOMER SUPPORT (col-1, row-1) ─────────────────── */}
          <div className="col-start-1 row-start-1 flex h-[384px] flex-col gap-[12px] overflow-hidden rounded-[16px] border border-[#e2e2e2] bg-[#f6f6f6] px-[20px] py-[26px]">
            <p className="font-[family-name:var(--font-manrope)] font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              Customer Support
            </p>
            <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.4] text-[#6c6b6b]">
              We respond quickly*. Real people are on Telegram, not bots; we will
              help you set up and launch everything.
            </p>
            <div className="relative flex-1 overflow-hidden" />
          </div>

          {/* ── TRY IT FREE (col-2, row-1) ────────────────────────── */}
          <div className="col-start-2 row-start-1 flex h-[384px] flex-col gap-[12px] overflow-hidden rounded-[16px] border border-[#e2e2e2] bg-[#f6f6f6] px-[20px] py-[26px]">
            <p className="font-[family-name:var(--font-manrope)] font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              Try it. Truly free
            </p>
            <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.4] text-[#6c6b6b]">
              No card required. A real free test. See the quality for yourself,
              then decide.
            </p>
            <div className="relative flex-1 overflow-hidden" />
          </div>

          {/* ── YOUR INTERNET – YOUR RULES (col-3, rows 1–2) ─────── */}
          <div className="col-start-3 row-start-1 row-span-2 flex flex-col gap-[12px] overflow-hidden rounded-[16px] border border-[#fcb042] bg-[#f6f6f6] px-[24px] py-[32px]">
            <p className="font-[family-name:var(--font-manrope)] font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              Your internet{" "}
              <br />— your rules
            </p>
            <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.4] text-[#6c6b6b]">
              Watch your favorite movies, chat on social media, and read any news
              without restrictions. Prometey removes borders so you can feel at
              home anywhere in the world.
            </p>
            <div className="relative flex-1 overflow-hidden" />
            <div className="flex items-center justify-end">
              <button className="rounded-[16px] bg-[#2b2929] px-[32px] py-[16px] font-[family-name:var(--font-manrope)] font-bold text-[18px] tracking-[0.36px] text-[#fbfbfb]">
                Try Now
              </button>
            </div>
          </div>

          {/* ── FOR YOUR FAMILY (col-1, row-2) ───────────────────── */}
          <div className="col-start-1 row-start-2 flex h-[384px] flex-col gap-[12px] overflow-hidden rounded-[16px] border border-[#e2e2e2] bg-[#f6f6f6] px-[20px] py-[26px]">
            <p className="font-[family-name:var(--font-manrope)] font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              For you, your family,
              <br />and loved ones
            </p>
            <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.4] text-[#6c6b6b]">
              Up to 10 devices on one subscription. Phone, laptop, tablet, TV.
              All at once. Enough for the whole family and relatives.
            </p>
            <div className="relative flex-1 overflow-hidden" />
          </div>

          {/* ── HIGH SPEED (col-2, row-2) ─────────────────────────── */}
          <div className="col-start-2 row-start-2 flex h-[384px] flex-col gap-[12px] overflow-hidden rounded-[16px] border border-[#e2e2e2] bg-[#f6f6f6] px-[20px] py-[26px]">
            <p className="font-[family-name:var(--font-manrope)] font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              High Speed
            </p>
            <p className="font-[family-name:var(--font-montserrat)] font-normal text-[18px] leading-[1.4] text-[#6c6b6b]">
              Forget about buffering. Work and watch whatever you want at maximum
              speed. Without limits.
            </p>
            <div className="relative flex-1 overflow-hidden" />
          </div>

        </div>
      </Container>
    </section>
  );
}
