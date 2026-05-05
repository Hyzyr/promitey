'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { devLoginAction } from '@/ui/auth/server/dev-auth-actions';

export interface DevLoginButtonProps {
  className?: string;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 px-4 py-3 font-manrope text-sm font-semibold text-yellow-800 transition-colors hover:bg-yellow-100 active:bg-yellow-200 disabled:opacity-60"
    >
      {pending ? '…' : label}
    </button>
  );
}

export const DevLoginButton = ({ className }: DevLoginButtonProps) => {
  const t = useTranslations('dev');
  return (
    <div className={className}>
      <p className="mb-2 text-center font-manrope text-[11px] font-medium uppercase tracking-widest text-yellow-700">
        {t('label')}
      </p>
      <form action={devLoginAction}>
        <SubmitButton label={t('loginButton')} />
      </form>
    </div>
  );
};
