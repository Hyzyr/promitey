import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-[1035px] bg-[#ededed] flex items-center justify-center overflow-hidden"
    >
      {/* Background — user handles image/shape */}

      {/* Content */}
      <Container className="flex flex-col gap-[40px] items-center">
        {/* Text block */}
        <div className="flex flex-col gap-[30px] items-center pt-[40px]">
          {/* Heading */}
          <p className="font-[family-name:var(--font-manrope)] font-bold text-[72px] leading-[1.1] tracking-[0.72px] text-[#201e1e] text-center">
            Turn the internet 180°
            <br />
            Your freedom in one click
          </p>

          {/* Body */}
          <p className="font-[family-name:var(--font-roboto)] font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[#2b2929] text-center w-[794px]">
            <strong className="font-bold">Prometey is a high-speed VPN</strong>
            {" for accessing any service and ensuring stable business operations. "}
            <strong className="font-bold">One subscription for 10 of your devices</strong>
            {". It simply works where others give up."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-[18px] items-center">
          {/* Primary CTA */}
          <button className="bg-[#2b2929] flex items-center justify-center px-[66px] py-[18px] rounded-[20px] w-[390px] cursor-pointer">
            <span className="font-[family-name:var(--font-manrope)] font-bold text-[22px] text-[#fbfbfb] text-center leading-normal whitespace-nowrap">
              Try for Free
            </span>
          </button>

          {/* Glass button */}
          <button
            className="relative flex items-center justify-center px-[16px] py-[8px] rounded-[16px] w-[208px] cursor-pointer"
            style={{
              background:
                "linear-gradient(176.11deg, rgba(255,255,255,0.075) 7.1%, rgba(254,243,139,0.135) 42.8%, rgba(254,243,139,0.15) 67%, rgba(255,255,255,0.03) 95.5%)",
              boxShadow:
                "4px 11px 11px rgba(0,0,0,0.05), inset -0.5px 0.5px 1.5px rgba(255,255,255,0.77), inset 0.5px -0.5px 1px rgba(0,0,0,0.6), inset 0px 4px 9.4px rgba(255,255,255,0.25)",
            }}
          >
            <span className="font-[family-name:var(--font-manrope)] font-semibold text-[18px] text-[#2b2929] text-center tracking-[-0.36px] whitespace-nowrap">
              How it works?
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
}
