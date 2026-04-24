# Prometey VPN — Dashboard (`/[locale]/dashboard`)

> **Source of truth:** Figma file `CGwoRb0tFSoEX6GfKTdabi`
> **Pre-requisites:** [`01-project-setup.md`](01-project-setup.md), [`02-components-spec.md`](02-components-spec.md)
> All measurements are taken from Figma in **px**. Tailwind v4 utilities use the project tokens defined in `globals.css` (see 01-project-setup.md §5).

---

## Figma references

| View | Node | Direct link |
|:---|:---|:---|
| Desktop dashboard       | `6369:2478`  | <https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6369-2478>  |
| Mobile dashboard        | `6536:31085` | <https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6536-31085> |
| Mobile menu (drawer)    | `6536:31260` | <https://www.figma.com/design/CGwoRb0tFSoEX6GfKTdabi/?node-id=6536-31260> |

### Screenshots

> Export each frame at 2× from Figma into [`docs/screenshots/`](screenshots/) using the names below — see [`screenshots/README.md`](screenshots/README.md).

![Desktop dashboard](screenshots/dashboard-desktop.png)
![Mobile dashboard](screenshots/dashboard-mobile.png)
![Mobile menu](screenshots/dashboard-mobile-menu.png)

---

## 1. Route & file map

All paths are workspace-relative.

```
src/
├── app/
│   └── [locale]/
│       └── (admin)/
│           ├── layout.tsx                       ← Admin shell (Sidebar + Header + <main>)
│           └── dashboard/
│               └── page.tsx                     ← Server Component (this view)
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx                          ← Desktop sidebar  (REPLACES 01-setup §8 stub)
│   │   ├── sidebar-nav-item.tsx                 ← Single nav row, active-state aware
│   │   ├── header.tsx                           ← Top bar (mobile-only; hidden on lg+)
│   │   ├── mobile-nav.tsx                       ← Bottom-sheet drawer + hamburger trigger
│   │   ├── language-switcher.tsx                ← Dark pill button (RU / EN)
│   │   └── breadcrumbs.tsx                      ← chevron-right + page title
│   └── features/
│       └── dashboard/
│           ├── welcome-card.tsx                 ← "Добро пожаловать …"
│           ├── config-download-card.tsx         ← Quick-download wrapper
│           ├── config-tile.tsx                  ← Single VLESS / OpenVPN tile
│           └── subscription-card.tsx            ← Plan + expiry + "Обновить подписку"
│
└── messages/
    ├── ru.json                                  ← `dashboard.*`, `nav.*` (see §10)
    └── en.json
```

> The dashboard has **no charts** in this Figma cut — the Figma file shows configuration tiles, a welcome banner and a subscription summary, *not* analytics. `recharts` is therefore **not required**. Add it later only when an analytics widget appears.

---

## 2. Admin shell — `src/app/[locale]/(admin)/layout.tsx`

### Layout math (desktop, ≥ `lg`)

| Region | Figma | Tailwind |
|:---|:---|:---|
| Page background       | `#ededed` (G30)              | `bg-neutral-30` |
| Outer padding         | `30 px / 35 px / 35 px / 30 px` (top/right/bottom/left around the sidebar) | `p-[30px]` on the shell wrapper |
| Sidebar width         | `375 px`                     | `w-[375px]` |
| Gap sidebar → main    | `34 px` (sidebar right `405` → main left `439`) | `gap-[34px]` |
| Main column width     | `1230 px` (capped)           | `max-w-[1230px] flex-1` |
| Inner card max width  | `850 px` (welcome / quick-download / subscription) | `max-w-[850px] w-full` |
| Vertical gap, main    | `32 px` between sections     | `gap-8` |
| Shell height          | viewport                     | `min-h-screen` |
| Scroll behaviour      | only `<main>` scrolls        | `overflow-y-auto` on `<main>`, `overflow-hidden` on the outer wrapper |

### Layout math (mobile, `< lg`)

| Region | Figma | Tailwind |
|:---|:---|:---|
| Sidebar               | hidden — replaced by `<MobileNav>` drawer | `hidden lg:flex` on `<Sidebar>` |
| Header (top dark bar) | `414 × 88 px`, bg `#201e1e` (G900) — visible only on mobile | `h-[88px] bg-neutral-900 lg:hidden` |
| Page horizontal pad   | `20 px`                      | `px-5` |
| Page vertical pad     | top `16 px` (under header)   | `pt-4` |
| Card gap              | `32 px` between blocks       | `gap-8` |

### File

