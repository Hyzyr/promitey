'use server';

import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as billingApi from '@/api/billing';
import {
  actionFailure,
  unauthenticatedFailure,
  type ActionResult,
} from '@/lib/server-error-forwarding';
import type { PromocodeActivateResponse } from '@/api/client/api-types';

export async function checkoutAction(): Promise<ActionResult<void>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure('checkoutAction');

  try {
    await billingApi.checkout(token);
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) {
      if (e.status === 501) return actionFailure(e, 'checkoutAction', 'billing_unavailable');
    }
    return actionFailure(e, 'checkoutAction');
  }
}

export async function activatePromocodeAction(
  code: string,
): Promise<ActionResult<PromocodeActivateResponse>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<PromocodeActivateResponse>('activatePromocodeAction');

  try {
    const data = await billingApi.activatePromocode({ code: code.trim() }, token);
    return { ok: true, data };
  } catch (e) {
    if (isApiError(e)) {
      if (e.status === 404) return actionFailure<PromocodeActivateResponse>(e, 'activatePromocodeAction', 'code_not_found');
      if (e.status === 409) return actionFailure<PromocodeActivateResponse>(e, 'activatePromocodeAction', 'code_already_used');
    }
    return actionFailure<PromocodeActivateResponse>(e, 'activatePromocodeAction');
  }
}
