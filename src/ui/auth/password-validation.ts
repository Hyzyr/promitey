import { z } from 'zod';

export const PASSWORD_MIN_LENGTH = 10;

const PASSWORD_UPPERCASE_PATTERN = /[A-Z]/;
const PASSWORD_LOWERCASE_PATTERN = /[a-z]/;
const PASSWORD_NUMBER_PATTERN = /\d/;

export type PasswordRequirementKey = 'minLength' | 'uppercase' | 'lowercase' | 'number';

export interface PasswordRequirementState {
  key: PasswordRequirementKey;
  isMet: boolean;
}

type PasswordErrorKey =
  | 'passwordRequired'
  | 'passwordMin'
  | 'passwordUppercase'
  | 'passwordLowercase'
  | 'passwordNumber';

export type PasswordErrorTranslator = (key: PasswordErrorKey) => string;

export const getPasswordRequirementState = (
  password: string,
): PasswordRequirementState[] => [
  { key: 'minLength', isMet: password.length >= PASSWORD_MIN_LENGTH },
  { key: 'uppercase', isMet: PASSWORD_UPPERCASE_PATTERN.test(password) },
  { key: 'lowercase', isMet: PASSWORD_LOWERCASE_PATTERN.test(password) },
  { key: 'number', isMet: PASSWORD_NUMBER_PATTERN.test(password) },
];

export const isPasswordRequirementsMet = (password: string) =>
  getPasswordRequirementState(password).every(({ isMet }) => isMet);

export const createPasswordSchema = (t: PasswordErrorTranslator) =>
  z
    .string()
    .min(1, t('passwordRequired'))
    .min(PASSWORD_MIN_LENGTH, t('passwordMin'))
    .regex(PASSWORD_UPPERCASE_PATTERN, t('passwordUppercase'))
    .regex(PASSWORD_LOWERCASE_PATTERN, t('passwordLowercase'))
    .regex(PASSWORD_NUMBER_PATTERN, t('passwordNumber'));