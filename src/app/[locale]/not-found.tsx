import { SiteJsonLd } from '@/components/seo';
import { getAccessToken } from '@/lib/session';
import { NotFoundPage } from '@/ui/public/not-found/not-found-page';
import { LandingFooter } from '@/ui/public/layouts/public-footer';
import { LandingHeader } from '@/ui/public/layouts/public-header';

export default async function NotFound() {
  const isAuthenticated = !!(await getAccessToken());

  return (
    <div className="flex min-h-screen flex-col bg-neutral-0 text-neutral-900 antialiased">
      <SiteJsonLd />
      <LandingHeader isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <NotFoundPage />
      </main>
      <LandingFooter />
    </div>
  );
}