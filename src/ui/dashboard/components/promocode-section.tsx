'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePromocode } from '../hooks/use-promocode';

export interface PromocodeSectionProps {
  className?: string;
}

export const PromocodeSection = ({ className }: PromocodeSectionProps) => {
  const t = useTranslations('dashboard.subscription');

  const { form, onSubmit, result, serverError, isSubmitting } = usePromocode();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className={className}>
      <h2 className="mb-2 text-lg font-semibold text-neutral-800">
        {t('promocode.title')}
      </h2>
      <p className="mb-4 text-sm text-neutral-500">
        {t('promocode.description')}
      </p>

      {result ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm font-semibold text-green-700">
            {t('promocode.success')}
          </p>
          <p className="mt-1 text-sm text-green-600">
            {t('promocode.activePlan')}:{' '}
            <span className="font-medium">{result.subscription_type}</span>
          </p>
          <p className="text-sm text-green-600">
            {t('promocode.activeUntil')}:{' '}
            <span className="font-medium">
              {new Date(result.active_until).toLocaleDateString()}
            </span>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <Input
                placeholder={t('promocode.placeholder')}
                variant="light"
                error={errors.code?.message}
                {...register('code')}
              />
            </div>
            <Button
              type="submit"
              variant="orange"
              size="md"
              isLoading={isSubmitting}
              className="shrink-0"
            >
              {t('promocode.submit')}
            </Button>
          </div>

          {serverError && (
            <p className="mt-3 text-sm text-red-500">{serverError}</p>
          )}
        </form>
      )}
    </div>
  );
};
