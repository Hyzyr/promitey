# Prometey VPN — Component Specifications

> Source: Figma file `CGwoRb0tFSoEX6GfKTdabi`  
> Nodes: `6265:3751` (Button), `6328:1180` (Input)  
> All measurements are in **px** from Figma. Map to Tailwind as shown.

---

## Button Component — `src/components/ui/button.tsx`

### Figma Screenshot Reference

Nodes rendered (from metadata `6265:3751`):
```
size=Default, style=Default    → 214 × 57 px
size=lg,      style=Default    → 390 × 66 px
size=sm,      style=secondary  → 179 × 46 px
size=Default, style=secondary  → 354 × 57 px
size=lg,      style=secondary  → 312 × 66 px
size=Default, style=orange     → 211 × 57 px
size=sm,      style=orange     → 179 × 46 px
size=lg,      style=orange     → 390 × 66 px
```

> Width in Figma is content-driven. Only **height** is the spec constraint.  
> All buttons use a **pill (rounded-full)** border-radius.

---

### Sizing Scale

| Variant name | Height (Figma) | Tailwind height | Padding X | Font size | Font weight |
|:---:|:---:|:---:|:---:|:---:|:---:|
| `sm`  | 46 px | `h-[46px]` | `px-5` (20 px) | `text-sm` (14 px) | `font-medium` |
| `md`  | 57 px | `h-[57px]` | `px-7` (28 px) | `text-base` (16 px) | `font-medium` |
| `lg`  | 66 px | `h-[66px]` | `px-8` (32 px) | `text-lg` (18 px) | `font-medium` |

---

### Visual Variants

| Variant | Background | Text colour | Hover bg | Active bg |
|:---|:---|:---|:---|:---|
| `default` (dark) | `#201e1e` (neutral-900) | `#ffffff` | `#393737` (neutral-700) | `#292928` (neutral-800) |
| `secondary` | `#ededed` (neutral-30) | `#201e1e` (neutral-900) | `#e2e2e2` (neutral-40) | `#c7c7c7` (neutral-50) |
| `orange` | `#ff6d41` (primary-500) | `#ffffff` | `#e8633b` (primary-600) | `#b54d2e` (primary-700) |

> Border radius: `rounded-full` (9999 px) — all variants, all sizes.  
> Disabled state: `opacity-50 cursor-not-allowed pointer-events-none`.

---

### Icon Usage (Lucide)

Buttons can optionally receive a `leftIcon` or `rightIcon` prop.  
Icon size maps to button size:

| Button size | Icon class |
|:---:|:---:|
| `sm` | `h-4 w-4` |
| `md` | `h-5 w-5` |
| `lg` | `h-5 w-5` |

Gap between icon and label: `gap-2` (8 px).

---

### Implementation

> **React 19 note:** Next.js 15 ships React 19. `forwardRef` is deprecated — `ref` is now a plain prop. Both components below use the new pattern.

```tsx
// src/components/ui/button.tsx
"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type LucideIcon } from "lucide-react";

type Variant = "default" | "secondary" | "orange";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: Variant;
  size?: Size;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isLoading?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  default:   "bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800",
  secondary: "bg-neutral-30  text-neutral-900 hover:bg-neutral-40 active:bg-neutral-50",
  orange:    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-[46px] px-5 text-sm  gap-2",
  md: "h-[57px] px-7 text-base gap-2",
  lg: "h-[66px] px-8 text-lg  gap-2",
};

const iconSize: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
};

export function Button({
  ref,
  variant = "default",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  asChild = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        // Base
        "inline-flex items-center justify-center rounded-full font-medium",
        "transition-colors duration-150 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        // Variant + size
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className={iconSize[size]} />}
          {children}
          {RightIcon && <RightIcon className={iconSize[size]} />}
        </>
      )}
    </Comp>
  );
}
```

---

### Usage Examples

```tsx
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";

// Default (dark) — all sizes
<Button variant="default" size="sm">Создать аккаунт</Button>
<Button variant="default" size="md">Создать аккаунт</Button>
<Button variant="default" size="lg">Создать аккаунт</Button>

// Secondary
<Button variant="secondary" size="sm">Создать аккаунт</Button>
<Button variant="secondary" size="lg">Создать аккаунт</Button>

// Orange (primary brand)
<Button variant="orange" size="lg" leftIcon={Plus}>
  Добавить сервер
</Button>

// With right icon
<Button variant="default" size="md" rightIcon={ArrowRight}>
  Продолжить
</Button>

// Loading state
<Button variant="orange" isLoading>Загрузка...</Button>

// Full width
<Button variant="default" size="lg" className="w-full">
  Войти
</Button>
```

---

---

## Input Component — `src/components/ui/input.tsx`

### Figma Screenshot Reference

Nodes rendered (from metadata `6328:1180`):
```
Property 1=Default  → 377 × 58 px  (rest state)
Property 1=focused  → 377 × 58 px  (active / typing)
Property 1=filled   → 377 × 58 px  (has value)
```

---

### Anatomy & Dimensions

```
┌────────────────────────────────────┐
│  px-4 (16 px)  [label/value text]  │  Height: 58 px
└────────────────────────────────────┘
         ↕ border: 1.5 px
      border-radius: 12 px (rounded-xl)
```

