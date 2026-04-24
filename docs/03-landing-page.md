# Prometey VPN — Landing Page Implementation Guide

> **Source of truth**: Figma file `CGwoRb0tFSoEX6GfKTdabi`
> - Desktop (1728 px): node `6506:23185` — [open in Figma](https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6506-23185)
> - Mobile (390 px): node `6525:25129` — [open in Figma](https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6525-25129)
>
> Tokens, Button and Input are already defined — see [01-project-setup.md](./01-project-setup.md) and [02-components-spec.md](./02-components-spec.md). This doc only covers the **landing page** at `/[locale]/`.

![desktop](./screenshots/landing-desktop.png)
![mobile](./screenshots/landing-mobile.png)

> Capture screenshots manually from Figma into `docs/screenshots/` before publishing — the MCP screenshot tool returns transient URIs that expire in 7 days.

---

## 1. Page Route & File Path

| Route | File |
|---|---|
| `/[locale]/` | [src/app/[locale]/(public)/page.tsx](../src/app/%5Blocale%5D/(public)/page.tsx) |
| Public shell | [src/app/[locale]/(public)/layout.tsx](../src/app/%5Blocale%5D/(public)/layout.tsx) |
| Translations RU | [src/messages/ru.json](../src/messages/ru.json) |
| Translations EN | [src/messages/en.json](../src/messages/en.json) |

`page.tsx` is a **Server Component**. It composes the section components in order:

```tsx
// src/app/[locale]/(public)/page.tsx
import { Hero } from "@/components/landing/hero";
import { BenefitsGrid } from "@/components/landing/benefits-grid";
import { ConnectGuide } from "@/components/landing/connect-guide";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <BenefitsGrid />
      <ConnectGuide />
      <Testimonials />
      <Pricing />
      <Faq />
    </>
  );
}
```

The public layout supplies the `<LandingHeader />` and `<LandingFooter />` so each page renders only its own sections.

---

## 2. Public Shell — `(public)/layout.tsx`

Figma header node: `6506:24053` (top-right nav of the desktop hero frame).

```tsx
// src/app/[locale]/(public)/layout.tsx
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-0 text-neutral-900 antialiased">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
```

### 2.1 Landing Header

Header is a sticky bar overlaying the hero. The hero background is dark/orange so header text is `neutral-10` (`#fbfbfb`).

| Property | Desktop | Mobile |
|---|---|---|
| Height | 88 px (24 px vertical padding around 40 px content) | 70 px |
| Container max width | `1536px` (1728 − 2×96) | full width |
| Horizontal padding | `px-24` (96 px) | `px-5` (20 px) |
| Position | `sticky top-0 z-50`, transparent over hero, `bg-neutral-900/85 backdrop-blur` after first scroll | same |
| Logo | `Prometey VPN` wordmark (Manrope), 35 px, `text-neutral-30` | 26 × 44 px symbol only (`6525:25983`), wordmark hidden under `md` |
| Nav links | gap-10, `text-[18px] font-normal text-neutral-10` | hidden, replaced by burger |
| Login button | `Button variant="orange" size="md"` | hidden behind burger drawer |
| Language switcher | small dropdown (RU / EN) on the right of nav | inside burger drawer |

```tsx
// src/components/landing/landing-header.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/landing/language-switcher";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "#benefits",  key: "benefits"  },
  { href: "#pricing",   key: "pricing"   },
  { href: "#guide",     key: "guide"     },
  { href: "#faq",       key: "faq"       },
];

export function LandingHeader() {
  const t = useTranslations("landing.header");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-900/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70">
      <div className="mx-auto flex h-[70px] w-full max-w-[1536px] items-center justify-between px-5 lg:h-[88px] lg:px-24">
        <Link href="/" className="flex items-center gap-2 text-neutral-10">
          <span className="text-[26px] font-bold text-primary-500 lg:text-[35px]">P</span>
          <span className="hidden text-[35px] text-neutral-30 lg:inline">
            <span className="font-medium">Prometey</span>{" "}
            <span className="font-bold">VPN</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map(({ href, key }) => (
            <Link key={key} href={href} className="text-[18px] text-neutral-10 hover:text-primary-300">
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Button asChild variant="orange" size="md">
            <Link href="/login">{t("login")}</Link>
          </Button>
        </div>

        <button
          aria-label={t("menu")}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-neutral-700 bg-neutral-900 px-5 py-6 space-y-4">
          {NAV.map(({ href, key }) => (
            <Link key={key} href={href} onClick={() => setOpen(false)}
                  className="block text-[18px] text-neutral-10">
              {t(`nav.${key}`)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button asChild variant="orange" size="md" className="w-full">
            <Link href="/login">{t("login")}</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
```

### 2.2 Landing Footer

Spec'd in detail under [§ 3.7 Footer](#37-footer-—-6506-23949).

---

## 3. Section-by-Section Breakdown — Desktop

### Container rule (applies to every section)

| Property | Desktop | Mobile |
|---|---|---|
| Frame width | 1728 px | 390 px |
| Inner content max width | `1536px` | full width |
| Horizontal padding | `px-24` (96 px) — pricing/faq/footer use **`px-[104px]`** in Figma | `px-5` (20 px) |
| Section vertical padding | `py-[90px]` content top, `pb-[120px]` for dark sections | `py-12` (48 px) typical |

In Tailwind we standardise on:

```tsx
<section className="mx-auto w-full max-w-[1728px] px-5 py-12 lg:px-24 lg:py-[90px]">
  <div className="mx-auto w-full max-w-[1536px]">…</div>
</section>
```

Pricing & FAQ swap `lg:px-24` for `lg:px-[104px]` to match the rounded dark card inset Figma uses (8 px inset on each side at 1728 frame).

---

### 3.1 Hero — `6506:23189` (mobile `6525:25133`)

| Property | Desktop | Mobile |
|---|---|---|
| Height | 1035 px | auto (≈ 896 px) |
| Background | Solid `neutral-30` (`#ededed`) + decorative orange flame mask (`image 120/121` from Figma) inverted (`-scale-y-100`) at top, overflowing | Same flame, scaled down, `bg-neutral-30` |
| Vertical padding | `pt-[270px]` (content offset under header) `pb-[60px]` | `pt-[180px] pb-8` |
| Content max width | `1536px`, centred | full width minus 20 px gutters |
| Eyebrow (mobile only) | — | `text-[20px] font-bold text-primary-500 tracking-[0.01em]` — *“Разверни интернет на 180°”* |
| Headline 1 | `text-[72px] font-bold leading-[1.1] tracking-[0.01em] text-neutral-900` — *“Turn the internet 180°”* | `text-[36px] font-bold leading-[1.1] text-neutral-900` — *“Твоя свобода в один клик”* |
| Headline 2 (desktop) | same style — *“Your freedom in one click”* | merged into the single H1 above |
| Subheading | `text-[24px] leading-[1.4] tracking-[-0.02em] text-[#2b2929] max-w-[794px]` (bold spans for the two highlighted phrases) | `text-[16px] leading-[1.4] text-[#2b2929]` (same bold spans) |
| CTA primary | `Button variant="default" size="lg" className="w-[390px]"` — *“Try for Free” / “Попробуйте Бесплатно”* | same `Button` but `className="w-full max-w-[320px]"` |
| CTA secondary | Glass-pill 208 × 41 px text *“How it works?” / “Как это устроено?”* — `rounded-2xl` shadow, gradient bg | same |

Figma node IDs of inner pieces: `6506:23303` (H1 line 1), `6506:23304` (H1 line 2), `6506:23305` (sub), `6506:23308` (CTA), `6506:23310` (link button).

