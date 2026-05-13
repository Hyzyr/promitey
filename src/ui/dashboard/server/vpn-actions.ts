'use server';

import QRCode from 'qrcode';

import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as vpnApi from '@/api/vpn';
import {
  actionFailure,
  unauthenticatedFailure,
  type ActionResult,
} from '@/lib/server-error-forwarding';
import type { RegionResponse, StatusOK } from '@/api/client/api-types';

export interface VlessConfigData {
  subscriptionUrl: string;
  qrDataUrl: string;
}

export async function setRegionAction(region: string): Promise<ActionResult<RegionResponse>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<RegionResponse>('setRegionAction');

  try {
    const data = await vpnApi.setRegion({ region }, token);
    return { ok: true, data };
  } catch (e) {
    return actionFailure<RegionResponse>(e, 'setRegionAction');
  }
}

export async function recreateVpnAction(region?: string): Promise<ActionResult<StatusOK>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<StatusOK>('recreateVpnAction');

  try {
    const data = await vpnApi.recreateVpn(token, region ? { region } : undefined);
    return { ok: true, data };
  } catch (e) {
    if (isApiError(e)) {
      if (e.status === 429) return actionFailure<StatusOK>(e, 'recreateVpnAction', 'rate_limited');
    }
    return actionFailure<StatusOK>(e, 'recreateVpnAction');
  }
}

export async function getVlessConfigAction(): Promise<ActionResult<VlessConfigData>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<VlessConfigData>('getVlessConfigAction');

  try {
    const data = await vpnApi.getVlessSubscription(token);
    const subscriptionUrl = data.subscription_url;
    const qrDataUrl = await QRCode.toDataURL(subscriptionUrl, {
      margin: 1,
      width: 220,
    });

    return { ok: true, data: { subscriptionUrl, qrDataUrl } };
  } catch (e) {
    if (isApiError(e)) {
      if (e.status === 401 || e.status === 403 || e.status === 404) {
        return { ok: false, code: 'config_access_denied' };
      }
      if (e.status === 503) {
        return { ok: false, code: 'marzban_unavailable' };
      }
    }

    return actionFailure<VlessConfigData>(e, 'getVlessConfigAction');
  }
}
