import { getAccessToken } from '@/lib/session';
import { LandingHeader } from "@/ui/public/layouts/public-header";
import { LandingFooter } from "@/ui/public/layouts/public-footer";

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
