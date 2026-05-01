import { apiFetch } from '../client/api-client';
import type { StatusOK } from '../client/api-types';

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
