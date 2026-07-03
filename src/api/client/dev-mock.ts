import { IS_DEV_MOCK_API_ENABLED } from '@/lib/dev-session';
import { ApiError } from './api-error';
import type {
  LoginSuccess,
  MeResponse,
  RegionResponse,
  TokenPair,
  VLESSSubscriptionResponse,
  StatusOK,
  StatusLinked,
  SiteLinkTokenResponse,
  TotpSetupResponse,
  TotpStatusResponse,
  VerificationRequired,
  PromocodeActivateResponse,
  CurrentSubscriptionResponse,
  BillingCheckoutResponse,
  SubscriptionManageResponse,
  SubscriptionCancelResponse,
} from './api-types';

// ── Fixture data ──────────────────────────────────────────────────────────────

const ME: MeResponse = {
  id: 1,
  email: 'test@dev.local',
  created_at: '2025-01-01T00:00:00Z',
  telegram_linked: true,
  telegram_id: 123456789,
  linked_at: '2025-01-15T00:00:00Z',
  totp_enabled: false,
  usedTrial: false,
};

const REGION: RegionResponse = { region: 'eu-west' };

const VLESS_SUBSCRIPTION: VLESSSubscriptionResponse = {
  subscription_url: 'vless://dev-test-fixture@dev.local:443?type=tcp&security=tls#DEV-TEST',
};

const STATUS_OK: StatusOK = { status: 'ok' };

const STATUS_LINKED: StatusLinked = { status: 'linked' };

const TOKEN_PAIR: TokenPair = {
  access_token: '__DEV_TEST_TOKEN__',
  refresh_token: '__DEV_TEST_REFRESH_TOKEN__',
  token_type: 'Bearer',
};

const LOGIN_SUCCESS: LoginSuccess = TOKEN_PAIR;

const SITE_LINK_TOKEN: SiteLinkTokenResponse = {
  token: 'dev-site-link-token-fixture',
  expires_at: new Date(Date.now() + 1000 * 60 * 10).toISOString(),
  deep_link: 'https://t.me/dev_bot?start=dev-site-link-token-fixture',
};

const TOTP_SETUP: TotpSetupResponse = {
  otpauth_url:
    'otpauth://totp/Prometey%20VPN:test%40dev.local?secret=JBSWY3DPEHPK3PXP&issuer=Prometey%20VPN',
  issuer: 'Prometey VPN',
  account: 'test@dev.local',
};

const TOTP_ENABLED: TotpStatusResponse = { status: 'ok', totp_enabled: true };
const TOTP_DISABLED: TotpStatusResponse = { status: 'ok', totp_enabled: false };

const REGISTER_VERIFICATION_REQUIRED: VerificationRequired = {
  status: 'verification_required',
};

const EMAIL_CHANGE_VERIFICATION_REQUIRED: VerificationRequired = {
  status: 'verification_required',
};

const FORGOT_PASSWORD_VERIFICATION_REQUIRED: VerificationRequired = {
  status: 'verification_required',
};

const PROMOCODE_ACTIVATE: PromocodeActivateResponse = {
  status: 'ok',
  code: 'DEV-CODE',
  subscription_type: 'activation_code',
  active_until: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
};

const CURRENT_SUBSCRIPTION: CurrentSubscriptionResponse = {
  status: 'active',
  subscription_type: 'stars',
  end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
};

// In dev, `payment_url` points straight at the success return page so the
// full checkout → redirect → return flow can be exercised without WATA.
const BILLING_CHECKOUT: BillingCheckoutResponse = {
  payment_url: '/dashboard/subscription/success?provider=dev',
  order_id: `vpn-dev-${Math.random().toString(16).slice(2, 10)}`,
  amount: 199,
  currency: 'RUB',
  plan: 'monthly',
  duration: '30 days',
};

const SUBSCRIPTION_MANAGE: SubscriptionManageResponse = {
  status: 'active',
  subscription_type: 'card',
  end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  days_remaining: 30,
  current_plan: 'monthly',
  actions: {
    can_renew: true,
    can_change_plan: true,
    can_cancel: true,
    renew_via: 'billing_checkout',
  },
  available_plans: [
    { id: 'monthly', title: 'Monthly', amount: 199, currency: 'RUB' },
    { id: 'quarterly', title: 'Quarterly', amount: 499, currency: 'RUB' },
    { id: 'semiannual', title: '6 months', amount: 899, currency: 'RUB' },
    { id: 'annual', title: 'Annual', amount: 1599, currency: 'RUB' },
  ],
  notice: '',
};

