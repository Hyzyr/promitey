'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useChangePassword } from '../hooks/use-change-password';

export interface ChangePasswordFormProps {
  className?: string;
}

export const ChangePasswordForm = ({ className }: ChangePasswordFormProps) => {
  const tProfile = useTranslations('dashboard.profile');
  const { form, onSubmit, serverError, success } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      noValidate
    >
      <h2 className="mb-4 text-lg font-semibold text-neutral-800">
        {tProfile('changePassword')}
      </h2>

      <div className="space-y-4">
        <Input
          label={tProfile('currentPassword')}
          type="password"
          autoComplete="current-password"
          variant="light"
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />
        <Input
          label={tProfile('newPassword')}
          type="password"
          autoComplete="new-password"
          variant="light"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <Input
          label={tProfile('confirmPassword')}
          type="password"
          autoComplete="new-password"
          variant="light"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      {serverError && (
        <p className="mt-3 text-sm text-red-500">{serverError}</p>
      )}

      {success && (
        <p className="mt-3 text-sm text-green-600">{tProfile('passwordSaved')}</p>
      )}

      <div className="mt-4">
        <Button
          type="submit"
          variant="orange"
          size="md"
          isLoading={isSubmitting}
        >
          {tProfile('save')}
        </Button>
      </div>
    </form>
  );
};
