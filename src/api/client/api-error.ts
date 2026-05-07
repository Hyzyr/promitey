export type ApiErrorKind = 'http' | 'network' | 'parse';

export class ApiError extends Error {
  readonly name = 'ApiError';

  constructor(
    public readonly kind: ApiErrorKind,
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly cause?: unknown,
    public readonly payload?: unknown,
  ) {
    super(message);
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}
