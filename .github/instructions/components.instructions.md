---
applyTo: "src/**/*.{ts,tsx}"
description: "Mandatory rules for every React/TS file in src/. AI MUST follow these without asking."
---

# Component Authoring Rules — Prometey VPN

These rules apply to **every** new or modified `.ts` / `.tsx` file under `src/`.
They are derived from the implemented landing-page conventions and are now the
single source of truth for the upcoming auth, dashboard, and mobile work.

If a rule below conflicts with anything in [docs/02-components-spec.md](../../docs/02-components-spec.md), this file wins (the old spec is historical).

The human-readable explanation lives in [docs/COMPONENT_DEVELOPMENT_GUIDE.md](../../docs/COMPONENT_DEVELOPMENT_GUIDE.md).

---

## 0. Non-negotiable defaults

- **Language:** TypeScript only. No `.js` / `.jsx`.
- **React 19 + Next.js 16 (App Router).** No `forwardRef`. `ref` is a plain prop.
- **Server components by default.** Add `'use client'` only when the file uses hooks, browser APIs, event handlers, or `framer-motion`.
- **No `console.log`** in committed code. Use it only locally and remove before saving.
- **No `any`.** If a type is unknown, type it as `unknown` and narrow.
- **No placeholder comments** like `// TODO: implement` left in shipped code paths the user can hit. Either implement, or wire to a clear stub component that itself is named `*Placeholder`.

---

## 1. File system & naming

| Thing | Rule |
|---|---|
| File names | `kebab-case.tsx` always (Linux is case-sensitive). |
| Component / type names | `PascalCase`. |
| Hooks | `camelCase` starting with `use`. File: `use-<name>.ts`. |
| Constants | `SCREAMING_SNAKE_CASE` inside a file; `camelCase` for module-level data arrays in `data.ts`. |
| Exports | **Named exports only** (`export const X = …`). Never `export default` for components, hooks, or utilities. The only `export default` allowed is in `app/**/page.tsx` and `app/**/layout.tsx` because Next.js requires it. |

---

## 2. Where each kind of code lives

```
src/
├── app/[locale]/                 # ROUTING ONLY. page.tsx & layout.tsx compose ui/.
│   ├── (public)/                 # landing
│   ├── (auth)/                   # login / register / forgot
│   └── (admin)/                  # dashboard
│
├── ui/                           # Route-scoped UI
│   ├── public/
│   │   ├── landing/sections/     # landing sections
│   │   └── layouts/              # public header/footer
│   ├── auth/
│   │   ├── components/           # login-form, register-form, …
│   │   ├── hooks/                # use-login, use-register (create when needed)
│   │   └── types.ts              # User, Session, AuthState, …
│   └── dashboard/
│       ├── layouts/              # dashboard shell pieces (sidebar, top-bar)
│       ├── pages/<route>/        # one folder per dashboard route (servers/, users/, …)
│       │   ├── <route>-page.tsx  # main composition imported by app/.../page.tsx
│       │   ├── <widget>.tsx      # local widgets
│       │   └── data.ts           # static option lists, mock data while API not ready
│       ├── components/           # cross-page dashboard widgets (StatCard, DataTable, …)
│       ├── hooks/                # use-servers, use-subscriptions, …
│       └── *-types.ts            # one file per domain (server-types, subscription-types)
│
├── components/
│   ├── ui/                       # ROUTE-AGNOSTIC primitives (Button, Input, …)
│   └── providers/                # App-level wrappers
│
├── hooks/                        # Cross-route reusable hooks (useMedia, useScrollLock)
├── i18n/                         # next-intl wiring
└── lib/                          # Pure utils & constants. NO JSX.
```

**Decision flow when creating a new component:**

1. Used by **>1 route group** (public + auth, or auth + dashboard, …) AND has zero domain coupling? → `src/components/ui/`.
2. Used by **>1 page inside the same route group**? → `src/ui/<group>/components/`.
3. Used by **exactly one page**? → that page's folder (`src/ui/<group>/pages/<route>/`).

Never reach across route groups (`ui/dashboard/` must not import from `ui/auth/`).

---

## 3. Folder vs single file (for non-page composite components)

Use a **folder** when ANY of the following is true:
- File would exceed **150 lines**.
- File would contain **3+ component definitions**.
- The component has its own `data.ts`, `use-*.ts`, or sub-types.

Folder layout:
```
<name>/
  <name>.tsx               # the main exported component
  <sub-component>.tsx
  use-<name>.ts            # local hook (optional)
  data.ts                  # static data (optional)
  <name>-types.ts          # only if 3+ types or shared with siblings
  index.ts                 # re-exports public surface
```

Otherwise a single `<name>.tsx` file.

---

## 4. Hook placement (strict)

| Hook does… | Where it lives |
|---|---|
| Local UI state for ONE component (open/close, hover) | Inside that component's `.tsx` file (above the component) |
| Logic specific to ONE section/page (carousel, parallax) | `use-<name>.ts` next to that section/page |
| API call, mutation, data fetch | `src/ui/<group>/hooks/use-<name>.ts` |
| Cross-route DOM/browser hook (media query, scroll lock) | `src/hooks/use-<name>.ts` |

