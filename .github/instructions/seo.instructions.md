---
applyTo: "src/app/**/*.{ts,tsx},src/components/seo/**/*.{ts,tsx}"
description: "SEO engineering rules for Next.js 15 App Router. Covers metadata API, robots.txt, sitemap.xml, structured data (JSON-LD), OG images, hreflang, noindex guards, and keyword strategy. Apply to all app-layer and SEO component files."
---

# SEO Engineering Rules — Next.js App Router

These rules apply to every file in `src/app/` and `src/components/seo/`.  
They encode Senior SEO Engineer practices for a Next.js 15 App Router project with next-intl i18n (locales: `ru`, `en`; defaultLocale: `ru`).

---

## 0. Non-negotiable defaults

- **`metadataBase` MUST exist in `src/app/layout.tsx`** — every relative URL in OG image, canonical, and alternates resolves against it. Use `process.env.NEXT_PUBLIC_SITE_URL`.
- **Every publicly crawlable layout/page MUST have `generateMetadata` or `export const metadata`** — never rely on root metadata alone.
- **Every auth-gated route MUST have `robots: { index: false, follow: false }`** — users' private pages must never be indexed.
- **`robots.ts` and `sitemap.ts` MUST be in `src/app/`** — Next.js auto-serves them at `/robots.txt` and `/sitemap.xml`.
- **No hardcoded strings in metadata** — all titles, descriptions, keywords come from `messages/{en,ru}.json` via `getTranslations`.
- **Never add `noindex` to public marketing pages** (landing, pricing, features, FAQ).
- **One `<main>` per page** — the layout owns `<main>`. page.tsx must NOT add another.
- **`NEXT_PUBLIC_SITE_URL`** must be set in `.env.local` (dev) and the deployment environment (prod). Used by robots, sitemap, OG image URLs, and canonical links.

---

## 1. Keyword strategy

### Tiers
| Tier | Purpose | Placement |
|---|---|---|
| T1 — High commercial intent | `купить VPN`, `VPN для России`, `VLESS VPN`, `fast VPN subscription` | Title tag (once), H1 (once), meta description, OG title |
| T2 — Informational | `быстрый VPN`, `обход блокировок`, `VPN for 10 devices` | Section `<h2>` headings, FAQ Q&As, meta description |
| T3 — Long-tail | `VPN для iOS Android Windows`, `VLESS protocol guide` | Blog posts, FAQ answers, JSON-LD FAQ text |

### Title tag formula  
```
[T1 Keyword] — [Brand] | [T2 Keyword]         ← landing page (absolute, 50–60 chars)
[Short page name]                               ← utility pages (template adds " | Brand")
```
Examples:
- `"Prometey VPN — Быстрый VPN для России | VLESS + OpenVPN"` — 58 chars ✓
- `"Sign In"` → template → `"Sign In | Prometey VPN"` ✓

### Meta description formula (130–160 chars)
```
[Primary benefit + T1 keyword]. [Supporting USP]. [CTA or differentiator].
```
Example EN: `"High-speed VPN using VLESS & OpenVPN. Connect up to 10 devices. Free trial, plans from €3/mo. Works where others fail."` — 122 chars ✓

### Rules
1. Title ≤ 60 chars. Contains brand + primary T1 keyword.
2. Description 130–160 chars. Contains 1 T1 + 1 T2 keyword. Ends with differentiator.
3. Never keyword-stuff. One T1 in title, natural density in description.
4. `keywords` meta tag: populate even though Google ignores it — **Yandex uses it for the Russian market**.
5. OG title/description can be slightly more marketing-oriented than the SERP title/description.

---

## 2. Next.js Metadata API patterns

### Root layout — required base config
```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Brand Name',
    template: '%s | Brand Name',   // applied to all child routes (Sign In → "Sign In | Brand")
  },
  description: 'Fallback description.',
  applicationName: 'Brand Name',
  robots: { index: true, follow: true },
};
```

