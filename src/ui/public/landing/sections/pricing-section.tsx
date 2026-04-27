import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const imgImage135 =
  "https://www.figma.com/api/mcp/asset/555cf65b-1eae-4784-a908-84004414d9af";
const imgEllipse75 =
  "https://www.figma.com/api/mcp/asset/0bc200db-fd01-4de2-a8fa-3dc9a57793c0";

function DiscountBadge({ label }: { label: string }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[36px] px-4 py-2"
      style={{
        background:
          "linear-gradient(169.87deg, rgba(255,255,255,0.12) 7.1%, rgba(255,109,65,0.24) 42.8%, rgba(255,109,65,0.24) 67%, rgba(255,255,255,0.048) 95.5%)",
        backdropFilter: "blur(4.4px)",
        boxShadow:
          "4px 11px 11px 0px rgba(0,0,0,0.05), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)",
      }}
    >
      <span className="font-manrope font-medium text-[20px] text-neutral-600">{label}</span>
    </div>
  );
}

type PricingCardProps = {
  label: string;
  originalPrice?: string;
  price: string;
  priceColor?: string;
  discount?: string;
  perMonth?: string;
  period: string;
  featured?: boolean;
  height?: string;
};

function PricingCard({
  label,
  originalPrice,
  price,
  priceColor = "#2b2929",
  discount,
  perMonth,
  period,
  featured = false,
    height = "h-107.75",
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 overflow-hidden rounded-3xl bg-neutral-20 px-6 py-8 w-full ${height}`}
      style={{ boxShadow: "0px 20px 32px 0px rgba(0,0,0,0.06)" }}
    >
      {/* Top content block */}
        <div className="flex flex-1 flex-col gap-6 items-start min-h-0">
        {/* Plan label */}
        <p
          className="font-manrope font-extrabold text-[24px] leading-none tracking-[-0.72px] text-[#2b2929] whitespace-nowrap"
          style={{ textShadow: "0px 4px 8.4px rgba(254,243,139,0.17)" }}
        >
          {label}
        </p>

        {/* Original price (strikethrough) */}
        {originalPrice && (
          <div className="relative inline-grid" style={{ gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}>
            <p className="col-start-1 row-start-1 font-manrope font-normal text-[48px] leading-[0.9] text-neutral-80 whitespace-nowrap">
              {originalPrice}
            </p>
            <div className="col-start-1 row-start-1 h-1 w-23.25 bg-[#878686] mt-4.75 self-start" />
          </div>
        )}

        {/* Main price + discount badge */}
        <div className="flex items-center justify-between w-full">
          <p
            className="font-montserrat font-bold leading-none tracking-[-2.58px] text-[86px] whitespace-nowrap"
            style={{ color: priceColor, textShadow: "0px 4px 8.4px rgba(254,243,139,0.17)" }}
          >
            {price}
          </p>
          {discount && <DiscountBadge label={discount} />}
        </div>
      </div>

      {/* Divider + period */}
      <div
        className={`flex items-center border-t border-neutral-40 pt-4 pb-1.5 ${perMonth ? "justify-between" : ""}`}
      >
        {perMonth && (
          <span className="font-manrope font-normal text-[24px] text-neutral-600 whitespace-nowrap">
            {perMonth}
          </span>
        )}
        <span className="font-manrope font-normal text-[24px] text-neutral-600 whitespace-nowrap">
          {period}
        </span>
      </div>

      {/* Select button */}
      <Button
        variant={featured ? 'orange' : 'secondary'}
        size="lg"
        className="w-full"
      >
        Select
      </Button>
    </div>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full pb-30 pt-22.5 overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-neutral-900 rounded-4xl overflow-hidden">
        {/* Top glow ellipse */}
        <div className="absolute left-88 top-11.5 w-128.75 h-35.75">
          <img
            src={imgEllipse75}
            alt=""
            className="absolute inset-[-140%_-39%] w-[380%] h-[380%] max-w-none"
          />
        </div>
        {/* Bottom decorative image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-432 h-175.5">
          <img
            src={imgImage135}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>
      </div>

      <Container className="relative flex flex-col items-center gap-20">
        {/* Heading */}
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-manrope font-normal text-[56px] leading-[1.1] tracking-[-1.12px] text-yellow-50">
            Choose a suitable plan
          </p>
            <p className="font-manrope font-normal w-225.5 text-[24px] leading-[1.4] tracking-[-0.48px] text-neutral-30">
            Simple and transparent pricing for a stable and secure connection on
            any device.
          </p>
        </div>

        {/* Cards row — items-end so ONE MONTH (shortest) aligns to bottom */}
<div className="flex w-full items-end gap-2 justify-center">

          {/* ONE MONTH */}
          <div className="flex flex-1 items-center min-w-0 p-2">
            <PricingCard
              label="ONE MONTH"
              price="3 €"
              period="1 Month"
              height="h-107.75"
            />
          </div>

          {/* YEAR — featured */}
          <div
            className="flex flex-1 flex-col items-center min-w-0 overflow-hidden pb-2 px-2 rounded-[36px] shadow-[4px_11px_11px_0px_rgba(0,0,0,0.12)] relative"
            style={{
              background:
                "linear-gradient(152.45deg, rgba(255,255,255,0.07) 7.1%, rgba(254,243,139,0.126) 42.8%, rgba(254,243,139,0.14) 67%, rgba(255,255,255,0.028) 95.5%)",
              backdropFilter: "blur(112.6px)",
            }}
          >
            {/* Best Offer label */}
            <div className="flex w-full items-center justify-center pb-3.5 pt-3 px-16.5">
              <p
                className="font-manrope font-bold text-[28px] tracking-[0.56px] text-center bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(182.28deg, rgb(251,251,251) 41.4%, rgb(254,247,177) 97.7%)",
                }}
              >
                Best Offer
              </p>
            </div>
            <PricingCard
              label="YEAR"
              originalPrice="36 €"
              price="16 €"
              priceColor="#ff6d41"
              discount="-50%"
              perMonth="1 € / mo"
              period="12 Months"
              featured
              height="h-125"
            />
          </div>

          {/* HALF YEAR */}
          <div className="flex flex-1 flex-col min-w-0 p-2">
            <PricingCard
              label="HALF YEAR"
              originalPrice="18 €"
              price="12 €"
              discount="-33%"
              perMonth="1.33 € / mo"
              period="6 Months"
              height="h-125"
            />
          </div>

          {/* THREE MONTHS */}
          <div className="flex flex-1 flex-col min-w-0 p-2">
            <PricingCard
              label="THREE MONTHS"
              originalPrice="9 €"
              price="7.5 €"
              discount="-17%"
              perMonth="1.67 € / mo"
              period="3 Months"
              height="h-125"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
