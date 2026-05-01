import { cookies } from 'next/headers';

import type { TokenPair } from '@/api/client/api-types';

const ACCESS_COOKIE = 'auth_access_token';
const REFRESH_COOKIE = 'auth_refresh_token';

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

/** Store token pair in httpOnly cookies. Only callable from server actions or route handlers. */
export async function setAuthCookies(tokens: TokenPair): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, tokens.access_token, {
    ...COOKIE_BASE,
    maxAge: 60 * 15, // 15 min
  });
  store.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...COOKIE_BASE,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/** Delete both auth cookies. Only callable from server actions or route handlers. */
export async function clearAuthCookies(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

/** Read the access token. Works in server components, actions, and route handlers. */
export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

/** Read the refresh token. Works in server components, actions, and route handlers. */
export async function getRefreshToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value ?? null;
}
