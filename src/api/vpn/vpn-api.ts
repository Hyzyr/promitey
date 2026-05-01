import { apiFetch, apiFetchBinary } from '../client/api-client';
import type {
  RegionResponse,
  RegionRequest,
  VLESSSubscriptionResponse,
  RecreateRequest,
  StatusOK,
} from '../client/api-types';

/** GET /vpn/region — read the user's current VPN region */
export async function getRegion(token: string): Promise<RegionResponse> {
  return apiFetch('/vpn/region', { token });
}

/** PUT /vpn/region — update the user's VPN region */
export async function setRegion(data: RegionRequest, token: string): Promise<RegionResponse> {
  return apiFetch('/vpn/region', { method: 'PUT', body: data, token });
}

/**
 * GET /vpn/openvpn/config — download the OpenVPN .ovpn config file.
 *
 * Returns the raw Response for streaming; the caller is responsible for
 * piping the binary body (e.g. via a Next.js route handler proxy).
 * Requires: auth, linked Telegram, active subscription.
 */
export async function getOpenvpnConfig(token: string): Promise<Response> {
  return apiFetchBinary('/vpn/openvpn/config', { token });
}

/** GET /vpn/vless/subscription — get the VLESS subscription URL */
export async function getVlessSubscription(
  token: string,
): Promise<VLESSSubscriptionResponse> {
  return apiFetch('/vpn/vless/subscription', { token });
}

/**
 * POST /vpn/recreate — recreate OpenVPN + VLESS config.
 * Rate-limited (~2 min per account). Returns 429 on cooldown.
 */
export async function recreateVpn(
  token: string,
  data?: RecreateRequest,
): Promise<StatusOK> {
  return apiFetch('/vpn/recreate', { method: 'POST', body: data, token });
}
