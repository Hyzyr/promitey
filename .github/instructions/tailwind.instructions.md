---
applyTo: "src/**/*.{ts,tsx,css}"
description: "Mandatory rules for Tailwind CSS v4 usage in this project. AI MUST follow these without asking."
---

# Tailwind CSS v4 Rules — Prometey VPN

These rules apply to **every** file that touches styling: `.tsx` components, `.css` files, or anything that generates class names.

Tailwind v4 is **fundamentally different** from v3. Read every section before writing a single class.

> **Source:** Rules verified against the official Tailwind CSS v4.2 docs (tailwindcss.com).

---

## 0. Critical Rule — NEVER generate dynamic class strings

**This is the #1 source of invisible bugs. Read it twice.**

Tailwind scans your source files as **plain text**. It does not execute JavaScript. It looks for tokens that could be class names via regex — it cannot understand string concatenation or interpolation.

```tsx
// ❌ FATAL — Tailwind never sees these classes, no CSS is generated
const bp = (prefix: string) => (cls: string) => `${prefix}:${cls}`;
const lgx = bp('lgx');
<div className={lgx('col-start-1 row-start-1')} />           // invisible
<div className={`${breakpoint}:col-start-1`} />               // invisible
<div className={['md', 'lg'].map(b => `${b}:px-4`).join(' ')} /> // invisible

// ✅ CORRECT — complete, literal, static strings
<div className="lgx:col-start-1 lgx:row-start-1" />
<div className="md:px-4 lg:px-5 lgx:px-3 xl:px-4" />
```

**If a prop controls styling, map it to full static strings:**
```tsx
// ✅ map prop values to complete class name strings
const colorMap = {
  primary: 'bg-primary-500 text-white',
  ghost: 'bg-transparent border border-neutral-40',
};
<button className={colorMap[variant]} />
```

**Corollary:** Never create helper functions that build breakpoint-prefixed class strings. The only approved class composition tool is `cn()` (see §5).

---

## 1. Project setup — how Tailwind v4 is loaded

```css
/* src/app/globals.css — single import, no config file */
@import 'tailwindcss';
```

- No `tailwind.config.ts`. No `content` array. No `theme.extend`.
- All customization lives in `@theme {}`, `@utility {}`, `@custom-variant {}` inside `globals.css`.
- Do **not** create a `tailwind.config.ts` unless explicitly asked.
- Do **not** use the deprecated `theme()` function — use CSS variables (`var(--color-*)`) instead.

### Directives reference (v4 only)

| Directive | Purpose |
|---|---|
| `@import "tailwindcss"` | Load Tailwind (replaces v3 `@tailwind base/components/utilities`) |
| `@theme {}` | Define design tokens (colors, radii, breakpoints, fonts) |
| `@utility name {}` | Define a custom utility class usable with all variants |
| `@custom-variant name {}` | **Define** a new variant (e.g. media query range, data-attr selector) |
| `@variant name {}` | **Apply** an existing variant inside a CSS rule |
| `@apply` | Use utility classes inside CSS rules (only in `.css` files) |
| `@layer base/components/utilities {}` | Add to a specific Tailwind layer |
| `@source "path"` | Explicitly scan a path for classes |
| `@source inline("class")` | Force-generate a class (safelist) |
| `@source not "path"` | Exclude a path from scanning |
| `@reference "file"` | Import theme for `@apply` in Vue/Svelte `<style>` blocks — no CSS output |

### Functions reference (v4 only)

| Function | Purpose |
|---|---|
| `--alpha(color / 50%)` | Adjust opacity: `color-mix(in oklab, color 50%, transparent)` |
| `--spacing(4)` | Generate spacing: `calc(var(--spacing) * 4)` |
| `--value(--theme-key-*)` | Resolve functional utility value from theme (inside `@utility` only) |

---

## 2. Custom breakpoints

| Prefix | Value | Generated media query |
|---|---|---|
| (none) | — | Mobile-first baseline |
| `sm:` | 640px (40rem) | `@media (width >= 40rem)` |
| `md:` | 768px (48rem) | `@media (width >= 48rem)` |
| `lg:` | 1024px (64rem) | `@media (width >= 64rem)` |
| `lgx:` | **1160px (72.5rem)** | `@media (width >= 72.5rem)` — **custom** |
| `xl:` | 1280px (80rem) | `@media (width >= 80rem)` |
| `2xl:` | 1536px (96rem) | `@media (width >= 96rem)` |

