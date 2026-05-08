import { EmailChangeConfirmPage } from '@/ui/dashboard/pages/profile/email-change-confirm-page';

interface EmailChangeConfirmRoutePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function EmailChangeConfirmRoutePage({
  searchParams,
}: EmailChangeConfirmRoutePageProps) {
  return <EmailChangeConfirmPage searchParams={searchParams} />;
}