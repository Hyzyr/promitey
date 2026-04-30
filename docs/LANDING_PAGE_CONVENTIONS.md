# Landing Page Development Conventions

**Quick reference guide for working on `/ui/public/landing/` sections**

---

## 📁 File Structure Rules

### Rule 1: When to Use Folders

**Use folder structure** if section meets ANY criteria:
- File exceeds **150 lines**
- Has **3+ components**
- Contains complex state/logic

```
✅ GOOD: sections/pricing/
  ├─ pricing-section.tsx
  ├─ pricing-card.tsx
  └─ index.ts

❌ BAD: sections/pricing-section.tsx (202 lines with inline components)
```

**Use single file** for simple sections:
- Under 150 lines
- No subcomponents
- Simple layout only

```
✅ GOOD: sections/hero-section.tsx (80 lines, uses external components)
```

### Rule 2: Folder Naming

```
sections/[section-name]/
  ├─ [section-name]-section.tsx    # Main section component
  ├─ [component-name].tsx           # Subcomponents
  ├─ data.ts                        # Static data/constants (optional)
  ├─ use-[hook-name].ts             # Custom hooks (optional)
  └─ index.ts                       # Exports (optional, but recommended)
```

**Example**:
```
sections/testimonials/
  ├─ testimonials-section.tsx
  ├─ testimonial-card.tsx
  ├─ navigation-arrows.tsx
  ├─ pagination-dots.tsx
  ├─ use-testimonials-carousel.ts
  └─ data.ts
```

---

## 🧩 Component Rules

### Rule 3: Component Location

**Extract to `/components/ui/`** when:
- ✅ Reusable across multiple pages/sections
- ✅ Generic UI primitive (button, badge, card, input)
- ✅ Part of design system

**Examples**: `Button`, `DiscountBadge`, `Container`, `Input`

**Keep in section folder** when:
- ✅ Section-specific (e.g., `PricingCard`, `TestimonialCard`)
- ✅ Tightly coupled to section logic
- ✅ Unlikely to be reused elsewhere

**Examples**: `benefits-cards.tsx`, `faq-item.tsx`, `pricing-card.tsx`

### Rule 4: Component Naming

```tsx
// ✅ GOOD: Descriptive, follows pattern
export const PricingCard = ({ ... }) => { ... }
export const TestimonialCard = ({ ... }) => { ... }
export const FaqItem = ({ ... }) => { ... }

// ❌ BAD: Generic, unclear
export const Card = ({ ... }) => { ... }
export const Item = ({ ... }) => { ... }
```

### Rule 5: Component Props

Always export prop types:

```tsx
// ✅ GOOD
export type PricingCardProps = {
  label: string;
  price: string;
  featured?: boolean;
};

export const PricingCard = ({ label, price, featured }: PricingCardProps) => {
  // ...
};
```

---

## 🎨 Styling Rules

### Rule 6: Glass Effects

**For buttons**:
```tsx
<Button variant="glass" size="md">Click me</Button>
```

**For badges/decorative elements**:
```tsx
<div className="glass backdrop-blur-lg">Content</div>
```

**Never**: Inline glass styles (use utility class defined in `globals.css`)

### Rule 7: Tailwind Classes

**Use design tokens** from tailwind.config:
```tsx
// ✅ GOOD: Using design tokens
className="bg-neutral-20 text-neutral-600 rounded-lg"

// ❌ BAD: Arbitrary values (unless specific Figma requirement)
className="bg-[#f6f6f6] text-[#484747] rounded-[24px]"
```

**Exception**: Exact Figma specs that don't match tokens:
```tsx
// ✅ ACCEPTABLE: Exact design requirement
style={{ boxShadow: '0px 20px 32px 0px rgba(0,0,0,0.06)' }}
```

### Rule 8: Container Usage

Always wrap sections in `<Container>`:
```tsx
// ✅ GOOD
<section id="pricing">
  <Container>
    {/* content */}
  </Container>
</section>

// ❌ BAD: No container
<section id="pricing">
  <div className="px-24">
    {/* content */}
  </div>
</section>
```

---

## 🌐 Internationalization Rules

### Rule 9: All Text Must Use Translations

```tsx
// ✅ GOOD
const t = useTranslations('landing.pricing');
<p>{t('title')}</p>

// ❌ BAD: Hardcoded text
<p>Choose Your Plan</p>
```

### Rule 10: Translation Keys Structure

```json
{
  "landing": {
    "sectionName": {
      "title": "...",
      "subtitle": "...",
      "items": {
        "0": { "q": "...", "a": "..." }
      }
    }
  }
}
```

