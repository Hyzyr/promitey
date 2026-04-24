# Prometey VPN — Next.js Admin Panel: Project Setup

> **Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 (CSS-first, no config file) · Lucide React · next/font (Inter)  
> **Source of truth**: Figma file `CGwoRb0tFSoEX6GfKTdabi`

---

## 1. Initialise the Project

```bash
npx create-next-app@latest prometey-vpn-admin \
  --typescript \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
cd prometey-vpn-admin
```

> **Do not pass `--tailwind`** — the flag installs Tailwind v3 with a `tailwind.config.ts`. We install Tailwind v4 manually in the next step.

---

## 2. Install Dependencies

```bash
# Tailwind CSS v4 — PostCSS plugin (replaces tailwind.config.ts entirely)
npm install tailwindcss @tailwindcss/postcss

# Icons
npm install lucide-react

# Headless primitive used by Button (asChild pattern)
npm install @radix-ui/react-slot

# Form handling
npm install react-hook-form zod @hookform/resolvers

# Internationalisation (Russian + English)
npm install next-intl

# Server-state / data-fetching
npm install @tanstack/react-query

# Lightweight client-state
npm install zustand

# Date utilities
npm install date-fns

# Class merging helpers
npm install clsx tailwind-merge

# Radix primitives for accessible overlay components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-popover
```

---

## 3. PostCSS Configuration

`postcss.config.mjs`
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## 4. Google Font — Inter

> Inter has full Cyrillic support, which is required for Russian UI copy.  
> In Tailwind v4 the font-family token lives in `@theme` inside your CSS — no config file needed.

`src/app/layout.tsx` (root layout — `<html>` / `<body>` only; locale comes from next-intl, see §9.4)
```tsx
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={inter.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 5. Design Tokens & CSS Configuration (`globals.css`)

Tailwind v4 uses **CSS-first configuration**. Everything that previously lived in `tailwind.config.ts` is now declared with `@theme` directly in your stylesheet. No TypeScript config file is needed.

`src/app/globals.css`
```css
@import "tailwindcss";

