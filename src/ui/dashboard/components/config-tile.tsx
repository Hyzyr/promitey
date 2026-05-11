import Image from 'next/image';

import { cn } from '@/lib/utils';

export interface ConfigTileProps {
  logo: string;
  label: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export const ConfigTile = ({
  logo,
  label,
  onClick,
  ariaLabel,
  className,
}: ConfigTileProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'flex h-48.5 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-sm bg-neutral-20 p-4',
        'transition duration-150 hover:-translate-y-0.5 hover:bg-neutral-30 active:translate-y-0 active:scale-[0.98]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:w-53.75',
        className,
      )}
    >
      <Image
        src={logo}
        alt=""
        width={122}
        height={122}
        className="h-30.5 w-30.5"
      />
      <span className="text-center text-sm font-manrope text-neutral-600">{label}</span>
    </button>
  );
};
