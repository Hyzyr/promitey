import { Container } from "@/components/ui/container";

function DiscountBadge({ label }: { label: string }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[36px] px-[16px] py-[8px]"
      style={{
        background:
          "linear-gradient(169.87deg, rgba(255,255,255,0.12) 7.1%, rgba(255,109,65,0.24) 42.8%, rgba(255,109,65,0.24) 67%, rgba(255,255,255,0.048) 95.5%)",
        backdropFilter: "blur(4.4px)",
        boxShadow:
          "4px 11px 11px 0px rgba(0,0,0,0.05), inset 0px -0.6px 1.3px rgba(0,0,0,0.25), inset 0px 7px 8.7px rgba(255,255,255,0.8), inset 0px -0.5px 2px 1px rgba(255,255,255,0.5)",
      }}
    >
      <span className="font-[family-name:var(--font-manrope)] font-medium text-[20px] text-[#484747]">{label}</span>
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
  height = "h-[431px]",
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col gap-[16px] overflow-hidden rounded-[24px] bg-[#f6f6f6] px-[24px] py-[32px] w-full ${height}`}
      style={{ boxShadow: "0px 20px 32px 0px rgba(0,0,0,0.06)" }}
    >
      {/* Top content block */}
      <div className="flex flex-1 flex-col gap-[24px] items-start min-h-0">
        {/* Plan label */}
        <p
          className="font-[family-name:var(--font-manrope)] font-extrabold text-[24px] leading-none tracking-[-0.72px] text-[#2b2929] whitespace-nowrap"
          style={{ textShadow: "0px 4px 8.4px rgba(254,243,139,0.17)" }}
        >
          {label}
        </p>

        {/* Original price (strikethrough) */}
        {originalPrice && (
          <div className="relative inline-grid" style={{ gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}>
            <p className="col-start-1 row-start-1 font-[family-name:var(--font-manrope)] font-normal text-[48px] leading-[0.9] text-[#a1a1a1] whitespace-nowrap">
              {originalPrice}
            </p>
            <div className="col-start-1 row-start-1 h-[4px] w-[93px] bg-[#878686] mt-[19px] self-start" />
          </div>
        )}

        {/* Main price + discount badge */}
        <div className="flex items-center justify-between w-full">
          <p
            className="font-[family-name:var(--font-montserrat)] font-bold leading-none tracking-[-2.58px] text-[86px] whitespace-nowrap"
            style={{ color: priceColor, textShadow: "0px 4px 8.4px rgba(254,243,139,0.17)" }}
          >
            {price}
          </p>
          {discount && <DiscountBadge label={discount} />}
        </div>
      </div>

      {/* Divider + period */}
      <div
        className={`flex items-center border-t border-[#e2e2e2] pt-[16px] pb-[6px] ${perMonth ? "justify-between" : ""}`}
      >
        {perMonth && (
          <span className="font-[family-name:var(--font-manrope)] font-normal text-[24px] text-[#484747] whitespace-nowrap">
            {perMonth}
          </span>
        )}
        <span className="font-[family-name:var(--font-manrope)] font-normal text-[24px] text-[#484747] whitespace-nowrap">
          {period}
        </span>
      </div>

      {/* Select button */}
      {featured ? (
        <button className="w-full rounded-[20px] bg-[#ff6d41] px-[66px] py-[18px] font-[family-name:var(--font-manrope)] font-semibold text-[22px] text-center text-[#201e1e]">
          Select
        </button>
      ) : (
        <button
          className="w-full rounded-[20px] px-[66px] py-[18px] font-[family-name:var(--font-manrope)] font-semibold text-[22px] text-center text-[#2b2929]"
          style={{
            background: "rgba(43,41,41,0.12)",
            boxShadow: "0px 4px 46px 10px rgba(255,200,0,0.06)",
          }}
        >
          Select
        </button>
      )}
    </div>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full pb-[120px] pt-[90px] overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#201e1e] rounded-[32px]" />

      <Container className="relative flex flex-col items-center gap-[80px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-[16px] text-center">
          <p className="font-[family-name:var(--font-manrope)] font-normal text-[56px] leading-[1.1] tracking-[-1.12px] text-[#fffce6]">
            Choose a suitable plan
          </p>
          <p className="font-[family-name:var(--font-manrope)] font-normal w-[902px] text-[24px] leading-[1.4] tracking-[-0.48px] text-[#ededed]">
            Simple and transparent pricing for a stable and secure connection on
            any device.
          </p>
        </div>

        {/* Cards row — items-end so ONE MONTH (shortest) aligns to bottom */}
        <div className="flex w-full items-end gap-[8px] justify-center">

          {/* ONE MONTH */}
          <div className="flex flex-1 items-center min-w-0 p-[8px]">
            <PricingCard
              label="ONE MONTH"
              price="3 €"
              period="1 Month"
              height="h-[431px]"
            />
          </div>

          {/* YEAR — featured */}
          <div
            className="flex flex-1 flex-col items-center min-w-0 overflow-hidden pb-[8px] px-[8px] rounded-[36px] shadow-[4px_11px_11px_0px_rgba(0,0,0,0.12)] relative"
            style={{
              background:
                "linear-gradient(152.45deg, rgba(255,255,255,0.07) 7.1%, rgba(254,243,139,0.126) 42.8%, rgba(254,243,139,0.14) 67%, rgba(255,255,255,0.028) 95.5%)",
              backdropFilter: "blur(112.6px)",
            }}
          >
            {/* Best Offer label */}
            <div className="flex w-full items-center justify-center pb-[14px] pt-[12px] px-[66px]">
              <p
                className="font-[family-name:var(--font-manrope)] font-bold text-[28px] tracking-[0.56px] text-center bg-clip-text text-transparent"
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
              height="h-[500px]"
            />
          </div>

          {/* HALF YEAR */}
          <div className="flex flex-1 flex-col min-w-0 p-[8px]">
            <PricingCard
              label="HALF YEAR"
              originalPrice="18 €"
              price="12 €"
              discount="-33%"
              perMonth="1.33 € / mo"
              period="6 Months"
              height="h-[500px]"
            />
          </div>

          {/* THREE MONTHS */}
          <div className="flex flex-1 flex-col min-w-0 p-[8px]">
            <PricingCard
              label="THREE MONTHS"
              originalPrice="9 €"
              price="7.5 €"
              discount="-17%"
              perMonth="1.67 € / mo"
              period="3 Months"
              height="h-[500px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
