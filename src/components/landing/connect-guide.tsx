import { Container } from "@/components/ui/container";

export function ConnectGuide() {
  return (
    <section
      id="guide"
      className="w-full py-[90px]"
    >
      <Container className="flex flex-col gap-[80px] items-center">
        {/* Heading */}
        <p className="font-[family-name:var(--font-manrope)] text-[40px] leading-[1.1] tracking-[-0.8px] text-[#484747] text-center">
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
            <div className="flex flex-col gap-[37px] w-[705px] font-[family-name:var(--font-manrope)] font-bold text-[32px]">
              <p className="leading-[1.2] text-[#2b2929]">
                Choose a plan and pay on the website or
                <br />
                via Telegram
              </p>
              <p className="leading-[1.2] text-[#a1a1a1]">
                Get your configuration file on the
                <br />
                website or through our bot
              </p>
              <p className="leading-[1.2] text-[#a1a1a1]">
                Connect via the app
                <br />
                and start using
              </p>
            </div>
          </div>

          {/* Right: dark card — user handles screenshot */}
          <div className="h-[429px] w-[753px] shrink-0 overflow-hidden rounded-[47px] bg-[#2b2929]" />
        </div>
      </Container>
    </section>
  );
}
