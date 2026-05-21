'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { DEV_TEST_COOKIE, IS_DEV_MOCK_API_ENABLED } from '@/lib/dev-session';

const DEV_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  // Session cookie — expires when browser closes
};

/**
 * Activate the optional dev mock session.
 * Sets a cookie that bypasses real auth and returns fixture data everywhere.
 */
export async function devLoginAction(): Promise<void> {
  if (!IS_DEV_MOCK_API_ENABLED) {
    throw new Error('devLoginAction is only available when ENABLE_DEV_MOCK_API=true.');
  }
  const [store, locale] = await Promise.all([cookies(), getLocale()]);
  store.set(DEV_TEST_COOKIE, '1', DEV_COOKIE_OPTS);
  redirect({ href: '/dashboard', locale });
}

/**
 * Clear the optional dev mock session.
 */
export async function devLogoutAction(): Promise<void> {
  if (!IS_DEV_MOCK_API_ENABLED) {
    throw new Error('devLogoutAction is only available when ENABLE_DEV_MOCK_API=true.');
  }
  const [store, locale] = await Promise.all([cookies(), getLocale()]);
  store.delete(DEV_TEST_COOKIE);
  redirect({ href: '/login', locale });
}