Never co-locate an API hook inside a component file. Never put a UI-only toggle hook into `src/hooks/`.

---

## 5. Imports

- Use the `@/` alias for anything not in the same folder.
- Use relative paths (`./foo`) **only** for siblings in the same folder.
- Never use `../` deeper than one level — that means the file is in the wrong place.
- Order:
  1. React / Next / next-intl
  2. Third-party libs
  3. `@/components/...`, `@/hooks/...`, `@/lib/...`, `@/i18n/...`
  4. `@/ui/<other-group>/...` (only if rule 2 above allows)
  5. Sibling relative imports
  6. `import type { … }` last
- One blank line between groups.

---

## 6. Internationalization — ZERO hardcoded copy

Every visible string and every accessibility label must come from `next-intl`.

```tsx
// ✅ correct
const t = useTranslations('auth.login');
<button>{t('submit')}</button>
<input aria-label={t('emailLabel')} />

// ❌ forbidden
<button>Войти</button>
<input aria-label="Email" />
```

Translation key namespaces (extend, never rename):

```
common.*              shared atoms (save, cancel, logout, loading…)
nav.*                 nav link labels reused in sidebar/header
landing.*             landing page (already populated)
auth.login.*          login page + form
auth.register.*       register page + form
auth.forgot.*         forgot password
auth.errors.*         user-facing validation messages
dashboard.layout.*    sidebar, top bar, breadcrumbs
dashboard.<route>.*   one namespace per dashboard route
```

When you add a new key in `messages/en.json`, add the matching key in `messages/ru.json` in the **same operation**. PRs with only one of the two are invalid.

Validation messages from Zod must read from `t(...)` too — pass the translated string into the schema, do not hardcode Russian or English in `z.string().min(8, "...")`.

---

## 7. Styling

### 7.1 Use design tokens from [globals.css](../../src/app/globals.css)

- Colors → `bg-neutral-900`, `text-primary-500`, `bg-yellow-50`, etc. **Never** `bg-[#201e1e]`.
- Radii → `rounded-sm` (12px), `rounded-md` (16px), `rounded-lg` (24px), `rounded-xl` (32px), `rounded-2xl` (40px), `rounded-3xl` (48px), `rounded-full`.
- Container → wrap any horizontal-padded section in `<Container>` from `@/components/ui/container`. Never re-implement `container` paddings.
- Glass effect → `<Button variant="glass">` for buttons, `className="glass"` utility for everything else. **Never** import `GlassButton` in new code (it is being phased out).

### 7.2 Arbitrary values are allowed only when Figma demands a value off the token scale

```tsx
// ✅ acceptable — exact Figma px outside token scale
className="text-[22px] tracking-[-0.48px]"
style={{ boxShadow: '4px 11px 5.5px rgba(0,0,0,0.05)' }}

// ❌ forbidden — value is on the token scale
className="bg-[#201e1e]"     // → bg-neutral-900
className="rounded-[16px]"    // → rounded-md
```

### 7.3 Mobile-first responsive (this project's house style)

Mobile gets the **unprefixed** classes. Scale up with `md:` (≥768), `lg:` (≥1024), `xl:` (≥1280).

```tsx
className="px-[20px] py-[60px]
           md:px-12 md:py-16
           lg:py-20
           xl:px-26 xl:py-22.5"
```

Do not write desktop-first (`xl:px-26 max-md:px-5`). Always read top-to-bottom small → large.

### 7.4 When to split into a `Mobile` + `Desktop` component

Use **Tailwind responsive prefixes** when:
- The DOM tree is the same and only sizing/spacing/typography changes.
- Conditionally hidden pieces are small (1–2 elements via `hidden md:flex`).

Use a **dispatcher pattern** (parent + `<X-Mobile>` + `<X-Desktop>`) when:
- Mobile vs desktop have **fundamentally different layouts** (sidebar vs bottom-sheet, grid vs carousel, drawer vs inline).
- The mobile version has independent state that desktop does not need (and vice-versa).
- The Tailwind version would exceed ~200 lines or become unreadable.

Reference dispatcher: [public-header.tsx](../../src/ui/public/layouts/public-header.tsx).

The dispatcher MUST use `useMedia('(max-width: 1023px)')` (or the matching breakpoint) and render exactly one branch — never both at once.

---

## 8. Component API conventions

```tsx
'use client'; // only if needed

import { cn } from '@/lib/utils';

export interface PricingCardProps {
  label: string;
  price: string;
  featured?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PricingCard = ({
  label,
  price,
  featured = false,
  className,
  children,
}: PricingCardProps) => {
  return (
    <div className={cn('flex flex-col gap-4 rounded-md p-6', featured && 'bg-yellow-50', className)}>
      {/* … */}
    </div>
  );
};
```

