import { RegisterConfirmPage } from '@/ui/auth/pages/register-confirm-page';

interface RegisterConfirmRoutePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RegisterConfirmRoutePage({
  searchParams,
}: RegisterConfirmRoutePageProps) {
  return <RegisterConfirmPage searchParams={searchParams} />;
}