```tsx
// src/app/[locale]/(admin)/layout.tsx
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-30 lg:gap-[34px] lg:p-[30px]">
      <Sidebar />                                {/* lg+ only, see component */}

      <div className="flex w-full flex-1 flex-col lg:max-w-[1230px]">
        <Header />                               {/* mobile only */}
        <main className="flex flex-1 flex-col gap-8 px-5 pt-4 pb-10 lg:px-0 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## 3. Sidebar (desktop) — `src/components/layout/sidebar.tsx`

### Diff vs `01-project-setup.md` §8 stub

| Item | §8 stub | This Figma version |
|:---|:---|:---|
| Width                       | `w-64` (256 px)                | **`w-[375px]`** |
| Background                  | flat `bg-white`                | **white + light yellow/red gradient overlay** |
| Border                      | `border-r border-neutral-30`   | **none — uses card shadow + rounded corners (it floats with `rounded-2xl shadow-[…]`)** |
| Padding                     | `px-4 py-6`                    | **`px-6 py-8`** (24 / 32 px) |
| `NAV_ITEMS`                 | 6 items (Dashboard, Users, Subscriptions, Servers, Analytics, Settings) | **3 items only** (Dashboard, Instructions, Config files) |
| Bottom widget               | none                           | **dark language switcher pill + Help link + decorative blurred image** |
| Item icon size              | `h-5 w-5`                      | **`h-9 w-9`** (36 px) |
| Item font size              | `text-sm`                      | **`text-[18px]` Medium when active, Regular when not** |
| Active marker               | bg-neutral-30 + text-neutral-900 | **text colour swap only** (`text-neutral-900` active vs `text-neutral-600` idle) — no pill |

The §8 stub is **superseded** by the implementation below.

### Pixel spec

| Element | Figma | Tailwind |
|:---|:---|:---|
| Wrapper                | 375 × 965, rounded `16`, shadow `0 11px 19.4px rgba(0,0,0,.04), 0 13px 51.2px rgba(0,0,0,.04)` | `w-[375px] h-[calc(100vh-60px)] rounded-2xl shadow-[0_11px_19.4px_rgba(0,0,0,.04),0_13px_51.2px_rgba(0,0,0,.04)]` |
| Background             | white + gradient overlay yellow→red 20% opacity | `bg-white` + inline style (see code) |
| Padding                | px 24, py 32                  | `px-6 py-8` |
| Vertical gap (groups)  | 32                            | `gap-8` |
| Logo row               | 327 × 62, bottom border `#f6f6f6`, padding-bottom 16 | `pb-4 border-b border-neutral-20` |
| Logo icon              | 27.66 × 46                    | `h-[46px] w-[28px]` |
| Brand text             | "Prometey VPN" 28 px Manrope, color `#67100c` | `text-[28px] text-red-900 font-medium` (use Inter — see Font note) |
| Nav group gap          | 16                            | `gap-4` |
| Nav row                | icon 36 + gap 10 + label      | `flex items-center gap-2.5` |
| Nav icon               | 36 × 36 (lucide)              | `h-9 w-9` |
| Active label           | `#201e1e` 18 px Medium        | `text-neutral-900 font-medium text-lg` |
| Idle label             | `#484747` 18 px Regular       | `text-neutral-600 font-normal text-lg` |
| Footer group           | top border `#f6f6f6`, py 20   | `border-t border-neutral-20 py-5` |
| Language pill          | 217 × 48, bg `#2b2929`, rounded 12, px 16, py 12 | `h-12 bg-neutral-800 rounded-xl px-4 py-3` |
| Language pill text     | 18 px white, "Language: En"   | `text-white text-lg` |
| Decorative blur        | 375 × 336, blur `66.9px`, opacity 12 | absolute, `blur-[66.9px] opacity-10` |

### Font note

Figma uses **Manrope** (brand wordmark, headings) and **Montserrat** (nav labels). The project is currently configured with **Inter** only (01-project-setup.md §4). Decision: **keep Inter** for the entire UI — the brand identity remains identical because the wordmark is also rendered as text. If the designer insists on Manrope, add it next to Inter in `app/layout.tsx` and expose it as `--font-display` in `@theme`.

### NAV_ITEMS

```ts
import { LayoutDashboard, TrafficCone, FileCog, MessageCircleQuestionMark, LogOut } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/dashboard",    icon: LayoutDashboard, labelKey: "dashboard" },
  { href: "/instructions", icon: TrafficCone,     labelKey: "instructions" },
  { href: "/configs",      icon: FileCog,         labelKey: "configs" },
] as const;

export const FOOTER_NAV = [
  { href: "/help", icon: MessageCircleQuestionMark, labelKey: "help" },
] as const;

// Mobile drawer adds Logout at the very bottom (primary-500)
export const MOBILE_LOGOUT = { icon: LogOut, labelKey: "logout" } as const;
```

