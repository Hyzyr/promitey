import { Container } from '@/components/ui/container';

export interface LegalContentSection {
  title: string;
  body: string[];
}

export interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updatedLabel: string;
  updatedValue: string;
  sections: LegalContentSection[];
}

export const LegalPage = ({
  eyebrow,
  title,
  description,
  updatedLabel,
  updatedValue,
  sections,
}: LegalPageProps) => {
  return (
    <section className="bg-neutral-20 py-12 md:py-16 lg:py-20">
      <Container className="max-w-240">
        <div className="flex flex-col gap-10 md:gap-12">
          <header className="flex max-w-180 flex-col gap-4">
            <p className="font-manrope text-sm font-semibold uppercase tracking-[0.08em] text-primary-600">
              {eyebrow}
            </p>
            <h1 className="font-manrope text-[34px] font-bold leading-[1.08] text-neutral-900 md:text-[48px] lg:text-[56px]">
              {title}
            </h1>
            <p className="max-w-165 font-manrope text-base leading-[1.65] text-neutral-600 md:text-[18px]">
              {description}
            </p>
            <p className="font-manrope text-sm text-neutral-400">
              {updatedLabel}: <time>{updatedValue}</time>
            </p>
          </header>

          <article className="flex max-w-190 flex-col gap-9 md:gap-10">
            {sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-3">
                <h2 className="font-manrope text-[22px] font-bold leading-tight text-neutral-900 md:text-[28px]">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-manrope text-base leading-[1.75] text-neutral-700 md:text-[17px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </Container>
    </section>
  );
};