const SUBSCRIPTION_CANCEL: SubscriptionCancelResponse = {
  status: 'cancelled',
  end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  message: 'Subscription cancelled (dev fixture).',
};

export const DEV_OPENVPN_CONFIG = `# DEV MODE — sample OpenVPN config (not a real key)
client
dev tun
proto udp
remote dev.local 1194
resolv-retry infinite
nobind
persist-key
persist-tun
<ca>
-----BEGIN CERTIFICATE-----
DEV-FIXTURE-CA-PLACEHOLDER
-----END CERTIFICATE-----
</ca>
verb 3
`;

// ── Route table ───────────────────────────────────────────────────────────────

type RouteKey = `${'GET' | 'POST' | 'PUT' | 'DELETE'} ${string}`;
type RouteHandler = (body: unknown) => unknown;

const ROUTES: Partial<Record<RouteKey, RouteHandler>> = {
  'POST /auth/login': () => ({ ...LOGIN_SUCCESS }),
  'POST /auth/login/totp': () => ({ ...TOKEN_PAIR }),
  'POST /auth/refresh': () => ({ ...TOKEN_PAIR }),
  'POST /auth/forgot-password': () => ({ ...FORGOT_PASSWORD_VERIFICATION_REQUIRED }),
  'POST /auth/reset-password': () => STATUS_OK,
  'GET /me': () => ME,
  'GET /vpn/region': () => ({ ...REGION }),
  'PUT /vpn/region': () => ({ ...REGION }),
  'GET /vpn/vless/subscription': () => VLESS_SUBSCRIPTION,
  'POST /vpn/recreate': () => STATUS_OK,
  'POST /billing/checkout': () => ({ ...BILLING_CHECKOUT }),
  'POST /promocode/activate': () => ({ ...PROMOCODE_ACTIVATE }),
  'GET /subscription/current': () => ({ ...CURRENT_SUBSCRIPTION }),
  'GET /subscription/manage': () => ({ ...SUBSCRIPTION_MANAGE }),
  'POST /subscription/cancel': () => ({ ...SUBSCRIPTION_CANCEL }),
  'PUT /auth/password': () => STATUS_OK,
  'PUT /auth/register': () => ({ ...REGISTER_VERIFICATION_REQUIRED }),
  'POST /auth/register': () => STATUS_OK,
  'POST /auth/totp/setup': () => ({ ...TOTP_SETUP }),
  'POST /auth/totp/enable': () => ({ ...TOTP_ENABLED }),
  'POST /auth/totp/disable': () => ({ ...TOTP_DISABLED }),
  'PUT /auth/email': () => ({ ...EMAIL_CHANGE_VERIFICATION_REQUIRED }),
  'POST /auth/email': () => STATUS_OK,
  'POST /link/site-token': () => ({ ...SITE_LINK_TOKEN }),
  'POST /link/by-public-code': () => STATUS_LINKED,
};

/**
 * Intercept an API call in dev mode and return fixture data.
 * Throws ApiError for known error states (e.g. billing 501).
 * Throws if called outside development.
 */
export function devMockFetch<T>(path: string, method: string, body?: unknown): T {
  if (!IS_DEV_MOCK_API_ENABLED) {
    throw new Error('[dev-mock] devMockFetch called while ENABLE_DEV_MOCK_API is disabled.');
  }

  // Strip query params for matching
  const basePath = path.split('?')[0];
  const key: RouteKey = `${method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE'} ${basePath}`;
  const handler = ROUTES[key];

  if (handler) {
    return handler(body) as T;
  }

  throw new ApiError('http', 501, `[dev-mock] Unhandled route: ${key}`, 'dev_mock_unhandled_route');
}

/** Returns a mock Response object for binary endpoints (e.g. OpenVPN config). */
export function devMockFetchBinary(_path: string): Response {
  void _path;

  if (!IS_DEV_MOCK_API_ENABLED) {
    throw new Error('[dev-mock] devMockFetchBinary called while ENABLE_DEV_MOCK_API is disabled.');
  }

  return new Response(DEV_OPENVPN_CONFIG, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="prometey-dev.ovpn"',
    },
  });
}
