'use client';

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useTelegramLinkToken } from '../hooks/use-telegram-link-token';
import { useLinkByCode } from '../hooks/use-link-by-code';

export interface TelegramLinkSectionProps {
  initialLinked: boolean;
  linkedAt?: string;
  className?: string;
}

export const TelegramLinkSection = ({
  initialLinked,
  linkedAt,
  className,
}: TelegramLinkSectionProps) => {
  const tProfile = useTranslations('dashboard.profile');
  const { linkData, loading, error: tokenError, onGetToken } = useTelegramLinkToken();
  const {
    form,
    onSubmit,
    serverError: codeError,
    success: codeSuccess,
  } = useLinkByCode();

  const isLinked = initialLinked || codeSuccess;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className={className}>
      <h2 className="mb-1 text-lg font-semibold text-neutral-800">
        {tProfile('telegram.title')}
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-neutral-600">
        {tProfile('telegram.description')}
      </p>

      {isLinked ? (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{tProfile('telegram.linkedStatus')}</span>
          {linkedAt && (
            <span className="ml-1 text-sm text-neutral-500">
              — {tProfile('telegram.linkedAt')} {new Date(linkedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Deep-link flow */}
          {linkData ? (
            <a
              href={linkData.deep_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#2AABEE] px-4 py-2 text-sm font-medium text-white hover:bg-[#229ED9]"
            >
              {tProfile('telegram.openBot')}
            </a>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onGetToken}
              isLoading={loading}
            >
              {tProfile('telegram.getLink')}
            </Button>
          )}

          {tokenError && (
            <p className="text-sm text-red-500">{tokenError}</p>
          )}

          {/* Public code flow */}
          <div className="pt-2">
            <p className="mb-2 text-sm text-neutral-500">{tProfile('telegram.orCode')}</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-start gap-3"
              noValidate
            >
              <Input
                type="text"
                placeholder={tProfile('telegram.codePlaceholder')}
                error={errors.public_code?.message}
                className="max-w-52"
                {...register('public_code')}
              />
              <Button
                type="submit"
                variant="orange"
                size="md"
                isLoading={isSubmitting}
                className="shrink-0"
              >
                {tProfile('telegram.codeSubmit')}
              </Button>
            </form>

            {codeError && (
              <p className="mt-2 text-sm text-red-500">{codeError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
