'use server';

import { setAuthCookies, clearAuthCookies, getAccessToken } from '@/lib/session';
import { isApiError } from '@/api/client/api-error';
import { isTotpChallenge } from '@/api/client/api-types';
import * as authApi from '@/api/auth';
import {
  actionFailure,
  unauthenticatedFailure,
  type ActionResult,
} from '@/lib/server-error-forwarding';

export type LoginResultData =
  | { step: 'done' }
  | { step: 'totp'; temp_token: string };

export type RegisterResultData = { step: 'verify_email'; email: string };

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
    if (isApiError(e) && e.status === 401) {
      return { ok: false, code: e.code ?? 'invalid_credentials' };
    }

    return actionFailure<LoginResultData>(e, 'loginAction');
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
    return actionFailure(e, 'loginTotpAction');
  }
}

/** Step 1: prepare registration — sends verification code to the given email */
export async function registerAction(values: {
  email: string;
  password: string;
}): Promise<ActionResult<RegisterResultData>> {
  try {
    await authApi.registerPrepare({ email: values.email, password: values.password });
    return { ok: true, data: { step: 'verify_email', email: values.email } };
  } catch (e) {
    return actionFailure<RegisterResultData>(e, 'registerAction');
  }
}

/** Step 2: confirm registration with the emailed verification code */
export async function registerConfirmAction(values: {
  email: string;
  code: string;
}): Promise<ActionResult> {
  try {
    await authApi.registerConfirm({ email: values.email, code: values.code });
    return { ok: true, data: undefined };
  } catch (e) {
    return actionFailure(e, 'registerConfirmAction');
  }
}

export async function logoutAction(): Promise<ActionResult> {
  await clearAuthCookies();
  return { ok: true, data: undefined };
}

/** Request a password-reset verification code; returns email for routing */
export async function forgotPasswordAction(values: {
  email: string;
}): Promise<ActionResult<{ email: string }>> {
  try {
    await authApi.forgotPassword({ email: values.email });
    return { ok: true, data: { email: values.email } };
  } catch (e) {
    return actionFailure<{ email: string }>(e, 'forgotPasswordAction');
  }
}

/** Set a new password using email + verification code */
export async function resetPasswordAction(values: {
  email: string;
  code: string;
  new_password: string;
}): Promise<ActionResult> {
  try {
    await authApi.resetPassword({
      email: values.email,
      code: values.code,
      new_password: values.new_password,
    });
    return { ok: true, data: undefined };
  } catch (e) {
    if (isApiError(e) && e.status === 400) {
      return actionFailure(e, 'resetPasswordAction', 'invalid_code');
    }

    return actionFailure(e, 'resetPasswordAction');
  }
}

/** Step 1: prepare email change — sends verification code to the new address */
export async function prepareEmailChangeAction(values: {
  new_email: string;
}): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure('prepareEmailChangeAction');
  try {
    await authApi.prepareEmailChange({ new_email: values.new_email }, token);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionFailure(e, 'prepareEmailChangeAction');
  }
}

/** Step 2: confirm email change with the verification code */
export async function confirmEmailChangeAction(values: {
  code: string;
}): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return unauthenticatedFailure('confirmEmailChangeAction');
  try {
    await authApi.confirmEmailChange({ code: values.code }, token);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionFailure(e, 'confirmEmailChangeAction');
  }
}
