# MVP Production Readiness

Last updated: May 11, 2026

This document summarizes what is implemented now, what is intentionally handled as an MVP fallback, and what remains before production launch.

## Current MVP Scope

The MVP exposes the public landing page, localized legal pages, authentication, and the core dashboard pages needed for a VPN customer:

- Dashboard home
- Instructions
- Configs
- Subscription
- Profile

The hidden Servers page is not part of MVP navigation and `/dashboard/servers` returns 404.

## Completed Frontend Work

### Public Site

- Landing anchors work for benefits, pricing, guide, and FAQ.
- Header desktop layout is compact at the first desktop breakpoint and scales up at `lgx` and `xl`.
- Header navigation accessibility label is localized.
- Benefits big card tablet styling uses valid Tailwind/CSS without custom variants.
- Footer legal and social links use centralized constants.
- Pricing CTAs currently redirect to the Telegram bot as the MVP payment fallback.

### Legal and SEO

- Localized legal pages exist under:
  - `/legal/privacy`
  - `/legal/terms`
  - `/legal/refund`
  - `/legal/aup`
  - `/legal/report`
- Legal metadata includes canonical URLs, localized alternates, Open Graph data, and Twitter image metadata.
- Sitemap includes localized landing pages and legal pages with alternates.
- Open Graph image metadata uses `/images/og-image-promitey.png`.
- Root/public metadata is localized through message files.

### Dashboard MVP

- Desktop and mobile dashboard navigation expose the same MVP pages.
- Configs page uses modal-based access for VPN configs.
- VLESS modal opens directly, loads the backend subscription URL, shows a QR code, shows the link, and has a small in-card copy button.
- OpenVPN modal exposes the single account profile download only.
- Regional OpenVPN download UI is hidden until backend region support is confirmed.
- Shared modal wrapper behaves consistently on mobile/tablet/desktop.
- Profile keeps Telegram linking and password reset access visible.
- Change password flow sends the user through the auth reset path after confirmation.

### Centralized Configuration

- Public external links are centralized in `src/lib/constants.ts`.
- Telegram bot/social fallbacks are configurable through public environment variables.
- SEO image path and dimensions are centralized in `SEO_ASSETS`.
- Legal slugs and legal route helpers are centralized.

## Backend Contracts Still Needed

These items block a full production commercial flow:

- Real billing checkout endpoint or checkout URL response.
- Checkout plan selection contract, for example a backend-accepted `plan_id`.
- Direct free-trial endpoint, automatic trial policy, or documented promocode-based trial flow.
- Subscription/status endpoint that distinguishes missing Telegram link, no active subscription, expired subscription, and config/backend errors.
- OpenVPN region/server-list endpoint if regional UI returns later.
- Contact/support form endpoint, or a decision to keep the form hidden and use Telegram only.

## MVP Fallbacks In Use

- Billing and pricing CTAs redirect to the Telegram bot instead of calling the placeholder checkout endpoint.
- OpenVPN region-specific download UI is hidden.
- Servers page is hidden and returns 404.
- Footer support is Telegram-first until a contact form backend exists.

## Pre-Production Checklist

Run and pass these checks after merge conflict resolution and before deployment:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

Smoke test these paths manually:

- `/ru` and `/en`
- `/ru/legal/privacy` and `/en/legal/privacy`
- `/ru/legal/terms` and `/en/legal/terms`
- `/ru/dashboard/configs`
- `/ru/dashboard/subscription`
- `/ru/dashboard/profile`
- `/ru/dashboard/servers` should show 404
- `sitemap.xml`
- `robots.txt`

## Current Risk Notes

- The frontend is ready for MVP support-driven billing, but not for automatic payment activation.
- Legal text is professional placeholder copy and should still receive owner/legal review.
- Build, lint, and TypeScript checks must be run in the terminal after the merge is fully resolved.
