'use client';

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useTelegramLinkToken } from '@/ui/dashboard/hooks/use-telegram-link-token';

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
  const isLinked = initialLinked;

  return (
    <div className={className}>
      <h2 className="mb-3 text-[24px] font-medium text-neutral-800">
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
        <div className="space-y-3">
          {linkData ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              href={linkData.deep_link}
            >
              {tProfile('telegram.openBot')}
            </Button>
          ) : (
            <Button
              type="button"
              variant="orange"
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
        </div>
      )}
    </div>
  );
};
