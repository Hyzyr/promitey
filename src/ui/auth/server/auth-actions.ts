'use server';

import { setAuthCookies, clearAuthCookies } from '@/lib/session';
import { isTotpChallenge } from '@/api/client/api-types';
import { isApiError } from '@/api/client/api-error';
import * as authApi from '@/api/auth';

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; code: string };

export type LoginResultData =
  | { step: 'done' }
  | { step: 'totp'; temp_token: string };

export async function loginAction(values: {
  email: string;
  password: string;
}): Promise<ActionResult<LoginResultData>> {
  try {
    const result = await authApi.login({ email: values.email, password: values.password });

    if (isTotpChallenge(result)) {
      return { ok: true, data: { step: 'totp', temp_token: result.temp_token } };
    }

    await setAuthCookies(result);
    return { ok: true, data: { step: 'done' } };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function loginTotpAction(values: {
  temp_token: string;
  code: string;
}): Promise<ActionResult> {
  try {
    const tokens = await authApi.loginTotp({
      temp_token: values.temp_token,
      code: values.code,
    });
    await setAuthCookies(tokens);
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function registerAction(values: {
  email: string;
  password: string;
}): Promise<ActionResult> {
  try {
    await authApi.register({ email: values.email, password: values.password });
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function logoutAction(): Promise<ActionResult> {
  await clearAuthCookies();
  return { ok: true, data: undefined };
}

export async function forgotPasswordAction(values: {
  email: string;
}): Promise<ActionResult> {
  try {
    await authApi.forgotPassword({ email: values.email });
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}

export async function resetPasswordAction(values: {
  token: string;
  new_password: string;
}): Promise<ActionResult> {
  try {
    await authApi.resetPassword({ token: values.token, new_password: values.new_password });
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e)) return { ok: false, code: e.code ?? `http_${e.status}` };
    return { ok: false, code: 'network' };
  }
}
