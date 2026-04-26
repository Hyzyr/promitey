const imgImage131 =
  "https://www.figma.com/api/mcp/asset/5e4e6ccf-4958-4eb7-9280-dfca7f185d01";

export function ConnectGuide() {
  return (
    <section
      id="guide"
      className="w-full py-22.5 px-26"
    >
        <div className="flex flex-col gap-20 items-center">
        {/* Heading */}
        <p className="font-manrope text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600 text-center whitespace-pre">
          <span className="font-light">Connect in</span>
          {"  "}
          <span className="font-semibold">2 minutes</span>
        </p>

        {/* Two-column layout */}
        <div className="flex items-center gap-[74px] w-full">
          {/* Left: progress bar + steps */}
          <div className="flex shrink-0 gap-[53px] items-center">
            {/* Progress bar */}
            <div className="relative h-[331px] w-[5px] shrink-0">
              {/* Track */}
              <div className="absolute inset-0 rounded-[9px] bg-[#e2e2e2]" />
              {/* Active segment (step 1 active) */}
              <div className="absolute left-0 top-0 h-[103px] w-[5px] rounded-[9px] bg-[#2b2929]" />
            </div>

            {/* Step texts */}
            <div className="flex flex-col gap-[37px] w-[705px] font-manrope font-bold text-[32px] whitespace-pre-wrap">
              <p className="leading-[1.2] text-[#2b2929]">
                {`Choose a plan and pay on the website or \nvia Telegram`}
              </p>
              <p className="leading-normal text-[#a1a1a1]">
                {`Get your configuration file on the\n website or through our bot`}
              </p>
              <p className="leading-normal text-[#a1a1a1]">
                {`Connect via the app\n and start using`}
              </p>
            </div>
          </div>

          {/* Right: dark card with app screenshot */}
          <div className="relative h-[429px] w-[753px] shrink-0 rounded-[47px] overflow-hidden bg-[#2b2929]">
            <img
              src={imgImage131}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
