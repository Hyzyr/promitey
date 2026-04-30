# Prometey VPN — Auth Page (`/[locale]/login`)

> **Source of truth:** Figma file `CGwoRb0tFSoEX6GfKTdabi`
> **Pre-requisites:** [`01-project-setup.md`](01-project-setup.md), [`02-components-spec.md`](02-components-spec.md), [`03-landing-page.md`](03-landing-page.md)
> All measurements are taken from Figma in **px**. Tailwind v4 utilities use the project tokens defined in `globals.css` (see 01-project-setup.md §5).

---

## Figma references

| View | Node | Direct link |
|:---|:---|:---|
| Desktop login (1728 px) | `6327:1079`  | <https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6327-1079>  |
| Mobile login (390 px)   | `6536:33509` | <https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6536-33509> |

### Screenshots

> Export each frame at 2× from Figma into [`docs/screenshots/`](screenshots/) using the names below — see [`screenshots/README.md`](screenshots/README.md).

![Desktop auth](screenshots/auth-desktop.png)
![Mobile auth](screenshots/auth-mobile.png)

> The Figma cut only contains the **login** screen. Registration is referenced as a sibling route (the secondary button reads *“Создать аккаунт”* and links to `/register`) but no dedicated register frame exists yet — replicate the same shell when the design lands. See §2 and §11.

---

## 1. Route & file map

All paths are workspace-relative.

```
src/
├── app/
│   └── [locale]/
│       └── (auth)/
│           ├── layout.tsx                       ← Auth shell (split-screen on lg+, single column on mobile)
│           ├── login/
│           │   └── page.tsx                     ← Server Component (this view)
│           └── register/
│               └── page.tsx                     ← (placeholder — mirrors login until Figma adds the design)
│
├── components/
│   ├── features/
│   │   └── auth/
│   │       ├── auth-card.tsx                    ← White rounded card shell (desktop+mobile)
│   │       ├── auth-header.tsx                  ← Translucent top bar with logo + "Возможности" link
│   │       ├── auth-hero-aside.tsx              ← Left half: orange-flame bg + glassmorphic slider
│   │       ├── auth-slider-pill.tsx             ← Bottom-left glass pill with rotating tagline
│   │       └── login-form.tsx                   ← "use client" — RHF + Zod, calls Server Action
│   └── ui/
│       ├── button.tsx                           ← Reused, see 02-components-spec.md §Button
│       └── input.tsx                            ← Reused, see 02-components-spec.md §Input
│
├── app/
│   └── [locale]/
│       └── (auth)/
│           └── login/
│               └── actions.ts                   ← "use server" — credentials login, typed errors
│
└── messages/
    ├── ru.json                                  ← `auth.*` namespace (see §6)
    └── en.json
```

| Route | File | Notes |
|:---|:---|:---|
| `/[locale]/login`    | [src/app/[locale]/(auth)/login/page.tsx](../src/app/%5Blocale%5D/(auth)/login/page.tsx) | Server Component — renders `<LoginForm>` |
| `/[locale]/register` | [src/app/[locale]/(auth)/register/page.tsx](../src/app/%5Blocale%5D/(auth)/register/page.tsx) | Placeholder — same shell, separate form (out of scope here) |
| Auth shell           | [src/app/[locale]/(auth)/layout.tsx](../src/app/%5Blocale%5D/(auth)/layout.tsx) | Split-screen aside + card wrapper |
| Server Action        | [src/app/[locale]/(auth)/login/actions.ts](../src/app/%5Blocale%5D/(auth)/login/actions.ts) | `"use server"` — see §10 |
| Translations RU      | [src/messages/ru.json](../src/messages/ru.json) | `auth.*` |
| Translations EN      | [src/messages/en.json](../src/messages/en.json) | `auth.*` |

> **Middleware reminder:** [`src/middleware.ts`](../src/middleware.ts) (`01-project-setup.md` §9) must allow unauthenticated traffic to `/[locale]/(auth)/...`. The `(admin)` group is the only protected segment.

---

## 2. Auth shell — `src/app/[locale]/(auth)/layout.tsx`

### 2.1 Desktop math (`lg` and up — Figma frame 1728 × 1035)

The shell is a single full-bleed hero. The card sits on the right, the orange-flame background on the left. There is **no separate dark right panel** rendered as content — the `#1e1e1e` strip behind the card is part of the background composition.

| Region | Figma | Tailwind |
|:---|:---|:---|
| Outer wrapper                | `1728 × 1035 px`, `bg-[#fbfbfb]` (neutral-10)                      | `relative min-h-screen w-full bg-neutral-10 lg:h-[1035px] lg:overflow-hidden` |
| Left flame backdrop          | `#ededed` (neutral-30) base, `1353 × 1035 px`, `left:-7px`         | absolute `inset-y-0 left-[-7px] w-[1353px] bg-neutral-30` |
| Dark blur shape              | `596 × 341 px`, `bg-[#201e1e]`, `blur:106.85px`, `opacity:9%`, `rotate:-7.35deg`, anchored `top:746.56 left:-110.91` | absolute, decorative `aria-hidden`, see code below |
| Image 130 (background flame) | `2150 × 1210 px`, `opacity:44%`, masked through Image 129          | absolute `aria-hidden`, masked PNG (see code) |
| Image 128 (foreground flame) | `1014 × 915 px`, anchored `top:32 left:82`, masked through Image 129 | absolute `aria-hidden` |
| Right dark gradient panel    | `550 × 1035 px`, `left:1178`, `bg-gradient-to-b from-[#201e1e] to-[#1e1e1e]` | absolute `right-0 top-0 h-full w-[550px] bg-gradient-to-b from-neutral-900 to-[#1e1e1e]` |
| Hero inner padding           | `px-[110px]`, `gap-[40px]`, `items-end justify-center`             | `flex h-full items-center justify-end px-[110px]` |
| `<AuthHeader>`               | absolute `top:0`, `1728 × 88` (`px-[101px] py-[24px]`), `backdrop-blur:24.75px`, `items-end justify-between` | absolute `inset-x-0 top-0 z-30` |
| `<AuthCard>`                 | `558 × min-h:750 px`, `bg-white`, `rounded-[36px]`, `pt-[60px] pb-[46px] px-[60px]`, `gap-[36px]`, shadow `0 19px 41.3px rgba(0,0,0,0.22), 0 49px 25.1px rgba(0,0,0,0.12)` | `relative z-20 w-[558px] min-h-[750px] rounded-[36px] bg-white px-[60px] pt-[60px] pb-[46px]` |
| `<AuthSliderPill>`           | absolute `bottom:63 left:96`, `671 × 118 px` (auto height), `rounded-[24px]` glass, see §3.5 | absolute `bottom-[63px] left-[96px] z-10 w-[671px]` |

