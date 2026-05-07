import { isApiError } from '@/api/client/api-error';

export interface ForwardedServerError {
  source: string;
  name: string;
  message: string;
  code?: string;
  status?: number;
  kind?: string;
  stack?: string;
  cause?: string;
}

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; code: string; error?: ForwardedServerError };

export function shouldForwardServerErrors(): boolean {
  return process.env.NEXT_PUBLIC_FORWARD_SERVER_ERRORS === 'true';
}

export function serializeServerError(
  error: unknown,
  source: string,
): ForwardedServerError | undefined {
  if (!shouldForwardServerErrors()) return undefined;

  if (isApiError(error)) {
    return {
      source,
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status,
      kind: error.kind,
      stack: error.stack,
      cause: stringifyCause(error.cause),
    };
  }

  if (error instanceof Error) {
    return {
      source,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: stringifyCause(error.cause),
    };
  }

  return {
    source,
    name: 'UnknownError',
    message: stringifyCause(error) ?? 'Unknown server error',
  };
}

export function actionFailure<T = void>(
  error: unknown,
  source: string,
  codeOverride?: string,
): ActionResult<T> {
  if (isApiError(error)) {
    return {
      ok: false,
      code: codeOverride ?? error.code ?? `http_${error.status}`,
      error: serializeServerError(error, source),
    };
  }

  return {
    ok: false,
    code: codeOverride ?? 'network',
    error: serializeServerError(error, source),
  };
}

export function unauthenticatedFailure<T = void>(source: string): ActionResult<T> {
  return {
    ok: false,
    code: 'unauthenticated',
    error: serializeServerError(new Error('Missing access token.'), source),
  };
}

export function reportForwardedServerError(result: ActionResult<unknown>): void {
  if (result.ok || !result.error || !shouldForwardServerErrors()) return;
  console.error('[Prometey server error]', result.error);
}

function stringifyCause(cause: unknown): string | undefined {
  if (cause === undefined) return undefined;
  if (cause instanceof Error) return `${cause.name}: ${cause.message}`;
  if (typeof cause === 'string') return cause;

  try {
    return JSON.stringify(cause);
  } catch {
    return String(cause);
  }
}