### Implementation

```tsx
// src/components/layout/sidebar.tsx
"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrafficCone,
  FileCog,
  MessageCircleQuestionMark,
} from "lucide-react";
import LanguageSwitcher from "./language-switcher";
import SidebarNavItem from "./sidebar-nav-item";

const NAV_ITEMS = [
  { href: "/dashboard",    icon: LayoutDashboard, labelKey: "dashboard"    },
  { href: "/instructions", icon: TrafficCone,     labelKey: "instructions" },
  { href: "/configs",      icon: FileCog,         labelKey: "configs"      },
] as const;

const SIDEBAR_GRADIENT =
  "linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff";

export default function Sidebar() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");

  return (
    <aside
      className={cn(
        "hidden lg:flex",
        "h-[calc(100vh-60px)] w-[375px] flex-col gap-8 overflow-hidden",
        "rounded-2xl px-6 py-8",
        "shadow-[0_11px_19.4px_rgba(0,0,0,.04),0_13px_51.2px_rgba(0,0,0,.04)]",
      )}
      style={{ background: SIDEBAR_GRADIENT }}
    >
      {/* ── Logo block ─────────────────────────────────────────── */}
      <div className="flex items-center gap-5 border-b border-neutral-20 pb-4">
        <Image src="/logo.svg" alt="Prometey VPN" width={28} height={46} priority />
        <span className="text-[28px] font-medium text-red-900">
          Prometey <span className="font-bold">VPN</span>
        </span>
      </div>

      {/* ── Primary nav ────────────────────────────────────────── */}
      <nav className="flex flex-1 flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={tNav(item.labelKey)}
            active={pathname.startsWith(`/${pathname.split("/")[1]}${item.href}`)}
          />
        ))}
      </nav>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 border-t border-neutral-20 py-5">
        <LanguageSwitcher />
        <SidebarNavItem
          href="/help"
          icon={MessageCircleQuestionMark}
          label={tNav("help")}
          active={pathname.endsWith("/help")}
        />
      </div>
    </aside>
  );
}
```

```tsx
// src/components/layout/sidebar-nav-item.tsx
"use client";

import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
}

export default function SidebarNavItem({ href, icon: Icon, label, active }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 capitalize transition-colors",
        active
          ? "text-neutral-900 font-medium"
          : "text-neutral-600 font-normal hover:text-neutral-900",
      )}
    >
      <Icon className="h-9 w-9" strokeWidth={1.5} />
      <span className="text-lg">{label}</span>
    </Link>
  );
}
```

```tsx
// src/components/layout/language-switcher.tsx
"use client";

import { Languages, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const next = locale === "ru" ? "en" : "ru";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.replace(pathname, { locale: next }))}
      className="inline-flex h-12 w-fit items-center justify-center gap-3 rounded-xl bg-neutral-800 px-4 py-3 text-lg text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
    >
      <Languages className="h-6 w-6" strokeWidth={1.75} />
      <span>
        <span className="font-bold">Language:</span>{" "}
        <span>{locale === "ru" ? "Ru" : "En"}</span>
      </span>
      <ChevronDown className="h-[18px] w-[18px]" />
    </button>
  );
}
```

---

## 4. Header (mobile only) — `src/components/layout/header.tsx`

The desktop layout has **no** top bar — the breadcrumb sits inside `<main>`. The header in `(admin)/layout.tsx` is therefore visible only `< lg`.

### Pixel spec

| Element | Figma | Tailwind |
|:---|:---|:---|
| Wrapper                | 414 × 88, bg `#201e1e` (G900)              | `h-[88px] bg-neutral-900 lg:hidden` |
| Inner padding          | px 20, py 24 (logo at 20/32, hamburger at 362/44) | `px-5 py-6 flex items-center justify-between` |
| Logo icon              | 26 × 44                                    | `h-11 w-[26px]` |
| Hamburger              | 32 × 32, color `#fb9c13` (orange-500)      | `h-8 w-8 text-orange-500` |
| Top decorative bar     | 414 × 30, rounded above (status-bar safe area) | `pt-safe` (optional) |

### Implementation

