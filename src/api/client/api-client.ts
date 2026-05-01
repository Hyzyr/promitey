import { ApiError } from './api-error';

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
  return url;
}

async function request(path: string, options: RequestOptions = {}): Promise<Response> {
  const { method = 'GET', body, token, headers = {} } = options;

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
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
    let code: string | undefined;
    try {
      const payload = (await response.json()) as { error?: string };
      code = payload.error;
    } catch {
      // error body may not be JSON — leave code undefined
    }
    throw new ApiError('http', response.status, code ?? `HTTP ${response.status}`, code);
  }

  return response;
}

/** Fetch a JSON endpoint. Throws ApiError on any non-2xx response. */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await request(path, options);
  try {
    return (await response.json()) as T;
  } catch (cause) {
    throw new ApiError('parse', response.status, 'Failed to parse API response.', undefined, cause);
  }
}

/** Fetch a binary endpoint (e.g. .ovpn download). Returns raw Response for streaming. */
export async function apiFetchBinary(path: string, options: RequestOptions = {}): Promise<Response> {
  return request(path, options);
}