/* ─── Font ──────────────────────────────────────────────────────────── */
@theme {
  --font-sans: var(--font-inter), system-ui, sans-serif;

  /* ─── Neutral ────────────────────────────────────────────────────── */
  --color-neutral-0:   #ffffff;
  --color-neutral-10:  #fbfbfb;
  --color-neutral-20:  #f6f6f6;
  --color-neutral-30:  #ededed;
  --color-neutral-40:  #e2e2e2;
  --color-neutral-50:  #c7c7c7;
  --color-neutral-60:  #bab8b9;
  --color-neutral-70:  #afafae;
  --color-neutral-80:  #a1a1a1;
  --color-neutral-90:  #949393;
  --color-neutral-100: #878886;
  --color-neutral-200: #797878;
  --color-neutral-300: #6b6b6b;
  --color-neutral-400: #615f5f;
  --color-neutral-500: #535252;
  --color-neutral-600: #484747;
  --color-neutral-700: #393737;
  --color-neutral-800: #292928;
  --color-neutral-900: #201e1e;

  /* ─── Primary (orange-red brand) ────────────────────────────────── */
  --color-primary-50:  #fff0ec;
  --color-primary-100: #ffd2c4;
  --color-primary-200: #ffbca8;
  --color-primary-300: #ff9d80;
  --color-primary-400: #ff8a67;
  --color-primary-500: #ff6d41;   /* ← main brand colour */
  --color-primary-600: #e8633b;
  --color-primary-700: #b54d2e;
  --color-primary-800: #8c3c24;
  --color-primary-900: #6b2e1b;

  /* ─── Yellow ─────────────────────────────────────────────────────── */
  --color-yellow-50:  #fffce6;
  --color-yellow-100: #fef7b1;
  --color-yellow-200: #fef38b;
  --color-yellow-300: #feed56;
  --color-yellow-400: #fde935;
  --color-yellow-500: #fde403;
  --color-yellow-600: #e6cf03;
  --color-yellow-700: #b4a202;
  --color-yellow-800: #8b7d02;
  --color-yellow-900: #6a6001;

  /* ─── Orange ─────────────────────────────────────────────────────── */
  --color-orange-50:  #fff5e7;
  --color-orange-100: #fee0b6;
  --color-orange-200: #fdd192;
  --color-orange-300: #fcbd61;
  --color-orange-400: #fcb042;
  --color-orange-500: #fb9c13;
  --color-orange-600: #e48e11;
  --color-orange-700: #b26f0d;
  --color-orange-800: #8a560a;
  --color-orange-900: #694208;

  /* ─── Red ────────────────────────────────────────────────────────── */
  --color-red-50:  #fee9e8;
  --color-red-100: #fcbcb9;
  --color-red-200: #fb9b97;
  --color-red-300: #f96e67;
  --color-red-400: #f85149;
  --color-red-500: #f6261c;
  --color-red-600: #e02319;
  --color-red-700: #af1b14;
  --color-red-800: #87150f;
  --color-red-900: #67100c;

  /* ─── Semantic aliases ───────────────────────────────────────────── */
  --color-bg:          #ffffff;
  --color-bg-subtle:   #f6f6f6;
  --color-surface:     #ffffff;
  --color-border:      #ededed;
  --color-text:        #201e1e;
  --color-text-muted:  #6b6b6b;

  /* ─── Border radii ───────────────────────────────────────────────── */
  --radius-button: 9999px;
  --radius-input:  12px;
  --radius-card:   16px;
}
```

> **How it works in v4:** every `--color-*` variable declared inside `@theme` is automatically available as a Tailwind utility class.  
> `--color-primary-500` → `bg-primary-500`, `text-primary-500`, `border-primary-500`, etc.  
> `--font-sans` → `font-sans`.  
> No `tailwind.config.ts` is created or needed.

---

## 6. Utility Helper

`src/lib/utils.ts`
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 7. Folder Structure

```
src/
├── app/
│   ├── [locale]/                       ← Locale segment for next-intl (ru | en)
│   │   ├── (admin)/                    ← Route group — protected admin area
│   │   │   ├── layout.tsx              ← AdminLayout: Sidebar + Header shell
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   ├── page.tsx            ← Users list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        ← User detail
│   │   │   ├── subscriptions/
│   │   │   │   └── page.tsx
│   │   │   ├── servers/
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── (auth)/                     ← Route group — public auth pages
│   │   │   ├── layout.tsx              ← Centred single-column layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (public)/                   ← Route group — public landing pages
│   │   │   ├── layout.tsx              ← Public shell (header + footer)
│   │   │   └── page.tsx                ← Landing page (/)
│   │   └── layout.tsx                  ← Locale-scoped layout (NextIntlClientProvider)
│   ├── api/                            ← API routes (Next.js Route Handlers)
│   │   └── [...]/
│   ├── globals.css
│   ├── layout.tsx                      ← Root layout (font + providers)
│   └── providers.tsx                   ← QueryClientProvider, etc.
│
├── i18n/                               ← next-intl config
│   ├── routing.ts                      ← Locales + default + pathnames
│   ├── request.ts                      ← Server-side message loader
│   └── navigation.ts                   ← Typed Link / useRouter / redirect
│
├── messages/                           ← Translation files
│   ├── ru.json
│   └── en.json
│
├── components/
│   ├── ui/                             ← Primitive / design-system components
│   │   ├── button.tsx                  ← See 02-components-spec.md
│   │   ├── input.tsx                   ← See 02-components-spec.md
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── table.tsx
│   │   └── spinner.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── sidebar-item.tsx
│   │   ├── header.tsx
│   │   └── breadcrumb.tsx
│   ├── landing/                        ← Landing page section components
│   │   ├── landing-header.tsx
│   │   ├── landing-footer.tsx
│   │   ├── language-switcher.tsx
│   │   ├── hero.tsx
│   │   ├── benefits-grid.tsx
│   │   ├── benefit-card.tsx
│   │   ├── connect-guide.tsx
│   │   ├── testimonials.tsx
│   │   ├── pricing.tsx
│   │   ├── pricing-card.tsx
│   │   ├── faq.tsx
│   │   └── contact-form.tsx
│   └── features/                       ← Page/feature specific blocks
│       ├── dashboard/
│       │   ├── stat-card.tsx
│       │   └── traffic-chart.tsx
│       ├── users/
│       │   ├── user-table.tsx
│       │   └── user-filters.tsx
│       └── subscriptions/
│           └── plan-card.tsx
│
├── hooks/
│   ├── use-debounce.ts
│   └── use-media-query.ts
│
├── lib/
│   ├── utils.ts                        ← cn() helper
│   ├── constants.ts                    ← Route names, config constants
│   └── api.ts                          ← Fetch wrapper / axios instance
│
├── types/
│   └── index.ts                        ← Shared TypeScript interfaces
│
└── middleware.ts                       ← Auth guard — protect (admin) routes
```

**`src/app/providers.tsx`** — wrap all client-side providers here so `layout.tsx` stays a Server Component:
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient per-request (required in Next.js App Router)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

`src/app/layout.tsx` — consume it:
```tsx
import { Providers } from "./providers";
// ...
<body className="antialiased">
  <Providers>{children}</Providers>