### ⚠️ Breakpoint cascade order — MUST re-declare all in one `@theme` block

Tailwind v4 sorts breakpoints by their value in rem. If you define only `--breakpoint-lgx` without re-declaring `md`, `lg`, `xl`, the sort order may break because Tailwind uses its built-in defaults for those. All breakpoints must use the **same unit (rem)** to sort correctly.

**Always declare all breakpoints together** in `globals.css`:

```css
@theme {
  /* Explicitly declare cascade order — do NOT remove this block */
  --breakpoint-md:  48rem;   /* 768px  */
  --breakpoint-lg:  64rem;   /* 1024px */
  --breakpoint-lgx: 72.5rem; /* 1160px — custom */
  --breakpoint-xl:  80rem;   /* 1280px */
}
```

> ⚠️ Always use **rem** for all breakpoints. Mixing `px` and `rem` breaks sort order and causes breakpoints to override each other unexpectedly.

### Range variants (built-in, no setup needed)

Tailwind v4 generates `max-*` variants automatically for each defined breakpoint:

```tsx
// Apply between md and lgx only (tablet-to-desktop range)
<div className="md-lgx:absolute md-lgx:right-0" />

// Apply below md only (mobile only)
<div className="max-md:hidden" />

// Apply only at exactly lg (lg up to xl)
<div className="lg:max-xl:flex" />
```

### Arbitrary one-off breakpoints (no `@theme` needed)

```tsx
<div className="min-[320px]:text-center max-[600px]:bg-sky-300" />
```

### `tablet` custom variant (md → lgx, already defined in globals.css)

Defined via `@custom-variant` — equivalent to `md-lgx:` but semantic.

```tsx
// TSX — static literal string only (see §0)
<div className="tablet:hidden tablet:flex-row" />
```

```css
/* Inside @utility */
@utility my-widget {
  @apply tablet:px-6;
}

/* Raw @media for complex multi-rule blocks (CSS vars don't work in @media) */
@media (width >= 48rem) and (width < 72.5rem) {
  .selector { display: none; }
}
```

---

## 3. Design tokens — always use these, never raw hex

All tokens live in `@theme {}` in `globals.css` and are available as Tailwind utilities AND CSS variables.

### Colors

```
Neutral:  neutral-0 (white) → neutral-900 (near-black)
          neutral-20 = #f6f6f6  (main background)
          neutral-800 = #292928 (dark text / icons)

Primary:  primary-50 → primary-900  (orange-red brand)
          primary-500 = #ff6d41 (main brand)

Yellow:   yellow-50 → yellow-900
Orange:   orange-50 → orange-900
Red:      red-50 → red-900

Semantic aliases (preferred for layout):
  bg          → #ffffff
  bg-subtle   → #f6f6f6  (= neutral-20)
  surface     → #ffffff
  border      → #ededed  (= neutral-30)
  text        → #201e1e  (= neutral-900)
  text-muted  → #6b6b6b  (= neutral-300)
```

```tsx
// ❌ raw hex
<div className="bg-[#f6f6f6] text-[#201e1e]" />

// ✅ design token
<div className="bg-neutral-20 text-neutral-900" />
<div className="bg-bg-subtle text-text" />
```

Access tokens as CSS variables for dynamic values in `style={}`:
```tsx
<div style={{ color: 'var(--color-primary-500)' }} />
```

Use `--alpha()` for opacity adjustments in CSS:
```css
.element { color: --alpha(var(--color-primary-500) / 50%); }
```

### Border radii

```
rounded-sm   → 12px   (inputs, chips)
rounded      → 12px   (default)
rounded-md   → 16px   (cards, modals)
rounded-lg   → 24px
rounded-xl   → 32px
rounded-2xl  → 40px
rounded-3xl  → 48px
rounded-full → 9999px (pill, circles)
```

### Container (never re-implement padding)

```tsx
import { Container } from '@/components/ui/container';
// padding: 20px mobile → 32px md → 48px lg → 64px xl (1280px+)
```

---

## 4. `@utility` — defining custom utilities