```tsx
// src/components/layout/header.tsx
"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import MobileNav from "./mobile-nav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-[88px] items-center justify-between bg-neutral-900 px-5 lg:hidden">
        <Image src="/logo.svg" alt="Prometey VPN" width={26} height={44} priority />
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-orange-500 hover:text-orange-400"
        >
          <Menu className="h-8 w-8" strokeWidth={2} />
        </button>
      </header>

      <MobileNav open={open} onOpenChange={setOpen} />
    </>
  );
}
```

---

## 5. Mobile drawer — `src/components/layout/mobile-nav.tsx`

### Behaviour

| Property | Spec |
|:---|:---|
| Trigger          | Hamburger in `<Header>` (32 × 32, `text-orange-500`) |
| Animation        | **Slide up from bottom** (Figma frame `Frame 1000008719` is anchored to bottom, height 296 of 874) |
| Backdrop         | `rgba(32,30,30,0.6)` + `backdrop-blur-[4px]` |
| Drawer width     | `100%` of viewport — full-bleed |
| Drawer height    | hugs content (≈ 296 px) |
| Drawer corners   | `rounded-tl-2xl rounded-tr-2xl` (16 px) — only top |
| Drawer bg        | `#2b2929` (neutral-800) |
| Drawer padding   | `pt-8 pb-10 px-8` (32 / 40 / 32) |
| Drawer shadow    | `0 -7px 30.2px rgba(0,0,0,.12)` |
| Close button     | `lucide/x` 32 × 32 at top-right, inset 16 |
| Item icon size   | 32 × 32 |
| Item font size   | 16 px Medium (active) / Regular (idle) |
| Active text      | `#f6f6f6` (G20) |
| Idle text        | `#bab9b9` (G60 — close to neutral-60) |
| Logout colour    | `#ff6d41` — `text-primary-500` |

### Drawer primitive

Use **`vaul`** — purpose-built bottom-sheet, hardware-accelerated, swipe-to-dismiss out of the box. Falls back to `@radix-ui/react-dialog` semantics. Install:

```bash
npm install vaul
```

> Alternative: `@radix-ui/react-dialog` (already in §2 of 01-project-setup.md) with custom `data-[state=open]:animate-slide-up` keyframes — works but you ship the animation yourself.

### NAV_ITEMS (drawer)

Exactly the desktop list **plus** Help and Log out:

```ts
import { LayoutDashboard, TrafficCone, FileCog, MessageCircleQuestionMark, LogOut } from "lucide-react";

const DRAWER_ITEMS = [
  { href: "/dashboard",    icon: LayoutDashboard,           labelKey: "dashboard"    },
  { href: "/instructions", icon: TrafficCone,               labelKey: "instructions" },
  { href: "/configs",      icon: FileCog,                   labelKey: "configs"      },
  { href: "/help",         icon: MessageCircleQuestionMark, labelKey: "help"         },
] as const;
```

### Implementation

```tsx
// src/components/layout/mobile-nav.tsx
"use client";

import { Drawer } from "vaul";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard, TrafficCone, FileCog,
  MessageCircleQuestionMark, LogOut, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DRAWER_ITEMS = [
  { href: "/dashboard",    icon: LayoutDashboard,           labelKey: "dashboard"    },
  { href: "/instructions", icon: TrafficCone,               labelKey: "instructions" },
  { href: "/configs",      icon: FileCog,                   labelKey: "configs"      },
  { href: "/help",         icon: MessageCircleQuestionMark, labelKey: "help"         },
] as const;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileNav({ open, onOpenChange }: Props) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tAuth = useTranslations("auth");

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-[rgba(32,30,30,0.6)] backdrop-blur-[4px]" />
        <Drawer.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex flex-col gap-6",
            "rounded-t-2xl bg-neutral-800 px-8 pt-8 pb-10",
            "shadow-[0_-7px_30.2px_rgba(0,0,0,.12)]",
            "lg:hidden",
          )}
        >
          <Drawer.Title className="sr-only">{tNav("menu")}</Drawer.Title>

          <button
            type="button"
            aria-label={tAuth("close")}
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-orange-500 hover:text-orange-400"
          >
            <X className="h-8 w-8" />
          </button>

          <nav className="flex flex-col gap-4">
            {DRAWER_ITEMS.map(({ href, icon: Icon, labelKey }) => {
              const active = pathname.endsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-4 capitalize text-base",
                    active ? "text-neutral-20 font-medium" : "text-neutral-60",
                  )}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                  <span>{tNav(labelKey)}</span>
                </Link>
              );
            })}

            {/* Logout */}
            <button
              type="button"
              onClick={() => { /* TODO: signOut(); */ onOpenChange(false); }}
              className="flex items-center gap-4 text-base text-primary-500 hover:text-primary-400"
            >
              <LogOut className="h-8 w-8" strokeWidth={1.5} />
              <span>{tNav("logout")}</span>
            </button>
          </nav>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

---

## 6. Dashboard page sections

`/[locale]/dashboard/page.tsx` is a **Server Component**. Each section below is its own component under `components/features/dashboard/`.

### 6.1 Breadcrumbs (`6369:2476;6369:2518`)

| Spec | Figma | Tailwind |
|:---|:---|:---|
| Layout            | chevron-right + text "Home"      | `inline-flex items-center gap-1` |
| Icon              | 24 × 24                          | `h-6 w-6` |
| Text              | 18 px Medium, `#484747` (G600)   | `text-lg font-medium text-neutral-600` |

