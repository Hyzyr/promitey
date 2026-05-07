import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AuthBackground } from '@/ui/auth/components/auth-background';
import { AuthHeader } from '@/ui/auth/components/auth-header';
import { AuthPromo } from '@/ui/auth/components/auth-promo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.auth' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <AuthBackground />
      <AuthHeader />

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 pt-13 md:pt-28 pb-16 lg:justify-end lg:px-15 lg:pt-0 lg:pb-0 xlx:px-27">
        {children}
      </main>

      {/* <div className="pointer-events-none absolute bottom-15.75 left-24 z-10 hidden lg:block">
        <AuthPromo />
      </div> */}
    </div>
  );
}
