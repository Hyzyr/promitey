interface AuthStepProps {
  /** e.g. "Шаг 1/3". */
  label: string;
}

/**
 * Step indicator displayed as an underlined row above the form.
 */
export const AuthStep = ({ label }: AuthStepProps) => {
  return (
    <div className="flex w-full items-center justify-center border-b border-neutral-40 pt-4">
      <p className="flex-1 font-manrope text-[16px] leading-[1.6] font-medium text-neutral-600 lg:text-[18px]">
        {label}
      </p>
    </div>
  );
};
