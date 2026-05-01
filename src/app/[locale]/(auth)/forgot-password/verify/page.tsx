import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

export default async function VerifyCodePage() {
  const locale = await getLocale();
  redirect({ href: '/forgot-password', locale });
}
