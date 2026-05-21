const RESET_PASSWORD_CODE_KEY_PREFIX = 'prometey:reset-password-code:';

const getResetPasswordCodeKey = (email: string) =>
  `${RESET_PASSWORD_CODE_KEY_PREFIX}${email.toLowerCase()}`;

export const saveResetPasswordCode = (email: string, code: string): void => {
  if (typeof window === 'undefined') return;

  window.sessionStorage.setItem(getResetPasswordCodeKey(email), code);
};

export const readResetPasswordCode = (email: string): string | null => {
  if (typeof window === 'undefined') return null;

  return window.sessionStorage.getItem(getResetPasswordCodeKey(email));
};

export const clearResetPasswordCode = (email: string): void => {
  if (typeof window === 'undefined') return;

  window.sessionStorage.removeItem(getResetPasswordCodeKey(email));
};