### 2.2 Mobile math (`< lg` — Figma frame 390 × 874)

The mobile shell is a single column. The orange flame becomes a soft background bleed; there is no slider pill on mobile.

| Region | Figma | Tailwind |
|:---|:---|:---|
| Outer wrapper                | `390 × 874 px`, `bg-white`                                         | `relative min-h-[100dvh] w-full bg-white overflow-hidden` |
| Image 129 (soft halo)        | `1614 × 908 px`, centered, `opacity:44%`, anchored `top:7 left:6` from center | absolute `aria-hidden` (see code) |
| Image 128 (left flame)       | `532 × 480 px`, `top:156 left:-53`                                 | absolute `aria-hidden` |
| Inner wrapper                | `390 × 874 px`, `flex-col items-center justify-center`, `gap-[32px]`, `pt-[88px] pb-[60px] px-[20px]` | `relative z-10 flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-5 pt-[88px] pb-[60px]` |
| `<AuthHeader>`               | absolute `top:-2px`, `390 × 88`, `backdrop-blur:24.75px`, `px-[20px] py-[12px]`, `items-end justify-between` (right side empty on mobile — “Возможности” link is hidden) | absolute `inset-x-0 -top-0.5 z-30 lg:top-0` |
| `<AuthCard>`                 | `350 × 544 px` (full width minus 2 × 20 gutter), `bg-white`, `rounded-[36px]`, `px-[20px] py-[40px]`, `gap-[24px]`, shadow `0 12px 24px rgba(0,0,0,0.12), 0 32px 18px rgba(0,0,0,0.05)` | `w-full max-w-[350px] rounded-[36px] bg-white px-5 py-10` |
| `<AuthSliderPill>`           | not rendered on mobile                                              | `hidden lg:block` |

### 2.3 Implementation

```tsx
// src/app/[locale]/(auth)/layout.tsx
import { AuthHeader } from "@/components/features/auth/auth-header";
import { AuthHeroAside } from "@/components/features/auth/auth-hero-aside";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-white lg:h-[1035px] lg:bg-neutral-10">
      <AuthHeroAside />            {/* decorative bg + slider pill, lg-only slider */}
      <AuthHeader />               {/* sticky-style absolute top bar */}

      {/* Centered card on mobile / right-aligned card on desktop */}
      <div
        className={
          "relative z-20 flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-5 pt-[88px] pb-[60px] " +
          "lg:h-full lg:flex-row lg:items-center lg:justify-end lg:gap-10 lg:px-[110px] lg:pt-0 lg:pb-0"
        }
      >
        {children}
      </div>
    </div>
  );
}
```

```tsx
// src/components/features/auth/auth-hero-aside.tsx
import Image from "next/image";

export function AuthHeroAside() {
  return (
    <>
      {/* ── Mobile soft halo ─────────────────────────────────────── */}
      <Image
        src="/auth/flame-halo.png"
        alt=""
        aria-hidden
        priority
        width={1614}
        height={908}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[908px] w-[1614px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.44] lg:hidden"
      />
      <Image
        src="/auth/flame-foreground.png"
        alt=""
        aria-hidden
        priority
        width={532}
        height={480}
        className="pointer-events-none absolute left-[-53px] top-[156px] z-0 h-[480px] w-[532px] max-w-none object-cover lg:hidden"
      />

      {/* ── Desktop split-screen background ───────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
        {/* left grey base */}
        <div className="absolute left-[-7px] top-0 h-[1035px] w-[1353px] bg-neutral-30" />
        {/* dark blurred ellipse */}
        <div
          className="absolute left-[-110.91px] top-[746.56px] flex h-[414.878px] w-[634.824px] items-center justify-center"
          style={{ transform: "rotate(-7.35deg)" }}
        >
          <div className="h-[341.408px] w-[596.034px] bg-neutral-900 opacity-[0.09] blur-[106.85px]" />
        </div>
        {/* base flame, masked */}
        <div
          className="absolute left-[calc(50%-396px)] top-[calc(50%-71.5px)] h-[1210px] w-[2150px] -translate-x-1/2 -translate-y-1/2 opacity-[0.44]"
          style={{
            WebkitMaskImage: "url('/auth/flame-mask.png')",
            maskImage: "url('/auth/flame-mask.png')",
            WebkitMaskSize: "1728px 1035px",
            maskSize: "1728px 1035px",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "607px 159px",
            maskPosition: "607px 159px",
          }}
        >
          <Image src="/auth/flame-bg.png" alt="" fill priority className="object-cover" />
        </div>
        {/* foreground flame, masked */}
        <div
          className="absolute left-[82px] top-[32px] h-[915px] w-[1014px]"
          style={{
            WebkitMaskImage: "url('/auth/flame-mask.png')",
            maskImage: "url('/auth/flame-mask.png')",
            WebkitMaskSize: "1728px 1035px",
            maskSize: "1728px 1035px",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "-82px -32px",
            maskPosition: "-82px -32px",
          }}
        >
          <Image src="/auth/flame-foreground.png" alt="" fill priority className="object-cover" />
        </div>
        {/* right dark panel */}
        <div className="absolute right-0 top-0 h-[1035px] w-[550px] bg-gradient-to-b from-neutral-900 to-[#1e1e1e]" />
      </div>

      {/* ── Glass slider pill (desktop only) ───────────────────────── */}
      <SliderPillDesktop />
    </>
  );
}
```

> The image filenames above (`flame-halo.png`, `flame-foreground.png`, `flame-bg.png`, `flame-mask.png`) are placeholders. Export the assets from Figma node `6327:1079` (sub-nodes `6490:20851`, `6490:20852`, `6359:623`) into `public/auth/` before shipping. Image filename inventory is tracked in [`docs/screenshots/README.md`](screenshots/README.md).

