'use client';

import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { Button } from '@/components/ui/button';
import { AuthLink } from './auth-link';
import { AuthStep } from './auth-step';
import { cn } from '@/lib/utils';

const CODE_LENGTH = 6;

interface VerifyCodeFormProps {
  /** Email/login the code was sent to (for the description line). */
  recipient?: string;
}

export const VerifyCodeForm = ({ recipient }: VerifyCodeFormProps) => {
  const t = useTranslations('auth');
  const router = useRouter();

  const [digits, setDigits] = useState<string[]>(() =>
    Array(CODE_LENGTH).fill(''),
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusAt = (idx: number) => {
    const el = inputsRef.current[idx];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleChange = (idx: number, raw: string) => {
    const ch = raw.replace(/\D/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[idx] = ch;
      return next;
    });
    if (ch && idx < CODE_LENGTH - 1) focusAt(idx + 1);
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      focusAt(idx - 1);
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      focusAt(idx - 1);
    } else if (e.key === 'ArrowRight' && idx < CODE_LENGTH - 1) {
      e.preventDefault();
      focusAt(idx + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;
    e.preventDefault();
    const chars = text.slice(0, CODE_LENGTH).split('');
    const next = Array(CODE_LENGTH).fill('');
    chars.forEach((c, i) => {
      next[i] = c;
    });
    setDigits(next);
    focusAt(Math.min(chars.length, CODE_LENGTH - 1));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < CODE_LENGTH) {
      setError(t('errors.codeIncomplete'));
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      // TODO: verify code with API.
      router.push('/forgot-password/reset');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-3"
      noValidate
    >
      <p className="font-montserrat w-full text-center text-[14px] leading-[1.6] text-neutral-600 lg:text-[16px]">
        {t('forgot.codeDescription')}{' '}
        {recipient && <span className="font-semibold">{recipient}.</span>}
      </p>

      <AuthStep label={t('forgot.step2')} />

      <div className="flex w-full gap-3">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={cn(
              'min-w-0 flex-1 rounded-md border border-neutral-60 bg-transparent px-3 py-4 text-center font-roboto text-[18px] font-medium tracking-[0.32px] text-neutral-900 outline-none transition-colors',
              'focus:border-neutral-300',
              error && 'border-red-500',
            )}
          />
        ))}
      </div>

      {error && (
        <p className="font-roboto text-center text-[14px] text-red-500">
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
        >
          {t('forgot.next')}
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