| Property | Value | Tailwind |
|:---|:---|:---|
| Height | 58 px | `h-[58px]` |
| Horizontal padding | 16 px | `px-4` |
| Border radius | 12 px | `rounded-xl` |
| Font size | 16 px | `text-base` |
| Font weight (filled/value) | 500 | `font-medium` |
| Font weight (placeholder) | 400 | default |

---

### States

| State | Background | Border | Text colour | Placeholder colour |
|:---|:---|:---|:---|:---|
| **Default** | `#f6f6f6` (neutral-20) | none | `#201e1e` (neutral-900) | `#a1a1a1` (neutral-80) |
| **Focused** | `#f6f6f6` (neutral-20) | `1.5px solid #7B3FE4` (violet accent) | `#201e1e` | `#a1a1a1` |
| **Filled**  | `#f6f6f6` (neutral-20) | none | `#201e1e` (neutral-900) | — |
| **Error**   | `#fff0ec` (primary-50) | `1.5px solid #f6261c` (red-500) | `#201e1e` | `#a1a1a1` |
| **Disabled**| `#ededed` (neutral-30) | none | `#a1a1a1` (neutral-80) | `#c7c7c7` (neutral-50) |

> **Violet focus ring** (`#7B3FE4`) is the interactive accent. It is separate from the brand palette — Figma uses it only for focus/active input states.

---

### Implementation

```tsx
// src/components/ui/input.tsx
"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { useId } from "react";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export function Input({
  ref,
  label,
  error,
  hint,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  id,
  ...props
}: InputProps) {
  // useId() generates a stable, unique ID per component instance (React 18+)
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-900">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon className="pointer-events-none absolute left-4 h-5 w-5 text-neutral-80" />
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            // Base
            "h-[58px] w-full rounded-xl bg-neutral-20 px-4 text-base font-medium",
            "text-neutral-900 outline-none transition-all duration-150",
            "placeholder:font-normal placeholder:text-neutral-80",
            // Focus ring — violet accent from Figma
            "focus:border-[1.5px] focus:border-[#7B3FE4]",
            // Error state
            error && "border-[1.5px] border-red-500 bg-primary-50",
            // Disabled
            "disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-80",
            // Icon padding adjustments
            LeftIcon  && "pl-11",
            RightIcon && "pr-11",
            className,
          )}
          {...props}
        />

        {RightIcon && (
          <RightIcon className="pointer-events-none absolute right-4 h-5 w-5 text-neutral-80" />
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-neutral-200">{hint}</p>
      )}
    </div>
  );
}
```

---

### Usage Examples

```tsx
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye } from "lucide-react";

// Default
<Input placeholder="Электронная почта или логин" />

// With label
<Input label="Email" placeholder="user@example.com" />

// With icons
<Input
  label="Email"
  placeholder="user@example.com"
  leftIcon={Mail}
/>

<Input
  label="Пароль"
  type="password"
  placeholder="••••••••"
  leftIcon={Lock}
  rightIcon={Eye}
/>

// Error state
<Input
  label="Email"
  placeholder="user@example.com"
  error="Неверный формат email"
/>

// With React Hook Form — see Component Composition → Login Form below
```

---

---

## Component Composition — Login Page Example

`src/app/(auth)/login/page.tsx`

> Login page itself is a Server Component. Form interaction is isolated to a `"use client"` form component.

```tsx
// src/components/features/auth/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";

const schema = z.object({
  email:    z.string().email("Неверный формат email"),
  password: z.string().min(8, "Минимум 8 символов"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    // call your auth action / API route
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="admin@prometey.vpn"
        leftIcon={Mail}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="••••••••"
        leftIcon={Lock}
        error={errors.password?.message}
        {...register("password")}
      />
      <Button variant="orange" size="lg" className="mt-2 w-full" type="submit" isLoading={isSubmitting}>
        Войти
      </Button>
      <Button variant="secondary" size="md" className="w-full" type="button">
        Создать аккаунт
      </Button>
    </form>
  );
}
```

```tsx
// src/app/(auth)/login/page.tsx  — Server Component
import { LoginForm } from "@/components/features/auth/login-form";
import { Shield } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-20">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <Shield className="h-10 w-10 text-primary-500" />
          <h1 className="text-2xl font-semibold text-neutral-900">Prometey VPN</h1>
          <p className="text-sm text-neutral-200">Войдите в панель управления</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
```

---

## Summary — Design Token Quick Reference

### Button heights
```
sm  →  h-[46px]   (46 px from Figma)
md  →  h-[57px]   (57 px from Figma)
lg  →  h-[66px]   (66 px from Figma)
```

### Input height
```
→  h-[58px]   (58 px from Figma)
```

### Border radii
```
Button  →  rounded-full    (pill, any size)
Input   →  rounded-xl      (12 px)
Card    →  rounded-2xl     (16 px — recommendation)
```

### Key colours
```
Brand primary       →  #ff6d41   (primary-500)
Dark button bg      →  #201e1e   (neutral-900)
Secondary button    →  #ededed   (neutral-30)
Input background    →  #f6f6f6   (neutral-20)
Input focus ring    →  #7B3FE4   (violet accent)
Error / destructive →  #f6261c   (red-500)
Page background     →  #f6f6f6   (neutral-20)
Card / surface      →  #ffffff
```

### Font (Inter from Google Fonts)
```
Subsets:  latin, cyrillic
Weights:  400 (regular), 500 (medium), 600 (semibold), 700 (bold)
Variable: --font-inter
```
