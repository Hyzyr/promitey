/**
 * Centralized API error code → translated message resolver.
 *
 * ── Architecture note (toast-readiness) ──────────────────────────────────────
 * This utility only produces a translated string. Whether that string is shown
 * inline (setServerError) or as an ambient notification (toast.error) is left
 * to the caller — no changes here are needed when toasts are added.
 *
 * Future upgrade path:
 *   1. Add ToastProvider to root layout  →  src/components/ui/toast-provider.tsx
 *   2. Add useToast hook                 →  src/hooks/use-toast.ts
 *   3. In each hook, replace or augment:
 *        setServerError(msg)
 *      with:
 *        toast.error(msg)   // or both, for ambient + inline display
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Maps server-returned error codes to keys inside the `auth.errors` namespace.
 *
 * Convention:
 *  - Keep the code the backend actually sends as the primary key.
 *  - Keep historical / alternative spellings as aliases so nothing silently
 *    degrades to `generic` if the backend ever varies the code name.
 *  - Infrastructure codes (`network`, `unauthenticated`) are included so
 *    every possible ActionResult.code has an explicit mapping entry.
 */
const AUTH_ERROR_MAP: Record<string, string> = {
  // Credentials — login returns `invalid_credentials`; keep alias just in case
  invalid_credentials: 'badCredentials',
  'invalid credentials': 'badCredentials',
  bad_credentials: 'badCredentials',
  // Registration — register returns `user_already_exists`; keep alias just in case
  user_already_exists: 'emailTaken',
  email_taken: 'emailTaken',
  // Codes & tokens
  invalid_code: 'invalidCode',
  code_expired: 'invalidCode',
  invalid_reset_token: 'invalidResetToken',
  invalid_public_code: 'invalidPublicCode',
  // Password
  wrong_password: 'wrongPassword',
  // 2FA
  invalid_totp: 'invalidTotp',
  // Rate limiting
  too_many_requests: 'tooManyRequests',
  // Linking
  already_linked: 'alreadyLinked',
  // Infrastructure — produced by server actions, not the API itself
  network: 'generic',
  unauthenticated: 'generic',
};

/**
 * Resolves an API error code to a user-facing translated string.
 *
 * @param code      Server-returned error code, e.g. `"invalid_code"`
 * @param t         Translator bound to the `auth.errors` namespace
 * @param overrides Pre-translated strings for domain-specific codes that do not
 *                  exist in `auth.errors`. Keyed by the same error code strings.
 *
 * @example
 * // Generic usage (auth.errors covers the code)
 * mapApiError(result.code, tErrors)
 *
 * @example
 * // Domain-specific override (promocode errors live in dashboard.subscription)
 * mapApiError(result.code, tErrors, {
 *   code_not_found:   t('promocode.notFound'),
 *   code_already_used: t('promocode.alreadyUsed'),
 * })
 */
export function mapApiError(
  code: string,
  t: (key: string) => string,
  overrides?: Record<string, string>,
): string {
  if (overrides !== undefined && code in overrides) return overrides[code];
  const key = AUTH_ERROR_MAP[code];
  return key !== undefined ? t(key) : t('generic');
}