```css
/* Simple utility */
@utility content-auto {
  content-visibility: auto;
}

/* Complex utility with nested selectors */
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}

/* With @apply and responsive variants */
@utility benefit-card-shell {
  @apply relative flex flex-col overflow-hidden;
  @apply rounded-md border bg-neutral-20;
  @apply px-4 md:px-5 lgx:px-6;
}
```

Custom utilities automatically work with **all variants**: `hover:`, `lg:`, `tablet:`, focus:`, etc.

#### When to use `@utility` vs inline classes

| Use `@utility` | Use inline classes |
|---|---|
| Same visual shell on 3+ components | One-off layout/positioning |
| Complex nested selectors | Simple spacing / color |
| Non-Tailwind CSS (custom gradients, box-shadow) | Conditional classes via `cn()` |
| Central control needed | Component-local variants |

#### Existing utilities in this project

| Utility | What it does |
|---|---|
| `container` | Full responsive container with design-token padding |
| `logo` | Logo sizing with em-based height scaling |
| `icon` | 1em×1em inline SVG wrapper |
| `glass` | Frosted-glass gradient + shadow visual |
| `bg` | Absolute full-bleed decorative background layer |
| `bgitem` | Element inside a `bg` layer (`absolute w-auto!`) |
| `benefit-card-shell` | Benefit section card shell (border, padding, min-h) |
| `bigcard` | Grid placement for the wide "Your Internet" benefit card |
| `input` | Input wrapper with `.light` / `.dark` / `.error` variants |

---

## 5. `@custom-variant` vs `@variant` — critical distinction

### `@custom-variant` — **defines** a new variant

```css
/* Media-query range variant */
@custom-variant tablet {
  @media (width >= 48rem) and (width < 72.5rem) {
    @slot;
  }
}

/* Selector-based (shorthand — no nesting needed) */
@custom-variant theme-dark (&:where([data-theme="dark"] *));

/* Multi-rule variant */
@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```

After defining, use like any built-in variant: `tablet:hidden`, `theme-dark:bg-neutral-900`.

### `@variant` — **applies** an existing variant inside CSS rules

```css
/* Apply an existing variant inside a CSS rule (NOT defining it) */
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
}

/* Nest multiple variants */
.my-element {
  @variant tablet {
    @variant hover {
      opacity: 0.8;
    }
  }
}
```

> **Common mistake that crashes the build:** Using `@variant name { @media... @slot; }` to **define** a variant. That is wrong. Use `@custom-variant` to define, `@variant` to apply.

---

## 6. Class composition in TSX — always `cn()`

```tsx
import { cn } from '@/lib/utils';

// ✅ conditional + merged
<div className={cn('flex flex-col gap-4', isActive && 'bg-primary-100', className)} />

// ✅ conflict resolution (last wins)
cn('px-4', 'px-6')  // → 'px-6'

// ❌ no deduplication, no conflict resolution
<div className={`flex flex-col ${isActive ? 'bg-primary-100' : ''}`} />
```

---

## 7. Responsive authoring — mobile-first

Always write mobile baseline first (unprefixed), then override at larger breakpoints:

```tsx
// ✅ mobile-first
<div className="flex flex-col gap-4 md:grid md:grid-cols-2 lgx:grid-cols-3" />

// ❌ avoid desktop-first
<div className="grid grid-cols-3 max-lgx:grid-cols-2 max-md:flex" />
```

- `sm:` means "at 640px and up", **not** "on small screens"
- Mobile is the **unprefixed** baseline
- Every breakpoint prefix must be a complete literal string — never build at runtime

---

## 8. `@apply` rules

**Allowed:** inside `@utility {}`, `@layer {}`, or plain CSS selectors in `.css` files.
**Forbidden:** inside `.tsx` files.

```css
/* ✅ inside globals.css */
@utility section-title {
  @apply text-3xl font-bold leading-tight md:text-4xl xl:text-5xl;
}

@layer base {
  h1 { @apply text-2xl font-bold; }
}
```

**For Vue/Svelte `<style>` blocks**, use `@reference` to access theme without duplicating output:
```css
/* Vue/Svelte <style> */
@reference "../../app.css";
h1 { @apply text-2xl font-bold text-primary-500; }
```

---

## 9. Arbitrary values — when allowed

```tsx
// ✅ legitimate — pixel-perfect from design
<div className="min-h-[38vh] rounded-[16px] w-[50%] pr-[45%]" />