```tsx
// src/components/landing/hero.tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("landing.hero");
  return (
    <section className="relative isolate overflow-hidden bg-neutral-30 pb-[60px] pt-[180px] lg:h-[1035px] lg:pt-[270px]">
      {/* Decorative flame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[url('/images/hero-flame.png')] bg-cover bg-top opacity-90 mix-blend-normal"
      />
      <div className="mx-auto flex w-full max-w-[1536px] flex-col items-center gap-10 px-5 text-center lg:px-24">
        <p className="text-[20px] font-bold tracking-[0.01em] text-primary-500 lg:hidden">
          {t("eyebrow")}
        </p>
        <h1 className="text-[36px] font-bold leading-[1.1] tracking-[0.01em] text-neutral-900 lg:text-[72px]">
          <span className="block">{t("title.line1")}</span>
          <span className="block">{t("title.line2")}</span>
        </h1>
        <p className="max-w-[794px] text-[16px] leading-[1.4] tracking-[-0.02em] text-[#2b2929] lg:text-[24px]">
          {t.rich("subtitle", { b: (c) => <strong className="font-bold">{c}</strong> })}
        </p>
        <div className="flex w-full flex-col items-center gap-[18px]">
          <Button asChild variant="default" size="lg" className="w-full max-w-[320px] lg:w-[390px] lg:max-w-none">
            <Link href="/signup">{t("ctaPrimary")}</Link>
          </Button>
          <Link
            href="#guide"
            className="inline-flex h-[41px] w-[208px] items-center justify-center rounded-2xl bg-gradient-to-b from-white/8 via-yellow-100/15 to-white/3 text-[18px] font-semibold tracking-[-0.02em] text-[#2b2929] shadow-[4px_11px_11px_0_rgba(0,0,0,0.05)] backdrop-blur"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

#### Translations

```jsonc
// landing.hero
"hero": {
  "eyebrow":      "Разверни интернет на 180°",      // RU only (mobile eyebrow)
  "title": { "line1": "Разверни интернет на 180°", "line2": "Твоя свобода в один клик" },
  "subtitle":     "<b>Prometey — это скоростной VPN</b> для доступа к любым сервисам и стабильной работы бизнеса. <b>Одна подписка для 10 ваших устройств</b>. Просто работает там, где другие сдаются.",
  "ctaPrimary":   "Попробуйте Бесплатно",
  "ctaSecondary": "Как это устроено?"
}
```

EN equivalent uses `"Turn the internet 180°"`, `"Your freedom in one click"`, `"<b>Prometey is a high-speed VPN</b> for accessing any service and ensuring stable business operations. <b>One subscription for 10 of your devices</b>. It simply works where others give up."`, `"Try for Free"`, `"How it works?"`.

---

### 3.2 Benefits Grid — `6506:23312` (mobile `6525:25256`)

Grid of 5 benefit cards: 2 columns × 2 rows on the left + 1 tall card on the right (column 3 spans both rows).

| Property | Value |
|---|---|
| Section padding (desktop) | `px-24 py-[90px]` |
| Background | `neutral-0` with a faint orange radial behind (`image 104`) |
| Section title | `text-[40px] font-light tracking-[-0.02em] text-[#484747]` — *“Why choose Prometey?”* / *“Почему выбирают Prometey?”* (node `6506:23315`) |
| Title-to-grid gap | 36 px (`mb-9`) |
| Grid | `grid-cols-3 gap-5` (20 px), 2 rows where card #5 (right) is `row-span-2 col-start-3` |
| Card base | `bg-neutral-20 border border-neutral-40 rounded-2xl px-5 py-[26px] h-[384px]` |
| Highlight card (right tall) | same but `border-orange-400` instead of `neutral-40`, `h-auto`, `row-span-2`, contains an embedded UGC composition + a `Button variant="default" size="md"` *“Try Now”* |
| Card title | `text-[36px] font-bold leading-[1.2] text-[#484747]` |
| Card description | `text-[18px] leading-[1.4] text-[#6c6b6b]` (Montserrat → Inter) |
| Card illustration | absolute decorative PNG/SVG in lower portion (≈ 200 px tall) |

Cards (left → right, top → bottom):

| # | Figma id | Title (EN / RU) | Description (EN) |
|---|---|---|---|
| 1 | `6506:23350` | Customer Support / Поддержка | We respond quickly. Real people on Telegram, not bots; we will help you set up everything. |
| 2 | `6506:23386` | Try it. Truly free / Попробуй. Это правда бесплатно | No card required. A real free test. |
| 3 (tall) | `6506:23317` | Your internet — your rules / Твой интернет — твои правила | Watch movies, chat, read news without restrictions. + CTA *“Try Now”* |
| 4 | `6506:23465` | For you, your family, and loved ones / Для тебя, семьи и близких | Up to 10 devices on one subscription. |
| 5 | `6506:23448` | High Speed / Высокая скорость | Forget about buffering. Work and watch at maximum speed. |

```tsx
// src/components/landing/benefits-grid.tsx
import { useTranslations } from "next-intl";
import { BenefitCard, FeatureBenefitCard } from "./benefit-card";
import support from "@/assets/benefits/support.png";
import freeTrial from "@/assets/benefits/free.png";
import family from "@/assets/benefits/family.png";
import speed from "@/assets/benefits/speed.png";
import feedback from "@/assets/benefits/feedback.png";

export function BenefitsGrid() {
  const t = useTranslations("landing.benefits");
  return (
    <section id="benefits" className="bg-neutral-0 px-5 py-12 lg:px-24 lg:py-[90px]">
      <div className="mx-auto w-full max-w-[1536px]">
        <h2 className="mb-9 text-[28px] font-light tracking-[-0.02em] text-[#484747] lg:text-[40px]">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <BenefitCard image={support}    title={t("items.support.title")}    body={t("items.support.body")}    className="lg:col-start-1 lg:row-start-1" />
          <BenefitCard image={freeTrial}  title={t("items.free.title")}       body={t("items.free.body")}       className="lg:col-start-2 lg:row-start-1" />
          <FeatureBenefitCard
            image={feedback}
            title={t("items.rules.title")}
            body={t("items.rules.body")}
            cta={t("items.rules.cta")}
            className="lg:col-start-3 lg:row-span-2"
          />
          <BenefitCard image={family}     title={t("items.family.title")}     body={t("items.family.body")}     className="lg:col-start-1 lg:row-start-2" />
          <BenefitCard image={speed}      title={t("items.speed.title")}      body={t("items.speed.body")}      className="lg:col-start-2 lg:row-start-2" />
        </div>
      </div>
    </section>
  );
}
```

#### Translations

```jsonc
"benefits": {
  "title": "Почему выбирают Prometey?",
  "items": {
    "support": { "title": "Поддержка", "body": "Отвечаем быстро. На связи живые люди в Telegram, не боты — поможем настроить и запустить." },
    "free":    { "title": "Попробуй. Это правда бесплатно", "body": "Карта не нужна. Настоящий бесплатный тест: убедись в качестве — потом решай." },
    "rules":   { "title": "Твой интернет — твои правила", "body": "Смотри любимые фильмы, общайся в соцсетях и читай новости без ограничений. Prometey убирает границы.", "cta": "Попробовать" },
    "family":  { "title": "Для тебя, семьи и близких", "body": "До 10 устройств на одной подписке. Телефон, ноутбук, планшет, ТВ — хватит на всю семью." },
    "speed":   { "title": "Высокая скорость", "body": "Забудь о буферизации. Работай и смотри что хочешь на максимальной скорости. Без лимитов." }
  }
}
```

EN: `Customer Support` / `Try it. Truly free` / `Your internet — your rules` (cta `Try Now`) / `For you, your family, and loved ones` / `High Speed` with the descriptions copied verbatim from Figma above.

---

### 3.3 Connect Guide — `6506:23552` (mobile `6525:25496`)

A two-column "Connect in 2 minutes" section. Left = title + 3-step list with progress bar, right = dark `bg-[#2b2929] rounded-[47px]` 753 × 429 px illustration showing a phone screen.

| Property | Value |
|---|---|
| Section padding | `px-[104px] py-[90px]` |
| Layout | `grid-cols-1 lg:grid-cols-[1fr_753px] gap-[74px] items-center` |
| Title | `text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-[#484747]` — *“Connect in **2 minutes**”* (the “2 minutes” span is `font-semibold`) |
| Steps wrapper | flex row: 5 px progress rail + 705 px text column |
| Progress rail | `w-[5px] h-[331px] rounded-[9px] bg-neutral-40` with overlay `h-[103px] bg-[#2b2929]` showing current step |
| Step text | `text-[32px] leading-[1.2] font-bold` — first step `text-[#2b2929]`, subsequent `text-neutral-80 leading-normal` |
| Right illustration | `bg-[#2b2929] rounded-[47px] w-full max-w-[753px] aspect-[753/429]` with `image 131` (`6506:23590`) cover image |

Steps (`6506:23576`):

1. *Choose a plan and pay on the website or via Telegram* — active.
2. *Get your configuration file on the website or through our bot* — muted.
3. *Connect via the app and start using* — muted.

```tsx
// src/components/landing/connect-guide.tsx
import { useTranslations } from "next-intl";
import Image from "next/image";

export function ConnectGuide() {
  const t = useTranslations("landing.guide");
  return (
    <section id="guide" className="bg-neutral-0 px-5 py-12 lg:px-[104px] lg:py-[90px]">
      <div className="mx-auto grid w-full max-w-[1520px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_753px] lg:gap-[74px]">
        <div>
          <h2 className="mb-12 text-center text-[28px] font-light leading-[1.1] tracking-[-0.02em] text-[#484747] lg:text-[40px] lg:text-left">
            {t.rich("title", { strong: (c) => <span className="font-semibold">{c}</span> })}
          </h2>
          <ol className="flex gap-[53px]">
            <div className="relative w-[5px] shrink-0 rounded-[9px] bg-neutral-40">
              <span className="absolute inset-x-0 top-0 h-[103px] rounded-[9px] bg-[#2b2929]" />
            </div>
            <div className="flex flex-col gap-[37px] text-[20px] font-bold lg:text-[32px]">
              <li className="leading-[1.2] text-[#2b2929]">{t("steps.0")}</li>
              <li className="leading-normal text-neutral-80">{t("steps.1")}</li>
              <li className="leading-normal text-neutral-80">{t("steps.2")}</li>
            </div>
          </ol>
        </div>
        <div className="relative aspect-[753/429] w-full max-w-[753px] overflow-hidden rounded-[28px] bg-[#2b2929] lg:rounded-[47px]">
          <Image src="/images/guide-phone.png" alt="" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
```

#### Translations

```jsonc
"guide": {
  "title": "Подключайся за <strong>2 минуты</strong>",
  "steps": [
    "Выбери тариф и оплати на сайте или через Telegram",
    "Получи свой конфиг на сайте или через бота",
    "Подключайся через приложение и пользуйся"
  ]
}
```

EN: `"Connect in <strong>2 minutes</strong>"`, `"Choose a plan and pay on the website or via Telegram"`, `"Get your configuration file on the website or through our bot"`, `"Connect via the app and start using"`.

---

### 3.4 Testimonials — `6506:23591` (mobile `6525:25535`)

Three review cards in a row, each 525 px wide, with overlapping avatar masks and a yellow gradient quote bubble.

| Property | Value |
|---|---|
| Section padding | `px-[104px] py-[90px]` |
| Layout (header row) | `flex items-center justify-between` — title on the left, prev/next pill buttons on the right |
| Title | `text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-[#484747]` — *“What our users are saying”* |
| Pager | two `size-12 rounded-[36px]` glass icon buttons (chevrons) |
| Cards row | `flex gap-4 overflow-x-auto pt-[37px]` — 525 px each, 16 px gap |
| Card | `bg-neutral-10 border border-neutral-40 rounded-[24px] p-[18px_24px_18px_18px] flex gap-4 items-center shadow-[0_19px_22.3px_0_rgba(0,0,0,0.06)]` |
| Avatar | left, 176 × 190 px masked round-rect, with social-platform pill bottom-left |
| Quote | `text-[16px] leading-[1.6] text-[#6c6b6b]` (truncated with ellipsis after 4 lines) |
| Divider | 1 px `imgLine82` separator |
| Author name | `text-[18px] font-bold leading-[1.1] text-[#2b2929]` |
| Author role | `text-[14px] font-medium leading-[1.1] text-[#484747]` |
| Stars | 81 × 14 px graphic, 5 stars |
| Pagination dots | bottom centre, `gap-4`, active = `w-[101px] h-[5px] rounded-lg bg-[#2b2929]`, inactive = `w-[42px] h-[5px] rounded-lg bg-neutral-60 opacity-40` |

Sample testimonials (in Figma, all marked as Instagram source):

| Person | Role | Quote |
|---|---|---|
| Mikhail S. | Entrepreneur | *“Finally, one VPN for the whole family. I connected my wife’s and children’s phones, the smart TV, and my work laptop. And all on a single subscription.”* |
| Ruslan T. | Frontend Developer | *“Synchronization with the Telegram bot is genius. It’s convenient to manage your subscription directly in the messenger.”* |
| Elena M. | Entrepreneur | *(placeholder)* |

```tsx
// src/components/landing/testimonials.tsx
"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export function Testimonials() {
  const t = useTranslations("landing.testimonials");
  const scroller = useRef<HTMLDivElement>(null);
  const items = t.raw("items") as Array<{ name: string; role: string; quote: string; avatar: string }>;
  return (
    <section className="relative bg-neutral-0 px-5 py-12 lg:px-[104px] lg:py-[90px]">
      <div className="mx-auto w-full max-w-[1536px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-[28px] font-light leading-[1.1] tracking-[-0.02em] text-[#484747] lg:text-[40px]">
            {t("title")}
          </h2>
          <div className="hidden gap-1 lg:flex">
            <button onClick={() => scroller.current?.scrollBy({ left: -541, behavior: "smooth" })}
                    className="size-12 rounded-[36px] bg-white/30 shadow-[4px_11px_11px_0_rgba(0,0,0,0.02)] backdrop-blur">
              <ChevronLeft className="mx-auto h-6 w-6 text-neutral-700" />
            </button>
            <button onClick={() => scroller.current?.scrollBy({ left: 541, behavior: "smooth" })}
                    className="size-12 rounded-[36px] bg-white/30 shadow-[4px_11px_11px_0_rgba(0,0,0,0.02)] backdrop-blur">
              <ChevronRight className="mx-auto h-6 w-6 text-neutral-700" />
            </button>
          </div>
        </div>
        <div ref={scroller} className="flex gap-4 overflow-x-auto pt-[37px] snap-x">
          {items.map((it) => (
            <article key={it.name} className="flex w-[525px] shrink-0 snap-start items-center gap-4 rounded-[24px] border border-neutral-40 bg-neutral-10 py-[18px] pl-[18px] pr-6 shadow-[0_19px_22.3px_0_rgba(0,0,0,0.06)]">
              <img src={it.avatar} alt="" className="size-[176px] rounded-[20px] object-cover" />
              <div className="flex flex-1 flex-col gap-3">
                <p className="line-clamp-4 text-[16px] leading-[1.6] text-[#6c6b6b]">{it.quote}</p>
                <hr className="border-neutral-40" />
                <div>
                  <p className="text-[18px] font-bold text-[#2b2929]">{it.name}</p>
                  <p className="text-[14px] font-medium text-[#484747]">{it.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### Translations

```jsonc
"testimonials": {
  "title": "Что говорят наши пользователи",
  "items": [
    { "name": "Михаил С.", "role": "Предприниматель", "avatar": "/avatars/mikhail.png",
      "quote": "Наконец-то один VPN на всю семью. Подключил телефоны жены и детей, смарт-ТВ и рабочий ноутбук. И всё это в рамках одной подписки." },
    { "name": "Руслан Т.", "role": "Frontend-разработчик", "avatar": "/avatars/ruslan.png",
      "quote": "Синхронизация с Telegram-ботом — это гениально. Удобно управлять подпиской прямо в мессенджере." },
    { "name": "Елена М.", "role": "Предприниматель", "avatar": "/avatars/elena.png",
      "quote": "Скорость отличная, ничего не лагает. Поддержка отвечает буквально за минуту." }
  ]
}
```

EN mirrors the same with the Figma quotes above.

---

### 3.5 Pricing — `6506:23744` (mobile `6525:25688`)

Dark rounded card section with 4 plan cards. The middle (“Best Offer”) card is taller and has a gradient yellow halo.

| Property | Value |
|---|---|
| Section padding | `pt-[90px] pb-[120px] px-[104px]` |
| Outer card (`6506:23745`) | `bg-neutral-900 rounded-[32px] overflow-hidden` — full bleed inside the section, contains a halo (`imgEllipse75`) and a city skyline (`image 135`) |
| Header text | `text-[56px] font-normal leading-[1.1] tracking-[-0.02em] text-yellow-50` — *“Choose a suitable plan”* |
| Sub | `text-[24px] leading-[1.4] tracking-[-0.02em] text-neutral-30 max-w-[902px]` — *“Simple and transparent pricing for a stable and secure connection on any device.”* |
| Cards row | `flex items-end justify-center gap-2` (8 px) — 4 cards |
| Standard card | `flex-1 bg-neutral-20 rounded-[24px] h-[431px] px-6 py-8 shadow-[0_20px_32px_0_rgba(0,0,0,0.06)]` |
| Best card wrapper | extra outer `rounded-[36px]` glass frame with yellow gradient backdrop (`backdrop-blur-[112.6px]`), header strip *“Best Offer”* in `text-[28px] font-bold` (gradient text), inner card `h-[500px]` |
| Plan title | `text-[24px] font-extrabold leading-none tracking-[-0.03em] text-[#2b2929]` |
| Old price (strike) | `text-[48px] font-normal leading-[0.9] text-neutral-80` with strike rectangle |
| Price | `text-[86px] font-bold leading-none tracking-[-0.03em] text-[#2b2929]` (best card uses `text-primary-500`, half-year card uses `text-[96px]`) |
| Discount pill | `rounded-[36px] px-4 py-2 text-[20px] font-medium text-[#484747]` glass with orange tint shadow |
| Plan footer row | `border-t border-neutral-40 pt-4 pb-1.5 text-[24px] text-[#484747] flex justify-between` |
| Standard CTA | `bg-[rgba(43,41,41,0.12)] rounded-[20px] px-[66px] py-[18px] text-[22px] font-semibold text-[#2b2929]` |
| Best CTA | `Button variant="orange" size="lg" className="w-full"` |

Plans (left → right):

| Plan | id | Old | Price | Per month | Discount |
|---|---|---|---|---|---|
| One Month | `6506:23764` | — | **3 €** | — | — |
| Year (Best) | `6506:23787` | ~~36 €~~ | **16 €** (`text-primary-500`) | 1 € / mo | −50 % |
| Half Year | `6506:23823` | ~~18 €~~ | **12 €** | 1.33 € / mo | −33.3 % |
| Three Months | `6506:23859` | ~~9 €~~ | **7.5 €** | 1.66 € / mo | −16.6 % |

```tsx
// src/components/landing/pricing.tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PricingCard } from "./pricing-card";

export function Pricing() {
  const t = useTranslations("landing.pricing");
  return (
    <section id="pricing" className="px-5 pb-12 pt-12 lg:px-[104px] lg:pb-[120px] lg:pt-[90px]">
      <div className="relative mx-auto w-full max-w-[1728px] overflow-hidden rounded-[32px] bg-neutral-900 px-5 pt-16 pb-20 lg:px-12">
        <div className="mx-auto flex max-w-[902px] flex-col items-center gap-4 text-center">
          <h2 className="text-[32px] leading-[1.1] tracking-[-0.02em] text-yellow-50 lg:text-[56px]">
            {t("title")}
          </h2>
          <p className="text-[16px] leading-[1.4] tracking-[-0.02em] text-neutral-30 lg:text-[24px]">
            {t("subtitle")}
          </p>
        </div>
        <div className="mx-auto mt-20 grid w-full max-w-[1536px] grid-cols-1 items-end gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <PricingCard plan="oneMonth"  price="3"    period={t("plans.oneMonth.period")} />
          <PricingCard plan="year"      price="16"   oldPrice="36" perMonth="1"    period={t("plans.year.period")}    discount="-50%" highlight />
          <PricingCard plan="halfYear"  price="12"   oldPrice="18" perMonth="1.33" period={t("plans.halfYear.period")} discount="-33.3%" />
          <PricingCard plan="quarter"   price="7.5"  oldPrice="9"  perMonth="1.66" period={t("plans.quarter.period")} discount="-16.6%" />
        </div>
      </div>
    </section>
  );
}
```

#### Translations

```jsonc
"pricing": {
  "title": "Выберите подходящий тариф",
  "subtitle": "Простая и прозрачная цена за стабильное и безопасное соединение на любом устройстве.",
  "bestOffer": "Лучшее предложение",
  "perMonth": "{value} € / мес",
  "select": "Выбрать",
  "plans": {
    "oneMonth": { "label": "ОДИН МЕСЯЦ", "period": "1 месяц" },
    "year":     { "label": "ГОД",         "period": "12 месяцев" },
    "halfYear": { "label": "ПОЛГОДА",     "period": "6 месяцев" },
    "quarter":  { "label": "ТРИ МЕСЯЦА",  "period": "3 месяца" }
  }
}
```

EN: `Choose a suitable plan` / `Simple and transparent pricing…` / `Best Offer` / `{value} € / mo` / `Select` and `ONE MONTH` / `YEAR` / `HALF YEAR` / `THREE MONTHS` with periods `1 Month` / `12 Months` / `6 Months` / `3 Months`.

---

### 3.6 FAQ — `6506:23895` (mobile `6525:25839`)

| Property | Value |
|---|---|
| Section padding | `pt-[90px] pb-[120px] px-[104px]` |
| Background | `bg-neutral-0` (subtle gradient over) |
| Title | `text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-[#484747] text-center` — *“Frequently Asked Questions” / “Часто задаваемые вопросы”* |
| Title-to-list gap | 60 px (`mb-[60px]`) |
| List | `flex flex-col gap-6 max-w-[1010px] mx-auto` |
| Item (closed) | `bg-neutral-20 border border-neutral-40 rounded-2xl p-[26px] flex justify-between items-center text-[24px] font-bold text-[#2b2929] shadow-[0_10px_22.1px_0_rgba(0,0,0,0.02)]` |
| Item (open)  | same but `border-primary-500` and reveals body |
| Body | `text-[18px] leading-[1.6] text-[#2b2929] pt-3` |
| Chevron | 16 × 20 px triangle (rotates 90° when open) |

Items (Figma source `6506:23913 … 23943`):

1. What is Prometey VPN and how does it work?
2. Why are your protocols better than regular ones?
3. On which devices can I use the VPN?
4. How many devices can I connect simultaneously?
5. Do you have a free trial period?
6. What should I do if the key stops working?

```tsx
// src/components/landing/faq.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Faq() {
  const t = useTranslations("landing.faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-neutral-0 px-5 py-12 lg:px-[104px] lg:py-[90px] lg:pb-[120px]">
      <div className="mx-auto w-full max-w-[1010px]">
        <h2 className="mb-12 text-center text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-[#484747] lg:mb-[60px] lg:text-[40px]">
          {t("title")}
        </h2>
        <div className="flex flex-col gap-6">
          {items.map((it, i) => {
            const isOpen = i === open;
            return (
              <div key={i} className={cn(
                "rounded-2xl border bg-neutral-20 shadow-[0_10px_22.1px_0_rgba(0,0,0,0.02)]",
                isOpen ? "border-primary-500" : "border-neutral-40",
              )}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-2.5 p-[26px] text-left text-[18px] font-bold text-[#2b2929] lg:text-[24px]"
                >
                  <span>{it.q}</span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <p className="px-[26px] pb-[26px] text-[16px] leading-[1.6] text-[#2b2929] lg:text-[18px]">
                    {it.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

#### Translations

```jsonc
"faq": {
  "title": "Часто задаваемые вопросы",
  "items": [
    { "q": "Что такое Prometey VPN и как он работает?",
      "a": "Prometey VPN — это сервис для безопасности и свободы в интернете. Мы используем современные протоколы (VLESS и OpenVPN) для шифрования трафика и скрытия вашего реального IP-адреса от провайдеров и сайтов." },
    { "q": "Чем ваши протоколы лучше обычных?",
      "a": "Мы используем VLESS — один из самых быстрых и «незаметных» протоколов на сегодня. Он отлично обходит блокировки там, где обычные VPN бессильны, при этом сохраняя высокую скорость." },
    { "q": "На каких устройствах можно пользоваться VPN?", "a": "iOS, Android, Windows, macOS, Linux, роутеры и Smart TV." },
    { "q": "Сколько устройств можно подключить одновременно?", "a": "До 10 устройств на одной подписке." },
    { "q": "Есть ли бесплатный пробный период?", "a": "Да. Карта не требуется — попробуйте сервис и решите сами." },
    { "q": "Что делать, если ключ перестал работать?", "a": "Напишите нам в Telegram — мы обновим ключ за минуту." }
  ]
}
```

EN uses the verbatim Figma copy above.

---

### 3.7 Footer — `6506:23949`

Dark four-column footer.

| Property | Value |
|---|---|
| Section padding | `pt-[80px] pb-[30px] px-[104px]` |
| Background | `bg-neutral-900` (`#201e1e`) |
| Layout | `flex gap-4 items-start` — 4 columns |
| Column 1 | 496 px wide (with `pr-12`): logo, paragraph, *“Follow us on:”* + 4 social icon buttons (`bg-[#484747] rounded-xl p-2.5 size-11`) |
| Column 2 | 238 px — *“Платформа”* heading + 5 links |
| Column 3 | 240 px — *“Информация и поддержка”* + 5 links |
| Column 4 | flex-1 — *“Contact Us”* + form (email input, message textarea, send button) |
| Heading | `text-[20px] font-normal leading-[1.4] tracking-[-0.02em] text-neutral-60` |
| Link | `text-[16px] font-medium leading-[1.4] tracking-[-0.02em] text-neutral-20` |
| Bottom row | `pt-10 flex items-center justify-between border-t-0` — © text + “Designed by hyzyr” |

Form inputs use the existing `<Input />` but recoloured for dark backgrounds (white-on-dark variant — see § 4 component list).

#### Translations

```jsonc
"footer": {
  "tagline": "Открываем свободный и быстрый шлюз в цифровой мир. Prometey обеспечивает бескомпромиссную приватность и стабильность благодаря современным протоколам VLESS и OpenVPN.",
  "follow": "Мы в соцсетях:",
  "platform": {
    "title": "Платформа",
    "links": { "dashboard": "Кабинет", "benefits": "Преимущества", "pricing": "Тарифы", "connection": "Подключение", "faq": "F.A.Q" }
  },
  "support": {
    "title": "Информация и поддержка",
    "links": {
      "privacy":  "Политика конфиденциальности",
      "terms":    "Пользовательское соглашение",
      "refund":   "Политика возврата",
      "aup":      "Условия использования (AUP)",
      "report":   "Сообщить о проблеме"
    }
  },
  "contact": {
    "title":    "Связаться с нами",
    "email":    "Ваш e-mail",
    "message":  "Сообщение",
    "send":     "Отправить"
  },
  "rights":  "© 2026 Prometey VPN. Все права защищены.",
  "credit":  "Дизайн и разработка:"
}
```

EN: `Opening up a free and high-speed gateway…` / `Follow us on:` / `Platform` / `Dashboard, Benefits, Plans & Pricing, Connection, F.A.Q` / `Information and support` / `Privacy Policy, User Agreement, Refund Policy, Terms of Use (AUP), Report a problem` / `Contact Us, Your email address, Message, Send` / `© 2026 Prometey VPN. All rights reserved.` / `Designed and developed by:`.

---

## 4. Component Breakdown

| Component | File | Notes |
|---|---|---|
| `LandingHeader` | [src/components/landing/landing-header.tsx](../src/components/landing/landing-header.tsx) | Sticky, transparent over hero, blurred dark after scroll. `"use client"`. |
| `LandingFooter` | [src/components/landing/landing-footer.tsx](../src/components/landing/landing-footer.tsx) | Server component; only the contact form sub-component is `"use client"`. |
| `LanguageSwitcher` | [src/components/landing/language-switcher.tsx](../src/components/landing/language-switcher.tsx) | `useRouter`/`usePathname` from `@/i18n/navigation`. |
| `Hero` | [src/components/landing/hero.tsx](../src/components/landing/hero.tsx) | Server. |
| `BenefitsGrid` | [src/components/landing/benefits-grid.tsx](../src/components/landing/benefits-grid.tsx) | Server. |
| `BenefitCard` | [src/components/landing/benefit-card.tsx](../src/components/landing/benefit-card.tsx) | `props: { image; title; body; className? }` |
| `FeatureBenefitCard` | [src/components/landing/benefit-card.tsx](../src/components/landing/benefit-card.tsx) | Tall variant, accepts `cta`. |
| `ConnectGuide` | [src/components/landing/connect-guide.tsx](../src/components/landing/connect-guide.tsx) | Server. |
| `Testimonials` | [src/components/landing/testimonials.tsx](../src/components/landing/testimonials.tsx) | `"use client"` (slider arrows). |
| `Pricing` | [src/components/landing/pricing.tsx](../src/components/landing/pricing.tsx) | Server. |
| `PricingCard` | [src/components/landing/pricing-card.tsx](../src/components/landing/pricing-card.tsx) | `props: { plan; price; oldPrice?; perMonth?; period; discount?; highlight? }` |
| `Faq` | [src/components/landing/faq.tsx](../src/components/landing/faq.tsx) | `"use client"` (open/close state). |
| `ContactForm` | [src/components/landing/contact-form.tsx](../src/components/landing/contact-form.tsx) | `"use client"` — uses existing `Input` + `Button`. |

### Sample skeletons

```tsx
// src/components/landing/benefit-card.tsx
import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  image: StaticImageData;
  title: string;
  body: string;
  className?: string;
}

export function BenefitCard({ image, title, body, className }: BenefitCardProps) {
  return (
    <article className={cn(
      "relative h-[384px] overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-20 px-5 py-[26px]",
      className,
    )}>
      <h3 className="text-[24px] font-bold leading-[1.2] text-[#484747] lg:text-[36px]">{title}</h3>
      <p className="mt-3 text-[16px] leading-[1.4] text-[#6c6b6b] lg:text-[18px]">{body}</p>
      <Image src={image} alt="" className="pointer-events-none absolute bottom-0 right-0 h-[200px] w-auto object-contain" />
    </article>
  );
}

interface FeatureBenefitCardProps extends BenefitCardProps { cta: string }

export function FeatureBenefitCard({ image, title, body, cta, className }: FeatureBenefitCardProps) {
  return (
    <article className={cn(
      "relative flex flex-col overflow-hidden rounded-2xl border border-orange-400 bg-neutral-20 px-6 py-8",
      className,
    )}>
      <h3 className="text-[28px] font-bold leading-[1.2] text-[#2b2929] lg:text-[36px]">{title}</h3>
      <p className="mt-3 text-[18px] leading-[1.4] text-[#6c6b6b]">{body}</p>
      <div className="relative my-6 flex-1">
        <Image src={image} alt="" fill className="object-contain object-bottom" />
      </div>
      <div className="mt-auto flex justify-end">
        <Button asChild variant="default" size="md">
          <Link href="/signup">{cta}</Link>
        </Button>
      </div>
    </article>
  );
}
```

```tsx
// src/components/landing/pricing-card.tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: "oneMonth" | "year" | "halfYear" | "quarter";
  price: string;
  oldPrice?: string;
  perMonth?: string;
  period: string;
  discount?: string;
  highlight?: boolean;
}

export function PricingCard({ plan, price, oldPrice, perMonth, period, discount, highlight }: PricingCardProps) {
  const t = useTranslations("landing.pricing");

  const card = (
    <div className={cn(
      "flex h-[431px] flex-col items-center gap-4 rounded-3xl bg-neutral-20 px-6 py-8 shadow-[0_20px_32px_0_rgba(0,0,0,0.06)]",
      highlight && "h-[500px]",
    )}>
      <div className="flex w-full flex-1 flex-col items-start gap-6">
        <p className="text-[20px] font-extrabold uppercase tracking-[-0.03em] text-[#2b2929] lg:text-[24px]">
          {t(`plans.${plan}.label`)}
        </p>
        {oldPrice && (
          <p className="relative text-[40px] font-normal leading-[0.9] text-neutral-80 lg:text-[48px]">
            <span>{oldPrice} €</span>
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-[3px] -rotate-6 rounded bg-neutral-100" />
          </p>
        )}
        <div className="flex w-full items-center justify-between">
          <p className={cn(
            "text-[64px] font-bold leading-none tracking-[-0.03em] text-[#2b2929] lg:text-[86px]",
            highlight && "text-primary-500",
            plan === "halfYear" && "lg:text-[96px]",
          )}>
            {price} €
          </p>
          {discount && (
            <span className="rounded-full bg-primary-500/15 px-4 py-2 text-[16px] font-medium text-[#484747] backdrop-blur lg:text-[20px]">
              {discount}
            </span>
          )}
        </div>
        <div className="flex w-full justify-between border-t border-neutral-40 pb-1.5 pt-4 text-[18px] text-[#484747] lg:text-[24px]">
          {perMonth && <span>{t("perMonth", { value: perMonth })}</span>}
          <span>{period}</span>
        </div>
      </div>
      <Button asChild variant={highlight ? "orange" : "secondary"} size="lg" className="w-full">
        <Link href={`/signup?plan=${plan}`}>{t("select")}</Link>
      </Button>
    </div>
  );

  if (!highlight) return <div className="p-2">{card}</div>;
  return (
    <div className="rounded-[36px] bg-gradient-to-b from-yellow-100/30 to-yellow-50/10 p-2 shadow-[4px_11px_11px_0_rgba(0,0,0,0.12)] backdrop-blur-2xl">
      <p className="bg-gradient-to-b from-neutral-10 to-yellow-100 bg-clip-text py-3 text-center text-[28px] font-bold tracking-[0.02em] text-transparent">
        {t("bestOffer")}
      </p>
      {card}
    </div>
  );
}
```

```tsx
// src/components/landing/landing-footer.tsx (excerpt)
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "./contact-form";
import { Send, Instagram, Youtube, MessageCircle, Twitter } from "lucide-react";

const SOCIALS = [
  { Icon: Instagram,     href: "https://instagram.com/prometeyvpn" },
  { Icon: Youtube,       href: "https://youtube.com/@prometeyvpn"  },
  { Icon: MessageCircle, href: "https://t.me/prometeyvpn"          },
  { Icon: Twitter,       href: "https://x.com/prometeyvpn"         },
];

export function LandingFooter() {
  const t = useTranslations("landing.footer");
  return (
    <footer className="bg-neutral-900 px-5 pb-[30px] pt-16 lg:px-[104px] lg:pt-20">
      <div className="mx-auto w-full max-w-[1536px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[496px_238px_240px_1fr] lg:gap-4">
          {/* column 1 */}
          <div className="flex flex-col gap-6 lg:pr-12">
            <Link href="/" className="text-[28px] text-neutral-30 lg:text-[35px]">
              <span className="font-medium">Prometey</span>{" "}<span className="font-bold">VPN</span>
            </Link>
            <p className="text-[16px] leading-[1.4] tracking-[-0.02em] text-neutral-30 lg:text-[18px]">
              {t("tagline")}
            </p>
            <div className="flex flex-col gap-3 pt-6">
              <p className="text-[16px] leading-[1.4] tracking-[-0.02em] text-neutral-60">{t("follow")}</p>
              <div className="flex gap-2">
                {SOCIALS.map(({ Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer"
                     className="rounded-xl bg-[#484747] p-2.5 text-neutral-20 hover:bg-[#5a5a5a]">
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* column 2 */}
          <FooterColumn title={t("platform.title")} links={[
            { href: "/dashboard",  label: t("platform.links.dashboard")  },
            { href: "#benefits",   label: t("platform.links.benefits")   },
            { href: "#pricing",    label: t("platform.links.pricing")    },
            { href: "#guide",      label: t("platform.links.connection") },
            { href: "#faq",        label: t("platform.links.faq")        },
          ]} />
          {/* column 3 */}
          <FooterColumn title={t("support.title")} links={[
            { href: "/legal/privacy", label: t("support.links.privacy") },
            { href: "/legal/terms",   label: t("support.links.terms")   },
            { href: "/legal/refund",  label: t("support.links.refund")  },
            { href: "/legal/aup",     label: t("support.links.aup")     },
            { href: "/contact",       label: t("support.links.report")  },
          ]} />
          {/* column 4 */}
          <div className="flex flex-col gap-8">
            <p className="text-[20px] leading-[1.4] tracking-[-0.02em] text-neutral-60">{t("contact.title")}</p>
            <ContactForm />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-neutral-700/40 pt-10 text-[14px] text-neutral-60 lg:flex-row lg:items-center lg:text-[16px]">
          <p>{t("rights")}</p>
          <p>{t("credit")} <span className="font-semibold text-neutral-30">hyzyr</span></p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[20px] leading-[1.4] tracking-[-0.02em] text-neutral-60">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[16px] font-medium leading-[1.4] tracking-[-0.02em] text-neutral-20 hover:text-primary-300">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 5. Responsive Rules

Tailwind breakpoints (Tailwind v4 defaults — confirmed):

| Prefix | Min width | Used for |
|---|---|---|
| (base) | 0 px | Mobile-first (390 px Figma) |
| `sm:` | 640 px | small tablets — pricing cards 2-up |
| `md:` | 768 px | benefit grid 2-col, footer 2-col |
| `lg:` | 1024 px | full desktop layout (3-col benefits, 4-col pricing, 4-col footer, header nav visible) |
| `xl:` | 1280 px | (rarely needed) tighten max-widths |
| `2xl:` | 1536 px | matches the Figma content width — outer container caps here |

### Per-section structural differences (mobile vs desktop)

| Section | Mobile change |
|---|---|
| Hero | Adds an orange eyebrow above the H1; H1 wraps to two lines naturally; CTA `w-full max-w-[320px]`; secondary link unchanged |
| Header | Nav links + login replaced by burger drawer; logo collapses to symbol only |
| Benefits | 5 cards stack to 1-col (then 2-col `md`, 3-col `lg`); the highlighted card loses `row-span-2` until `lg` |
| Connect Guide | Title centred (`text-center lg:text-left`); illustration moves below the steps; rail height reduced |
| Testimonials | Cards become `min-w-[300px]` horizontal carousel with snap; arrows hidden; pagination dots remain |
| Pricing | Cards stack: 1-col → 2-col `sm` → 4-col `lg`. Best card loses extra height (`h-[460px]` instead of 500). Background card padding reduced to `px-5 pt-12 pb-16` |
| FAQ | Full-width items; question text 18 px instead of 24 px; chevron 4 × 5 |
| Footer | Single column (column 1 → column 4 stacked); social icons stay inline; bottom row stacks |

---

## 6. Translation Keys Appendix

Merge into existing `src/messages/ru.json` and `src/messages/en.json` under a top-level `landing` key.

### `messages/ru.json`

```jsonc
{
  "landing": {
    "header": {
      "nav": { "benefits": "Преимущества", "pricing": "Тарифы", "guide": "Как подключить", "faq": "F.A.Q" },
      "login": "Войти",
      "menu":  "Меню"
    },
    "hero": {
      "eyebrow": "Разверни интернет на 180°",
      "title":   { "line1": "Разверни интернет на 180°", "line2": "Твоя свобода в один клик" },
      "subtitle": "<b>Prometey — это скоростной VPN</b> для доступа к любым сервисам и стабильной работы бизнеса. <b>Одна подписка для 10 ваших устройств</b>. Просто работает там, где другие сдаются.",
      "ctaPrimary":   "Попробуйте Бесплатно",
      "ctaSecondary": "Как это устроено?"
    },
    "benefits": {
      "title": "Почему выбирают Prometey?",
      "items": {
        "support": { "title": "Поддержка",                        "body": "Отвечаем быстро. На связи живые люди в Telegram, не боты — поможем настроить и запустить." },
        "free":    { "title": "Попробуй. Это правда бесплатно",   "body": "Карта не нужна. Настоящий бесплатный тест: убедись в качестве — потом решай." },
        "rules":   { "title": "Твой интернет — твои правила",     "body": "Смотри любимые фильмы, общайся в соцсетях и читай новости без ограничений. Prometey убирает границы.", "cta": "Попробовать" },
        "family":  { "title": "Для тебя, семьи и близких",        "body": "До 10 устройств на одной подписке. Телефон, ноутбук, планшет, ТВ — хватит на всю семью." },
        "speed":   { "title": "Высокая скорость",                 "body": "Забудь о буферизации. Работай и смотри что хочешь на максимальной скорости. Без лимитов." }
      }
    },
    "guide": {
      "title": "Подключайся за <strong>2 минуты</strong>",
      "steps": [
        "Выбери тариф и оплати на сайте или через Telegram",
        "Получи свой конфиг на сайте или через бота",
        "Подключайся через приложение и пользуйся"
      ]
    },
    "testimonials": {
      "title": "Что говорят наши пользователи",
      "items": [
        { "name": "Михаил С.", "role": "Предприниматель",      "avatar": "/avatars/mikhail.png", "quote": "Наконец-то один VPN на всю семью. Подключил телефоны жены и детей, смарт-ТВ и рабочий ноутбук. И всё это в рамках одной подписки." },
        { "name": "Руслан Т.", "role": "Frontend-разработчик", "avatar": "/avatars/ruslan.png",  "quote": "Синхронизация с Telegram-ботом — это гениально. Удобно управлять подпиской прямо в мессенджере." },
        { "name": "Елена М.", "role": "Предприниматель",      "avatar": "/avatars/elena.png",   "quote": "Скорость отличная, ничего не лагает. Поддержка отвечает буквально за минуту." }
      ]
    },
    "pricing": {
      "title":     "Выберите подходящий тариф",
      "subtitle":  "Простая и прозрачная цена за стабильное и безопасное соединение на любом устройстве.",
      "bestOffer": "Лучшее предложение",
      "perMonth":  "{value} € / мес",
      "select":    "Выбрать",
      "plans": {
        "oneMonth": { "label": "ОДИН МЕСЯЦ", "period": "1 месяц"     },
        "year":     { "label": "ГОД",         "period": "12 месяцев" },
        "halfYear": { "label": "ПОЛГОДА",     "period": "6 месяцев"  },
        "quarter":  { "label": "ТРИ МЕСЯЦА",  "period": "3 месяца"   }
      }
    },
    "faq": {
      "title": "Часто задаваемые вопросы",
      "items": [
        { "q": "Что такое Prometey VPN и как он работает?",
          "a": "Prometey VPN — это сервис для безопасности и свободы в интернете. Мы используем современные протоколы (VLESS и OpenVPN) для шифрования трафика и скрытия вашего реального IP-адреса от провайдеров и сайтов." },
        { "q": "Чем ваши протоколы лучше обычных?",
          "a": "Мы используем VLESS — один из самых быстрых и «незаметных» протоколов на сегодня. Он отлично обходит блокировки там, где обычные VPN бессильны, при этом сохраняя высокую скорость." },
        { "q": "На каких устройствах можно пользоваться VPN?", "a": "iOS, Android, Windows, macOS, Linux, роутеры и Smart TV." },
        { "q": "Сколько устройств можно подключить одновременно?", "a": "До 10 устройств на одной подписке." },
        { "q": "Есть ли бесплатный пробный период?", "a": "Да. Карта не требуется — попробуйте сервис и решите сами." },
        { "q": "Что делать, если ключ перестал работать?", "a": "Напишите нам в Telegram — мы обновим ключ за минуту." }
      ]
    },
    "footer": {
      "tagline": "Открываем свободный и быстрый шлюз в цифровой мир. Prometey обеспечивает бескомпромиссную приватность и стабильность благодаря современным протоколам VLESS и OpenVPN.",
      "follow":  "Мы в соцсетях:",
      "platform": {
        "title": "Платформа",
        "links": { "dashboard": "Кабинет", "benefits": "Преимущества", "pricing": "Тарифы", "connection": "Подключение", "faq": "F.A.Q" }
      },
      "support": {
        "title": "Информация и поддержка",
        "links": {
          "privacy": "Политика конфиденциальности",
          "terms":   "Пользовательское соглашение",
          "refund":  "Политика возврата",
          "aup":     "Условия использования (AUP)",
          "report":  "Сообщить о проблеме"
        }
      },
      "contact": {
        "title":   "Связаться с нами",
        "email":   "Ваш e-mail",
        "message": "Сообщение",
        "send":    "Отправить"
      },
      "rights": "© 2026 Prometey VPN. Все права защищены.",
      "credit": "Дизайн и разработка:"
    }
  }
}
```

### `messages/en.json`

```jsonc
{
  "landing": {
    "header": {
      "nav":   { "benefits": "Benefits", "pricing": "Pricing", "guide": "How to connect", "faq": "F.A.Q" },
      "login": "Login",
      "menu":  "Menu"
    },
    "hero": {
      "eyebrow":      "Turn the internet 180°",
      "title":        { "line1": "Turn the internet 180°", "line2": "Your freedom in one click" },
      "subtitle":     "<b>Prometey is a high-speed VPN</b> for accessing any service and ensuring stable business operations. <b>One subscription for 10 of your devices</b>. It simply works where others give up.",
      "ctaPrimary":   "Try for Free",
      "ctaSecondary": "How it works?"
    },
    "benefits": {
      "title": "Why choose Prometey?",
      "items": {
        "support": { "title": "Customer Support",                  "body": "We respond quickly. Real people on Telegram, not bots; we will help you set up and launch everything." },
        "free":    { "title": "Try it. Truly free",                "body": "No card required. A real free test. See the quality for yourself, then decide." },
        "rules":   { "title": "Your internet — your rules",        "body": "Watch your favorite movies, chat on social media, and read any news without restrictions. Prometey removes borders.", "cta": "Try Now" },
        "family":  { "title": "For you, your family, and loved ones", "body": "Up to 10 devices on one subscription. Phone, laptop, tablet, TV. Enough for the whole family." },
        "speed":   { "title": "High Speed",                        "body": "Forget about buffering. Work and watch whatever you want at maximum speed. Without limits." }
      }
    },
    "guide": {
      "title": "Connect in <strong>2 minutes</strong>",
      "steps": [
        "Choose a plan and pay on the website or via Telegram",
        "Get your configuration file on the website or through our bot",
        "Connect via the app and start using"
      ]
    },
    "testimonials": {
      "title": "What our users are saying",
      "items": [
        { "name": "Mikhail S.", "role": "Entrepreneur",        "avatar": "/avatars/mikhail.png", "quote": "Finally, one VPN for the whole family. I connected my wife's and children's phones, the smart TV, and my work laptop. And all of this on a single subscription." },
        { "name": "Ruslan T.",  "role": "Frontend Developer",  "avatar": "/avatars/ruslan.png",  "quote": "Synchronization with the Telegram bot is genius. It's convenient to manage your subscription directly in the messenger." },
        { "name": "Elena M.",   "role": "Entrepreneur",        "avatar": "/avatars/elena.png",   "quote": "The speed is excellent, nothing lags. Support replies in literally a minute." }
      ]
    },
    "pricing": {
      "title":     "Choose a suitable plan",
      "subtitle":  "Simple and transparent pricing for a stable and secure connection on any device.",
      "bestOffer": "Best Offer",
      "perMonth":  "{value} € / mo",
      "select":    "Select",
      "plans": {
        "oneMonth": { "label": "ONE MONTH",     "period": "1 Month"    },
        "year":     { "label": "YEAR",          "period": "12 Months"  },
        "halfYear": { "label": "HALF YEAR",     "period": "6 Months"   },
        "quarter":  { "label": "THREE MONTHS",  "period": "3 Months"   }
      }
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "items": [
        { "q": "What is Prometey VPN and how does it work?",
          "a": "Prometey VPN is a service designed to ensure security and freedom on the internet. We use modern protocols (VLESS and OpenVPN) to encrypt your traffic and hide your real IP address from ISPs and websites." },
        { "q": "Why are your protocols better than regular ones?",
          "a": "We use VLESS — one of the fastest and most invisible protocols available today. It excels at bypassing blocks where conventional VPNs are powerless, while maintaining high connection speeds." },
        { "q": "On which devices can I use the VPN?", "a": "iOS, Android, Windows, macOS, Linux, routers and Smart TVs." },
        { "q": "How many devices can I connect simultaneously?", "a": "Up to 10 devices on a single subscription." },
        { "q": "Do you have a free trial period?", "a": "Yes. No card required — try the service and decide for yourself." },
        { "q": "What should I do if the key stops working?", "a": "Message us on Telegram — we will refresh the key within a minute." }
      ]
    },
    "footer": {
      "tagline": "Opening up a free and high-speed gateway to the digital world. Prometey provides uncompromising privacy and stability thanks to advanced VLESS and OpenVPN protocols.",
      "follow":  "Follow us on:",
      "platform": {
        "title": "Platform",
        "links": { "dashboard": "Dashboard", "benefits": "Benefits", "pricing": "Plans & Pricing", "connection": "Connection", "faq": "F.A.Q" }
      },
      "support": {
        "title": "Information and support",
        "links": {
          "privacy": "Privacy Policy",
          "terms":   "User Agreement",
          "refund":  "Refund Policy",
          "aup":     "Terms of Use (AUP)",
          "report":  "Report a problem"
        }
      },
      "contact": {
        "title":   "Contact Us",
        "email":   "Your email address",
        "message": "Message",
        "send":    "Send"
      },
      "rights": "© 2026 Prometey VPN. All rights reserved.",
      "credit": "Designed and developed by:"
    }
  }
}
```

---

## 7. Implementation Checklist

> Tackle in order; each step touches **one** file.

1. Add the `landing` block to `src/messages/ru.json`.
2. Mirror the same keys into `src/messages/en.json`.
3. Drop landing assets into `public/images/` (`hero-flame.png`, `guide-phone.png`, plan/social/avatar PNGs) and `public/avatars/`.
4. Create `src/components/landing/` directory.
5. Build `landing-header.tsx` (sticky nav, burger drawer, language switcher placeholder).
6. Build `language-switcher.tsx` (uses `useRouter` from `@/i18n/navigation`).
7. Build `landing-footer.tsx` (4-col layout) and stub `<ContactForm />`.
8. Build `contact-form.tsx` using existing `Input` + `Button` (variant `orange`, size `md`).
9. Wire up `src/app/[locale]/(public)/layout.tsx` to render header + `{children}` + footer.
10. Build `hero.tsx` (Server Component, decorative flame absolute, two CTAs).
11. Build `benefit-card.tsx` exporting `BenefitCard` + `FeatureBenefitCard`.
12. Build `benefits-grid.tsx` composing the 5 cards in the asymmetric grid.
13. Build `connect-guide.tsx` with the progress rail and right-side phone illustration.
14. Build `testimonials.tsx` (`"use client"` for snap-scroll arrows).
15. Build `pricing-card.tsx` accepting the props described in § 4.
16. Build `pricing.tsx` composing four `<PricingCard />` instances inside the dark rounded card.
17. Build `faq.tsx` (`"use client"` accordion, single-open behaviour).
18. Wire `src/app/[locale]/(public)/page.tsx` to render the seven section components in order.
19. QA against `docs/screenshots/landing-desktop.png` at 1728 px and `landing-mobile.png` at 390 px — re-export from Figma if needed.
20. Run `pnpm lint && pnpm build` to confirm no TS / next-intl key issues.
