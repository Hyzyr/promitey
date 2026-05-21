import enAuth from '../../messages/en/auth.json';
import enCommon from '../../messages/en/common.json';
import enDashboard from '../../messages/en/dashboard.json';
import enDev from '../../messages/en/dev.json';
import enLanding from '../../messages/en/landing.json';
import enLegal from '../../messages/en/legal.json';
import enMeta from '../../messages/en/meta.json';
import enNav from '../../messages/en/nav.json';
import ruAuth from '../../messages/ru/auth.json';
import ruCommon from '../../messages/ru/common.json';
import ruDashboard from '../../messages/ru/dashboard.json';
import ruDev from '../../messages/ru/dev.json';
import ruLanding from '../../messages/ru/landing.json';
import ruLegal from '../../messages/ru/legal.json';
import ruMeta from '../../messages/ru/meta.json';
import ruNav from '../../messages/ru/nav.json';

import type { Locale } from './routing';

export const MESSAGE_NAMESPACES = [
  'meta',
  'dev',
  'common',
  'legal',
  'nav',
  'landing',
  'auth',
  'dashboard',
] as const;

export type MessageNamespace = (typeof MESSAGE_NAMESPACES)[number];
export type AppMessages = Record<MessageNamespace, unknown>;

const enMessages = {
  meta: enMeta,
  dev: enDev,
  common: enCommon,
  legal: enLegal,
  nav: enNav,
  landing: enLanding,
  auth: enAuth,
  dashboard: enDashboard,
} satisfies AppMessages;

const ruMessages = {
  meta: ruMeta,
  dev: ruDev,
  common: ruCommon,
  legal: ruLegal,
  nav: ruNav,
  landing: ruLanding,
  auth: ruAuth,
  dashboard: ruDashboard,
} satisfies AppMessages;

const messagesByLocale = {
  en: enMessages,
  ru: ruMessages,
} satisfies Record<Locale, AppMessages>;

export function getLocaleMessages(locale: Locale): AppMessages {
  return messagesByLocale[locale];
}