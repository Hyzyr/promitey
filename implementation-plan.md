## Problem

The frontend already has auth and dashboard route shells, but they are mostly mock UI and do not implement the Swagger contract in `swagger.json`. The API surface covers four domains: auth, account linking/profile, VPN operations, and a billing placeholder.

## Key findings

- API base path is `/api/v1`.
- Auth is token-based with `access_token` + `refresh_token`, plus a two-step TOTP login flow.
- Forgot-password is email-request plus token-based reset; the current `/forgot-password/verify` UI does not exist in the Swagger contract and should be removed or repurposed.
- Protected account and VPN actions require Bearer auth; some VPN endpoints also require linked Telegram and/or an active subscription.
- The app already has route groups for `(auth)` and `(admin)` and placeholder dashboard/auth surfaces that map well to the Swagger domains.
- Current translations and copy are incomplete for the Swagger behavior and will need coordinated `messages/en.json` and `messages/ru.json` updates.

## Confirmed architecture direction

1. Use a dedicated API layer for API functionality instead of placing core API logic inside hooks.
2. Prefer **server-side API access first**.
3. Use **Next.js server actions** when interactive client-side mutations or refreshes are needed later.
4. Keep hooks primarily **UI-facing adapters**, not the main home for transport/business API code.
5. Use the built-in **JavaScript `fetch`** API instead of Axios or another HTTP client library.
6. Put API base URLs and related config into environment variables.

## Proposed structure

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

## Proposed approach

1. Create a dedicated server-first API layer in `src/api/` for typed transport, endpoint modules, DTO mapping, and normalized error handling.
2. Build the API layer on top of native `fetch`, with shared request/response helpers and explicit auth-aware behavior.
3. Add secure-cookie auth/session handling through a Next.js server-facing layer so browser components do not persist long-lived Bearer tokens directly.
4. Rework auth UI to match the contract exactly:
   - register
   - login password step
   - TOTP challenge step when `two_factor_required` is returned
   - forgot-password email request
   - reset-password by URL token
   - password change inside profile
5. Replace dashboard mocks with real API-backed data and actions:
   - profile from `/me`
   - Telegram linking from `/link/site-token` and `/link/by-public-code`
   - region read/update from `/vpn/region`
   - config/VLESS download actions
   - recreate action with rate-limit/error states
   - billing checkout as an explicit 501 placeholder state
6. Add a lightweight custom client action/query hook only where client interactivity really needs it. React Query can remain installed, but it does not need to be the foundation.
7. Update bilingual copy and route composition so every visible string matches the implemented API states and errors.

## Environment configuration

- Keep real local values in `.env.local`.
- Commit an `.env.example` file that documents required variables without secrets.
- Expected configuration will likely include the API origin/base URL and any other server-side integration values needed by the new API layer.

## Execution todos

1. `api-layer-foundation` — create a dedicated `src/api/` layer with typed transport, endpoint modules, DTO mapping, and normalized server-safe error handling using native `fetch`.
2. `server-session-layer` — add secure-cookie auth/session helpers, refresh flow, current-user bootstrap from `/me`, and server-facing auth utilities.
3. `auth-flows` — wire register/login/forgot/reset/change-password, add TOTP challenge UI, and remove the unsupported forgot-password verify-code flow.
4. `account-linking-profile` — connect `/me`, profile data, password change, Telegram link token issuance, and public-code linking UX.
5. `vpn-dashboard-actions` — wire region fetch/update, OpenVPN download, VLESS subscription retrieval, config recreation, and subscription/dashboard cards.
6. `client-action-handler` — add a lightweight custom client query/action hook only for places that need interactive client-side updates around server actions.
7. `billing-and-copy` — surface the billing 501 state intentionally and update matching `en`/`ru` translation keys for all new states, labels, and errors.
8. `env-setup` — add `.env.example` and wire environment-based API URL/config access for the API layer.
9. `validation-pass` — run existing lint/build/type checks and fix any integration issues caused by the new API wiring.

## Notes

- This is a strong and professional pattern for a Next.js app that wants server-first data access and a clear separation between API logic and UI logic.
- A small custom hook around server actions is a good fit if client-side real-time or interactive refresh needs are limited.
- If the app later grows into heavy client-side caching, polling, optimistic updates, or cross-page live synchronization, React Query could still be introduced more centrally without changing the API layer structure.
- No extra HTTP dependency is needed for the planned work.
