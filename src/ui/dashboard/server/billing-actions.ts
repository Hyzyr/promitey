'use server';

import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as billingApi from '@/api/billing';
import type { ActionResult } from '@/ui/auth/server/auth-actions';

export async function checkoutAction(): Promise<ActionResult<void>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };

  try {
    await billingApi.checkout(token);
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) {
      // 501 is the expected backend placeholder state
      if (e.status === 501) return { ok: false, code: 'billing_unavailable' };
      return { ok: false, code: e.code ?? `http_${e.status}` };
    }
    return { ok: false, code: 'network' };
  }
}
