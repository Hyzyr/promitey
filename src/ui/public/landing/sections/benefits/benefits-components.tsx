import { Button } from '@/components/ui/button';

const imgTryItFree = '/images/arc-blured.png';
const imgHighSpeed = '/images/ellipse-blurred.png';
const imgCustomerSupport = '/images/o-shape-blurred.png';
const imgForYourFamily = '/images/square-blurred.png';
const imgYourInternet = '/images/circle-blurred.png';

type CardMediaProps = {
  className?: string;
  children: React.ReactNode;
};
export function CardMedia({ children, className }: CardMediaProps) {
  return (
    <div
      className={`relative flex-1 isolate${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}

// ── Cards ─────────────────────────────────────────────────────────────────────

export function CustomerSupportCard() {
  return (
    <div className="col-start-1 row-start-1 flex h-96 flex-col overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
      <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
        Customer Support
      </p>
      <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
        We respond quickly*. Real people are on Telegram, not bots; we will help
        you set up and launch everything.
      </p>
      <CardMedia>
        <img
          src={imgCustomerSupport}
          alt=""
          className="absolute object-cover pointer-events-none"
          style={{ left: 45, top: -25, width: 392, height: 257 }}
        />
      </CardMedia>
    </div>
  );
}

export function TryItFreeCard() {
  return (
    <div className="col-start-2 row-start-1 flex h-96 flex-col overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
      <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
        Try it. Truly free
      </p>
      <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
        No card required. A real free test. See the quality for yourself, then
        decide.
      </p>
      <CardMedia>
        <img
          src={imgTryItFree}
          alt=""
          className="absolute object-cover pointer-events-none"
          style={{ left: 30, top: -50, width: 419, height: 233 }}
        />
      </CardMedia>
    </div>
  );
}

export function YourInternetCard() {
  return (
    <div className="col-start-3 row-start-1 row-span-2 flex flex-col overflow-hidden rounded-2xl border border-orange-400 bg-neutral-20 px-6 py-8 relative">
      <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929] whitespace-pre-wrap">
        {'Your internet \n— your rules'}
      </p>
      <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
        Watch your favorite movies, chat on social media, and read any news
        without restrictions. Prometey removes borders so you can feel at home
        anywhere in the world.
      </p>
      <CardMedia className="min-h-0">
        <img
          src={imgYourInternet}
          alt=""
          className="absolute object-cover pointer-events-none"
          style={{ left: -36, top: 113, width: 399, height: 387 }}
        />
      </CardMedia>
      <div className="flex items-center justify-end relative z-10">
        <Button variant="default" size="md">
          Try Now
        </Button>
      </div>
    </div>
  );
}

export function ForYourFamilyCard() {
  return (
    <div className="col-start-1 row-start-2 flex h-96 flex-col overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
      <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
        For you, your family,
        <br />
        and loved ones
      </p>
      <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
        Up to 10 devices on one subscription. Phone, laptop, tablet, TV. All at
        once. Enough for the whole family and relatives.
      </p>
      <CardMedia>
        <img
          src={imgForYourFamily}
          alt=""
          className="absolute object-cover pointer-events-none"
          style={{ left: 116, top: -42, width: 344, height: 215 }}
        />
      </CardMedia>
    </div>
  );
}

export function HighSpeedCard() {
  return (
    <div className="col-start-2 row-start-2 flex h-96 flex-col overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-20 px-5 py-6.5 relative">
      <p className="font-manrope font-bold text-[36px] leading-[1.2] text-[#2b2929]">
        High Speed
      </p>
      <p className="font-montserrat font-normal text-[18px] leading-[1.4] text-[#6c6b6b] mt-3">
        Forget about buffering. Work and watch whatever you want at maximum
        speed. Without limits.
      </p>
      <CardMedia>
        <img
          src={imgHighSpeed}
          alt=""
          className="absolute object-cover pointer-events-none"
          style={{ left: 56, top: -2, width: 391, height: 222 }}
        />
      </CardMedia>
    </div>
  );
}
