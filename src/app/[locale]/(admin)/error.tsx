'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { shouldForwardServerErrors } from '@/lib/server-error-forwarding';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('dashboard.errorBoundary');

  useEffect(() => {
    if (!shouldForwardServerErrors()) return;
    console.error('[Prometey SSR error]', {
      name: error.name,
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <section className="w-full max-w-212.5 rounded-md bg-white px-5 py-6 shadow-[0_13px_51.2px_rgba(0,0,0,.04)]">
      <h1 className="text-[28px] font-bold text-neutral-900">{t('title')}</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
        {t('description')}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-primary-500 px-5 py-3 font-manrope text-[18px] font-semibold text-neutral-900 transition hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:scale-[0.97]"
      >
        {t('retry')}
      </button>
    </section>
  );
}