---

## 3. Pixel-perfect spec tables

### 3.1 Auth shell container

| Property | Desktop (`lg+`) | Mobile (`< lg`) |
|:---|:---|:---|
| Frame width                    | `1728 px`                                | `390 px` |
| Frame height                   | `1035 px`                                | `874 px` (auto on real devices) |
| Background                     | `#fbfbfb` (`bg-neutral-10`)              | `#ffffff` (`bg-white`) |
| Card alignment                 | right-aligned, vertically centred        | centred, single column |
| Outer horizontal padding       | `110 px` (`px-[110px]`)                  | `20 px` (`px-5`) |
| Top padding (under header)     | `0` (card centred)                       | `88 px` (`pt-[88px]`) |
| Bottom padding                 | `0` (card centred)                       | `60 px` (`pb-[60px]`) |
| Gap between regions            | `40 px` (`gap-10`) — card ↔ slider       | `32 px` (`gap-8`) — card ↔ policy text |

### 3.2 `<AuthHeader>`

Source nodes: desktop `I6327:1079;6324:396`, mobile `6536:33567`.

| Property | Desktop | Mobile |
|:---|:---|:---|
| Position             | absolute `top:0 left:0`           | absolute `top:-2px left:0` |
| Height               | `88 px`                           | `88 px` |
| Width                | `1728 px` (full)                  | `390 px` (full) |
| Padding              | `px-[101px] py-[24px]`            | `px-[20px] py-[12px]` |
| Background           | none — relies on `backdrop-blur:24.75px` over the flame | same |
| Vertical alignment   | `items-end justify-between`       | `items-end justify-between` |
| Logo size            | `27.66 × 46 px` glyph             | `26.46 × 44 px` glyph |
| Brand wordmark       | "Prometey VPN" — `Manrope` Medium + Bold split, `28 px`, `text-neutral-900` (`#201e1e`) | "Prometey VPN" — `Manrope` Medium + Bold split, `19.984 px`, `text-neutral-900` (`#201e1e`) |
| Brand → glyph gap    | `20 px` (`gap-5`), `items-end`    | `16 px` (`gap-4`), `items-center` |
| Right slot           | "Возможности" — `Montserrat` Regular `18 px`, `text-neutral-200` (`#797878`) | hidden (the right slot is empty in the mobile cut) |

> Figma uses **Manrope** for the wordmark and **Montserrat** for the right link. The project ships **Inter** only (see 01-setup §4). Decision: keep Inter for body and the “Возможности” link; if the brand requires Manrope, add it to `app/layout.tsx` next to Inter and expose it as `--font-display` (same approach noted in 05-dashboard.md §3 “Font note”).

### 3.3 `<AuthCard>` shell

| Property | Desktop | Mobile |
|:---|:---|:---|
| Width                | `558 px`                                 | `100% − 2×20px gutter` (`max-w-[350px]`) |
| Min-height           | `750 px`                                 | `544 px` (fixed in Figma) |
| Background           | `#ffffff`                                | `#ffffff` |
| Border radius        | `36 px` (`rounded-[36px]`)               | `36 px` (`rounded-[36px]`) |
| Padding              | `pt-[60px] pb-[46px] px-[60px]`          | `px-5 py-10` |
| Inner stack gap      | `36 px` (`gap-9`) outer / `24 px` (`gap-6`) inner-content | `24 px` (`gap-6`) |
| Inner-content height | fixed `518 px` (Figma) — let it grow naturally in code | fixed `~440 px` |
| Box-shadow           | `0 19px 41.3px rgba(0,0,0,0.22), 0 49px 25.1px rgba(0,0,0,0.12)` | `0 12px 24px rgba(0,0,0,0.12), 0 32px 18px rgba(0,0,0,0.05)` |

Tailwind one-liners:

```tsx
// Desktop
"shadow-[0_19px_41.3px_rgba(0,0,0,0.22),0_49px_25.1px_rgba(0,0,0,0.12)]"
// Mobile
"shadow-[0_12px_24px_rgba(0,0,0,0.12),0_32px_18px_rgba(0,0,0,0.05)]"
```

### 3.4 Title block

| Property | Desktop | Mobile |
|:---|:---|:---|
| Wrapper           | `flex-col items-center gap-[12px] pb-[12px]` | same |
| Title text        | "Вход" / "Sign in"                       | same |
| Title font        | Manrope Bold `36 px`, `leading-[1.1]`, `tracking-[-0.72px]` (`-0.02em`), `capitalize`, color `#2b2929` (`text-neutral-800`) | Manrope Bold `28 px`, `leading-[1.1]`, `tracking-[-0.56px]` (`-0.02em`), color `#2b2929` |
| Subtitle text     | "Авторизуйтесь, чтобы продолжить работу." | same |
| Subtitle font     | Manrope Regular `16 px`, `leading-[1.6]`, color `#6c6b6b` (`text-neutral-300`) | Manrope Regular `14 px`, `leading-[1.6]`, color `#6c6b6b` |

```tsx
// Desktop title
<h1 className="capitalize text-center text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-neutral-800">
  {t("title")}
</h1>
<p className="text-center text-[16px] leading-[1.6] text-neutral-300 lg:text-[16px]">
  {t("subtitle")}
</p>
```

### 3.5 Form (input column)

> The Figma cut shows **plain bordered placeholders** rather than the filled `<Input>` from `02-components-spec.md`. We have two options:
> 1. Reuse `<Input>` as-is (`bg-neutral-20`, no border) — already shipped.
> 2. Add an `outlined` variant to `<Input>` (`bg-transparent` + `border-neutral-60`).
>
> **Decision:** add a single `variant?: "filled" | "outlined"` prop to `<Input>` (default `"filled"`). The auth page passes `variant="outlined"` to match the Figma. This keeps the dashboard untouched and avoids a parallel component. See §3.5.1.

| Property | Desktop | Mobile |
|:---|:---|:---|
| Form wrapper width    | `100%` of card inner (`438 px` content area) | `306 px` |
| Vertical gap          | `16 px` (`gap-4`)                        | `12 px` (`gap-3`) |
| Items alignment       | `items-start`                            | `items-start` |

#### Input field (outlined variant)

