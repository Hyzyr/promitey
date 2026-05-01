import { apiFetch } from '../client/api-client';
import type {
  RegisterRequest,
  LoginRequest,
  LoginTotpRequest,
  LoginSuccess,
  TokenPair,
  RefreshRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  TotpSetupResponse,
  TotpEnableRequest,
  TotpDisableRequest,
  TotpStatusResponse,
  StatusOK,
} from '../client/api-types';

/** POST /auth/register — create a new account */
export async function register(data: RegisterRequest): Promise<StatusOK> {
  return apiFetch('/auth/register', { method: 'POST', body: data });
}

/** POST /auth/login — step 1: email + password */
export async function login(data: LoginRequest): Promise<LoginSuccess> {
  return apiFetch('/auth/login', { method: 'POST', body: data });
}

/** POST /auth/login/totp — step 2: TOTP code (only when two_factor_required) */
export async function loginTotp(data: LoginTotpRequest): Promise<TokenPair> {
  return apiFetch('/auth/login/totp', { method: 'POST', body: data });
}

/** POST /auth/refresh — rotate access + refresh tokens */
export async function refreshTokens(data: RefreshRequest): Promise<TokenPair> {
  return apiFetch('/auth/refresh', { method: 'POST', body: data });
}

/** POST /auth/forgot-password — request a password reset email */
export async function forgotPassword(data: ForgotPasswordRequest): Promise<StatusOK> {
  return apiFetch('/auth/forgot-password', { method: 'POST', body: data });
}

/** POST /auth/reset-password — set a new password via token from the reset email */
export async function resetPassword(data: ResetPasswordRequest): Promise<StatusOK> {
  return apiFetch('/auth/reset-password', { method: 'POST', body: data });
}

/** PUT /auth/password — change password while authenticated */
export async function changePassword(
  data: ChangePasswordRequest,
  token: string,
): Promise<StatusOK> {
  return apiFetch('/auth/password', { method: 'PUT', body: data, token });
}

/** POST /auth/totp/setup — initiate TOTP setup; returns OTP auth URL for QR */
export async function totpSetup(token: string): Promise<TotpSetupResponse> {
  return apiFetch('/auth/totp/setup', { method: 'POST', token });
}

/** POST /auth/totp/enable — confirm TOTP setup with a live code */
export async function totpEnable(
  data: TotpEnableRequest,
  token: string,
): Promise<TotpStatusResponse> {
  return apiFetch('/auth/totp/enable', { method: 'POST', body: data, token });
}

/** POST /auth/totp/disable — disable TOTP; requires current password + code */
export async function totpDisable(
  data: TotpDisableRequest,
  token: string,
): Promise<TotpStatusResponse> {
  return apiFetch('/auth/totp/disable', { method: 'POST', body: data, token });
}