// ✅ arbitrary breakpoint (one-off)
<div className="min-[320px]:text-sm max-[600px]:hidden" />

// ✅ arbitrary CSS property not in utilities
<div className="[mask-type:luminance] hover:[mask-type:alpha]" />

// ✅ CSS variable shorthand (auto-wraps in var())
<div className="fill-(--my-brand-color)" />

// ✅ type hint when Tailwind can't infer
<div className="text-(length:--my-var)" />   // font-size
<div className="text-(color:--my-var)" />    // color

// ❌ use a token instead
<div className="bg-[#f6f6f6]" />    // → bg-neutral-20
<div className="rounded-[12px]" />   // → rounded-sm
```

**Underscore = space** in arbitrary values:
```tsx
<div className="grid-cols-[1fr_500px_2fr]" />  // → 1fr 500px 2fr
```

---

## 10. Safelisting — force-generate classes not in source

When a class is built dynamically (e.g. from a CMS or API response) and isn't statically scannable, safelist it:

```css
/* Single class */
@source inline("underline");

/* With variants */
@source inline("{hover:,focus:,}underline");

/* Range */
@source inline("{hover:,}bg-primary-{50,{100..900..100}}");

/* Exclude a path from scanning */
@source not "../src/legacy";
```

---

## 11. Container queries (when needed)

Style elements based on **container size**, not viewport:

```tsx
<div className="@container">
  <div className="flex flex-col @md:flex-row" />
</div>

{/* Named container */}
<div className="@container/main">
  <div className="@sm/main:flex-col" />
</div>
```

Only use container queries when a component genuinely responds to its container — use viewport breakpoints for page-level layout.

---

## 12. Dark mode

This project does **not** use Tailwind's `dark:` variant for theming. The design is single-theme (light). Do not add `dark:` classes unless implementing an explicit dark-mode feature.

---

## 13. What NOT to do — summary checklist

| ❌ Forbidden | ✅ Instead |
|---|---|
| Dynamic class string building | Full static literal class strings |
| `tailwind.config.ts` for new tokens | `@theme {}` in `globals.css` |
| Raw hex colors | Design tokens (`neutral-*`, `primary-*`, etc.) |
| `@apply` in `.tsx` files | Inline Tailwind classes or `cn()` |
| Recreating container padding manually | `<Container>` component |
| `dark:` classes for general theming | Project is single-theme light |
| `theme()` function (v3, deprecated) | CSS variable `var(--color-*)` |
| `@variant` to **define** a new variant | `@custom-variant` |
| CSS `var()` inside raw `@media` queries | Literal rem values |
| Renaming/deleting existing `@utility` blocks | Only add or extend |

---

## 14. V3 → V4 Breaking Changes Reference

A full catalogue of what changed from Tailwind v3 to v4 — so you never write v3 patterns.

### 14.1 Import & setup

```css
/* v3 ❌ */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 ✅ */
@import "tailwindcss";
```

Remove `postcss-import` and `autoprefixer` — Tailwind v4 handles both automatically.

### 14.2 Config file — gone

| v3 ❌ | v4 ✅ |
|---|---|
| `tailwind.config.ts` / `tailwind.config.js` | `@theme {}` in CSS |
| `theme.extend.colors` | `@theme { --color-brand: …; }` |
| `theme.extend.screens` | `@theme { --breakpoint-lgx: 72.5rem; }` |
| `content: ['./src/**']` | Auto-detected via `@import` – no config needed |
| `corePlugins: { container: false }` | ❌ not supported in v4 |
| `safelist: ['flex', …]` | `@source inline("flex")` in CSS |
| `resolveConfig()` from JS | `getComputedStyle(document.documentElement).getPropertyValue('--color-brand')` |

If you still need a JS config (e.g. for a shared design system), load it explicitly:
```css
@config "../../tailwind.config.js";
```
`corePlugins`, `safelist`, and `separator` options are **not** supported in v4 JS configs.

### 14.3 Renamed utilities

```html
<!-- v3 → v4 (bare versions still work but show incorrect size) -->
shadow-sm    → shadow-xs
shadow       → shadow-sm
shadow-md    → shadow-md   (unchanged)
rounded-sm   → rounded-xs
rounded      → rounded-sm
blur-sm      → blur-xs
blur         → blur-sm
drop-shadow-sm  → drop-shadow-xs
drop-shadow     → drop-shadow-sm
backdrop-blur-sm → backdrop-blur-xs
backdrop-blur    → backdrop-blur-sm