```tsx
// src/components/layout/breadcrumbs.tsx
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1 text-lg font-medium text-neutral-600">
      <ChevronRight className="h-6 w-6" />
      <span>{children}</span>
    </div>
  );
}
```

### 6.2 Welcome card (`6369:2476;6369:3095`)

| Spec | Figma | Tailwind |
|:---|:---|:---|
| Width             | 850 max                                          | `w-full max-w-[850px]` |
| Padding           | px 20, py 16                                     | `px-5 py-4` |
| Radius            | 16                                               | `rounded-2xl` |
| Background        | white + same yellow→red gradient overlay         | inline `style={{background: GRADIENT}}` (reuse `SIDEBAR_GRADIENT`) |
| Shadow            | `0 13px 51.2px rgba(0,0,0,.04)`                  | `shadow-[0_13px_51.2px_rgba(0,0,0,.04)]` |
| Title             | 28 px Manrope ("Добро пожаловать в панель управления **Prometey VPN** 👋"), `#2b2929` | `text-[28px] font-medium text-neutral-800` |
| Email line        | 20 px Regular, the email in `#fb9c13` SemiBold underline | `text-xl text-neutral-800` + `text-orange-500 font-semibold` for the email |
| Body              | 16 px Regular, line-height 1.6, max-w 527, `#484747` | `text-base leading-[1.6] text-neutral-600 max-w-[527px]` |
| Section gap       | 12 (title block) / 4 (between title & email)     | `gap-3` and `gap-1` |

i18n keys: `dashboard.welcome.title`, `dashboard.welcome.signedInAs`, `dashboard.welcome.body`.

```tsx
// src/components/features/dashboard/welcome-card.tsx
import { getTranslations } from "next-intl/server";

const GRADIENT =
  "linear-gradient(180deg, rgba(255,255,255,.2) 0%, rgba(255,252,230,.2) 30.769%, rgba(254,233,232,.2) 100%), #ffffff";

export default async function WelcomeCard({ email }: { email: string }) {
  const t = await getTranslations("dashboard.welcome");
  return (
    <section
      className="w-full max-w-[850px] overflow-hidden rounded-2xl px-5 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]"
      style={{ background: GRADIENT }}
    >
      <div className="flex flex-col gap-1 text-neutral-800">
        <h1 className="text-[28px] font-medium leading-tight">
          {t.rich("title", { strong: (c) => <strong className="font-bold">{c}</strong> })} 👋
        </h1>
        <p className="text-xl">
          {t("signedInAs")}{" "}
          <a href={`mailto:${email}`} className="font-semibold text-orange-500 underline">
            {email}
          </a>
        </p>
      </div>
      <p className="mt-3 max-w-[527px] text-base leading-[1.6] text-neutral-600">
        {t("body")}
      </p>
    </section>
  );
}
```

### 6.3 Quick-download (config tiles) (`6369:2476;6371:5644`)

