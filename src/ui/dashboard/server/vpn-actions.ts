'use server';

import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as vpnApi from '@/api/vpn';
import type { ActionResult } from '@/ui/auth/server/auth-actions';
import type { RegionResponse, StatusOK } from '@/api/client/api-types';

export async function setRegionAction(region: string): Promise<ActionResult<RegionResponse>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };

  try {
    const data = await vpnApi.setRegion({ region }, token);
    return { ok: true, data };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function recreateVpnAction(region?: string): Promise<ActionResult<StatusOK>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };

  try {
    const data = await vpnApi.recreateVpn(token, region ? { region } : undefined);
    return { ok: true, data };
  } catch (e) {
    if (isApiError(e)) {
      // 429 → surface as dedicated rate_limited code for explicit UI messaging
      if (e.status === 429) return { ok: false, code: 'rate_limited' };
      return { ok: false, code: e.code ?? `http_${e.status}` };
    }
    return { ok: false, code: 'network' };
  }
}