outline-none → outline-hidden  (still hides; outline-none now literally removes outline)
ring         → ring-3          (was 3px, now 1px by default)
```

### 14.4 Removed deprecated utilities

| v3 ❌ | v4 ✅ |
|---|---|
| `bg-opacity-50` | `bg-black/50` |
| `text-opacity-50` | `text-black/50` |
| `border-opacity-50` | `border-black/50` |
| `ring-opacity-50` | `ring-black/50` |
| `flex-shrink-0` | `shrink-0` |
| `flex-grow` | `grow` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |

### 14.5 Default color changes

**Border/divide default:** v3 used `gray-200`; v4 uses `currentColor`.
```html
<!-- v4: always specify border color explicitly -->
<div class="border border-gray-200 px-2 py-3">…</div>

<!-- or restore v3 behavior globally in CSS -->
```
```css
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

**Ring default:** v3 = 3px + blue-500; v4 = 1px + currentColor.
```html
<!-- v3 pattern: class="focus:ring" -->
<!-- v4 equivalent: -->
<button class="focus:ring-3 focus:ring-blue-500">…</button>
```

**Placeholder color:** v3 = gray-400; v4 = currentColor at 50% opacity.

### 14.6 Custom utilities — `@layer` → `@utility`

```css
/* v3 ❌ */
@layer utilities {
  .tab-4 { tab-size: 4; }
}
@layer components {
  .btn { border-radius: 0.5rem; padding: 0.5rem 1rem; }
}

/* v4 ✅ */
@utility tab-4 {
  tab-size: 4;
}
@utility btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}
```

`@utility` automatically works with all variants. Utilities are sorted by property count — multi-property utilities naturally override single-property ones.

### 14.7 Container customization

```css
/* v3 ❌ (config-based) */
// tailwind.config.js
module.exports = { theme: { container: { center: true, padding: '2rem' } } }

/* v4 ✅ */
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

### 14.8 `theme()` function — deprecated

```css
/* v3 ❌ */
.btn { background-color: theme(colors.red.500); }
@media (width >= theme(screens.xl)) { … }

/* v4 ✅ */
.btn { background-color: var(--color-red-500); }
@media (width >= theme(--breakpoint-xl)) { … }
/* or literal value: */
@media (width >= 80rem) { … }
```

Note: `theme()` still works in v4 but only with the CSS variable name syntax (`--` prefix), not the old dot notation.

### 14.9 Variant stacking order reversed

```html
<!-- v3: right-to-left (last applies outermost) -->
<ul class="first:*:pt-0 last:*:pb-0">

<!-- v4: left-to-right (first applies outermost) -->
<ul class="*:first:pt-0 *:last:pb-0">
```

### 14.10 Variables in arbitrary values — new syntax

```html
<!-- v3: bracket shorthand for CSS vars -->
<div class="bg-[--brand-color]">

<!-- v4: parenthesis shorthand -->
<div class="bg-(--brand-color)">
```

### 14.11 Important modifier position

```html
<!-- v3: ! at start (after variants) -->
<div class="flex! bg-red-500!">

<!-- v4: ! at end of class name -->
<div class="flex! bg-red-500!">
```
Both syntaxes are supported in v4, but end-position is the new canonical form.

### 14.12 Hover on mobile — new behaviour

v4 `hover:` only fires when the primary input device supports hover (wraps in `@media (hover: hover)`). To restore v3 tap-triggers-hover behavior:
```css
@custom-variant hover (&:hover);
```

### 14.13 Gradient variant behavior

In v4, `from-*`/`via-*`/`to-*` values **persist** across variants instead of resetting. Use `via-none` to unset a middle stop:
```html
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400
            dark:via-none dark:from-blue-500 dark:to-teal-400">
```

### 14.14 `space-x/y` and `divide-x/y` selector changed

```css
/* v3: adjacent sibling (perf issue) */
.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }

