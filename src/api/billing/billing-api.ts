import { apiFetch } from '../client/api-client';
import type {
  PromocodeActivateRequest,
  PromocodeActivateResponse,
  CurrentSubscriptionResponse,
  BillingCheckoutRequest,
  BillingCheckoutResponse,
  SubscriptionManageResponse,
  SubscriptionCancelResponse,
} from '../client/api-types';

/**
 * POST /billing/checkout
 *
 * Create a one-time card payment via WATA and obtain the hosted payment URL.
 * The caller must redirect the user to the returned `payment_url`.
 */
export async function checkout(
  data: BillingCheckoutRequest,
  token: string,
): Promise<BillingCheckoutResponse> {
  return apiFetch('/billing/checkout', { method: 'POST', body: data, token });
}

/** POST /promocode/activate — activate a promocode for the authenticated user */
export async function activatePromocode(
  data: PromocodeActivateRequest,
  token: string,
): Promise<PromocodeActivateResponse> {
  return apiFetch('/promocode/activate', { method: 'POST', body: data, token });
}

/** GET /subscription/current - read the current active subscription */
export async function getCurrentSubscription(
  token: string,
): Promise<CurrentSubscriptionResponse> {
  return apiFetch('/subscription/current', { token });
}

/**
 * GET /subscription/manage — read renewal/cancellation capabilities and the
 * available plans (with prices) for the authenticated subscriber.
 */
export async function getSubscriptionManage(
  token: string,
): Promise<SubscriptionManageResponse> {
  return apiFetch('/subscription/manage', { token });
}

/** POST /subscription/cancel — cancel the current subscription */
export async function cancelSubscription(
  token: string,
): Promise<SubscriptionCancelResponse> {
  return apiFetch('/subscription/cancel', { method: 'POST', token });
}