| Property | Desktop | Mobile |
|:---|:---|:---|
| Width                 | `100%`                                   | `306 px` |
| Height                | derived (`py-[18px]` + `text` ≈ `58 px`) | derived (`py-[14px]` + `text` ≈ `48 px`) |
| Padding               | `px-[22px] py-[18px]`                    | `px-[16px] py-[14px]` |
| Border                | `1 px solid #bab9b9` (`neutral-60`)      | `1 px solid #bab9b9` |
| Border radius         | `16 px` (`rounded-2xl`)                  | `16 px` (`rounded-2xl`) |
| Background            | transparent                              | transparent |
| Text colour (filled)  | `#484747` (`text-neutral-600`)           | same |
| Placeholder colour    | `#484747` (`text-neutral-600`) — Figma uses the same colour for placeholder and value because the field is empty in both states | same |
| Font                  | `Roboto` Medium `16 px`, `leading-[1.4]`, `tracking-[0.32px]` (`0.02em`) | same |
| Focus ring            | violet `#7B3FE4` `1.5 px` (consistent with `02-components-spec.md` §Input) | same |
| Error border          | `1.5 px solid #f6261c` (`red-500`) + `bg-primary-50` | same |

Roboto isn’t loaded in `01-setup.md`. Use **Inter Medium** instead — visually equivalent at `16 px / 1.4` and avoids a second font payload.

#### 3.5.1 Add an outlined variant to `<Input>`

```diff
 // src/components/ui/input.tsx
 interface InputProps extends React.ComponentPropsWithRef<"input"> {
   label?: string;
   error?: string;
   hint?: string;
   leftIcon?: LucideIcon;
   rightIcon?: LucideIcon;
+  variant?: "filled" | "outlined";
+  size?: "md" | "lg";          // md = mobile (h ≈ 48), lg = desktop (h ≈ 58)
 }

-export function Input({ ref, label, error, hint, leftIcon: LeftIcon, rightIcon: RightIcon, className, id, ...props }: InputProps) {
+export function Input({
+  ref, label, error, hint,
+  leftIcon: LeftIcon, rightIcon: RightIcon,
+  variant = "filled", size = "lg",
+  className, id, ...props
+}: InputProps) {
   ...
   <input
     ref={ref}
     id={inputId}
     className={cn(
-      "h-[58px] w-full rounded-xl bg-neutral-20 px-4 text-base font-medium",
-      "text-neutral-900 outline-none transition-all duration-150",
-      "placeholder:font-normal placeholder:text-neutral-80",
+      "w-full rounded-2xl text-base font-medium tracking-[0.02em] outline-none transition-all duration-150",
+      // size
+      size === "lg" && "px-[22px] py-[18px] leading-[1.4]",
+      size === "md" && "px-[16px] py-[14px] leading-[1.4]",
+      // variant
+      variant === "filled"   && "bg-neutral-20 text-neutral-900 placeholder:font-normal placeholder:text-neutral-80",
+      variant === "outlined" && "border border-neutral-60 bg-transparent text-neutral-600 placeholder:font-normal placeholder:text-neutral-600",
       "focus:border-[1.5px] focus:border-[#7B3FE4]",
       error && "border-[1.5px] border-red-500 bg-primary-50",
       "disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-80",
       LeftIcon  && "pl-11",
       RightIcon && "pr-11",
       className,
     )}
     {...props}
   />
```

> The change is purely additive — every existing dashboard form continues to render the filled variant. Update the table in `02-components-spec.md` after this lands.

#### Forgot-password link (`6328:1260`)

| Property | Desktop | Mobile |
|:---|:---|:---|
| Position           | full row, `items-center justify-center`  | same |
| Text               | "Забыли пароль?" / "Forgot password?"    | same |
| Font               | Manrope SemiBold `18 px`, `leading-normal`, `tracking-[0.18px]` (`0.01em`), color `#6c6b6b` (`text-neutral-300`), `underline decoration-solid` | Manrope SemiBold `16 px`, `tracking-[0.16px]`, same colour + underline |
| Hover              | `text-neutral-600` (`#484747`)           | same |
| Focus              | `outline-none` + violet `ring-2 ring-[#7B3FE4]/40 rounded-md` | same |

### 3.6 Action buttons

| Property | Desktop | Mobile |
|:---|:---|:---|
| Button stack width    | derived (Figma `auto`)                   | `272 px` |
| Stack gap             | `12 px` (`gap-3`)                        | `8 px` (`gap-2`) |
| Primary button        | `354 × 56 px` (`px-[32px] py-[16px]`), `rounded-[16px]`, `bg-[#ff6d41]` (`bg-primary-500`) | `100% × 46 px` (`px-[24px] py-[12px]`), `rounded-[12px]`, `bg-[#ff6d41]` |
| Primary label         | "Войти" — Manrope SemiBold `18 px`, color `#201e1e` (`text-neutral-900`), `tracking-[0.36px]` (`0.02em`) | "Войти" — Manrope SemiBold `16 px`, color `#201e1e`, `tracking-[0.32px]` |
| Secondary button      | full width (`354 × 56 px`), `bg-[rgba(43,41,41,0.10)]`, `rounded-[16px]`, shadow `0 4px 46px 10px rgba(255,200,0,0.06)` | full width (`272 × 46 px`), `bg-[rgba(43,41,41,0.12)]`, `rounded-[12px]`, same shadow |
| Secondary label       | "Создать аккаунт" — Manrope SemiBold `18 px`, color `#2b2929` (`text-neutral-800`), `tracking-[0.36px]` | "Создать аккаунт" — Manrope SemiBold `16 px`, color `#2b2929`, `tracking-[0.32px]` |

> The `<Button>` component from `02-components-spec.md` defaults to `rounded-full` and white text on the orange variant. The auth Figma uses `rounded-[16px]` (desktop) / `rounded-[12px]` (mobile) **and dark text on the orange CTA**. We do **not** modify the global `<Button>` — instead, the auth form passes `className` overrides:

```tsx
<Button
  type="submit"
  variant="orange"
  size="lg"
  className="w-full max-w-[272px] rounded-[12px] !text-neutral-900 lg:max-w-[354px] lg:rounded-[16px]"
>
  {t("submit")}
</Button>

<Button
  asChild
  variant="secondary"
  size="lg"
  className="w-full max-w-[272px] rounded-[12px] bg-neutral-800/10 !text-neutral-800 shadow-[0_4px_46px_10px_rgba(255,200,0,0.06)] lg:max-w-[354px] lg:rounded-[16px]"
>
  <Link href="/register">{t("createAccount")}</Link>
</Button>
```

