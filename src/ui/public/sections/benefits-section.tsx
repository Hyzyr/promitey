const imgImage126 =
  "https://www.figma.com/api/mcp/asset/93d1aca4-d5bc-42e0-b036-2fcd3accaee9";
const imgImage59 =
  "https://www.figma.com/api/mcp/asset/8762f9f5-b6c2-42c7-b45a-cc09f9baa95a";
const imgImage133 =
  "https://www.figma.com/api/mcp/asset/bd13c423-320f-4fe0-a6d0-1fff2cd68068";
const imgImage132 =
  "https://www.figma.com/api/mcp/asset/76656999-8204-41fe-bcbe-311af5386a87";
const imgImage134 =
  "https://www.figma.com/api/mcp/asset/1f84712a-177e-4aae-8b66-2da94074d858";

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full py-22.5 px-24">
      <div className="flex flex-col gap-9">
        {/* Heading */}
        <p className="font-manrope font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600">
          Why choose Prometey?
        </p>

        {/* 3-column grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-5">

          {/* ── CUSTOMER SUPPORT (col-1, row-1) ─────────────────── */}
          <div className="col-start-1 row-start-1 flex h-96 flex-col overflow-hidden rounded-[16px] border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
            <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              Customer Support
            </p>
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
              We respond quickly*. Real people are on Telegram, not bots; we will
              help you set up and launch everything.
            </p>
            <div className="relative flex-1">
              <img
                src={imgImage126}
                alt=""
                className="absolute object-cover pointer-events-none"
                style={{ left: "45px", top: "-25px", width: "392px", height: "257px" }}
              />
            </div>
          </div>

          {/* ── TRY IT FREE (col-2, row-1) ────────────────────────── */}
          <div className="col-start-2 row-start-1 flex h-96 flex-col overflow-hidden rounded-[16px] border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
            <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              Try it. Truly free
            </p>
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
              No card required. A real free test. See the quality for yourself,
              then decide.
            </p>
            <div className="relative flex-1">
              <img
                src={imgImage59}
                alt=""
                className="absolute object-cover pointer-events-none"
                style={{ left: "30px", top: "-50px", width: "419px", height: "233px" }}
              />
            </div>
          </div>

          {/* ── YOUR INTERNET – YOUR RULES (col-3, rows 1–2) ─────── */}
          <div className="col-start-3 row-start-1 row-span-2 flex flex-col overflow-hidden rounded-[16px] border border-orange-400 bg-neutral-20 px-6 py-8 relative">
            <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929] whitespace-pre-wrap">
              {"Your internet \n— your rules"}
            </p>
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
              Watch your favorite movies, chat on social media, and read any news
              without restrictions. Prometey removes borders so you can feel at
              home anywhere in the world.
            </p>
            <div className="relative flex-1 min-h-0">
              <img
                src={imgImage134}
                alt=""
                className="absolute object-cover pointer-events-none"
                style={{ left: "-36px", top: "113px", width: "399px", height: "387px" }}
              />
            </div>
            <div className="flex items-center justify-end relative z-10">
              <button className="rounded-[16px] bg-[#2b2929] px-8 py-4 font-manrope font-bold text-[18px] tracking-[0.36px] text-neutral-10 cursor-pointer">
                Try Now
              </button>
            </div>
          </div>

          {/* ── FOR YOUR FAMILY (col-1, row-2) ───────────────────── */}
          <div className="col-start-1 row-start-2 flex h-96 flex-col overflow-hidden rounded-[16px] border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
            <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              For you, your family,
              <br />and loved ones
            </p>
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
              Up to 10 devices on one subscription. Phone, laptop, tablet, TV.
              All at once. Enough for the whole family and relatives.
            </p>
            <div className="relative flex-1">
              <img
                src={imgImage132}
                alt=""
                className="absolute object-cover pointer-events-none"
                style={{ left: "116px", top: "-42px", width: "344px", height: "215px" }}
              />
            </div>
          </div>

          {/* ── HIGH SPEED (col-2, row-2) ─────────────────────────── */}
          <div className="col-start-2 row-start-2 flex h-96 flex-col overflow-hidden rounded-[16px] border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
            <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
              High Speed
            </p>
            <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
              Forget about buffering. Work and watch whatever you want at maximum
              speed. Without limits.
            </p>
            <div className="relative flex-1">
              <img
                src={imgImage133}
                alt=""
                className="absolute object-cover pointer-events-none"
                style={{ left: "56px", top: "-2px", width: "391px", height: "222px" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
