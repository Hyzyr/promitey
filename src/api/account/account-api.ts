import { apiFetch } from '../client/api-client';
import type {
  MeResponse,
  SiteLinkTokenResponse,
  LinkByPublicCodeRequest,
  StatusLinked,
} from '../client/api-types';

/** GET /me — fetch the current authenticated user's profile */
export async function getMe(token: string): Promise<MeResponse> {
  return apiFetch('/me', { token });
}

/** POST /link/site-token — generate a one-time site→Telegram link token */
export async function getSiteLinkToken(token: string): Promise<SiteLinkTokenResponse> {
  return apiFetch('/link/site-token', { method: 'POST', token });
}

/** POST /link/by-public-code — link account using the bot's public code */
export async function linkByPublicCode(
  data: LinkByPublicCodeRequest,
  token: string,
): Promise<StatusLinked> {
  return apiFetch('/link/by-public-code', { method: 'POST', body: data, token });
}
