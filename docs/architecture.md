# Architecture Guide

This document describes the folder structure, naming conventions, and code placement rules for this project.
It is written for both human developers and AI assistants working on this codebase.

---

## Folder Structure

```
src/
├── app/                        # Next.js App Router — routing ONLY
│   └── [locale]/
│       ├── (public)/           # Landing page route group
│       ├── (auth)/             # Login / register route group
│       └── (admin)/            # Dashboard route group
│
├── ui/                         # Route-Scoped UI (see pattern below)
│   ├── public/
│   │   ├── sections/           # Full-width page sections (hero, pricing, faq…)
│   │   └── components/         # Layout components for the public route (header, footer)
│   ├── dashboard/
│   │   └── components/         # Sidebar, admin header
│   └── auth/
│       └── components/         # Login form, register form
│
├── components/                 # Globally reusable, route-agnostic UI
│   ├── ui/                     # Primitives: Button, Input, Container
│   └── providers/              # App-level wrappers: LenisProvider, QueryProvider
│
├── lib/                        # Pure utilities and config (no JSX)
│   ├── utils.ts
│   └── constants.ts
│
├── i18n/                       # next-intl routing, request config, navigation
├── middleware.ts               # Next.js route middleware (auth guard + i18n)
└── ...
```

---

## Pattern: Route-Scoped UI

**Every layout boundary owns its own UI code.**

The `ui/` directory mirrors the three route groups in `app/`:

| Route group | UI folder | What lives here |
|---|---|---|
| `(public)` | `ui/public/` | Landing sections, landing header/footer |
| `(auth)` | `ui/auth/` | Login form, auth-related UI |
| `(admin)` | `ui/dashboard/` | Sidebar, admin header, dashboard widgets |

**Rule:** If a component is only ever used inside one route group, it lives in `ui/<route>/`.
If it is used across multiple route groups, it moves to `components/`.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| File names | `kebab-case` | `hero-section.tsx` |
| Exported components | `PascalCase` | `export function HeroSection()` |
| Hooks | `camelCase` with `use` prefix | `useLoginForm` |
| Types / Interfaces | `PascalCase` | `interface User` |
| Constants | `SCREAMING_SNAKE_CASE` | `const NAV_ITEMS` |

**Why kebab-case for files?**
Linux (production/Docker) filesystems are case-sensitive.
`HeroSection.tsx` and `herosection.tsx` are different files on Linux but the same on Windows/macOS.
kebab-case eliminates this class of deployment bug entirely.

---

## Hook Placement Rules

There are two kinds of hooks. They live in different places.

### 1. UI Hooks — live inside the component file

A UI hook controls local state that only one component needs.
It has no API calls, no side effects beyond the component, and is not reused anywhere.

```tsx
// ui/public/components/landing-header.tsx

function useMobileMenu() {
  const [open, setOpen] = useState(false)
  return { open, toggle: () => setOpen(o => !o) }
}

export function LandingHeader() {
  const { open, toggle } = useMobileMenu()
  // ...
}
```

**Keep it here.** Splitting it into a separate file gains nothing — the hook and component are one unit.

### 2. Business Logic Hooks — live in a `hooks/` folder

A business logic hook handles API calls, auth state, data fetching, or logic that
is reused across more than one component.

```tsx
// ui/auth/hooks/use-login.ts

export function useLogin() {
  // calls the API, manages loading/error state, handles redirect
  // used by LoginForm AND potentially a session guard
}
```

**Extract it** when:
- It contains an API call or async logic
- It is used by more than one component
- You want to unit test it independently of JSX

### Decision table

| Hook does... | Where it lives |
|---|---|
| Local UI state (open/close, toggle, input focus) | Inside the component file |
| API call, data fetching, mutation | `hooks/` folder in the relevant `ui/<route>/` |
| Shared across multiple route scopes | `lib/` or a top-level `hooks/` folder |

---

## `app/` Rules

The `app/` directory contains **only**:
- `page.tsx` files that compose sections/components from `ui/`
- `layout.tsx` files that wrap children with the correct shell
- Route group folders: `(public)`, `(auth)`, `(admin)`

**No business logic, no inline JSX beyond composition, no direct API calls.**

```tsx
// app/[locale]/(public)/page.tsx — correct
import { HeroSection } from "@/ui/public/sections/hero-section"

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}
```

---

## `components/` Rules

Only add something to `components/ui/` if it is:
1. A pure, headless primitive (Button, Input, Modal, Container)
2. Used in **at least two different route scopes**
3. Has no dependency on any specific route's data or state

If it only exists for one route → it belongs in `ui/<route>/components/`.

---

## Types Placement

| Type describes... | Where it lives |
|---|---|
| Shape of a UI component's props | Inline in the component file or at the top of it |
| Domain entity (User, Server, Subscription) | `ui/<owning-route>/types.ts` |
| Shared across all routes | `lib/types.ts` |

---

## Summary for AI Assistants

When generating or editing code in this project:

1. **New page section** (hero, pricing, etc.) → `src/ui/public/sections/`
2. **New auth UI** (form, modal) → `src/ui/auth/components/`
3. **New dashboard widget** → `src/ui/dashboard/components/`
4. **New reusable primitive** (button variant, badge) → `src/components/ui/`
5. **New utility function** → `src/lib/utils.ts`
6. **New API hook** → `src/ui/<route>/hooks/` (create the folder if needed)
7. **New UI-only hook** → inside the component file that uses it
8. **New route page** → `src/app/[locale]/(<group>)/<route>/page.tsx`
9. **File names** → always `kebab-case.tsx`
10. **Exports** → always `PascalCase` for components, `camelCase` for functions/hooks
