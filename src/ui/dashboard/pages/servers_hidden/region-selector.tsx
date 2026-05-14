'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSetRegion } from '@/ui/dashboard/hooks/use-set-region';

export interface RegionSelectorProps {
  initialRegion: string;
}

export const RegionSelector = ({ initialRegion }: RegionSelectorProps) => {
  const t = useTranslations('dashboard.vpn');
  const { form, onSubmit, serverError, success } = useSetRegion(initialRegion);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div>
      <h2 className="mb-1 text-[24px] font-medium text-neutral-800">{t('regionTitle')}</h2>
      <p className="mb-4 text-sm leading-relaxed text-neutral-600">{t('regionDescription')}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start gap-3"
        noValidate
      >
        <Input
          type="text"
          placeholder={t('regionPlaceholder')}
          error={errors.region?.message}
          className="max-w-60"
          {...register('region')}
        />
        <Button
          type="submit"
          variant="orange"
          size="md"
          isLoading={isSubmitting}
          className="shrink-0"
        >
          {t('regionSave')}
        </Button>
      </form>

      {serverError && <p className="mt-2 text-sm text-red-500">{serverError}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{t('regionSaved')}</p>}
    </div>
  );
};
