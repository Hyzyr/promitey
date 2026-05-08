import { ResetPasswordPage } from '@/ui/auth/pages/reset-password-page';

interface ResetPasswordRoutePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResetPasswordRoutePage({
  searchParams,
}: ResetPasswordRoutePageProps) {
  return <ResetPasswordPage searchParams={searchParams} />;
}
