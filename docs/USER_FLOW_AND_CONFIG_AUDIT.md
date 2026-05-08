# User Flow, Billing, Trial, and Config Audit

This audit is based on `swagger-new.json`, `swagger-overview.md`, and the current frontend implementation.

## Short Answer

The registration and auth code flows are implemented. Payment is not implemented by the backend Swagger contract yet. Pricing-plan selection is currently frontend-only routing state. Config download exists, VLESS has a QR/copy popup, and OpenVPN has a matching download popup with saved/default and direct region-code downloads. A full OpenVPN server list still needs backend support.

## Swagger User Flow

### 1. Register

Swagger defines a two-step registration flow:

1. `PUT /auth/register`
   - Sends or prepares a verification code.
   - Response is `verification_required` and may include a development code such as `111111`.

2. `POST /auth/register`
   - Confirms registration with `{ email, code }`.
   - Creates the account on success.

Frontend status:

- Implemented as `/register` then `/register/confirm`.
- The current frontend preserves a selected pricing plan through the `plan` query parameter and local storage.
- After confirm, the user is sent to login, not automatically subscribed.

### 2. Login

Swagger defines:

- `POST /auth/login`
- Optional `POST /auth/login/totp` when `two_factor_required` is returned.
- `POST /auth/refresh` for token refresh.

Frontend status:

- Login is implemented.
- TOTP challenge flow is implemented.
- Secure cookie session handling and refresh middleware exist.
- If a pricing plan was selected, login redirects to `/dashboard/subscription?plan=<plan>`.

### 3. Link Telegram

Swagger requires Telegram linking for VPN config operations:

- `POST /link/site-token`
- `POST /link/by-public-code`

Frontend status:

- Profile has Telegram linking UI.
- This is required before region/config endpoints can work for a real account.

### 4. Activate Subscription or Trial

Swagger exposes:

- `POST /promocode/activate`
- `POST /billing/checkout`

Important details:

- `POST /billing/checkout` is explicitly marked as a placeholder and returns `501`.
- Swagger does not define a `plan` parameter for checkout.
- Swagger does not define a direct `start free trial` endpoint.
- Free trial is only indirectly supported if the backend issues a promocode that activates a trial-like subscription.

Frontend status:

- Promocode activation is implemented on the subscription page.
- Checkout button exists but correctly shows a billing unavailable state because the backend returns `501`.
- Selected pricing plan is currently not applied to backend payment because the backend has no real checkout contract and no plan id input.

Conclusion:

- After registration, payment is not actually applied.
- The selected pricing plan is only remembered in frontend navigation/local storage.
- A user can only become active through an existing promocode flow, assuming the backend has valid promocodes.

## Config Files Flow

Swagger defines config access as authenticated and subscription-gated:

- User must be logged in.
- Telegram must be linked.
- Subscription must be active.

### VLESS

Swagger endpoint:

- `GET /vpn/vless/subscription`

Returns:

```json
{
  "subscription_url": "..."
}
```

Frontend status:

- API wrapper exists.
- `/api/configs/vless` exists as an open-link fallback.
- The dashboard config card opens a modal.
- The modal loads `subscription_url` through a server action.
- The modal shows a QR code generated with the existing `qrcode` package.
- The modal provides copy-to-clipboard and open-link actions.

Implemented UX:

- Config card opens a modal.
- Modal loads `subscription_url` through a server action.
- Modal shows QR code generated with the existing `qrcode` package.
- Modal provides copy-to-clipboard and open-link actions.
- Modal handles `403` as no active subscription or Telegram not linked, and `503` as Marzban not configured.

### OpenVPN

Swagger endpoints:

- `GET /vpn/openvpn/config`
- `GET /vpn/openvpn/config/{region}`

Frontend status:

- Default OpenVPN download exists through `/api/configs/openvpn`.
- API wrapper for region-specific download exists.
- The dashboard config card opens a matching modal.
- The modal offers saved/default profile download.
- The modal offers direct region-code download.
- `/api/configs/openvpn/[region]` proxies `/vpn/openvpn/config/{region}`.
- Swagger does not expose an endpoint to list available OpenVPN regions.

Implemented UX:

- Config card opens a modal.
- Modal offers saved/default OpenVPN profile download.
- Modal offers a direct region-code field and download action.
- API proxy route `/api/configs/openvpn/[region]` is implemented.
- Backend should add a list endpoint such as `GET /vpn/openvpn/regions` or include region options in `GET /vpn/region` before the UI can show a complete server list.

Current blocker:

- The frontend cannot truthfully show a complete available-server list because `swagger-new.json` does not define a region-list endpoint.

## Profile Change Password

Swagger endpoint:

- `PUT /auth/password`

Frontend status:

- Current dashboard profile page changes password inside the active session.
- It now asks for confirmation first.
- It warns that the user will be logged out.
- It clears the session and navigates to the auth password reset flow at `/forgot-password`.

Implemented UX:

- Profile change-password action is a confirmation modal.
- Confirmation text warns that continuing logs the user out.
- On confirm, the app logs out and sends the user to `/forgot-password`.

## Production Readiness Gaps

These items should be handled before calling the flow production-ready:

1. Add a real billing contract.
   - Checkout needs a real success response or payment URL.
   - Checkout should accept or resolve a plan id.

2. Decide the free-trial contract.
   - Either automatic trial after registration, or a clearly documented trial promocode flow.
   - If automatic, add a backend endpoint or registration response that activates it.

3. Complete backend support for full config UX.
   - VLESS QR/copy popup is implemented.
   - OpenVPN saved/custom-region popup is implemented.
   - Region-list endpoint or shared region list from backend is still needed.

4. Improve subscription state visibility.
   - The UI should clearly show whether the account has active subscription, no Telegram link, or missing config access.

5. Profile password flow is implemented.
   - Confirmation modal and logout-to-auth flow are in place.

6. Ghost files are removed from the worktree.
   - `.old` files were deleted so their removals are visible in git status.
   - Changes are intentionally not committed by the assistant.

## Current Verdict

The app handles registration, login, confirmation codes, Telegram linking, promocode activation, VLESS QR/copy access, and OpenVPN saved/region downloads. It does not yet fully handle the commercial flow after registration because payment is a backend placeholder and frontend plan selection is not sent to a real checkout API. A complete OpenVPN server list also remains backend-blocked because Swagger does not expose available regions.