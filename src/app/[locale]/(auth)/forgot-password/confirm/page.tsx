import { ForgotPasswordConfirmPage } from '@/ui/auth/pages/forgot-password-confirm-page';

interface ForgotPasswordConfirmRoutePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ForgotPasswordConfirmRoutePage({
  searchParams,
}: ForgotPasswordConfirmRoutePageProps) {
  return <ForgotPasswordConfirmPage searchParams={searchParams} />;
}