import { ApiError } from './api-error';
import { DEV_TOKEN_SENTINEL, IS_DEV } from '@/lib/dev-session';
import { devMockFetch, devMockFetchBinary } from './dev-mock';

type ParsedResponseBody = {
  value: unknown;
  text: string;
};

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  /** Bearer token injected by the server session layer. */
  token?: string;
  headers?: Record<string, string>;
}

function getBaseUrl(): string {
  const url = process.env.API_BASE_URL;
  if (!url) {
    throw new Error('[api] API_BASE_URL environment variable is not set.');
  }
  return url.replace(/\/$/, '');
}

async function request(path: string, options: RequestOptions = {}): Promise<Response> {
  const { method = 'GET', body, token, headers = {} } = options;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const init: RequestInit = {
    method,
    headers: requestHeaders,
    cache: token ? 'no-store' : 'default',
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${getBaseUrl()}${path}`, init);
  } catch (cause) {
    throw new ApiError('network', 0, 'Network request failed.', undefined, cause);
  }

  if (!response.ok) {
    const payload = await parseResponseBody(response);
    const code = getErrorCode(payload.value);
    const message = getErrorMessage(payload.value) ?? code ?? `HTTP ${response.status}`;
    throw new ApiError('http', response.status, message, code, undefined, payload.value);
  }

  return response;
}

/** Fetch a JSON endpoint. Throws ApiError on any non-2xx response. */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (IS_DEV && options.token === DEV_TOKEN_SENTINEL) {
    return devMockFetch<T>(path, options.method ?? 'GET');
  }
  const response = await request(path, options);
  const payload = await parseJsonResponseBody(response);
  return payload as T;
}

/** Fetch a binary endpoint (e.g. .ovpn download). Returns raw Response for streaming. */
export async function apiFetchBinary(path: string, options: RequestOptions = {}): Promise<Response> {
  if (IS_DEV && options.token === DEV_TOKEN_SENTINEL) {
    return devMockFetchBinary(path);
  }
  return request(path, {
    ...options,
    headers: { Accept: 'application/octet-stream', ...options.headers },
  });
}

async function parseResponseBody(response: Response): Promise<ParsedResponseBody> {
  const text = await response.text();

  if (!text) {
    return { value: undefined, text };
  }

  try {
    return { value: JSON.parse(text) as unknown, text };
  } catch {
    return { value: text, text };
  }
}

async function parseJsonResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch (cause) {
    throw new ApiError(
      'parse',
      response.status,
      'Failed to parse API response.',
      undefined,
      cause,
      text,
    );
  }
}

function getErrorCode(payload: unknown): string | undefined {
  if (!isRecord(payload)) return undefined;

  const candidates = [payload.error, payload.code, payload.error_code];
  return candidates.find((candidate): candidate is string => typeof candidate === 'string');
}

function getErrorMessage(payload: unknown): string | undefined {
  if (typeof payload === 'string') return payload;
  if (!isRecord(payload)) return undefined;

  const candidates = [payload.message, payload.detail, payload.description];
  return candidates.find((candidate): candidate is string => typeof candidate === 'string');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
