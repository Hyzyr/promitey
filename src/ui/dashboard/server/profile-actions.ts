'use server';

import { getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import * as authApi from '@/api/auth';
import * as accountApi from '@/api/account';

import type { ActionResult } from '@/ui/auth/server/auth-actions';
import type { SiteLinkTokenResponse } from '@/api/client/api-types';

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
