// ── Common ───────────────────────────────────────────────────────────────────

export interface StatusOK {
  status: string;
}

export interface StatusLinked {
  status: string;
}

export interface ErrorBody {
  error: string;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginTotpRequest {
  temp_token: string;
  code: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface TotpChallengeResponse {
  two_factor_required: true;
  temp_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Discriminated union: either a full TokenPair (login complete) or a TOTP
 * challenge (second factor required). Use `isTotpChallenge()` to narrow.
 */
export type LoginSuccess = TokenPair | TotpChallengeResponse;

export function isTotpChallenge(r: LoginSuccess): r is TotpChallengeResponse {
  return 'two_factor_required' in r && r.two_factor_required === true;
}

export interface TotpSetupResponse {
  otpauth_url: string;
  issuer: string;
  account: string;
}

export interface TotpEnableRequest {
  code: string;
}

export interface TotpDisableRequest {
  password: string;
  code: string;
}

export interface TotpStatusResponse {
  status: string;
  totp_enabled: boolean;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  new_password: string;
}

// ── Verification ──────────────────────────────────────────────────────────────

export interface VerificationRequired {
  status: string;
  code: string;
}

export interface RegisterConfirmRequest {
  email: string;
  code: string;
}

export interface ChangeEmailPrepareRequest {
  new_email: string;
}

export interface ChangeEmailConfirmRequest {
  code: string;
}

export interface PromocodeActivateRequest {
  code: string;
}

export type SubscriptionType = 'tribute' | 'stars' | 'activation_code';

export interface PromocodeActivateResponse {
  status: string;
  code: string;
  subscription_type: SubscriptionType;
  active_until: string;
}

export interface CurrentSubscriptionResponse {
  status: string;
  subscription_type: SubscriptionType;
  end_date: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

// ── Account ──────────────────────────────────────────────────────────────────

export interface MeResponse {
  id: number;
  email: string;
  created_at: string;
  telegram_linked: boolean;
  telegram_id?: number;
  linked_at?: string;
  totp_enabled: boolean;
  totp_enabled_at?: string;
  usedTrial?: boolean;
}

export interface SiteLinkTokenResponse {
  token: string;
  expires_at: string;
  deep_link: string;
}

export interface LinkByPublicCodeRequest {
  public_code: string;
}

// ── VPN ──────────────────────────────────────────────────────────────────────

export interface RegionResponse {
  region: string;
}

export interface RegionRequest {
  region: string;
}

export interface VLESSSubscriptionResponse {
  subscription_url: string;
}

export interface RecreateRequest {
  region?: string;
}