### Public marketing layout — full metadata
```tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    title: { absolute: t('title') },     // bypass template — title already includes brand
    description: t('description'),
    keywords: t('keywords').split(',').map((k) => k.trim()),
    openGraph: {
      type: 'website',
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: pageUrl,
      siteName: 'Brand Name',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: 'Brand Name' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${baseUrl}/opengraph-image.png`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/ru`,   // default locale for unknown user languages
      },
    },
  };
}
```

### Auth layout — noindex required
```tsx
return {
  title: t('title'),         // "Sign In" → template → "Sign In | Brand"
  description: t('description'),
  robots: { index: false, follow: false },   // MANDATORY — no exceptions
};
```

### Dashboard layout — noindex required
```tsx
return {
  title: t('title'),         // "Dashboard" → template → "Dashboard | Brand"
  description: t('description'),
  robots: { index: false, follow: false },
  // Do NOT add openGraph/twitter — noindexed pages waste crawl budget
};
```

### Per-page canonical (when a layout group has multiple pages)
If a single layout group contains multiple public pages (e.g., `/terms`, `/privacy`, `/features`),
each page MUST have its own `generateMetadata` with:
```tsx
alternates: {
  canonical: `${baseUrl}/${locale}/terms`,
  languages: { ru: `${baseUrl}/ru/terms`, en: `${baseUrl}/en/terms` },
},
```
A shared layout's canonical URL would be wrong for every page except one.

---

## 3. `robots.ts` — Crawl directives

