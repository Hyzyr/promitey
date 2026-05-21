'use client';

import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export const VERIFICATION_CODE_LENGTH = 6;

export interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const VerificationCodeInput = ({
  value,
  onChange,
  error,
  disabled = false,
  className,
}: VerificationCodeInputProps) => {
  const t = useTranslations('auth');
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length: VERIFICATION_CODE_LENGTH }, (_, index) => value[index] ?? '');

  const focusAt = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const updateDigit = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    onChange(nextDigits.join('').slice(0, VERIFICATION_CODE_LENGTH));

    if (digit && index < VERIFICATION_CODE_LENGTH - 1) {
      focusAt(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusAt(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusAt(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < VERIFICATION_CODE_LENGTH - 1) {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, VERIFICATION_CODE_LENGTH);

    if (!pastedCode) return;

    event.preventDefault();
    onChange(pastedCode);
    focusAt(Math.min(pastedCode.length, VERIFICATION_CODE_LENGTH - 1));
  };

  return (
    <div className={cn('flex w-full gap-3', className)}>
      {digits.map((digit, index) => (
        <div key={index} className={cn('input light min-w-0 flex-1', error && 'error')}>
          <input
            ref={(input) => {
              inputsRef.current[index] = input;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={t('confirm.digitLabel', { index: index + 1 })}
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="text-center text-[18px] font-medium tracking-[0.32px]"
          />
        </div>
      ))}
    </div>
  );
};