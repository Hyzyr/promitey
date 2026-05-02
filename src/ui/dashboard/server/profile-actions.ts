'use server';

import QRCode from 'qrcode';
import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as authApi from '@/api/auth';
import * as accountApi from '@/api/account';

import type { ActionResult } from '@/ui/auth/server/auth-actions';
import type { SiteLinkTokenResponse, TotpStatusResponse } from '@/api/client/api-types';

export async function changePasswordAction(values: {
  current_password: string;
  new_password: string;
}): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };
  try {
    await authApi.changePassword(
      { current_password: values.current_password, new_password: values.new_password },
      token,
    );
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function getTelegramLinkTokenAction(): Promise<ActionResult<SiteLinkTokenResponse>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };
  try {
    const result = await accountApi.getSiteLinkToken(token);
    return { ok: true, data: result };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function linkByPublicCodeAction(values: {
  public_code: string;
}): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };
  try {
    await accountApi.linkByPublicCode({ public_code: values.public_code }, token);
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export type TotpSetupData = {
  otpauth_url: string;
  issuer: string;
  account: string;
  secret: string;
  qrDataUrl: string;
};

export async function setupTotpAction(): Promise<ActionResult<TotpSetupData>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };
  try {
    const result = await authApi.totpSetup(token);
    const secret = new URL(result.otpauth_url).searchParams.get('secret') ?? '';
    const qrDataUrl = await QRCode.toDataURL(result.otpauth_url, { margin: 1, width: 200 });
    return { ok: true, data: { ...result, secret, qrDataUrl } };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function enableTotpAction(code: string): Promise<ActionResult<TotpStatusResponse>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };
  try {
    const result = await authApi.totpEnable({ code }, token);
    return { ok: true, data: result };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function disableTotpAction(
  password: string,
  code: string,
): Promise<ActionResult<TotpStatusResponse>> {
  const token = await getAccessToken();
  if (!token) return { ok: false, code: 'unauthenticated' };
  try {
    const result = await authApi.totpDisable({ password, code }, token);
    return { ok: true, data: result };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}
