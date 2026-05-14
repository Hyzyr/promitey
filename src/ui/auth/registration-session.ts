const REGISTRATION_CREDENTIALS_KEY = 'prometey:registration-credentials';

interface RegistrationCredentials {
  email: string;
  password: string;
}

export function saveRegistrationCredentials(email: string, password: string): void {
  if (typeof window === 'undefined') return;

  window.sessionStorage.setItem(
    REGISTRATION_CREDENTIALS_KEY,
    JSON.stringify({ email, password }),
  );
}

export function getRegistrationCredentials(email: string): RegistrationCredentials | null {
  if (typeof window === 'undefined') return null;

  const rawValue = window.sessionStorage.getItem(REGISTRATION_CREDENTIALS_KEY);
  if (!rawValue) return null;

  try {
    const value = JSON.parse(rawValue) as unknown;
    if (!isRegistrationCredentials(value)) return null;
    if (value.email !== email) return null;

    return value;
  } catch {
    return null;
  }
}

export function clearRegistrationCredentials(): void {
  if (typeof window === 'undefined') return;

  window.sessionStorage.removeItem(REGISTRATION_CREDENTIALS_KEY);
}

function isRegistrationCredentials(value: unknown): value is RegistrationCredentials {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'email' in value &&
    'password' in value &&
    typeof value.email === 'string' &&
    typeof value.password === 'string'
  );
}