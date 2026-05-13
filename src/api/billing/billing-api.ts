import { apiFetch } from '../client/api-client';
import type {
  StatusOK,
  PromocodeActivateRequest,
  PromocodeActivateResponse,
  CurrentSubscriptionResponse,
} from '../client/api-types';

/**
 * POST /billing/checkout
 *
 * Payment integration is not yet implemented on the backend.
 * The server always returns HTTP 501. The caller should catch ApiError
 * with status 501 and display an intentional "not available yet" state.
 */
export async function checkout(token: string): Promise<StatusOK> {
  return apiFetch('/billing/checkout', { method: 'POST', token });
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
