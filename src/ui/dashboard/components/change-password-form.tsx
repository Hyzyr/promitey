'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useRouter } from '@/i18n/navigation';
import { reportForwardedServerError } from '@/lib/server-error-forwarding';

import { logoutAction } from '@/ui/auth/server/auth-actions';

export interface ChangePasswordFormProps {
  className?: string;
}

export const ChangePasswordForm = ({ className }: ChangePasswordFormProps) => {
  const tProfile = useTranslations('dashboard.profile');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsLoading(true);
    setServerError(null);

    const result = await logoutAction();
    reportForwardedServerError(result);

    if (!result.ok) {
      setServerError(tProfile('passwordChange.error'));
      setIsLoading(false);
      return;
    }

    router.replace('/forgot-password');
    router.refresh();
  };

  return (
    <div className={className}>
      <h2 className="mb-2 text-[24px] font-medium text-neutral-800">
        {tProfile('changePassword')}
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
        {tProfile('passwordChange.description')}
      </p>

      {serverError && (
        <p className="mt-3 text-sm text-red-500">{serverError}</p>
      )}

      <div className="mt-4">
        <Button
          type="button"
          variant="orange"
          size="md"
          onClick={() => setIsConfirmOpen(true)}
        >
          {tProfile('passwordChange.start')}
        </Button>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={tProfile('passwordChange.confirmTitle')}
        ariaLabel={tProfile('passwordChange.confirmAriaLabel')}
        closeAriaLabel={tCommon('close')}
        showCloseButton
      >
        <p className="font-manrope text-base leading-relaxed text-neutral-300">
          {tProfile('passwordChange.confirmDescription')}
        </p>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="orange"
            size="md"
            onClick={handleConfirm}
            isLoading={isLoading}
            className="w-full gap-2"
          >
            <LogOut className="h-4 w-4" />
            {tProfile('passwordChange.confirm')}
          </Button>
          <button
            type="button"
            onClick={() => setIsConfirmOpen(false)}
            className="w-full rounded-md py-3 font-manrope text-base font-semibold text-neutral-300 transition-colors hover:text-neutral-10"
          >
            {tCommon('cancel')}
          </button>
        </div>
      </Modal>
    </div>
  );
};