| Spec | Figma | Tailwind |
|:---|:---|:---|
| Wrapper width        | 850 max                          | `w-full max-w-[850px]` |
| Wrapper bg           | `#e2e2e2` (G40)                  | `bg-neutral-40` |
| Wrapper padding      | px 20, py 12                     | `px-5 py-3` |
| Wrapper radius       | 16                               | `rounded-2xl` |
| Header row           | flex between, gap 10             | `flex items-center justify-between gap-2.5` |
| Title                | 18 px Bold, `#2b2929`            | `text-lg font-bold text-neutral-800` |
| "Редактировать" link | 14 px Regular + 24 px settings-2 | `text-sm` + `<Settings2 className="h-6 w-6" />` |
| Tile card            | **215 × 191 px desktop / 169 × 146 px mobile**, rounded 16, white-gradient bg, shadow `0 13px 51.2px rgba(0,0,0,.04)`, padding px 12 py 16, gap 18 | `w-[215px] h-[191px] rounded-2xl px-3 py-4 flex flex-col items-center gap-[18px]` |
| Tile logo            | 122 × 122 desktop / 80 × 80 mobile | `h-[122px] w-[122px]` (or `lg:` variant) |
| Tile label           | 14 px, second word bold ("Конфигурация **VLESS**" / "Конфигурация **OpenVPN**") | `text-sm text-center` |
| Tile gap (row)       | 16                               | `gap-4` |
| Helper line          | 16 px, "Не знаете, как подключиться? **Перейти к инструкциям**" — link in `#e48e11` underline | `text-base` + `text-orange-600 font-bold underline` |

```tsx
// src/components/features/dashboard/config-tile.tsx
import Image from "next/image";

interface Props { logo: string; label: React.ReactNode; href: string; }

export default function ConfigTile({ logo, label, href }: Props) {
  return (
    <a
      href={href}
      className="flex h-[146px] w-[169px] flex-col items-center justify-center gap-[18px] rounded-2xl bg-white px-3 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)] transition-transform hover:-translate-y-0.5 lg:h-[191px] lg:w-[215px]"
      download
    >
      <Image src={logo} alt="" width={122} height={122} className="h-20 w-20 lg:h-[122px] lg:w-[122px]" />
      <span className="text-center text-sm">{label}</span>
    </a>
  );
}
```

```tsx
// src/components/features/dashboard/config-download-card.tsx
import { getTranslations } from "next-intl/server";
import { Settings2 } from "lucide-react";
import ConfigTile from "./config-tile";
import { Link } from "@/i18n/navigation";

export default async function ConfigDownloadCard() {
  const t = await getTranslations("dashboard.configs");
  return (
    <section className="w-full max-w-[850px] rounded-2xl bg-neutral-40 px-5 py-3">
      <header className="flex items-center justify-between gap-2.5 py-2">
        <h2 className="text-lg font-bold text-neutral-800">{t("title")}</h2>
        <button type="button" className="inline-flex items-center gap-1 text-sm text-neutral-800">
          <span className="hidden sm:inline">{t("edit")}</span>
          <Settings2 className="h-6 w-6" />
        </button>
      </header>

      <div className="flex gap-4 py-3">
        <ConfigTile
          href="/api/configs/vless"
          logo="/configs/vless.png"
          label={<><span>{t("configuration")} </span><strong>VLESS</strong></>}
        />
        <ConfigTile
          href="/api/configs/openvpn"
          logo="/configs/openvpn.png"
          label={<><span>{t("configuration")} </span><strong>OpenVPN</strong></>}
        />
      </div>

      <p className="pb-2 text-base text-neutral-800">
        {t("howToPrompt")}{" "}
        <Link href="/instructions" className="font-bold text-orange-600 underline">
          {t("howToCta")}
        </Link>
      </p>
    </section>
  );
}
```

### 6.4 Subscription card (`6369:2476;6370:3710`)

| Spec | Figma | Tailwind |
|:---|:---|:---|
| Width             | 850 max                                   | `w-full max-w-[850px]` |
| Background        | white                                     | `bg-white` |
| Padding           | px 20, py 16                              | `px-5 py-4` |
| Radius            | 16                                        | `rounded-2xl` |
| Shadow            | `0 13px 61.2px rgba(0,0,0,.07)`           | `shadow-[0_13px_61.2px_rgba(0,0,0,.07)]` |
| Body text         | 18 px Regular, line-height 1.6, plan in SemiBold, date in SemiBold | `text-lg leading-[1.6] text-neutral-800` |
| CTA position      | bottom-right (desktop) / hidden on mobile in this Figma cut | `flex justify-end` |
| CTA               | `Button` from 02-spec, **`size="md"` `variant="secondary"` with subtle dark-12 bg + yellow glow shadow** — copy "Обновить подписку" 16 px SemiBold tracking 0.32, padding px 24 py 12, radius 12 | Use `<Button variant="secondary" size="md">` + custom shadow `shadow-[0_4px_46px_10px_rgba(255,200,0,.06)]` |

