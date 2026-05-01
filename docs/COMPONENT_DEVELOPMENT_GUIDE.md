# Component Development Guide — Human Edition

> Companion to [`.github/instructions/components.instructions.md`](../.github/instructions/components.instructions.md).
> The `.github` file is the **machine-enforced rulebook** auto-applied by VS Code/Copilot when editing any `.tsx` / `.ts` file in `src/`.
> This file is the **human-friendly explanation** of *why* those rules exist and *how* to apply them when you build the upcoming auth pages, mobile responsiveness, dashboard, dashboard sub-pages, and dashboard mobile.

If you remember nothing else, remember this:

> **The landing folder is the reference. Every new feature must look, feel, import, and translate the same way as `src/ui/public/landing/`.**

---

## Table of contents

1. [Mental model: route-scoped UI](#1-mental-model-route-scoped-ui)
2. [Where do I put this file?](#2-where-do-i-put-this-file)
3. [Folder vs single file](#3-folder-vs-single-file)
4. [Naming, exports, props](#4-naming-exports-props)
5. [Translations (i18n) — the #1 thing reviewers will reject](#5-translations-i18n--the-1-thing-reviewers-will-reject)
6. [Styling system](#6-styling-system)
7. [Mobile vs desktop: prefixes vs dispatcher](#7-mobile-vs-desktop-prefixes-vs-dispatcher)
8. [Forms (auth pages)](#8-forms-auth-pages)
9. [Dashboard layout patterns](#9-dashboard-layout-patterns)
10. [Hooks](#10-hooks)
11. [Pages in `app/`](#11-pages-in-app)
12. [Definition of done — your personal checklist](#12-definition-of-done--your-personal-checklist)
13. [Common mistakes already in the codebase](#13-common-mistakes-already-in-the-codebase)
14. [FAQ](#14-faq)

---

## 1. Mental model: route-scoped UI

The app has three route groups. Each one owns its own UI folder:

| Route group in `app/[locale]/` | UI folder | Purpose |
|---|---|---|
| `(public)`  | `src/ui/public/`    | Landing page, public layouts |
| `(auth)`    | `src/ui/auth/`      | Login, register, forgot password |
| `(admin)`   | `src/ui/dashboard/` | Authenticated dashboard |

**Rule of thumb:** if a component is used by exactly one route group, it lives in that group's `ui/` folder. If it is used by two or more, it moves to `src/components/ui/`.

`ui/dashboard/` must **never** import from `ui/auth/` and vice versa. If you feel that urge, the component should be in `src/components/ui/`.

---

## 2. Where do I put this file?

```
Is it a primitive (Button, Input, Modal, Badge)?
├── YES → Will it be used in 2+ route groups?
│        ├── YES → src/components/ui/
│        └── NO  → src/ui/<group>/components/
│
└── NO (it's a feature/page composition)
    │
    ├── A whole landing section?
    │   └── src/ui/public/landing/sections/<name>/
    │
    ├── An auth form/widget?
    │   └── src/ui/auth/components/
    │
    ├── A dashboard widget used on 2+ dashboard pages?
    │   └── src/ui/dashboard/components/
    │
    └── A piece used by exactly one dashboard page?
        └── src/ui/dashboard/pages/<route>/
```

For the upcoming dashboard work the structure will be:

```
src/ui/dashboard/
├── layouts/                   # shell pieces: sidebar, top-bar, mobile-bottom-nav
│   ├── dashboard-shell.tsx    # the dispatcher (mobile/desktop layout decision)
│   ├── components/
│   └── ...
├── pages/                     # one folder per dashboard route
│   ├── overview/
│   │   ├── overview-page.tsx
│   │   ├── stat-card.tsx
│   │   └── data.ts
│   ├── servers/
│   ├── users/
│   ├── subscriptions/
│   └── settings/
├── components/                # cross-page widgets (data-table, page-header, …)
├── hooks/                     # use-servers, use-users, use-subscriptions, …
├── server-types.ts            # already exists
├── subscription-types.ts      # already exists
└── user-types.ts              # add when needed
```

Then `app/[locale]/(admin)/dashboard/page.tsx` becomes a 5-line file:

```tsx
import { OverviewPage } from '@/ui/dashboard/pages/overview/overview-page';

export default function DashboardOverviewRoute() {
  return <OverviewPage />;
}
```

Every page.tsx in `app/` is just routing glue. **Do not** put logic, styling, or strings in there.

---

## 3. Folder vs single file

Promote to a folder when **any** of:
- The single file would exceed **150 lines**.
- It would contain **3+ component definitions**.
- It needs a `data.ts`, a `use-*.ts`, or its own type file.

The folder layout never varies:

```
my-thing/
  my-thing.tsx          ← the main exported component
  sub-piece.tsx
  use-my-thing.ts       ← hook (only if it has one)
  data.ts               ← static lists, mock data (only if needed)
  my-thing-types.ts     ← only if 3+ types or shared with siblings
  index.ts              ← re-exports — keeps imports clean
```

Compare: [pricing/](../src/ui/public/landing/sections/pricing/) (folder) vs [hero-section.tsx](../src/ui/public/landing/sections/hero-section.tsx) (single file).

---

## 4. Naming, exports, props

| Thing | Rule | Example |
|---|---|---|
| File name | `kebab-case.tsx` always | `login-form.tsx` |
| Component | `PascalCase`, named export | `export const LoginForm = …` |
| Hook file | `use-<name>.ts` | `use-login.ts` |
| Hook export | `camelCase` named export | `export const useLogin = …` |
| Props | always export `<Name>Props` | `export interface LoginFormProps` |
| `className?` | every DOM-rendering component accepts it | merged via `cn()` |
| Defaults | in destructure | `({ size = 'md' })` |

**Named exports only.** `export default` is reserved for `app/**/page.tsx` and `app/**/layout.tsx` — Next.js requires it there.

The current [sidebar.tsx](../src/ui/dashboard/components/sidebar.tsx) and [header.tsx](../src/ui/dashboard/components/header.tsx) use `export default`. They were written before the rule was set. **When you touch them, convert to named export.**

---

## 5. Translations (i18n) — the #1 thing reviewers will reject

**Every visible string and every `aria-label` is a translation key.**

The two existing files [`messages/en.json`](../messages/en.json) and [`messages/ru.json`](../messages/ru.json) must always change together. A PR that updates one without the other is invalid.

### Namespace map

```
common.*                shared atoms (save, cancel, logout, loading, retry, …)
nav.*                   sidebar/header link labels
landing.*               landing page (already populated, do not rename)
auth.login.*            login page strings + form labels
auth.register.*         register page
auth.forgot.*           forgot password
auth.errors.*           validation messages used by zod
dashboard.layout.*      sidebar headings, top-bar tooltips, breadcrumbs
dashboard.overview.*    one namespace per dashboard route
dashboard.servers.*
dashboard.users.*
dashboard.subscriptions.*
dashboard.settings.*
```

### Pattern

```tsx
'use client';

import { useTranslations } from 'next-intl';

export const LoginForm = () => {
  const t = useTranslations('auth.login');

  return (
    <form>
      <Input
        label={t('emailLabel')}
        placeholder={t('emailPlaceholder')}
      />
      <Button type="submit">{t('submit')}</Button>
    </form>
  );
};
```

### Zod + translations

Validation messages must be translatable. Build the schema as a function that takes `t`:

```ts
import { z } from 'zod';

export const buildLoginSchema = (t: (k: string) => string) =>
  z.object({
    email: z.email(t('emailInvalid')),
    password: z.string().min(8, t('passwordTooShort')),
  });
```

Then in the hook:

```ts
const t = useTranslations('auth.errors');
const schema = useMemo(() => buildLoginSchema(t), [t]);
const form = useForm({ resolver: zodResolver(schema) });
```

### What's currently broken (do NOT copy)

Open [login-form.tsx](../src/ui/auth/components/login-form.tsx) — strings like `"Войти"`, `"Создать аккаунт"`, and `"Минимум 8 символов"` are hardcoded. The same in [login/page.tsx](../src/app/[locale]/(auth)/login/page.tsx). When you redo the auth pages from Figma, fix this as part of the work.

---

## 6. Styling system

Two layers:
1. **Design tokens** in [globals.css](../src/app/globals.css) under `@theme` — neutral 0-900, primary 50-900, yellow, orange, red, radii, container max width and breakpoint paddings.
2. **Custom utilities** in `globals.css` — `container`, `glass`, `bg`, `bg-item`, `icon`, `input`, `logo`.

### Hard rules

- Use a token over an arbitrary value, **always**, when the value exists in the scale. `bg-neutral-900` not `bg-[#201e1e]`. `rounded-md` not `rounded-[16px]`.
- Arbitrary values are fine for off-scale Figma values: `text-[22px]`, `tracking-[-0.48px]`.
- For a glass element: `<Button variant="glass">` for buttons, the `glass` utility class for everything else (`<div className="glass backdrop-blur-lg" />`). **Do not import `GlassButton`** — it is being phased out.
- Wrap any horizontally padded section in `<Container>` from `@/components/ui/container`. The container utility handles the responsive paddings.
- One-off shadows / gradients off the token scale → inline `style={{ ... }}` is acceptable.

### Mobile-first scale

We always write small → large. **No `max-*:` prefixes in the project.**

```tsx
// ✅
className="px-[20px] py-[60px] md:px-12 md:py-16 lg:py-20 xl:px-26 xl:py-22.5"

// ❌
className="px-26 py-22 max-md:px-5 max-md:py-15"
```

The breakpoints we actually use:
- mobile (no prefix) — base
- `md:` — ≥ 768
- `lg:` — ≥ 1024 (desktop header switches here in landing)
- `xl:` — ≥ 1280 (full-fidelity desktop layout)

`sm:` and `2xl:` are technically available but currently unused. Keep that consistency.

---

## 7. Mobile vs desktop: prefixes vs dispatcher

Two valid strategies. Pick **one** per component.

### Strategy A — Tailwind responsive prefixes

Use when:
- The DOM tree is the same on mobile and desktop.
- Only sizes, gaps, font sizes, and a few `hidden md:flex` toggles change.

Used by every landing section.

### Strategy B — Dispatcher + two children

Use when:
- Mobile and desktop have **fundamentally different layouts** (e.g. a sidebar on desktop becomes a bottom-sheet drawer on mobile).
- The states diverge (mobile menu has `isOpen`, desktop nav doesn't).
- The combined responsive file would exceed ~200 lines.

Reference: [public-header.tsx](../src/ui/public/layouts/public-header.tsx)

```tsx
'use client';
import { useMedia } from '@/hooks/use-media';
import { HeaderMobile } from './components/header-mobile';
import { HeaderDesktop } from './components/header-desktop';

export const LandingHeader = () => {
  const isMobile = useMedia('(max-width: 1023px)');
  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
```

For the upcoming dashboard, the shell will use Strategy B:

```
ui/dashboard/layouts/
  dashboard-shell.tsx                 # dispatcher
  components/
    dashboard-desktop.tsx             # sidebar + top bar layout
    dashboard-mobile.tsx              # top bar + bottom nav + drawer
    sidebar.tsx                       # used only by desktop
    bottom-nav.tsx                    # used only by mobile
    top-bar.tsx                       # shared between both? extract; otherwise duplicate
```

---

## 8. Forms (auth pages)

Stack: `react-hook-form` + `zod` + `@hookform/resolvers/zod` + our `Input` and `Button`.

### File layout

```
src/ui/auth/
├── components/
│   ├── login-form.tsx          ← presentational only; calls useLogin()
│   ├── register-form.tsx
│   └── forgot-password-form.tsx
├── hooks/
│   ├── use-login.ts            ← schema + react-hook-form + submit + state
│   ├── use-register.ts
│   └── use-forgot-password.ts
└── types.ts
```

### Hook returns a clean shape

```ts
export const useLogin = () => {
  const t = useTranslations('auth.errors');
  const schema = useMemo(() => buildLoginSchema(t), [t]);

  const form = useForm<LoginFormValues>({ resolver: zodResolver(schema) });
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    // call API …
  });

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
    serverError,
  };
};
```

### Component is presentational

```tsx
export const LoginForm = () => {
  const t = useTranslations('auth.login');
  const { form, onSubmit, isSubmitting, serverError } = useLogin();
  const { register, formState: { errors } } = form;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label={t('emailLabel')}
        type="email"
        placeholder={t('emailPlaceholder')}
        leftIcon={Mail}
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={t('passwordLabel')}
        type="password"
        placeholder={t('passwordPlaceholder')}
        leftIcon={Lock}
        error={errors.password?.message}
        {...register('password')}
      />
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      <Button variant="orange" size="lg" className="w-full" type="submit" isLoading={isSubmitting}>
        {t('submit')}
      </Button>
    </form>
  );
};
```

This separation keeps the JSX easy to convert to mobile (replace classNames, add a dispatcher if needed) without touching business logic.

---

## 9. Dashboard layout patterns

The dashboard sits behind `(admin)/layout.tsx`. That file should compose the shell only:

```tsx
// src/app/[locale]/(admin)/layout.tsx
import { DashboardShell } from '@/ui/dashboard/layouts/dashboard-shell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
```

`DashboardShell` is the mobile/desktop dispatcher. Each dashboard route then becomes:

```tsx
// src/app/[locale]/(admin)/servers/page.tsx
import { ServersPage } from '@/ui/dashboard/pages/servers/servers-page';
export default function ServersRoute() {
  return <ServersPage />;
}
```

A typical dashboard route folder:

```
src/ui/dashboard/pages/servers/
  servers-page.tsx              # main composition: <PageHeader/> <ServersTable/> <AddServerDrawer/>
  servers-table.tsx
  add-server-drawer.tsx
  use-servers.ts                # data hook
  data.ts                       # constants like default sort, status options
  servers-types.ts              # ServerRow, ServerStatus, etc. (or extend server-types.ts)
  index.ts
```

Reusable widgets (used on 3+ pages — `PageHeader`, `DataTable`, `EmptyState`, `StatCard`) live in `src/ui/dashboard/components/`.

---

## 10. Hooks

| Kind | Where it lives | Example |
|---|---|---|
| Local UI toggle for one component | inside that `.tsx` file (above the export) | `useMobileMenu` (currently inline in mobile menu) |
| Section-specific behavior | next to the section as `use-<name>.ts` | [use-testimonials-carousel.ts](../src/ui/public/landing/sections/testimonials/use-testimonials-carousel.ts) |
| Data / API for a route group | `src/ui/<group>/hooks/use-<resource>.ts` | `src/ui/dashboard/hooks/use-servers.ts` |
| Cross-route browser/DOM hook | `src/hooks/use-<name>.ts` | [use-media.ts](../src/hooks/use-media.ts), [use-scroll-lock.ts](../src/hooks/use-scroll-lock.ts) |

If a hook needs `useEffect` + an API call, it is a **data hook** — it goes in `ui/<group>/hooks/`, never inline.

---

## 11. Pages in `app/`

Three rules:
1. Server component by default. `'use client'` only when the page itself needs interactivity (rare — push it down to leaf components instead).
2. Body of the function returns JSX composed of `ui/...` imports. No JSX longer than ~10 lines and no business logic.
3. The `default export` is the only place `export default` is used in this project.

---

## 12. Definition of done — your personal checklist

Before you say "done":

- [ ] `npm run build` is green.
- [ ] `npx tsc --noEmit` is clean.
- [ ] Every visible string and every `aria-label` came from `useTranslations(...)`.
- [ ] Both `messages/en.json` and `messages/ru.json` updated, same keys, same structure.
- [ ] No new `export default` outside `app/**`.
- [ ] No new import of `GlassButton`. Used `<Button variant="glass">` instead.
- [ ] All new files are kebab-case.
- [ ] Component exports `<Name>Props`.
- [ ] Tailwind classes are mobile-first (no `max-*:`).
- [ ] Used design tokens (`bg-neutral-900`) over hex (`bg-[#201e1e]`).
- [ ] Sections wrapped in `<Container>` (or there's a written reason in code why not).
- [ ] Mobile and desktop both visually match Figma at the relevant breakpoints.
- [ ] No `any`, no leftover `console.log`, no dead `// TODO` in user-reachable paths.

---

## 13. Common mistakes already in the codebase

These exist today. Do **not** copy them when building new things, and fix them when you touch the file:

1. **Hardcoded RU strings in [login-form.tsx](../src/ui/auth/components/login-form.tsx) and [login/page.tsx](../src/app/[locale]/(auth)/login/page.tsx)** — the upcoming auth work replaces this entirely. Add `auth.login.*` and `auth.errors.*` namespaces.
2. **`export default` in [sidebar.tsx](../src/ui/dashboard/components/sidebar.tsx) and [header.tsx](../src/ui/dashboard/components/header.tsx)** — convert to named exports as you rebuild from Figma.
3. **Sidebar nav items hardcoded in English** — they should map onto the existing `nav.*` keys in [en.json](../messages/en.json).
4. **`<GlassButton>` still used in [hero-section.tsx](../src/ui/public/landing/sections/hero-section.tsx)** — leave it for now (don't randomly refactor) but never introduce new uses.
5. **[docs/02-components-spec.md](02-components-spec.md) is stale** — it describes APIs that no longer match `Button`/`Input`. Treat it as historical only. The current `Button` source ([button.tsx](../src/components/ui/button.tsx)) is the truth.

---

## 14. FAQ

**Q: Can I add a UI library (shadcn, MUI, Mantine)?**
No. We have Radix primitives (already installed for dropdown, dialog, popover, tooltip), `lucide-react` icons, and our own primitives. Build on those.

**Q: Can I add tests?**
Only if asked. The user hasn't requested a testing setup; introducing one would be scope creep.

**Q: Can I rename or move existing files for "consistency"?**
Only files you are touching for the actual task. Don't do drive-by renames — they balloon diffs and break import history.

**Q: Where do API calls go?**
For now, mock with `data.ts` in the page folder. When real APIs land, they'll go in `src/ui/<group>/server/<resource>.ts` (server actions) or `src/ui/<group>/hooks/use-<resource>.ts` (client TanStack Query). The decision is made then, not now.

**Q: I'm building a Figma piece and the design uses an exact color that isn't in the token scale. What do I do?**
First, check whether it really differs from the closest token by more than ~5% — designers often eyeball values. If it really is different, use the arbitrary value (`bg-[#abcdef]`) and add a `// figma: <node-id>` comment so the next person knows it's intentional.

**Q: I need a new `useTranslations` namespace. Where do I put the keys?**
In both `messages/en.json` and `messages/ru.json`, in the same commit. Follow the namespace map in [section 5](#5-translations-i18n--the-1-thing-reviewers-will-reject). If you invent a brand new top-level namespace, justify it in the PR description.

---

## Quick links

- Machine rules (auto-applied): [`.github/instructions/components.instructions.md`](../.github/instructions/components.instructions.md)
- Architecture overview: [`docs/architecture.md`](architecture.md)
- Landing conventions: [`docs/LANDING_PAGE_CONVENTIONS.md`](LANDING_PAGE_CONVENTIONS.md)
- Landing refactor history: [`docs/LANDING_PAGE_REFACTORING.md`](LANDING_PAGE_REFACTORING.md)
- Reference exemplars: [`src/ui/public/landing/`](../src/ui/public/landing/), [`src/ui/public/layouts/`](../src/ui/public/layouts/)
