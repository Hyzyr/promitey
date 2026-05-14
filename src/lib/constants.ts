export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  users: "/users",
  subscriptions: "/subscriptions",
  servers: "/servers",
  analytics: "/analytics",
  settings: "/settings",
} as const;

const fallbackTelegramBotUrl = 'https://t.me/PrometeyVPNbot';
const fallbackTelegramSocialUrl = 'https://t.me/prometey_vpn';

const publicEnv = {
  telegramBotUrl: process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL,
  telegramSocialUrl: process.env.NEXT_PUBLIC_TELEGRAM_SOCIAL_URL,
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL,
};

const withFallback = (value: string | undefined, fallback: string) => {
  const normalizedValue = value?.trim();
  return normalizedValue || fallback;
};

const telegramBotUrl = withFallback(publicEnv.telegramBotUrl, fallbackTelegramBotUrl);

export const EXTERNAL_LINKS = {
  telegramBot: telegramBotUrl,
  social: {
    telegram: withFallback(publicEnv.telegramSocialUrl, fallbackTelegramSocialUrl),
    instagram: withFallback(publicEnv.instagramUrl, fallbackTelegramSocialUrl),
    youtube: withFallback(publicEnv.youtubeUrl, fallbackTelegramSocialUrl),
    tiktok: withFallback(publicEnv.tiktokUrl, fallbackTelegramSocialUrl),
  },
  credit: 'https://hyzyr.com',
} as const;

export const SEO_ASSETS = {
  openGraphImage: '/images/og-image-promitey.png',
  openGraphImageWidth: 1200,
  openGraphImageHeight: 630,
} as const;

export const LEGAL_PAGE_SLUGS = [
  'privacy',
  'terms',
  'refund',
  'aup',
  'report',
] as const;

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

export const LEGAL_ROUTES: Record<LegalPageSlug, string> = {
  privacy: '/legal/privacy',
  terms: '/legal/terms',
  refund: '/legal/refund',
  aup: '/legal/aup',
  report: '/legal/report',
};

export function isLegalPageSlug(value: string): value is LegalPageSlug {
  return LEGAL_PAGE_SLUGS.includes(value as LegalPageSlug);
}
