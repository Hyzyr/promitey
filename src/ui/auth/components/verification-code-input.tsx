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

  const digits = Array.from(
    { length: VERIFICATION_CODE_LENGTH },
    (_, index) => value[index] ?? '',
  );

  const focusAt = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const updateDigit = (index: number, rawValue: string) => {
    const sanitized = rawValue.replace(/\D/g, '');

    if (!sanitized) {
      const nextDigits = [...digits];
      nextDigits[index] = '';
      onChange(nextDigits.join('').slice(0, VERIFICATION_CODE_LENGTH));
      return;
    }

    // The box already holds a digit (value={digit}), so `rawValue` is the
    // *whole* field content, not just the new keystroke. On mobile keyboards
    // (Android GBoard, iOS composition) the incoming value can even equal the
    // existing digit unchanged — which would collapse to a no-op re-render and
    // make the input look frozen. Extract only the characters that differ from
    // what this box currently shows, and distribute them from this box onward.
    const current = digits[index];
    let incoming = sanitized;
    if (current && sanitized.startsWith(current)) {
      // Typed after the existing digit: keep only the appended part.
      incoming = sanitized.slice(current.length);
    } else if (current && sanitized.endsWith(current)) {
      // Some IMEs prepend the new digit before the old one.
      incoming = sanitized.slice(0, sanitized.length - current.length);
    }

    // Fall back to the full sanitized value if the diff came out empty (e.g.
    // the user replaced the digit with an identical one) so we still advance.
    if (!incoming) {
      incoming = sanitized.slice(-1);
    }

    const nextDigits = [...digits];
    let written = 0;
    for (
      let offset = 0;
      offset < incoming.length && index + offset < VERIFICATION_CODE_LENGTH;
      offset += 1
    ) {
      nextDigits[index + offset] = incoming[offset];
      written += 1;
    }

    onChange(nextDigits.join('').slice(0, VERIFICATION_CODE_LENGTH));
    focusAt(Math.min(index + written, VERIFICATION_CODE_LENGTH - 1));
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
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
        <div
          key={index}
          className={cn('light input min-w-0 flex-1', error && 'error')}
        >
          <input
            ref={(input) => {
              inputsRef.current[index] = input;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            aria-label={t('confirm.digitLabel', { index: index + 1 })}
            value={digit}
            disabled={disabled}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="p-[1em_0.5em]! text-center text-[18px] font-medium tracking-[0.32px] text-neutral-500"
          />
        </div>
      ))}
    </div>
  );
};
