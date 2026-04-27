import {
  CustomerSupportCard,
  TryItFreeCard,
  YourInternetCard,
  ForYourFamilyCard,
  HighSpeedCard,
} from './benefits-components';

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full py-22.5 px-24">
      <div className="flex flex-col gap-9">
        <p className="font-manrope font-light text-[40px] leading-[1.1] tracking-[-0.8px] text-neutral-600">
          Why choose Prometey?
        </p>

        <div className="grid grid-cols-3 grid-rows-2 gap-5">
          <CustomerSupportCard />
          <TryItFreeCard />
          <YourInternetCard />
          <ForYourFamilyCard />
          <HighSpeedCard />
        </div>
      </div>
    </section>
  );
}


