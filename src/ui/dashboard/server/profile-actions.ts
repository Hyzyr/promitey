'use server';

import QRCode from 'qrcode';
import { getAccessToken } from '@/lib/session';
import * as authApi from '@/api/auth';
import * as accountApi from '@/api/account';
import {
  actionFailure,
  unauthenticatedFailure,
  type ActionResult,
} from '@/lib/server-error-forwarding';

import type { SiteLinkTokenResponse, TotpStatusResponse } from '@/api/client/api-types';

export async function changePasswordAction(values: {
  current_password: string;
  new_password: string;
}): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure('changePasswordAction');
  try {
    await authApi.changePassword(
      { current_password: values.current_password, new_password: values.new_password },
      token,
    );
    return { ok: true, data: undefined };
  } catch (e) {
    return actionFailure(e, 'changePasswordAction');
  }
}

export async function getTelegramLinkTokenAction(): Promise<ActionResult<SiteLinkTokenResponse>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<SiteLinkTokenResponse>('getTelegramLinkTokenAction');
  try {
    const result = await accountApi.getSiteLinkToken(token);
    return { ok: true, data: result };
  } catch (e) {
    return actionFailure<SiteLinkTokenResponse>(e, 'getTelegramLinkTokenAction');
  }
}

export async function linkByPublicCodeAction(values: {
  public_code: string;
}): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure('linkByPublicCodeAction');
  try {
    await accountApi.linkByPublicCode({ public_code: values.public_code }, token);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionFailure(e, 'linkByPublicCodeAction');
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
  if (!token) return unauthenticatedFailure<TotpSetupData>('setupTotpAction');
  try {
    const result = await authApi.totpSetup(token);
    const secret = new URL(result.otpauth_url).searchParams.get('secret') ?? '';
    const qrDataUrl = await QRCode.toDataURL(result.otpauth_url, { margin: 1, width: 200 });
    return { ok: true, data: { ...result, secret, qrDataUrl } };
  } catch (e) {
    return actionFailure<TotpSetupData>(e, 'setupTotpAction');
  }
}

export async function enableTotpAction(code: string): Promise<ActionResult<TotpStatusResponse>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<TotpStatusResponse>('enableTotpAction');
  try {
    const result = await authApi.totpEnable({ code }, token);
    return { ok: true, data: result };
  } catch (e) {
    return actionFailure<TotpStatusResponse>(e, 'enableTotpAction');
  }
}

export async function disableTotpAction(
  password: string,
  code: string,
): Promise<ActionResult<TotpStatusResponse>> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure<TotpStatusResponse>('disableTotpAction');
  try {
    const result = await authApi.totpDisable({ password, code }, token);
    return { ok: true, data: result };
  } catch (e) {
    return actionFailure<TotpStatusResponse>(e, 'disableTotpAction');
  }
}
