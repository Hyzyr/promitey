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

export type SubscriptionType = 'tribute' | 'stars' | 'card' | 'activation_code';

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

/**
 * Paid billing plans accepted by `POST /billing/checkout`.
 * Each plan maps to a fixed-duration, one-time card payment via WATA.
 */
export type BillingPlan = 'monthly' | 'quarterly' | 'semiannual' | 'annual';

export interface BillingCheckoutRequest {
  plan: BillingPlan;
}

/**
 * Response from `POST /billing/checkout`.
 * `payment_url` is the hosted WATA page the user must be redirected to.
 */
export interface BillingCheckoutResponse {
  payment_url: string;
  order_id: string;
  amount: number;
  currency: string;
  plan: BillingPlan;
  duration: string;
}

export interface SubscriptionManageAction {
  can_renew: boolean;
  can_change_plan: boolean;
  can_cancel: boolean;
  renew_via: 'billing_checkout' | 'telegram_bot' | 'tribute';
}

export interface SubscriptionManagePlan {
  id: BillingPlan;
  title: string;
  amount: number;
  currency: string;
}

export interface SubscriptionManageResponse {
  status: string;
  subscription_type: SubscriptionType;
  end_date: string;
  days_remaining: number;
  current_plan: string;
  actions: SubscriptionManageAction;
  available_plans: SubscriptionManagePlan[];
  notice: string;
}

export interface SubscriptionCancelResponse {
  status: 'cancelled';
  end_date: string;
  message: string;
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