</body>
```

## 8. Admin Layout Pattern

`src/app/(admin)/layout.tsx`
```tsx
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-20">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

**Sidebar skeleton** (`src/components/layout/sidebar.tsx`)

> Needs `"use client"` because it reads the current pathname to highlight the active item.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, CreditCard, Server,
  BarChart2, Settings, Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard",      icon: LayoutDashboard, label: "Dashboard" },
  { href: "/users",          icon: Users,           label: "Users" },
  { href: "/subscriptions",  icon: CreditCard,      label: "Subscriptions" },
  { href: "/servers",        icon: Server,          label: "Servers" },
  { href: "/analytics",      icon: BarChart2,       label: "Analytics" },
  { href: "/settings",       icon: Settings,        label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-30 bg-white px-4 py-6">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <Shield className="h-7 w-7 text-primary-500" />
        <span className="text-lg font-semibold text-neutral-900">Prometey VPN</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-500"
                  : "text-neutral-500 hover:bg-primary-50 hover:text-primary-500",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

---

## 9. Internationalisation (next-intl)

The app ships in **two locales**: Russian (`ru`, default) and English (`en`).  
We use [`next-intl`](https://next-intl.dev) — the de-facto i18n library for the Next.js App Router.

### 9.1 Routing strategy

Locale lives in the URL as a path segment:

```
/ru/dashboard   ← default locale, prefix shown
/en/dashboard
/ru/login
/en/login
```

> Setting `localePrefix: "always"` makes the active locale always explicit in the URL (best for SEO and link sharing). Switch to `"as-needed"` later if you want `/dashboard` to mean `/ru/dashboard`.

### 9.2 next-intl config files

`src/i18n/routing.ts`
```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"] as const,
  defaultLocale: "ru",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
```

`src/i18n/navigation.ts` — locale-aware drop-in replacements for `next/link`, `useRouter`, `redirect`, `usePathname`:
```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, useRouter, usePathname, getPathname } =
  createNavigation(routing);
```

`src/i18n/request.ts` — server loader that picks the right messages bundle per request:
```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 9.3 Plug-in registration

`next.config.ts`
```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // your other Next config here
};

export default withNextIntl(nextConfig);
```

### 9.4 Locale-scoped layout

`src/app/[locale]/layout.tsx`
```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this segment
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
```

> The root `src/app/layout.tsx` keeps `<html>` / `<body>` / `<Providers>` and renders `{children}`.  
> The `lang` attribute on `<html>` should be set there from the active locale — read it via `getLocale()` from `next-intl/server`.

`src/app/layout.tsx`
```tsx
import { getLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={inter.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 9.5 Translation files

`messages/ru.json` (default)
```json
{
  "common": {
    "appName": "Prometey VPN",
    "signIn": "Войти",
    "signUp": "Регистрация",
    "logout": "Выйти"
  },
  "nav": {
    "dashboard": "Дашборд",
    "users": "Пользователи",
    "subscriptions": "Подписки",
    "servers": "Серверы",
    "analytics": "Аналитика",
    "settings": "Настройки"
  },
  "landing": {
    "heroTitle": "Переверни интернет на 180°",
    "heroSubtitle": "Твоя свобода в один клик"
  }
}
```

`messages/en.json`
```json
{
  "common": {
    "appName": "Prometey VPN",
    "signIn": "Sign in",
    "signUp": "Sign up",
    "logout": "Log out"
  },
  "nav": {
    "dashboard": "Dashboard",
    "users": "Users",
    "subscriptions": "Subscriptions",
    "servers": "Servers",
    "analytics": "Analytics",
    "settings": "Settings"
  },
  "landing": {
    "heroTitle": "Turn the internet 180°",
    "heroSubtitle": "Your freedom in one click"
  }
}
```

### 9.6 Using translations

**Server Component**
```tsx
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("nav");
  return <h1>{t("dashboard")}</h1>;
}
```

**Client Component**
```tsx
"use client";
import { useTranslations } from "next-intl";

export function LogoutButton() {
  const t = useTranslations("common");
  return <button>{t("logout")}</button>;
}
```

**Locale-aware Link** — always use the wrapper from `@/i18n/navigation`, never `next/link` directly, otherwise the locale prefix is lost:
```tsx
import { Link } from "@/i18n/navigation";

<Link href="/dashboard">{t("dashboard")}</Link>
```

### 9.7 Language switcher

`src/components/layout/language-switcher.tsx`
```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import type { Locale } from "@/i18n/routing";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="inline-flex rounded-full border border-neutral-30 bg-white p-1">
      {LOCALES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(() =>
              router.replace(pathname, { locale: value }),
            )
          }
          className={
            "rounded-full px-3 py-1 text-sm font-medium transition-colors " +
            (locale === value
              ? "bg-primary-500 text-white"
              : "text-neutral-500 hover:text-neutral-900")
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
```

---

## 10. Auth & Locale Middleware (Route Protection)

`src/middleware.ts`

> The middleware does **two** things in order:
> 1. Run the next-intl middleware so locale detection / prefixing works.
> 2. Read the `auth-token` cookie and redirect to `/login` if a protected route is requested without it.

```ts
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Paths after stripping the locale prefix
const PUBLIC_PATHS = ["/", "/login", "/register"];

function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  // segments = ["", "ru", "dashboard", ...]
  if (
    segments.length > 1 &&
    routing.locales.includes(segments[1] as (typeof routing.locales)[number])
  ) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  // 1. Locale handling first
  const intlResponse = intlMiddleware(request);

  // 2. Auth guard
  const pathname = stripLocale(request.nextUrl.pathname) || "/";
  const token = request.cookies.get("auth-token")?.value;
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  if (!token && !isPublic) {
    const locale = request.nextUrl.pathname.split("/")[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    const locale = request.nextUrl.pathname.split("/")[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlResponse;
}

export const config = {
  // Match everything except API, static, image, and favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
```

---

## 11. Lucide Icon Usage Conventions

```tsx
// ✅ Tree-shakeable named imports only
import { Search, Bell, ChevronDown } from "lucide-react";

// Standard size classes
// xs: h-3 w-3   sm: h-4 w-4   md: h-5 w-5   lg: h-6 w-6   xl: h-8 w-8

// Button with icon pattern
<button className="flex items-center gap-2">
  <Search className="h-4 w-4" />
  <span>Search</span>
</button>
```

---

## 12. Best Practice Checklist

| # | Practice | Notes |
|---|----------|-------|
| 1 | **Server Components by default** | Add `"use client"` only for interactive UI |
| 2 | **Route Groups for layout isolation** | `(admin)` and `(auth)` never share a shell |
| 3 | **Zod schemas co-located with forms** | Define schema in the same file as the form |
| 4 | **Loading UI per segment** | Add `loading.tsx` next to every `page.tsx` |
| 5 | **Error boundaries per segment** | Add `error.tsx` next to every `page.tsx` |
| 6 | **`cn()` for all className merging** | Never concatenate class strings manually |
| 7 | **Semantic HTML** | Use `<nav>`, `<main>`, `<aside>`, `<header>` |
| 8 | **`aria-current="page"`** | Mark active sidebar links for accessibility |
| 9 | **Absolute imports** | Always `@/components/...` never `../../...` |
| 10 | **Type-safe API layer** | Return typed responses from all Route Handlers |
| 11 | **No hardcoded UI strings** | Every user-facing string lives in `messages/*.json` |
| 12 | **Always use `@/i18n/navigation`** | Never `next/link` directly — locale prefix would be lost |
| 13 | **`setRequestLocale(locale)` in segments** | Required for static rendering with next-intl |
| 14 | **`generateStaticParams` per locale** | Pre-render every locale at build time |

---

## 13. Recommended VS Code Extensions

- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Error Lens** — `usernamehw.errorlens`
