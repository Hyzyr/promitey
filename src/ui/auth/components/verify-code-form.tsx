'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  CODE_SUCCESS_ANIMATION_MS,
  CodeSuccessAnimation,
} from '@/components/ui/code-success-animation';
import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';
import { VerificationCodeInput, VERIFICATION_CODE_LENGTH } from './verification-code-input';
import { cn } from '@/lib/utils';

export interface VerifyCodeFormProps {
  /** Email/login the code was sent to (for the description line). */
  recipient?: string;
  /** Description shown above the code inputs. */
  description: string;
  /** Step label shown above the inputs (e.g. "Step 2"). */
  stepLabel?: string;
  /** Submit button label. */
  submitLabel: string;
  /**
   * Called with the completed code on submit.
   * Return `{ ok: false, message }` with an already-translated message to show it.
   */
  onVerify: (code: string) => Promise<{ ok: boolean; message?: string }>;
  /** Called after a successful verification, after onVerify resolves ok:true. */
  onSuccess?: () => void;
  showSuccessAnimation?: boolean;
  className?: string;
}

export const VerifyCodeForm = ({
  recipient,
  description,
  stepLabel,
  submitLabel,
  onVerify,
  onSuccess,
  showSuccessAnimation = true,
  className,
}: VerifyCodeFormProps) => {
  const t = useTranslations('auth');

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCodeChange = (nextCode: string) => {
    setError(null);
    setCode(nextCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < VERIFICATION_CODE_LENGTH) {
      setError(t('errors.codeIncomplete'));
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await onVerify(code);
      if (!result.ok) {
        setError(result.message ?? t('errors.invalidCode'));
        return;
      }

      if (!showSuccessAnimation) {
        onSuccess?.();
        return;
      }

      setIsSuccess(true);
      window.setTimeout(() => {
        onSuccess?.();
      }, CODE_SUCCESS_ANIMATION_MS);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <CodeSuccessAnimation />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full flex-col items-center gap-3', className)}
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {description}{' '}
        {recipient && <span className="font-semibold">{recipient}.</span>}
      </p>

      {stepLabel && <AuthStep label={stepLabel} />}

      <VerificationCodeInput value={code} onChange={handleCodeChange} error={error ?? undefined} />

      {error && (
        <p className="font-manrope text-center text-[14px] text-red-500">
          {error}
        </p>
      )}

      <div className="flex w-full justify-center pt-3">
        <Button
          type="submit"
          variant="orange"
          size="md"
          className="w-full max-w-53.75 capitalize"
          isLoading={isSubmitting}
          disabled={error !== null}
        >
          {submitLabel}
        </Button>
      </div>

      <div className="flex w-full flex-col items-center pt-4">
        <AuthLink href="/register" className="py-1.5">
          {t('links.createAccount')}
        </AuthLink>
        <AuthLink href="/login" className="py-1.5">
          {t('links.signIn')}
        </AuthLink>
      </div>
    </form>
  );
};
