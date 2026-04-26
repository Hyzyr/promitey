const imgImage121 =
  'https://www.figma.com/api/mcp/asset/9bcf0072-8618-48d8-aea9-e59d53c3c490';
const imgImage120 =
  'https://www.figma.com/api/mcp/asset/d887fc4d-32ae-4063-bf9c-614098694f3d';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-[1035px] bg-[#ededed] flex items-center justify-center overflow-hidden">
      {/* Background image with mask */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[-199px] w-[2000px] h-[1309px]">
        <div
          className="absolute inset-0"
          style={{
            transform: 'scaleY(-1)',
          }}>
          <div className="absolute inset-0">
            <img
              src={imgImage121}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>

   main-bg
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-10 items-center px-24">
        {/* Text block */}
        <div className="flex flex-col gap-7.5 items-center pt-10">
          {/* Heading */}
          <div className="flex flex-col font-manrope font-bold leading-[1.1] tracking-[0.72px] text-neutral-900 text-[72px] text-center items-center whitespace-nowrap">
            <p>Turn the internet 180°</p>
            <p>Your freedom in one click</p>
          </div>

          {/* Body */}
          <p className="font-roboto font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[#2b2929] text-center w-[794px]">
            <strong className="font-bold">Prometey is a high-speed VPN</strong>
            {
              ' for accessing any service and ensuring stable business operations. '
            }
            <strong className="font-bold">
              One subscription for 10 of your devices
            </strong>
            {'. It simply works where others give up.'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4.5 items-center">
          {/* Primary CTA */}
          <button className="bg-[#2b2929] flex items-center justify-center px-16.5 py-4.5 rounded-[20px] w-[390px] cursor-pointer">
            <span className="font-manrope font-bold text-[22px] text-neutral-10 text-center leading-normal whitespace-nowrap">
              Try for Free
            </span>
          </button>

          {/* Glass button */}
          <button
            className="relative flex items-center justify-center px-4 py-2 rounded-[16px] w-[208px] cursor-pointer"
            style={{
              background:
                'linear-gradient(176.11deg, rgba(255,255,255,0.075) 7.1%, rgba(254,243,139,0.135) 42.8%, rgba(254,243,139,0.15) 67%, rgba(255,255,255,0.03) 95.5%)',
              boxShadow:
                '4px 11px 5.5px rgba(0,0,0,0.05), inset -0.5px 0.5px 1.5px rgba(255,255,255,0.77), inset 0.5px -0.5px 1px rgba(0,0,0,0.6), inset 0px 4px 9.4px rgba(255,255,255,0.25)',
            }}>
            <span className="font-manrope font-semibold text-[18px] text-[#2b2929] text-center tracking-[-0.36px] whitespace-nowrap">
              How it works?
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