### 3.7 Inline error message

Source: `I6327:1079;6324:192;6586:1373` (only present in the desktop cut, but the same string applies to mobile at `text-[14px]`).

| Property | Desktop | Mobile |
|:---|:---|:---|
| Width            | `324 px`                                 | `260 px` (proportional) |
| Font             | Manrope Regular `16 px`, `leading-[1.5]`, `tracking-[0.16px]`, color `#f6261c` (`text-red-500`) | Manrope Regular `14 px`, same colour |
| Alignment        | `text-center`                            | `text-center` |
| Anchor           | renders below the secondary button, **before** the privacy footer | same |
| Role             | `role="alert" aria-live="polite"`         | same |

### 3.8 Privacy footer (`6328:1286` / `6536:33773`)

| Property | Desktop | Mobile |
|:---|:---|:---|
| Width            | `438 px`                                 | full width |
| Height           | `46 px` (Figma) — `auto` in code         | `auto` |
| Font (lead)      | Manrope Regular `16 px`, `leading-[1.6]`, color `#484747` (`text-neutral-600`) | Manrope Regular `14 px`, `leading-[1.6]`, color `#201e1e` (`text-neutral-900`) |
| Font (link)      | Manrope SemiBold `16 px`, `leading-[1.6]`, color `#6c6b6b` (`text-neutral-300`), `underline decoration-solid` | Manrope SemiBold `14 px`, color `#201e1e` (`text-neutral-900`), `underline` |
| Text RU          | "Выполняя вход, вы подтверждаете свое согласие с **Политикой конфиденциальности.**" | same |
| Text EN          | "By signing in, you accept our **Privacy Policy.**" | same |

### 3.9 Slider pill (desktop only — `6339:1423`)

A glass-morphism pill anchored to the bottom-left of the hero, showing a rotating tagline.

| Property | Desktop |
|:---|:---|
| Position           | absolute `bottom:63 left:96`                                           |
| Width              | `671 px`                                                               |
| Height             | `auto` (≈ `118 px` with content + indicators)                          |
| Padding            | `pt-[16px] pb-[44px] px-[24px]`                                        |
| Border radius      | `24 px` (`rounded-3xl`)                                                |
| Background         | gradient SVG overlay (4 mirrored quadrants of `linear-gradient(rgba(249,110,103,1), rgba(252,177,121,0.5), rgba(254,243,139,0))`) on top of `rgba(255,255,255,0.05)`, blended with `backdrop-blur:9.25px` |
| Outer shadows      | `0 93px 16.6px -52px rgba(0,0,0,0.05), 0 56px 36.9px -36px rgba(0,0,0,0.12)` |
| Inner shadows      | `inset 0 4px 39.5px 2px rgba(255,255,255,0.27), inset 0.5px -1px 1px 0 rgba(0,0,0,0.59), inset 0 -3px 28.1px 6px rgba(255,255,255,0.18)` |
| Tagline font       | Montserrat SemiBold `24 px`, `leading-normal`, `tracking-[-0.24px]` (`-0.01em`), color `#fffce6` (`text-yellow-50`), `text-center`        |
| Indicator block    | absolute `bottom:15`, `left:50%`, `gap:16`, `items-center`             |
| Active indicator   | `72 × 5 px`, `bg-neutral-30 opacity-40 rounded-[8px]` track + `29 × 5 px` `bg-neutral-600` (`#484747`) overlay (current) |
| Idle indicators    | `42 × 5 px`, `bg-neutral-30 opacity-40 rounded-[8px]` (×2)             |

```tsx
// src/components/features/auth/auth-slider-pill.tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SLIDE_KEYS = ["fullPower", "global", "devices"] as const;

export function AuthSliderPill() {
  const t = useTranslations("auth.slider");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDE_KEYS.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-roledescription="carousel"
      className={cn(
        "absolute bottom-[63px] left-[96px] z-10 hidden w-[671px] overflow-hidden rounded-3xl px-6 pt-4 pb-11",
        "bg-white/5 backdrop-blur-[9.25px]",
        "shadow-[0_93px_16.6px_-52px_rgba(0,0,0,0.05),0_56px_36.9px_-36px_rgba(0,0,0,0.12)]",
        "before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[inset_0_4px_39.5px_2px_rgba(255,255,255,0.27),inset_0.5px_-1px_1px_0_rgba(0,0,0,0.59),inset_0_-3px_28.1px_6px_rgba(255,255,255,0.18)] before:pointer-events-none",
        "lg:block",
      )}
    >
      <p className="text-center text-[24px] font-semibold leading-normal tracking-[-0.01em] text-yellow-50">
        {t(SLIDE_KEYS[index])}
      </p>
      <div className="absolute bottom-[15px] left-1/2 flex -translate-x-1/2 items-center gap-4">
        {SLIDE_KEYS.map((_, i) => (
          <span key={i} className="relative block h-[5px] w-[42px] rounded-[8px] bg-neutral-30/40">
            {i === index && (
              <span className="absolute inset-y-0 left-0 block w-[29px] rounded-[8px] bg-neutral-600" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
```

> The Figma renders the active indicator as a `72 × 5 px` track with a `29 × 5 px` filled overlay; we render every indicator as `42 × 5 px` and overlay the same `29 × 5 px` fill on the active one. Visually identical, simpler markup.

---

## 4. `login/page.tsx` — Server Component

```tsx
// src/app/[locale]/(auth)/login/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/features/auth/login-form";
import { AuthCard } from "@/components/features/auth/auth-card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.login");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function LoginPage() {
  const t = await getTranslations("auth.login");
  return (
    <AuthCard>
      <header className="flex flex-col items-center gap-3 pb-3">
        <h1 className="text-center text-[28px] font-bold capitalize leading-[1.1] tracking-[-0.02em] text-neutral-800 lg:text-[36px]">
          {t("title")}
        </h1>
        <p className="text-center text-[14px] leading-[1.6] text-neutral-300 lg:text-[16px]">
          {t("subtitle")}
        </p>
      </header>
      <LoginForm />
    </AuthCard>
  );
}
```

