## Swagger API overview

This file explains what is currently defined in `swagger.json`, how it should be integrated in the frontend, how authentication should work, and how bilingual UI content should be handled.

## Base API contract

- **Swagger version:** `2.0`
- **Title:** `VPN Bot HTTP API`
- **Base path:** `/api/v1`
- **Content type:** JSON for most endpoints
- **Auth scheme:** `Authorization: Bearer <access_token>`

The API is grouped into four domains:

1. **auth** - registration, login, password flows, TOTP
2. **account** - current user profile and Telegram linking
3. **vpn** - region, VPN configs, subscription URL, recreate action
4. **billing** - checkout placeholder

## High-level frontend handling

The agreed integration pattern is:

1. **Server-first API access**
2. **Dedicated API layer** for request helpers and endpoint modules
3. **Native `fetch`** instead of Axios or other HTTP libraries
4. **Secure cookie-based session handling** through a Next.js server-facing layer
5. **Server actions** for interactive user-triggered operations when needed
6. **Thin hooks only for UI behavior**, not as the primary home of API logic

Recommended structure:

```text
src/
  api/
    client/
    auth/
    account/
    vpn/
    billing/
  ui/
    auth/
      hooks/
    dashboard/
      hooks/
```

## Authentication handling

### Session model

The API itself is token-based:

- `access_token`
- `refresh_token`

Frontend handling should be:

1. Store session state through a **server-facing auth layer**
2. Keep tokens in **secure cookies**
3. Avoid exposing long-lived tokens as browser-managed client state
4. Let server components, server helpers, and server actions call the API on behalf of the user

This is the best fit for the current app because most protected screens are dashboard/account flows and do not require heavy realtime client caching.

### Login flow

`POST /auth/login` has **two possible successful outcomes**:

1. **Normal login**
   - returns `access_token`
   - returns `refresh_token`
   - returns `token_type`

2. **TOTP challenge required**
   - returns `two_factor_required: true`
   - returns `temp_token`
   - returns `expires_in`

If TOTP is required, the app must continue with:

- `POST /auth/login/totp`

using:

- `temp_token`
- `code` (6-digit authenticator code)

### Refresh flow

- `POST /auth/refresh`

This should be handled in the server session layer. If the access token is expired but refresh is still valid, the server layer should rotate tokens and keep the user signed in.

### Registration

- `POST /auth/register`

Creates a website account using:

- `email`
- `password`

Returns:

- `201` on success
- `409` if email already exists

### Forgot/reset password

Swagger defines a **token-based email reset flow**, not a code-entry flow.

Endpoints:

- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Important frontend consequence:

- the current `/forgot-password/verify` code screen is **not part of the Swagger contract**
- password reset should be based on a reset **token from a link**, not a manually entered 6-digit code

### Change password in session

- `PUT /auth/password`

Requires Bearer auth and accepts:

- `current_password`
- `new_password`

### TOTP management

Authenticated TOTP setup is split into three actions:

1. `POST /auth/totp/setup`
   - starts setup
   - returns `otpauth_url`, `issuer`, `account`

2. `POST /auth/totp/enable`
   - confirms setup with authenticator code

3. `POST /auth/totp/disable`
   - disables TOTP
   - requires `password` and `code`

This means TOTP is not only a login concern - it is also part of profile/security settings.

## Account domain

### Current user

- `GET /me`

Returns profile/session-related fields such as:

- `id`
- `email`
- `created_at`
- `telegram_linked`
- `telegram_id`
- `linked_at`
- `totp_enabled`
- `totp_enabled_at`

This endpoint should become the main source for dashboard/profile identity state.

### Telegram linking

There are two linking flows:

1. `POST /link/site-token`
   - generates a one-time site-to-Telegram token
   - returns `token`, `expires_at`, `deep_link`

2. `POST /link/by-public-code`
   - links by public code entered from the bot side

This means the frontend should support both:

- opening a Telegram deep link
- manual public code entry

## VPN domain

### Region

- `GET /vpn/region`
- `PUT /vpn/region`

This is the user’s selected VPN/OpenVPN region. Reading does not require an active subscription, but does require auth and linked Telegram according to the spec notes.

