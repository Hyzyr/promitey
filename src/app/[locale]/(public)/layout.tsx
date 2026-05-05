import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAccessToken } from '@/lib/session';
import { LandingHeader } from "@/ui/public/layouts/public-header";
import { LandingFooter } from "@/ui/public/layouts/public-footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();
  const isAuthenticated = !!token;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-0 text-neutral-900 antialiased">
      <LandingHeader isAuthenticated={isAuthenticated} />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