Mandatory:
- Always export the props `interface` or `type` named `<Component>Props`.
- Always accept `className?: string` on any component that renders a real DOM element. Merge with `cn(...)`.
- For polymorphic / interactive primitives, accept `ref` as a regular prop typed via `React.ComponentPropsWithRef<'…'>`.
- Default values go in the destructure, not inside the body.

---

## 9. Forms

- Library: `react-hook-form` + `@hookform/resolvers/zod`.
- Schema lives next to the form file (`<form>-schema.ts`) when ≥3 fields, otherwise inline.
- Error messages come from `useTranslations(...)` — pass them into the schema:

  ```ts
  const schema = (t: (k: string) => string) => z.object({
    email: z.email(t('errors.emailInvalid')),
    password: z.string().min(8, t('errors.passwordTooShort')),
  });
  ```

- Use the project `Input` component from `@/components/ui/input`. Do not introduce new `<input>` HTML directly in feature components.
- Submit handlers live in a hook: `src/ui/auth/hooks/use-login.ts` returns `{ form, onSubmit, isSubmitting, serverError }`. The form component is presentational.

---

## 10. Page composition (`app/[locale]/.../page.tsx`)

`page.tsx` may contain ONLY:
- `import` statements
- A single default-exported function
- That function returns JSX composed of components from `ui/...`

Forbidden in `page.tsx`: data fetching beyond what Next.js requires for SSR, business logic, inline Tailwind beyond a wrapping `<main>` / `<section>`, raw strings (use `useTranslations`).

Server actions / `fetch` for SSR live in the page file ONLY when they directly produce props for a single child. Otherwise they belong in `src/ui/<group>/server/<resource>.ts` (create the folder when first needed).

---

## 11. Accessibility & semantics

- Every interactive element is a real `<button>`, `<a>`, or `<Link>` — never `<div onClick>`.
- Every input has a programmatic label (visible `<label>` or `aria-label`).
- Decorative images: `alt=""`. Meaningful images: descriptive `alt` from translations.
- Modal / dialog containers must have `role="dialog"` + `aria-modal="true"` + a translated `aria-label`.
- Color contrast must follow the token meanings (`text-neutral-900` on light, `text-neutral-10` on dark surfaces).

---

## 12. Performance

- Add `'use client'` at the smallest possible boundary. Pull state into a leaf component if it lets the parent stay server-rendered.
- Images: prefer `.webp`. For LCP images use `next/image`'s `priority`. For decorative, lazy by default.
- Heavy third-party (`framer-motion`, `embla-carousel`) must only be imported in client components.
- No `useEffect` for derived state. Compute during render.

---

## 13. Definition of done (run before claiming a task is finished)

The AI MUST run / mentally verify all of these:

- [ ] `npm run build` succeeds.
- [ ] `npx tsc --noEmit` reports zero errors.
- [ ] No new `export default` outside `app/**/page.tsx` or `app/**/layout.tsx`.
- [ ] No new hardcoded user-visible strings or `aria-label`s — every one comes from `messages/{en,ru}.json`.
- [ ] Both `messages/en.json` and `messages/ru.json` updated with matching keys.
- [ ] No new import of `GlassButton`. New buttons that need glass use `<Button variant="glass">`.
- [ ] All new files are `kebab-case`.
- [ ] All new components export `<Name>Props`.
- [ ] Any new section/page wraps horizontal padding in `<Container>` (or explains in code why not).
- [ ] Mobile-first classes (no `max-*:` prefixes).
- [ ] No `any`, no unused `'use client'` directives.

---

## 14. What you may NOT do (hard "no" list)

- ❌ Edit `docs/02-components-spec.md` — it is historical only.
- ❌ Create a new `glass-*` component. Use `glass` utility class or `Button variant="glass"`.
- ❌ Put business logic in `app/`.
- ❌ Import from `ui/<groupA>/` into `ui/<groupB>/`.
- ❌ Add CSS-in-JS, styled-components, emotion, or `.module.css` files. Tailwind utilities + `globals.css` `@utility` blocks are the only styling tools.
- ❌ Install a new dependency without an explicit instruction. If a need arises, list candidates in the PR description and wait.
- ❌ Add unit-test files unless asked.
- ❌ Auto-format files you did not change (no project-wide reflow).

---

## 15. Reference exemplars to mimic

When in doubt, copy the shape of one of these:

| You are building… | Mimic |
|---|---|
| A new landing-style section | [src/ui/public/landing/sections/pricing/](../../src/ui/public/landing/sections/pricing/) |
| A responsive header/shell with mobile/desktop split | [src/ui/public/layouts/](../../src/ui/public/layouts/) |
| A reusable primitive | [src/components/ui/discount-badge.tsx](../../src/components/ui/discount-badge.tsx) |
| A form | (to be created) `src/ui/auth/components/login-form.tsx` per rules in §9 |
| A dashboard page | (to be created) `src/ui/dashboard/pages/<route>/<route>-page.tsx` per §2 |

When you finish a task, end your message by listing each rule above you actively respected for non-trivial decisions. If you broke a rule deliberately, justify it.