```tsx
// src/components/features/auth/auth-card.tsx
import { cn } from "@/lib/utils";

export function AuthCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative z-20 flex w-full max-w-[350px] flex-col items-center justify-center gap-6 rounded-[36px] bg-white px-5 py-10",
        "shadow-[0_12px_24px_rgba(0,0,0,0.12),0_32px_18px_rgba(0,0,0,0.05)]",
        "lg:max-w-[558px] lg:min-h-[750px] lg:gap-9 lg:px-[60px] lg:pt-[60px] lg:pb-[46px]",
        "lg:shadow-[0_19px_41.3px_rgba(0,0,0,0.22),0_49px_25.1px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

---

## 5. `LoginForm` — `"use client"`, RHF + Zod

```tsx
// src/components/features/auth/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useTransition, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction, type LoginActionResult } from "@/app/[locale]/(auth)/login/actions";

export function LoginForm() {
  const t = useTranslations("auth.login");
  const tErrors = useTranslations("auth.errors");
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z.object({
    identifier: z
      .string()
      .min(1, tErrors("identifierRequired"))
      .max(120, tErrors("identifierTooLong")),
    password: z
      .string()
      .min(8, tErrors("passwordTooShort"))
      .max(128, tErrors("passwordTooLong")),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const submit = handleSubmit((values) => {
    setServerError(null);
    startTransition(async () => {
      const result: LoginActionResult = await loginAction(values);
      if (result.status === "error") {
        setServerError(tErrors(result.code));
      }
    });
  });

  const submitting = isSubmitting || isPending;

  return (
    <form onSubmit={submit} noValidate className="flex w-full flex-col items-center gap-6">
      {/* Inputs */}
      <div className="flex w-full max-w-[306px] flex-col items-start gap-3 lg:max-w-none lg:gap-4">
        <Input
          {...register("identifier")}
          variant="outlined"
          size="md"
          autoComplete="username"
          inputMode="email"
          placeholder={t("identifier.placeholder")}
          aria-label={t("identifier.label")}
          aria-invalid={!!errors.identifier}
          aria-describedby={errors.identifier ? "identifier-err" : undefined}
          error={errors.identifier?.message}
          className="lg:px-[22px] lg:py-[18px]"
        />
        <Input
          {...register("password")}
          variant="outlined"
          size="md"
          type="password"
          autoComplete="current-password"
          placeholder={t("password.placeholder")}
          aria-label={t("password.label")}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-err" : undefined}
          error={errors.password?.message}
          className="lg:px-[22px] lg:py-[18px]"
        />

        <div className="flex w-full items-center justify-center">
          <Link
            href="/forgot-password"
            className={
              "rounded-md text-[16px] font-semibold tracking-[0.01em] text-neutral-300 underline decoration-solid " +
              "hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/40 " +
              "lg:text-[18px]"
            }
          >
            {t("forgot")}
          </Link>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full max-w-[272px] flex-col items-stretch gap-2 lg:max-w-[354px] lg:gap-3">
        <Button
          type="submit"
          variant="orange"
          size="lg"
          isLoading={submitting}
          disabled={!isValid && !submitting}
          className="w-full rounded-[12px] !text-neutral-900 lg:rounded-[16px]"
        >
          {t("submit")}
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className={
            "w-full rounded-[12px] bg-neutral-800/10 !text-neutral-800 " +
            "shadow-[0_4px_46px_10px_rgba(255,200,0,0.06)] hover:bg-neutral-800/15 " +
            "lg:rounded-[16px]"
          }
        >
          <Link href="/register">{t("createAccount")}</Link>
        </Button>
      </div>

      {/* Server error */}
      {serverError && (
        <p
          role="alert"
          aria-live="polite"
          className="w-[260px] text-center text-[14px] leading-[1.5] tracking-[0.01em] text-red-500 lg:w-[324px] lg:text-[16px]"
        >
          {serverError}
        </p>
      )}

      {/* Privacy footer */}
      <p className="w-full max-w-[438px] text-center text-[14px] leading-[1.6] text-neutral-900 lg:text-[16px] lg:text-neutral-600">
        {t.rich("policy", {
          link: (chunks) => (
            <Link
              href="/privacy"
              className="font-semibold underline decoration-solid text-neutral-900 hover:text-neutral-600 lg:text-neutral-300"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
```

> The form uses `register("identifier")` (not `email`) because the Figma copy is *“Электронная почта или логин”* — users may sign in with either an email or a username. The Zod schema therefore validates **non-empty + length** rather than `z.string().email()`.

---

## 6. Translations

### `messages/ru.json` — append the `auth` namespace

```json
{
  "auth": {
    "close": "Закрыть",
    "header": {
      "features": "Возможности"
    },
    "login": {
      "title": "Вход",
      "subtitle": "Авторизуйтесь, чтобы продолжить работу.",
      "identifier": {
        "label": "Электронная почта или логин",
        "placeholder": "Электронная почта или логин"
      },
      "password": {
        "label": "Пароль",
        "placeholder": "Пароль"
      },
      "forgot": "Забыли пароль?",
      "submit": "Войти",
      "createAccount": "Создать аккаунт",
      "policy": "Выполняя вход, вы подтверждаете свое согласие с <link>Политикой конфиденциальности.</link>"
    },
    "errors": {
      "identifierRequired": "Введите электронную почту или логин.",
      "identifierTooLong": "Слишком длинное значение (максимум 120 символов).",
      "passwordTooShort": "Минимум 8 символов.",
      "passwordTooLong": "Слишком длинный пароль (максимум 128 символов).",
      "invalidCredentials": "Имя пользователя или пароль неверны, проверьте Caps Lock и попробуйте снова.",
      "rateLimited": "Слишком много попыток. Подождите минуту и попробуйте снова.",
      "network": "Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.",
      "unknown": "Что-то пошло не так. Попробуйте позже."
    },
    "slider": {
      "fullPower": "Сеть на полной мощности: работайте без искусственных рамок и ограничений скорости.",
      "global": "Подключайся к серверам в десятках стран — без географических ограничений.",
      "devices": "Одна подписка для 10 устройств: телефон, ноутбук, планшет и ТВ всей семьи."
    }
  }
}
```

### `messages/en.json` — append the `auth` namespace

```json
{
  "auth": {
    "close": "Close",
    "header": {
      "features": "Features"
    },
    "login": {
      "title": "Sign in",
      "subtitle": "Authorise to continue working.",
      "identifier": {
        "label": "Email or username",
        "placeholder": "Email or username"
      },
      "password": {
        "label": "Password",
        "placeholder": "Password"
      },
      "forgot": "Forgot password?",
      "submit": "Sign in",
      "createAccount": "Create account",
      "policy": "By signing in, you accept our <link>Privacy Policy.</link>"
    },
    "errors": {
      "identifierRequired": "Enter your email or username.",
      "identifierTooLong": "Value is too long (max 120 characters).",
      "passwordTooShort": "At least 8 characters.",
      "passwordTooLong": "Password is too long (max 128 characters).",
      "invalidCredentials": "Username or password is wrong, check if caps lock is on and try again.",
      "rateLimited": "Too many attempts. Please wait a minute and try again.",
      "network": "Couldn’t reach the server. Check your connection and try again.",
      "unknown": "Something went wrong. Please try again later."
    },
    "slider": {
      "fullPower": "Network at full power: work without artificial limits or speed throttling.",
      "global": "Connect to servers in dozens of countries — no geographic restrictions.",
      "devices": "One subscription for 10 devices: phone, laptop, tablet, and family TV."
    }
  }
}
```

---

## 7. Zod schema with translated errors

The schema is constructed **inside** `LoginForm` so that `useTranslations("auth.errors")` provides messages at render time (avoids importing translations into a top-level module).

```tsx
const tErrors = useTranslations("auth.errors");

const schema = z.object({
  identifier: z
    .string()
    .min(1,   tErrors("identifierRequired"))
    .max(120, tErrors("identifierTooLong")),
  password: z
    .string()
    .min(8,   tErrors("passwordTooShort"))
    .max(128, tErrors("passwordTooLong")),
});
```

> If you ever need `email`-strict validation (e.g. for `/register`), branch on identifier shape:
> ```ts
> identifier: z.union([
>   z.string().email(tErrors("emailInvalid")),
>   z.string().min(3, tErrors("usernameTooShort")).regex(/^[a-zA-Z0-9._-]+$/, tErrors("usernameChars")),
> ]),
> ```

---

## 8. Responsive behaviour

The Tailwind breakpoint is the project default — `lg = 1024 px`. Everything above `lg` follows the desktop spec; everything below follows the mobile spec.

| Element | `< lg` | `≥ lg` |
|:---|:---|:---|
| Layout direction              | column, centred                          | row, card right-aligned |
| Background                    | white + soft halo flame + foreground flame | grey base + masked flame composition + dark right gradient panel |
| `<AuthHeader>` right slot     | hidden                                   | "Возможности" link visible |
| Card padding                  | `px-5 py-10`                             | `pt-[60px] pb-[46px] px-[60px]` |
| Card width                    | `100% − 40 px gutter` capped at `350 px` | fixed `558 px` |
| Card radius                   | `36 px`                                  | `36 px` (same) |
| Card shadow                   | `0 12px 24px / 0 32px 18px`              | `0 19px 41.3px / 0 49px 25.1px` |
| Title font-size               | `28 px`                                  | `36 px` |
| Subtitle font-size            | `14 px`                                  | `16 px` |
| Form gap                      | `12 px`                                  | `16 px` |
| Form width                    | `306 px`                                 | `100%` of card content (`438 px`) |
| Input padding                 | `px-[16px] py-[14px]`                    | `px-[22px] py-[18px]` |
| Forgot link font-size         | `16 px`                                  | `18 px` |
| Button stack width            | `272 px`                                 | `354 px` |
| Button radius                 | `12 px`                                  | `16 px` |
| Button label font-size        | `16 px` (`tracking-[0.32px]`)            | `18 px` (`tracking-[0.36px]`) |
| Inline error font-size        | `14 px`                                  | `16 px` |
| Privacy footer font-size      | `14 px`                                  | `16 px` |
| Slider pill                   | hidden                                   | visible at `bottom-[63px] left-[96px]` |

`<head>` `viewport` is already set by the root layout (`01-setup.md` §4); no per-page meta-viewport is needed. The page must remain readable down to `360 px` — the `350 px` card cap leaves a `5 px` gutter at that width.

---

## 9. Accessibility checklist

| Concern | Implementation |
|:---|:---|
| Form semantics            | Single `<form noValidate>` with native `submit` button; `noValidate` lets RHF + Zod own the validation UI. |
| Input labels              | `<Input>` accepts a `label` prop and `useId()` generates a stable `id`. The auth form passes `aria-label` + `placeholder` because the Figma intentionally hides visible labels — screen readers still get a name. |
| Required state            | `aria-required="true"` is implicit via Zod + `register()`; we set `aria-invalid={!!errors.field}`. |
| Error association         | `aria-describedby="identifier-err"` / `"password-err"` points to the Input’s built-in error `<p>` element. |
| Live region for server error | `<p role="alert" aria-live="polite">` so non-blocking error toasts are announced when they appear. |
| Focus order               | Identifier → Password → Forgot link → Submit → Create account → Privacy link. Native source order matches this — no `tabIndex` overrides. |
| Focus ring                | Project violet ring `#7B3FE4` (1.5 px) on inputs; `Button` ring is `ring-primary-500` (from 02-spec). Forgot/Privacy links use `focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/40`. |
| Colour contrast           | Primary CTA `#ff6d41` on `#201e1e` text: contrast ≈ 5.4 : 1 (passes WCAG AA for ≥ 18 px text). Secondary CTA `rgba(43,41,41,0.10)` background ≈ `#e6e6e5` over white → contrast with `#2b2929` text ≈ 13 : 1 (AAA). Outlined input `#bab9b9` border on white ≈ 2.4 : 1 — non-text element, exempt from text-contrast rules but acceptable per WCAG 1.4.11. |
| Reduced motion            | The `<AuthSliderPill>` rotates every 6 s. Wrap the `setInterval` in `prefers-reduced-motion: reduce` short-circuit (skip auto-advance, render static first slide). |
| Keyboard close (mobile)   | The mobile cut has no drawer; the page is fully keyboard-navigable. The decorative flame images are `aria-hidden`. |
| Brand wordmark            | Image-as-text inside `<AuthHeader>` is rendered as real text (Manrope/Inter) — already accessible. |

---

## 10. Server Action — `login/actions.ts`

```ts
// src/app/[locale]/(auth)/login/actions.ts
"use server";

import { redirect } from "@/i18n/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
  identifier: z.string().min(1).max(120),
  password:   z.string().min(8).max(128),
});

export type LoginActionResult =
  | { status: "ok" }
  | { status: "error"; code: "invalidCredentials" | "rateLimited" | "network" | "unknown" };

export async function loginAction(input: unknown): Promise<LoginActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { status: "error", code: "invalidCredentials" };

  try {
    // TODO: replace with real auth call.
    // const res = await fetch(process.env.AUTH_API_URL + "/login", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(parsed.data),
    //   cache: "no-store",
    // });
    // if (res.status === 401) return { status: "error", code: "invalidCredentials" };
    // if (res.status === 429) return { status: "error", code: "rateLimited" };
    // if (!res.ok)            return { status: "error", code: "unknown" };
    // const { token } = (await res.json()) as { token: string };

    const token = "DEV_TOKEN";
    const jar = await cookies();
    jar.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch {
    return { status: "error", code: "network" };
  }

  redirect({ href: "/dashboard", locale: "ru" });
  return { status: "ok" };
}
```

> The action returns a typed discriminated union. The form translates `result.code` via the `auth.errors` namespace (see §5). `redirect` is imported from `@/i18n/navigation` so the locale prefix is preserved (e.g. `/ru/dashboard`).

> **Security:** `redirect` short-circuits — never expose internal error messages to the client. The action only ever returns one of four `code` values. The cookie is `httpOnly`, `sameSite=lax`, `secure` in production. The `middleware.ts` (`01-setup.md` §9) reads this cookie to gate `/[locale]/(admin)/...`.

---

## 11. States checklist

Page-level states. Component-level states (input focus / error / disabled, button loading / disabled / hover) are owned by `<Input>` and `<Button>` respectively — see [`02-components-spec.md`](02-components-spec.md).

| State | Trigger | Visual outcome |
|:---|:---|:---|
| **idle**         | First render, no interaction | Card visible; both inputs empty with `text-neutral-300` placeholder; primary button enabled at full opacity (`isValid` is `false` initially → button is `disabled`, opacity 50). |
| **typing**       | User focuses an input         | Violet `#7B3FE4` `1.5 px` ring on the focused field; Zod runs `onBlur`, so no error appears mid-typing. |
| **field error**  | RHF blur fires Zod failure    | `<Input>` switches to error state (border `red-500`, bg `primary-50`); `<p>` with the translated message appears under the field; `aria-invalid="true"`. |
| **submitting**   | `handleSubmit` resolves, action pending | `<Button isLoading>` spinner replaces the label; primary + secondary buttons disabled (`pointer-events-none opacity-50`); form remains visible. |
| **server error** | `loginAction` returns `{ status: "error" }` | Error string appears in `<p role="alert">` between buttons and footer; primary button re-enabled; field values preserved. |
| **success**      | `loginAction` returns `{ status: "ok" }` | `redirect()` fires server-side → browser navigates to `/[locale]/dashboard`; no client UI needed. |
| **rate limited** | Server returns `429`          | Same as **server error** but with `auth.errors.rateLimited` copy. Optional client-side cooldown timer can disable the submit button for 60 s. |
| **network failure** | `fetch` throws            | Same as **server error** with `auth.errors.network` copy. |

> The Figma cut shows the **server error** state explicitly (the red string *“Username or passowrd is wrong, check if caps lock is on and try again”* — note the original typo). We translate to the corrected RU/EN copy in `auth.errors.invalidCredentials` (§6).

---

## 12. Asset inventory

Place exports under [`public/auth/`](../public/auth/). Filenames are referenced by the components in §2 and §3.

| File | Source node | Pixel size | Notes |
|:---|:---|:---|:---|
| `flame-bg.png`         | `I6327:1079;6490:20851` | `2150 × 1210` | Desktop background flame, masked through `flame-mask.png`. Export as PNG @ 1× — already huge. |
| `flame-foreground.png` | `I6327:1079;6490:20852` (also re-used for mobile `6536:33757`) | `1014 × 915` (desktop), `532 × 480` (mobile) — export the largest size and let CSS scale | |
| `flame-halo.png`       | `6536:33756`            | `1614 × 908`  | Mobile soft halo, `opacity:44%`. |
| `flame-mask.png`       | `image 129` reference   | `1728 × 1035` | Alpha mask used by both desktop flame layers. Single shared asset. |
| `logo.svg`             | `I6327:1079;6324:493`   | `27.66 × 46`  | Brand glyph (orange flame “P”). Already used by `<Sidebar>` (see 05-dashboard.md §3). |

> `screenshots/auth-desktop.png` and `screenshots/auth-mobile.png` go under [`docs/screenshots/`](screenshots/) — see [`screenshots/README.md`](screenshots/README.md).

---

## 13. Component breakdown — interfaces summary

| File | Props |
|:---|:---|
| `app/[locale]/(auth)/layout.tsx`             | `{ children: React.ReactNode }` |
| `app/[locale]/(auth)/login/page.tsx`         | *(none — Server Component)* |
| `app/[locale]/(auth)/login/actions.ts`       | `loginAction(input: unknown) => Promise<LoginActionResult>` |
| `components/features/auth/auth-card.tsx`     | `{ children: React.ReactNode; className?: string }` |
| `components/features/auth/auth-header.tsx`   | *(none)* |
| `components/features/auth/auth-hero-aside.tsx` | *(none — decorative composition)* |
| `components/features/auth/auth-slider-pill.tsx` | *(none — reads `auth.slider` namespace)* |
| `components/features/auth/login-form.tsx`    | *(none — owns its own state)* |

> **No `forwardRef`, no `displayName`.** Every interactive component above either is a Server Component or uses React 19’s plain-prop `ref` pattern (per `02-components-spec.md`). Tailwind utilities use only tokens declared in `globals.css` (no `tailwind.config.ts` is reintroduced, per `01-project-setup.md` §5).