### OpenVPN config download

- `GET /vpn/openvpn/config`

Returns a **binary `.ovpn` file**, not JSON.

Frontend implication:

- handle it as file download
- do not treat it like a normal JSON endpoint

Requirements:

- authenticated user
- linked Telegram
- active subscription

### VLESS subscription URL

- `GET /vpn/vless/subscription`

Returns:

- `subscription_url`

This should likely be shown as:

- copyable link
- open-in-client action
- status/error message when unavailable

### Recreate config

- `POST /vpn/recreate`

Recreates VPN configuration and may optionally accept:

- `region`

Important behavior:

- rate limited, about 2 minutes per account
- can return `429`

Frontend should show clear cooldown/rate-limit messaging instead of a generic failure.

## Billing domain

### Checkout

- `POST /billing/checkout`

This is currently a **placeholder** endpoint:

- returns `501`

Frontend implication:

- do not fake a real payment flow yet
- show an intentional “not available yet” state

## Error handling

Most error responses use:

```json
{
  "error": "..."
}
```

Frontend should normalize this into a shared API error shape in the dedicated API layer.

Expected handling rules:

1. Parse known status codes explicitly
2. Convert API errors into stable UI-safe messages/state
3. Keep transport details inside `src/api/`
4. Translate user-visible errors in the UI layer

## Bilingual handling

The project already uses **`next-intl`** and has:

- `messages/en.json`
- `messages/ru.json`

Rules that matter for this API integration:

1. **No hardcoded visible strings**
2. **No hardcoded accessibility labels**
3. Every new user-facing state/error/label must be added to **both** language files
4. Validation messages should also come from translations

Recommended namespaces for the new API-driven content:

- `auth.login.*`
- `auth.register.*`
- `auth.forgot.*`
- `auth.errors.*`
- `dashboard.profile.*`
- `dashboard.subscription.*`
- `dashboard.configs.*`
- `dashboard.layout.*`
- `dashboard.<route>.*`
- `common.*`

Examples of content that must be translated:

- invalid credentials
- TOTP required
- incorrect TOTP code
- reset email sent
- reset token expired
- Telegram linked / not linked
- no active subscription
- config recreated
- rate limit reached
- billing unavailable

## Environment handling

API links should not be hardcoded.

Recommended env setup:

1. Keep real values in `.env.local`
2. Commit `.env.example`
3. Read API base URL from env in the API client layer

Typical config expected:

- API origin/base URL
- any server-side integration values needed for auth or Telegram link construction

## Frontend mapping summary

### Auth pages

- **Register page** -> `POST /auth/register`
- **Login page** -> `POST /auth/login`
- **TOTP step** -> `POST /auth/login/totp`
- **Forgot password page** -> `POST /auth/forgot-password`
- **Reset password page** -> `POST /auth/reset-password`
- **Profile password change** -> `PUT /auth/password`

### Dashboard/profile pages

- **Profile identity** -> `GET /me`
- **Telegram link deep-link flow** -> `POST /link/site-token`
- **Telegram public code flow** -> `POST /link/by-public-code`
- **Region settings** -> `GET/PUT /vpn/region`
- **OpenVPN download** -> `GET /vpn/openvpn/config`
- **VLESS subscription** -> `GET /vpn/vless/subscription`
- **Recreate VPN config** -> `POST /vpn/recreate`
- **Billing CTA** -> `POST /billing/checkout` with current 501 placeholder handling

## Main implementation cautions

1. Do not implement the current forgot-password code verification flow as if it were real API behavior.
2. Do not place core API logic directly in hooks.
3. Do not store auth tokens as normal client-side UI state if server cookies can handle the session.
4. Do not hardcode API URLs.
5. Do not add only one locale when introducing new strings.

## Bottom line

`swagger.json` describes a token-based VPN/account API with:

- standard auth
- optional two-step TOTP login
- profile and Telegram linking
- VPN region/config/subscription actions
- a not-yet-implemented billing endpoint

The clean frontend implementation is:

- **server-first**
- **native fetch**
- **dedicated `src/api/` layer**
- **secure cookie session mediation**
- **server actions for interactive writes**
- **bilingual UI via `next-intl`**
