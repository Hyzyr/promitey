# UI Fixes Report — 2026-06-27

Status of the items from [`ui.todo`](../ui.todo). All changes pass `npx tsc --noEmit` and ESLint.

---

## ✅ Done

### 1. iOS / mobile verification code input
**Problem:** Numeric keypad appeared but tapping digits did not fill the boxes — input felt frozen.

**Fix** — [`verification-code-input.tsx`](../src/ui/auth/components/verification-code-input.tsx)
- Removed `maxLength={1}`, which silently swallowed keystrokes on iOS when a box was already filled (the root cause of the "nothing happens" behaviour).
- Added `onFocus` → `select()` so tapping a filled box selects its content and typing overwrites it cleanly.
- Added multi-digit distribution: when iOS `one-time-code` autofill or a paste delivers several digits at once, they spread across the boxes.
- `autoComplete="one-time-code"` is now set on the **first** box only (iOS misbehaves when all 6 declare it); added `pattern="[0-9]*"`.

### 2. Button size shift when loading
**Problem:** Loading state replaced content with a small spinner, so the button changed size (glitch), especially icon-only buttons.

**Fix** — [`button.tsx`](../src/components/ui/button.tsx)
- Children now stay in the DOM but become invisible, and the spinner is overlaid absolutely.
- Button width/height stays identical between idle and loading. Applied to both `Button` and `GlassButton`.

### 3. Button text overflow
**Problem:** Long Russian label "Активировать пробный период" overflowed the subscription card.

**Fix** — [`subscription-card.tsx`](../src/ui/dashboard/pages/subscription/subscription-card.tsx), [`trial-activation-button.tsx`](../src/ui/dashboard/pages/subscription/trial-activation-button.tsx)
- Action buttons are full-width and stack on mobile (`flex-col` → `sm:flex-row`). The trial button uses a short mobile-only label (`Try free`) and keeps the full label on larger screens.

### 4. Sketchy / paid client recommendation removed
**Problem:** Instructions recommended **Shadowrocket** (paid iOS app).

**Fix** — replaced with **Hiddify** (free, open-source) in:
- [`instructions-tabs.tsx`](../src/ui/dashboard/pages/instructions/instructions-tabs.tsx) (link → `https://github.com/hiddify/hiddify-app`)
- [`messages/en/dashboard.json`](../messages/en/dashboard.json) and [`messages/ru/dashboard.json`](../messages/ru/dashboard.json) (app title + source list)
- Other recommended clients (OpenVPN Connect, v2rayNG, V2RayN, V2RayU) were reviewed — all free/official, kept as-is.

### 5. Login → dashboard redirect hardening
**Problem:** In rare cases login did not redirect to the dashboard.

**Fix** — [`use-login.ts`](../src/ui/auth/hooks/use-login.ts)
- Added a retry safety net: if the page is still on `/login` 600 ms after the redirect fires, it forces navigation again. Covers the rare interrupted-navigation case without changing the normal flow.

### 6. Password reset flow — verified (no code change needed)
After review, the flow is already correct:
- Step numbering: **Step 1/2/3 of 3** (email → code → password).
- Step 1 text, single step-2 line, no duplicate step-3 line.
- Password validation everywhere: 10+ chars, 1 uppercase, 1 lowercase, 1 digit, with live hints and a disabled submit while invalid.
- Entering a wrong code no longer jumps to step 3 — it is validated before advancing.

---

## ⏳ Left / temporary solutions

### Payment (WATA card payment) — IMPLEMENTED
- **Status:** `swagger.json` now ships the real WATA contract, so the full card-payment flow is wired end to end.
- **Endpoint:** `POST /api/v1/billing/checkout` body `{ "plan": "monthly" }`, plan ∈ `monthly | quarterly | semiannual | annual`, returns `{ payment_url, order_id, amount, currency, plan, duration }`.
- **Flow:** plan selection (`checkout-plans.tsx`) → `checkoutAction(plan)` server action → redirect to the hosted WATA `payment_url` → return pages `/dashboard/subscription/success` and `/dashboard/subscription/fail` that re-read `GET /subscription/current` so the message reflects the real state regardless of the provider's return params.
- **Error handling:** `400 → unknown_plan`, `502 → billing_provider_error`, `503/501 → billing_unavailable`, `401 → unauthenticated`. On the "unavailable" path the UI still offers manual checkout via Telegram as a fallback.
- **Dev mode:** `src/api/client/dev-mock.ts` returns a mock checkout whose `payment_url` points straight at the success page, so the whole redirect/return flow is testable without WATA.
- **Types/API:** `BillingPlan`, `BillingCheckoutRequest/Response`, `SubscriptionManage*`, `SubscriptionCancel*` added to `api-types.ts`; `SubscriptionType` now includes `card`; `billing-api.ts` exposes `checkout`, `getSubscriptionManage`, `cancelSubscription`.

### Cannot be changed from the frontend
- The live WATA merchant configuration (`WATA_ACCESS_TOKEN`) and webhook activation are backend concerns; the frontend gracefully degrades to the Telegram fallback if the backend reports `503`.
- Hiddify App Store link uses the project's GitHub (matching the existing pattern for other clients) because a specific App Store ID could not be verified without guessing.

---

## Verification
- `npx tsc --noEmit` — clean.
- `npx eslint` on all edited files — clean.
- No production build was run (per workflow preference: typecheck + lint only).
