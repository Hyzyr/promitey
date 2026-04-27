import { LandingHeader } from "@/ui/public/layouts/public-header";
import { LandingFooter } from "@/ui/public/layouts/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-0 text-neutral-900 antialiased">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