```tsx
// src/components/features/dashboard/subscription-card.tsx
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

interface Props { plan: string; expiresAt: string; }

export default async function SubscriptionCard({ plan, expiresAt }: Props) {
  const t = await getTranslations("dashboard.subscription");
  return (
    <section className="flex w-full max-w-[850px] flex-col gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_13px_61.2px_rgba(0,0,0,.07)]">
      <p className="text-lg leading-[1.6] text-neutral-800">
        {t("currentPlan")}{" "}
        <span className="font-semibold">&quot;{plan}&quot;</span>
        <br />
        {t("expiresAt")}{" "}
        <span className="font-semibold">{expiresAt}</span>
      </p>
      <div className="hidden justify-end lg:flex">
        <Button
          variant="secondary"
          size="md"
          className="rounded-xl bg-neutral-800/12 text-neutral-800 shadow-[0_4px_46px_10px_rgba(255,200,0,.06)]"
        >
          {t("renew")}
        </Button>
      </div>
    </section>
  );
}
```

### 6.5 Page composition

```tsx
// src/app/[locale]/(admin)/dashboard/page.tsx
import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/components/layout/breadcrumbs";
import WelcomeCard from "@/components/features/dashboard/welcome-card";
import ConfigDownloadCard from "@/components/features/dashboard/config-download-card";
import SubscriptionCard from "@/components/features/dashboard/subscription-card";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  // TODO: replace with real session data (auth.getSession() / getServerSession())
  const user = { email: "octava@six.music" };
  const subscription = { plan: "7 days trial", expiresAt: "22/04/26" };

  return (
    <>
      <Breadcrumbs>{t("breadcrumb.home")}</Breadcrumbs>
      <WelcomeCard email={user.email} />
      <ConfigDownloadCard />
      <SubscriptionCard plan={subscription.plan} expiresAt={subscription.expiresAt} />
    </>
  );
}
```

---

## 7. Mobile reflow (`< lg`)

The card stack order is unchanged; only sizing & paddings change.

| Section | Mobile change |
|:---|:---|
| `<Sidebar>`               | hidden — replaced by `<Header>` + `<MobileNav>` drawer |
| `<Header>`                | visible (`h-[88px] bg-neutral-900`); right-aligned hamburger |
| `<main>` padding          | `px-5 pt-4 pb-10` |
| Welcome title             | wraps to 2 lines naturally — keep `text-[28px]` |
| Quick-download tiles      | shrink to **169 × 146 px** with **80 × 80 px** logo (use `lg:` variant in tile component) |
| Quick-download header     | "Редактировать" label hidden, only the icon stays — already coded with `<span class="hidden sm:inline">` |
| Subscription CTA          | hidden on mobile (`hidden lg:flex`) — Figma shows the card without the button on the 414-wide frame |
| Helper text wrap          | "Не знаете, как это сделать?" + link wraps to two lines (no special handling needed) |

There is **no bottom nav bar** in this Figma cut — navigation is done via the drawer. Do not add one.

---

## 8. Mobile menu (drawer) — full breakdown

Already specified in §5. Recap of the drawer footer:

- **Language switcher** is **not** present in the drawer in this Figma cut (it lives in the sidebar). On mobile we surface it inside `<MobileNav>` *if* the team needs it — the Figma drawer (node `6536:31342`) only shows: `Dashboard`, `Instructions`, `Configs`, `Help`, then `Logout` (in `text-primary-500`). Add the language switcher only if confirmed by the designer.
- **Logout button** colour: `#ff6d41` (`text-primary-500`). Idle nav text: `#bab9b9` (`text-neutral-60`-ish — the closest token is `text-neutral-90` `#949393`; for an exact match use the arbitrary value `text-[#bab9b9]`).
- **Active nav text** in the drawer: `#f6f6f6` (`text-neutral-20`).

---

## 9. Component breakdown — interfaces summary

| File | Props |
|:---|:---|
| `components/layout/sidebar.tsx`        | *(none — reads pathname & locale internally)* |
| `components/layout/sidebar-nav-item.tsx` | `{ href: string; icon: LucideIcon; label: string; active: boolean }` |
| `components/layout/header.tsx`         | *(none)* |
| `components/layout/mobile-nav.tsx`     | `{ open: boolean; onOpenChange: (open: boolean) => void }` |
| `components/layout/language-switcher.tsx` | *(none)* |
| `components/layout/breadcrumbs.tsx`    | `{ children: React.ReactNode }` |
| `components/features/dashboard/welcome-card.tsx`        | `{ email: string }` |
| `components/features/dashboard/config-download-card.tsx`| *(none — server component, fetches its own copy)* |
| `components/features/dashboard/config-tile.tsx`         | `{ logo: string; label: React.ReactNode; href: string }` |
| `components/features/dashboard/subscription-card.tsx`   | `{ plan: string; expiresAt: string }` |