/* v4: last-child margin-bottom */
.space-y-4 > :not(:last-child) { margin-bottom: 1rem; }
```
Behavior differs with inline elements or when overriding individual children. Migrate to `flex`/`grid` + `gap` when possible.

### 14.15 Transform utilities — individual CSS properties

`rotate-*`, `scale-*`, `translate-*` now map to individual CSS properties. Consequences:

- `transform-none` no longer resets them — use `scale-none`, `rotate-none`, etc.
- `transition-[opacity,transform]` no longer works — use `transition-[opacity,scale]` etc.

### 14.16 Outline utility change

- `outline` now sets `outline-width: 1px` (was just style).
- `outline-2` sets `outline-style: solid` automatically — no need to also write `outline`.
- `outline-none` = `outline-style: none` (removes outline).
- `outline-hidden` = invisible outline that still shows in forced-colors mode (a11y safe).

### 14.17 Prefix syntax changed

```html
<!-- v3: prefix prepended to utility -->
<div class="tw-flex tw-bg-red-500">

<!-- v4: prefix is a variant -->
<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600">
```

---

## 15. Preflight / Base Styles

Tailwind v4 injects Preflight automatically into the `base` layer when you `@import "tailwindcss"`. Key behaviours that surprise developers:

| Preflight rule | What it does | Common surprise |
|---|---|---|
| `margin: 0; padding: 0` on `*` | All margins/paddings stripped | `<h1>` has no margin |
| `h1–h6` → `font-size: inherit; font-weight: inherit` | Headings unstyled | All text looks the same size |
| `ol, ul, menu` → `list-style: none` | No bullets/numbers | Lists look like divs |
| `img, video` → `display: block` | Images are block | Inline image gap gone |
| `img, video` → `max-width: 100%; height: auto` | Responsive by default | Use `max-w-none` to opt out |
| `border: 0 solid` on `*` | `border` class alone works | Adds solid 1px currentColor |
| `[hidden]` → `display: none !important` | hidden attr takes priority | `block hidden` stays hidden |
| `button` → `cursor: default` | Buttons not pointer by default | Add `cursor-pointer` manually |
| `<dialog>` → `margin: 0` | Dialogs no longer centered | Add `margin: auto` in base |

### Restoring common v3 defaults

```css
/* Restore pointer cursor on buttons */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

/* Restore gray-200 border color */
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}

/* Restore gray-400 placeholder */
@layer base {
  input::placeholder, textarea::placeholder {
    color: var(--color-gray-400);
  }
}

/* Restore centered dialog */
@layer base {
  dialog { margin: auto; }
}
```

### Disabling Preflight entirely

```css
/* Instead of @import "tailwindcss": */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
/* skip preflight.css */
@import "tailwindcss/utilities.css" layer(utilities);
```

### Adding base styles

```css
@layer base {
  h1 { font-size: var(--text-2xl); font-weight: var(--font-weight-bold); }
  h2 { font-size: var(--text-xl); }
  a { color: var(--color-blue-600); text-decoration-line: underline; }
}
```

---

## 16. `@theme` Deep Dive

### Inline option — required when referencing other CSS variables

```css
/* ❌ without inline — resolves at --font-sans definition scope, not usage scope */
@theme {
  --font-sans: var(--font-inter);
}

/* ✅ with inline — inlines the value at compile time */
@theme inline {
  --font-sans: var(--font-inter);
}
/* Output: .font-sans { font-family: var(--font-inter); } */
```

**Use `@theme inline` whenever your theme variable references another CSS variable** (e.g. a Next.js font variable like `--font-geist`).

### Static option — always generate all CSS variables

By default, only *used* theme variables appear in the output. Force all to be included:
```css
@theme static {
  --color-primary: var(--color-red-500);
  --color-secondary: var(--color-blue-500);
}
```

### Resetting a namespace

```css
/* Reset all colors, then define only yours */
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-brand: oklch(0.72 0.11 221.19);
}
```

### Defining animation keyframes inside @theme

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
/* Use: class="animate-fade-in" */
```

### Using theme variables in JS

```ts
// Read resolved CSS variable value at runtime
const styles = getComputedStyle(document.documentElement);
const brand = styles.getPropertyValue('--color-primary-500');

// Use directly in inline styles or animation libraries
<motion.div animate={{ backgroundColor: 'var(--color-primary-500)' }} />
```

### `var()` in `@media` — NOT supported