Location: `src/app/robots.ts` (served at `/robots.txt`)

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ru', '/en'],
        disallow: [
          '/*/dashboard',
          '/*/login',
          '/*/register',
          '/*/forgot-password',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

Rules:
- Allow all public marketing pages.
- Disallow all auth-gated pages using locale-wildcard pattern (`/*/dashboard`).
- Disallow `/api/` entirely.
- Always include the sitemap URL.

---

## 4. `sitemap.ts` — XML sitemap

Location: `src/app/sitemap.ts` (served at `/sitemap.xml`)

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const now = new Date();
  return [
    { url: `${baseUrl}/ru`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/en`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    // Add future public pages here:
    // { url: `${baseUrl}/ru/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
```

Priority guide:
| Priority | Route type |
|---|---|
| 1.0 | Homepage / main landing (default locale) |
| 0.9 | Same page, secondary locale |
| 0.7 | Feature pages, pricing, dedicated landing pages |
| 0.5 | Blog index, resource pages |
| 0.3 | Legal pages (terms, privacy, AUP) |

**NEVER include** in sitemap:
- `/dashboard/**`, `/login`, `/register` — private or utility
- `/api/**` — not pages
- Any route with `robots: noindex`

---

## 5. Structured data — JSON-LD components

Location: `src/components/seo/`

All JSON-LD components are **pure server components** (no `'use client'`).
They render `<script type="application/ld+json" dangerouslySetInnerHTML=...>` tags.
Props are serializable — no functions, no React nodes.

### Placement map
| Schema type | Component | Where to render |
|---|---|---|
| Organization + WebSite | `SiteJsonLd` | Public layout → applies to every public page |
| FAQPage | `FaqJsonLd` | Landing page component (next to `<FaqSection>`) |
| Product + Offers | `ProductJsonLd` | Landing page component (next to `<PricingSection>`) |
| BreadcrumbList | (future) `BreadcrumbJsonLd` | Dashboard pages |
| Article | (future) `ArticleJsonLd` | Blog post pages |

### Component authoring pattern
```tsx
// server component — no 'use client'
export interface FooJsonLdProps {
  items: ReadonlyArray<{ name: string; description: string }>;
}

export const FooJsonLd = ({ items }: FooJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SomeType',
    // ...
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

### High-value schemas for VPN / SaaS
1. **FAQPage** → expandable FAQ in Google SERP (highest organic ROI — free SERP real estate)
2. **Product + Offers** → price rich snippet in SERP
3. **Organization** → trust signal, Knowledge Panel
4. **WebSite** → sitelinks searchbox for branded queries

### Async server components for translation-driven JSON-LD
When JSON-LD content comes from `next-intl` translations, use an async server component:
```tsx
import { getLocale, getTranslations } from 'next-intl/server';

export const LandingJsonLd = async () => {
  const locale = await getLocale();
  const tFaq = await getTranslations({ locale, namespace: 'landing.faq' });
  const items = Array.from({ length: 6 }, (_, i) => ({
    question: tFaq(`items.${i}.q`),
    answer: tFaq(`items.${i}.a`),
  }));
  return <FaqJsonLd items={items} />;
};
```

---

## 6. OG image (`next/og`)

Location: `src/app/opengraph-image.tsx` → auto-served at `/opengraph-image.png`  
Per-route override: `src/app/[locale]/(public)/blog/[slug]/opengraph-image.tsx`

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Brand Name';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#1a1a1a' }}>
      {/* design here */}
    </div>,
    size,
  );
}
```

Design checklist:
- [ ] Brand name readable at thumbnail (400px Discord/Slack/iMessage preview)
- [ ] Primary keyword visible in headline text
- [ ] Brand color used prominently (builds recognition in SERP)
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] No important elements within 50px of edges (clipped in some platforms)
- [ ] Dark background preferred (stands out in light-mode feed)

ImageResponse CSS notes:
- Uses Satori — supports **flexbox only**. No grid, no `position: sticky`, no CSS variables.
- Inline styles only (`style={{}}`). No Tailwind utilities.
- `runtime = 'edge'` is required for performance.
- Use system fonts (`fontFamily: 'system-ui'`) for reliability, or load custom fonts via `fetch()`.

---

## 7. hreflang — i18n SEO

Every public page with localized counterparts must declare both locales:
```tsx
alternates: {
  canonical: `${baseUrl}/${locale}`,
  languages: {
    ru: `${baseUrl}/ru`,
    en: `${baseUrl}/en`,
    'x-default': `${baseUrl}/ru`,   // fallback for users whose language isn't covered
  },
},
```

Rules:
- `x-default` points to the **default locale** (`ru` in this project).
- ALL locale versions of a page must reference EACH OTHER (bidirectional).
- Both locale URLs must appear in `sitemap.xml`.
- Mismatched hreflang is one of the most common technical SEO errors — always validate with Screaming Frog or Google Search Console.

---

## 8. noindex guard rules

| Route type | `robots` value | Reason |
|---|---|---|
| Public landing | `{ index: true, follow: true }` | Default; must be indexable |
| Login / Register | `{ index: false, follow: false }` | Utility page; duplicate content risk |
| Dashboard | `{ index: false, follow: false }` | Private user data |
| API routes | N/A (not pages) | Excluded via `robots.ts` Disallow |
| Error pages (404, 500) | `{ index: false, follow: false }` | Should not be indexed |

Set at **layout level** so all pages in that group are automatically covered.  
Do NOT set `noindex` per-page if the layout already sets it — redundant but not harmful.

---

## 9. Semantic HTML — SEO impact

This supplements `components.instructions.md` §11. SEO-critical semantic rules:

| Element | When to use | Bad pattern |
|---|---|---|
| `<main>` | Once per page. **Layout owns it.** page.tsx must NOT wrap content in `<main>` if layout already has one. | Double `<main>` — invalid HTML, confuses Googlebot |
| `<article>` | Self-contained indexable content (pricing card, testimonial, blog post) | `<div>` for standalone content |
| `<section>` | Thematic group requiring an `<h2>`. MUST have an accessible heading. | Major page sections as `<div>` |
| `<nav aria-label="...">` | Navigation link groups. Needs `aria-label` when multiple `<nav>` on page. | `<div>` for link lists |
| `<h1>` | **Exactly one per page.** Contains primary T1 keyword. | Multiple `<h1>`, or `<h1>` without keyword |
| `<h2>` | Section titles (Benefits, Pricing, FAQ, Testimonials). | `<p>` used as section title (breaks heading hierarchy) |
| `<h3>` | Subsections, footer column headings. | `<strong>` or `<p>` for column headings in `<footer>` |
| `<p>` | Prose paragraphs only. | Single-word labels, prices (`<span>` instead), `<button>` question text (`<span>`) |

Heading hierarchy per page (strict):
```
h1 — main page topic (one per page)
  h2 — major section (Benefits, Pricing, FAQ, Reviews)
    h3 — subsection / group title
      h4 — individual items (rare, only when h3 is used for group)