> **No `forwardRef`.** Every interactive component above either is a Server Component or uses React 19's plain-prop `ref` pattern (per 02-components-spec.md).

---

## 10. Translation keys

### `messages/ru.json` — append

```json
{
  "nav": {
    "dashboard":    "панель управления",
    "instructions": "инструкции",
    "configs":      "файлы конфигурации",
    "help":         "помощь",
    "logout":       "Выйти",
    "menu":         "Меню"
  },
  "auth": {
    "close": "Закрыть"
  },
  "dashboard": {
    "breadcrumb": {
      "home": "Главная"
    },
    "welcome": {
      "title":        "Добро пожаловать в панель управления <strong>Prometey VPN</strong>",
      "signedInAs":   "Вы вошли в систему как",
      "body":         "Управляйте доступами, отслеживайте активность клиентов и следите за состоянием серверов в одном месте."
    },
    "configs": {
      "title":         "Загрузите и установите файл конфигурации.",
      "edit":          "Редактировать",
      "configuration": "Конфигурация",
      "howToPrompt":   "Не знаете, как это сделать?",
      "howToCta":      "Перейти к инструкциям"
    },
    "subscription": {
      "currentPlan": "Вы используете тарифный план",
      "expiresAt":   "Ваша подписка заканчивается:",
      "renew":       "Обновить подписку"
    }
  }
}
```

### `messages/en.json` — append

```json
{
  "nav": {
    "dashboard":    "Dashboard",
    "instructions": "Instructions",
    "configs":      "Config files",
    "help":         "Help",
    "logout":       "Log out",
    "menu":         "Menu"
  },
  "auth": {
    "close": "Close"
  },
  "dashboard": {
    "breadcrumb": {
      "home": "Home"
    },
    "welcome": {
      "title":        "Welcome to the <strong>Prometey VPN</strong> dashboard",
      "signedInAs":   "Signed in as",
      "body":         "Manage access, monitor client activity and keep an eye on server health — all in one place."
    },
    "configs": {
      "title":         "Download and install a configuration file.",
      "edit":          "Edit",
      "configuration": "Configuration",
      "howToPrompt":   "Not sure how to do it?",
      "howToCta":      "Open the instructions"
    },
    "subscription": {
      "currentPlan": "Your current plan is",
      "expiresAt":   "Your subscription expires on:",
      "renew":       "Renew subscription"
    }
  }
}
```

---

## 11. Step-by-step implementation checklist

> Implement in order. **One file per step** — commit between steps.

1. `npm install vaul` — drawer primitive.
2. Add the 5 new keys (`nav`, `auth.close`, `dashboard.*`) to `messages/ru.json`.
3. Add the same 5 new keys to `messages/en.json`.
4. Create `src/components/layout/sidebar-nav-item.tsx` (§3).
5. Create `src/components/layout/language-switcher.tsx` (§3).
6. **Replace** `src/components/layout/sidebar.tsx` — paste the §3 implementation. Delete the §8 stub from `01-project-setup.md` mentally; this file is now the source of truth.
7. Create `src/components/layout/mobile-nav.tsx` (§5).
8. Create `src/components/layout/header.tsx` (§4).
9. Create `src/components/layout/breadcrumbs.tsx` (§6.1).
10. Update `src/app/[locale]/(admin)/layout.tsx` to the §2 markup (gap, padding, mobile header).
11. Create `src/components/features/dashboard/welcome-card.tsx` (§6.2).
12. Create `src/components/features/dashboard/config-tile.tsx` (§6.3).
13. Create `src/components/features/dashboard/config-download-card.tsx` (§6.3).
14. Drop the two tile illustrations into `public/configs/vless.png` and `public/configs/openvpn.png` (export from Figma node `6369:2476;6371:5616`, 244 × 244 PNG).
15. Create `src/components/features/dashboard/subscription-card.tsx` (§6.4).
16. Create `src/app/[locale]/(admin)/dashboard/page.tsx` — assemble (§6.5).
17. Drop the SVG logo into `public/logo.svg` (export from Figma node `0:5`, 28 × 46).
18. Run `npm run dev`, navigate to `/ru/dashboard` and `/en/dashboard`, then resize ≤ 1023 px to verify the mobile reflow + drawer animation.
19. Run `npx tsc --noEmit && npm run lint` — there must be zero errors.
20. Export the three Figma frames as PNG into `docs/screenshots/` (filenames in [`screenshots/README.md`](screenshots/README.md)) so the embedded images at the top of this doc render.