```css
/* ❌ CSS variables don't resolve inside media query conditions */
@media (width >= var(--breakpoint-lg)) { … }

/* ✅ literal value */
@media (width >= 64rem) { … }

/* ✅ or theme() with CSS var name (only for @media) */
@media (width >= theme(--breakpoint-lg)) { … }
```

### Theme variable namespaces reference

| Namespace | Utility classes generated |
|---|---|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*`, … |
| `--font-*` | `font-sans`, `font-serif`, `font-mono`, … |
| `--text-*` | `text-sm`, `text-xl`, … |
| `--font-weight-*` | `font-bold`, `font-semibold`, … |
| `--tracking-*` | `tracking-tight`, `tracking-wide`, … |
| `--leading-*` | `leading-snug`, `leading-loose`, … |
| `--breakpoint-*` | `sm:*`, `md:*`, `lg:*`, `lgx:*`, `xl:*`, … |
| `--container-*` | `@sm:*`, `@md:*`, `max-w-sm`, `max-w-md`, … |
| `--spacing-*` | `p-4`, `m-8`, `w-full`, `h-16`, `gap-2`, … |
| `--radius-*` | `rounded-sm`, `rounded-xl`, … |
| `--shadow-*` | `shadow-md`, `shadow-lg`, … |
| `--blur-*` | `blur-sm`, `blur-xl`, … |
| `--animate-*` | `animate-spin`, `animate-fade-in`, … |
| `--ease-*` | `ease-in`, `ease-out`, `ease-in-out` |

---

## 17. Compatibility Notes

### CSS Modules

Each CSS module is processed **separately** — it has no `@theme` unless you import one.
```css
/* Button.module.css */

/* ❌ @apply fails silently — theme not available */
button { @apply bg-blue-500; }

/* ✅ import reference first */
@reference "../app.css";
button { @apply bg-blue-500; }

/* ✅ or just use CSS variables (no Tailwind processing needed) */
button { background: var(--color-blue-500); }
```

### Vue / Svelte / Astro `<style>` blocks

Same issue as CSS modules — `@apply` in `<style>` blocks needs `@reference`:
```vue
<style scoped>
@reference "../../app.css";
button { @apply bg-blue-500 text-white; }
</style>
```

### Sass / Less / Stylus — NOT supported

Tailwind v4 is itself a CSS preprocessor. **Do not combine with Sass/Less/Stylus.**
- Use `@import "file.css"` for splitting CSS (Tailwind bundles it automatically)
- Use `var(--token)` instead of Sass variables
- Use `color-mix()` instead of `darken()`/`lighten()`
- Use native CSS nesting (Lightning CSS flattens it)

### `@apply` in separate stylesheets

```css
/* ❌ @apply in a file that doesn't import tailwindcss */
.button { @apply flex items-center; }  /* no-op, class not generated */

/* ✅ ensure tailwindcss is imported (directly or via @reference) */
@reference "tailwindcss";
.button { @apply flex items-center; }
```

### Browser support (v4 minimum)

| Browser | Minimum version |
|---|---|
| Chrome | 111 (March 2023) |
| Safari | 16.4 (March 2023) |
| Firefox | 128 (July 2024) |

Required features: `@property`, `color-mix()`, `oklab`/`oklch` colors, native CSS nesting.
**If you need IE or pre-2023 browsers, stay on Tailwind v3.**

---

## 18. Advanced Patterns & Edge Cases

### Functional `@utility` with `--value()`

```css
/* Utility that accepts a numeric modifier: tab-2, tab-4, tab-8 */
@utility tab-* {
  tab-size: --value(integer);
}
```

### Stacking `@custom-variant` with `@media`

```css
/* Variant that targets both a media query and a data attribute */
@custom-variant hovered-card {
  @media (hover: hover) {
    &:where([data-card]:hover) {
      @slot;
    }
  }
}
/* Use: <div class="hovered-card:ring-2"> */
```

### `@layer` ordering

In v4 the layer order is fixed:
```
theme → base → components → utilities
```
You can add to any layer:
```css
@layer base { … }       /* before utilities */
@layer components { … } /* before utilities, after base */
@layer utilities { … }  /* same as @utility but without variant support */
```
Prefer `@utility` over `@layer utilities` — `@utility` automatically supports all variants.

### Arbitrary variants

```tsx
{/* Apply styles based on arbitrary selector */}
<div className="[&:nth-child(3)]:bg-red-100" />
<div className="[&_.title]:font-bold" />       {/* child .title selector */}
<div className="[@media(hover:hover)]:hover:underline" />
```

### Group and Peer variants

```tsx
{/* group: parent hover triggers child */}
<div className="group">
  <span className="group-hover:text-primary-500" />