**Follow existing patterns** in `messages/en.json` and `messages/ru.json`

---

## ⚡ Performance Rules

### Rule 11: Images

Always use optimized formats:
```tsx
// ✅ GOOD: WebP for photos, PNG for graphics
<img src="/images/benefits/photo.webp" alt="..." />

// Decorative images: Empty alt
<img src="/images/bg-blur.png" alt="" />

// Meaningful images: Descriptive alt
<img src="/images/screenshot.png" alt="Dashboard overview" />
```

### Rule 12: Client Components

Only use `"use client"` when needed:
```tsx
// ✅ GOOD: Needs interactivity
"use client";
import { useState } from 'react';

// ❌ BAD: Static content, no interaction
"use client";
export const StaticSection = () => <div>Static</div>;
```

---

## 📦 Import Rules

### Rule 13: Import Order

```tsx
// 1. React/Next.js
import { useState } from 'react';
import { useTranslations } from 'next-intl';

// 2. Components (external then internal)
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

// 3. Local components
import { PricingCard } from './pricing-card';

// 4. Hooks/Utils
import { useScrollSteps } from '@/hooks/use-scroll-steps';
import { cn } from '@/lib/utils';

// 5. Types
import type { PricingCardProps } from './pricing-card';

// 6. Assets/Data
import { testimonials } from './data';
```

### Rule 14: Import Paths

```tsx
// ✅ GOOD: Use aliases
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/use-media';

// ❌ BAD: Relative paths for shared code
import { Button } from '../../../components/ui/button';
```

**Exception**: Sibling files in same folder use relative imports:
```tsx
// ✅ GOOD: Same folder
import { PricingCard } from './pricing-card';
```

---

## 📝 Documentation Rules

### Rule 15: Component Documentation

Add JSDoc for complex components:
```tsx
/**
 * PricingCard - Individual pricing plan card
 * 
 * @param label - Plan name (e.g., "1 Month")
 * @param price - Main price display
 * @param featured - Highlight as recommended plan
 * 
 * @example
 * ```tsx
 * <PricingCard label="1 Year" price="16 €" featured />
 * ```
 */
export const PricingCard = ({ label, price, featured }: PricingCardProps) => {
  // ...
};
```

### Rule 16: Section ID

Every section must have an `id` for anchor navigation:
```tsx
// ✅ GOOD
<section id="pricing">...</section>
<section id="faq">...</section>

// ❌ BAD
<section>...</section>
```

---

## 🔄 State Management Rules

### Rule 17: Local State Only

Landing sections should use **local state only**:
```tsx
// ✅ GOOD: Local useState
const [activeCard, setActiveCard] = useState('internet');

// ❌ BAD: Global state for landing sections
const activeCard = useGlobalStore(state => state.activeCard);
```

### Rule 18: Custom Hooks

Extract complex logic to custom hooks:
```tsx
// ✅ GOOD: Reusable hook
export const useCardParallax = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // ... logic
  return { rawX, rawY, onMouseMove, onMouseLeave };
};

// Use in component
const { rawX, rawY, onMouseMove } = useCardParallax();
```

---

## ✅ Before Committing Checklist

- [ ] All text uses `useTranslations()` (no hardcoded strings)
- [ ] Section has unique `id` attribute
- [ ] Wrapped in `<Container>` (unless full-width design)
- [ ] Images have appropriate `alt` attributes
- [ ] TypeScript types exported for props
- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Component location follows rules (ui/ vs section folder)
- [ ] Follows existing section patterns (refer to benefits/, testimonials/, faq/)

---

## 📚 Reference Examples

**Simple section** (single file):
- [hero-section.tsx](../src/ui/public/landing/sections/hero-section.tsx)
- [connect-guide.tsx](../src/ui/public/landing/sections/connect-guide.tsx)

**Complex section** (folder structure):
- [benefits/](../src/ui/public/landing/sections/benefits/)
- [testimonials/](../src/ui/public/landing/sections/testimonials/)
- [pricing/](../src/ui/public/landing/sections/pricing/)
- [faq/](../src/ui/public/landing/sections/faq/)

**Reusable components**:
- [src/components/ui/button.tsx](../src/components/ui/button.tsx)
- [src/components/ui/discount-badge.tsx](../src/components/ui/discount-badge.tsx)
- [src/components/ui/container.tsx](../src/components/ui/container.tsx)

---

**Last Updated**: April 30, 2026  
**Questions?** Check existing sections for patterns or refer to [LANDING_PAGE_REFACTORING.md](LANDING_PAGE_REFACTORING.md) for detailed context.