```

---

## 10. Core Web Vitals — ranking signal

CWV affect Google ranking. Current project setup is already good (font `display: swap`, framer-motion code-split).

Required going forward:
- **LCP image** (hero background `<img>`): migrate to `<Image priority unoptimized>` from `next/image`. For background images use `priority` to preload.
- **CLS**: reserve space for dynamic/async content (skeleton loaders, explicit `width` + `height` on images).
- **INP**: debounce scroll handlers. Avoid heavy computation in `onScroll`.
- **TTFB**: `cache: 'force-cache'` for API calls that return static/slow-changing data (pricing plans, FAQ content).

---

## 11. Translation key conventions — `meta` namespace

```
meta.home.title          Absolute title (brand in title, bypasses template). ≤ 60 chars.
meta.home.description    Meta description. 130–160 chars. Keywords natural.
meta.home.keywords       Comma-separated list (for Yandex and meta tag).
meta.home.ogTitle        Open Graph title (social). Can differ from SERP title. ≤ 60 chars.
meta.home.ogDescription  Open Graph description. Punchy, ≤ 200 chars.

meta.<page>.title        Short title (template appends " | Brand"). ≤ 40 chars.
meta.<page>.description  Meta description for the page.
```

**Mandatory**: both `en.json` and `ru.json` must be updated in the **same operation**.

---

## 12. Project-specific context (Prometey VPN)

- **Default locale**: `ru` — Russian copy/keywords take priority; Yandex is primary search engine.
- **Key USPs for copy**: VLESS protocol, up to 10 devices, free trial, works in Russia, from €3/mo.
- **Target search engines**: Yandex (primary for RU users) + Google International.
- **Pricing**: 4 plans (€3/1mo, €5/3mo, €8/6mo, €12/12mo) — use in Product JSON-LD.
- **FAQ**: 6 items in translations — use verbatim for FAQPage JSON-LD.
- **Logo**: `public/images/logo.png` (512×512, square PNG) needed for Organization schema. Add when design asset is available.
- **Social / sameAs**: add Telegram channel URL to `Organization.sameAs` when the channel is public.

---

## 13. Definition of done — SEO checklist

Run after every SEO-related change:

- [ ] `npx tsc --noEmit` — zero errors
- [ ] `curl https://domain/robots.txt` — Disallow rules present, sitemap URL listed
- [ ] `curl https://domain/sitemap.xml` — valid XML, only public URLs, no dashboard/login
- [ ] View source of landing page — `<title>`, `<meta name="description">`, `<meta property="og:image">`, `<link rel="canonical">` all present
- [ ] View source — `<main>` appears exactly once
- [ ] View source — `<link rel="alternate" hreflang="ru">` and `hreflang="en"` present
- [ ] Google Rich Results Test → FAQPage schema PASS
- [ ] Google Rich Results Test → Product schema PASS
- [ ] Open Graph Debugger (Facebook) → image 1200×630, correct title/description
- [ ] Twitter Card Validator → `summary_large_image` renders correctly
- [ ] Private routes (`/dashboard`, `/login`) return `X-Robots-Tag: noindex` header
- [ ] Lighthouse SEO score ≥ 95