</div>

{/* peer: sibling state triggers another element */}
<input id="cb" type="checkbox" className="peer" />
<label htmlFor="cb" className="peer-checked:line-through" />
```

### Forcing class generation for dynamic content (CMS/API)

When class names come from a database or API, Tailwind can't scan them. Use `@source inline()`:

```css
/* Safelist individual classes */
@source inline("text-red-500 text-green-500 text-blue-500");

/* Safelist with variant expansion */
@source inline("{sm:,md:,lg:}grid-cols-{1,2,3,4}");

/* Safelist full range */
@source inline("bg-primary-{50,100,200,300,400,500,600,700,800,900}");
```

### Transition `outline-color` trap

```html
<!-- ❌ outline-color transitions from default → cyan on hover (jarring) -->
<button class="transition hover:outline-2 hover:outline-cyan-500">

<!-- ✅ set outline-color unconditionally so no color transition occurs -->
<button class="outline-cyan-500 transition hover:outline-2">
```

### Overriding `@utility` with higher-specificity variants

`@utility` classes have the same specificity as regular utilities, so you can still override them with modifiers:

```tsx
{/* benefit-card-shell sets px-4 md:px-5 lgx:px-6 */}
{/* override for a special case */}
<div className="benefit-card-shell lgx:px-8!" />  {/* ! = important */}
```

### `max-*` variants — generated automatically

Every `--breakpoint-*` in `@theme` gets a corresponding `max-*:` variant:

```tsx
<div className="max-md:hidden" />        {/* < 48rem */}
<div className="max-lgx:flex-col" />     {/* < 72.5rem */}
<div className="md-lgx:absolute" />  {/* 48rem–72.5rem range */}
```

---

## 19. Troubleshooting — App crashes blaming globals.css but source looks fine

### Symptom

The dev server or browser console throws an error that points to `globals.css` at a very high line number (e.g. line 3000+):

```
Parsing CSS source code failed
./src/app/globals.css:3162:75
  ...generated CSS you never wrote...
Unexpected token ...
```

You look at that line in the actual `globals.css` source — it doesn't exist or looks perfectly valid. Restarting the dev server alone does not fix it.

### Why this happens

Turbopack/PostCSS caches a **compiled version** of `globals.css` inside `.next/`. The error is reported against the **generated output**, not your source. When the cache becomes stale (e.g. after a failed build, a class was removed but the cache wasn't invalidated, or an upgrade changed how a class compiles), the old broken output keeps being served even though your source is clean.

**First thing to try — always:**

```powershell
# 1. Stop the dev server (Ctrl+C)

# 2. Wipe the entire Next.js / Turbopack cache
Remove-Item -Recurse -Force .next

# 3. Restart
npm run dev
```

This resolves the vast majority of "globals.css crash with no visible source issue" cases.

### If deleting `.next/` doesn't fix it — real source checklist

Only investigate the source if the error persists after a clean restart:

| # | What to check | Why it crashes |
|---|---|---|
| 1 | `@variant name { @media … @slot; }` to **define** a new variant | Wrong — use `@custom-variant` (see §5) |
| 2 | `@media (width >= var(--breakpoint-lg))` | `var()` is invalid inside `@media` conditions — use literal rem |
| 3 | CSS variable with `/` opacity modifier inside `var()` in an arbitrary value — e.g. `bg-[var(--color-x` `/50)]` (broken here intentionally; Tailwind would scan and crash on the literal class) | `var()` does not support the `/opacity` syntax; use `rgba()` or `--alpha()` |
| 4 | `@theme` block nested inside a selector or `@media` | `@theme` must be top-level only |
| 5 | Empty `@utility {}` block | Some PostCSS versions reject empty at-rules |
| 6 | Importing a `.scss`/`.sass`/`.less` file from `globals.css` | Tailwind v4 does not support preprocessors |


