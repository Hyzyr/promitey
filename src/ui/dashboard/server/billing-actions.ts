'use server';

import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as billingApi from '@/api/billing';
import {
  actionFailure,
  unauthenticatedFailure,
  type ActionResult,
} from '@/lib/server-error-forwarding';
import type {
  PromocodeActivateResponse,
  BillingPlan,
  BillingCheckoutResponse,
} from '@/api/client/api-types';

export async function checkoutAction(
  plan: BillingPlan,
): Promise<ActionResult<BillingCheckoutResponse>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<BillingCheckoutResponse>('checkoutAction');

  try {
    const data = await billingApi.checkout({ plan }, token);
    return { ok: true, data };
  } catch (e) {
    if (isApiError(e)) {
      // 400 — backend rejected the plan identifier
      if (e.status === 400) return actionFailure<BillingCheckoutResponse>(e, 'checkoutAction', 'unknown_plan');
      // 502 — WATA upstream returned an error
      if (e.status === 502) return actionFailure<BillingCheckoutResponse>(e, 'checkoutAction', 'billing_provider_error');
      // 503 / 501 — card payments not configured (no WATA_ACCESS_TOKEN)
      if (e.status === 503 || e.status === 501) {
        return actionFailure<BillingCheckoutResponse>(e, 'checkoutAction', 'billing_unavailable');
      }
    }
    return actionFailure<BillingCheckoutResponse>(e, 'checkoutAction');
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
