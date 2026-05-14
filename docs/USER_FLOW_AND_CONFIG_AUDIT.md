# User Flow, Billing, Trial, and Config Audit

Last updated: May 11, 2026

This audit reflects the current MVP frontend implementation after the latest merge-conflict cleanup.

## Short Answer

Registration, login, confirmation codes, TOTP login, password reset, Telegram linking, VLESS config access, single OpenVPN config download, localized legal pages, sitemap, and SEO metadata are implemented on the frontend.

The commercial flow is still not production-complete because Swagger marks checkout as a placeholder and does not define a backend plan-selection contract. For MVP, billing and pricing actions redirect to Telegram support.

## Implemented User Flow

### 1. Registration

Swagger defines a two-step registration flow:

1. `PUT /auth/register`
   - Prepares or sends a verification code.
   - Development fixtures may return a code such as `111111`.

2. `POST /auth/register`
   - Confirms registration with `{ email, code }`.
   - Creates the account on success.

Frontend status:

- Implemented as `/register` and `/register/confirm`.
- Selected pricing plan is preserved through query/localStorage while the user moves through auth.
- After confirmation, the user proceeds through the login/subscription path.

### 2. Login and Session

Swagger defines:

- `POST /auth/login`
- Optional `POST /auth/login/totp`
- `POST /auth/refresh`

Frontend status:

- Email/password login is implemented.
- TOTP challenge flow is implemented.
- Secure cookie session handling and refresh middleware exist.
- Post-auth redirect can carry the selected plan to the dashboard subscription page.

### 3. Telegram Linking

Swagger defines:

- `POST /link/site-token`
- `POST /link/by-public-code`

Frontend status:

- Profile page includes Telegram linking UI.
- Telegram linking remains important for real VPN config access.

### 4. Subscription and Billing

Swagger exposes:

- `POST /billing/checkout`
- `POST /promocode/activate`

Current backend limitation:

- `POST /billing/checkout` is a placeholder in Swagger.
- Swagger does not define a plan id parameter for checkout.
- Swagger does not define a direct free-trial endpoint.

Current frontend MVP behavior:

- Pricing buttons redirect to the Telegram bot.
- Dashboard billing renew action redirects to the Telegram bot.
- Centralized bot URL comes from `EXTERNAL_LINKS.telegramBot` with `NEXT_PUBLIC_TELEGRAM_BOT_URL` fallback support.
- Promocode UI is not part of the visible MVP subscription screen.

Production requirement:

- Backend should return a real checkout URL or payment intent.
- Backend should accept or infer a selected plan id.
- Free trial should be implemented as an endpoint, automatic policy, or documented promocode flow.

## Config Files Flow

Config access is authenticated and subscription-gated by the backend.

### VLESS

Swagger endpoint:

- `GET /vpn/vless/subscription`

Expected response:

```json
{
  "subscription_url": "..."
}
```

Frontend status:

- Dashboard config card opens a VLESS modal.
- The modal automatically loads the subscription URL through a server action.
- The modal displays a QR code generated with the existing `qrcode` package.
- The modal displays the subscription link and a small in-card copy button.
- Large copy/open-link actions have been removed for the MVP design.
- Errors are mapped for access denied, Marzban/config service problems, and generic failure.

### OpenVPN

Swagger endpoints:

- `GET /vpn/openvpn/config`
- `GET /vpn/openvpn/config/{region}`

Frontend status:

- MVP UI exposes only the account OpenVPN profile download.
- Region-specific UI and copy are hidden until the backend contract is confirmed.
- The hidden regional API support should not be surfaced to users until a region list or product decision exists.

Production requirement:

- If regional OpenVPN returns, backend should provide a region/server list endpoint such as `GET /vpn/openvpn/regions`.

## Dashboard MVP Navigation

Visible dashboard pages:

- Dashboard
- Instructions
- Configs
- Subscription
- Profile

Hidden page behavior:

- Servers is removed from active desktop and mobile dashboard navigation.
- `/dashboard/servers` returns 404 for MVP.
- Old server page code is preserved under a hidden path for future reference, not active routing.

## Legal and SEO Flow

Implemented:

- `/legal/privacy`
- `/legal/terms`
- `/legal/refund`
- `/legal/aup`
- `/legal/report`

SEO status:

- Legal pages include localized metadata, canonical URLs, hreflang alternates, Open Graph, and Twitter metadata.
- Sitemap includes localized public and legal routes.
- Open Graph metadata uses `/images/og-image-promitey.png`.

## Production Readiness Gaps

1. Real billing checkout contract.
   - Add checkout URL/payment response.
   - Add selected plan id support.

2. Free trial contract.
   - Add a direct trial endpoint, automatic registration policy, or documented promocode flow.

3. Subscription/status endpoint.
   - Distinguish missing Telegram link, missing subscription, expired subscription, backend config error, and service unavailable.

4. Optional OpenVPN region list.
   - Needed only if regional downloads return to the UI.

5. Contact/support form endpoint.
   - Current MVP should rely on Telegram unless a backend contact flow is added.

6. Final validation.
   - Run `npm run lint`.
   - Run `npx tsc --noEmit`.
   - Run `npm run build`.
   - Smoke test auth, config modals, legal routes, sitemap, robots, and responsive header layouts.

## Current Verdict

The frontend is ready for an MVP where payment and support are handled through Telegram. It is not yet ready for automatic production billing activation until the backend checkout, plan selection, free trial, and subscription status contracts are finalized.
