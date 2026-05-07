const DEFAULT_SITE_URL = 'http://localhost:3000';
const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+.-]*:\/\//i;

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getSiteMetadataBase(): URL {
  return new URL(getSiteUrl());
}

function normalizeSiteUrl(value: string | undefined): string {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return DEFAULT_SITE_URL;
  }

  const candidate = ABSOLUTE_URL_PATTERN.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;
  const url = new URL(candidate);

  return url.href.replace(/\/$/, '');
}